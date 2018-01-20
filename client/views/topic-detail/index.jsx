import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import dateformat from 'dateformat'
import marked from 'marked'
import SimpleMDE from 'react-simplemde-editor'
import { Link } from 'react-router-dom'
import {
  inject,
  observer,
} from 'mobx-react'

import Paper from 'material-ui/Paper'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import IconReply from 'material-ui-icons/Reply'
import { withStyles } from 'material-ui/styles'


import Container from '../../layout/Container'
import Reply from './Reply'

import styles from './Reply/style'

@inject((stores) => {
  return {
    topicStore: stores.topicStore,
    user: stores.appState.user,
  }
}) @observer
class TopicDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newReply: '',
    }
  }
  componentDidMount() {
    const { match: { params: { id } } } = this.props
    this.props.topicStore.getTopicDetail(id)
  }

  onDoReply = () => {
    const { match: { params: { id } } } = this.props
    const topic = this.props.topicStore.detailMap[id]
    topic.doReply(this.state.newReply)
      .then(() => {
        this.setState({
          newReply: '',
        })
      })
      .catch((err) => {
        console.log(err) // eslint-disable-line
      })
  }

  handleNewReplyChange = (value) => {
    this.setState({
      newReply: value,
    })
  }

  render() {
    const {
      classes,
      topicStore,
      user: { isLogin, info },
      match: {
        params: { id },
      },
    } = this.props

    const topic = topicStore.detailMap[id]
    if (!topic) {
      return (
        <Container>
          <section className={classes.loadingContainer}>
            <CircularProgress
              color="accent"
              size={100}
            />
          </section>
        </Container>
      )
    }


    return (
      <div>
        <Container>
          <Helmet>
            <title>{topic.title}</title>
          </Helmet>
          <header className={classes.header}>
            <h3>{topic.title}</h3>
          </header>
          <section className={classes.body}>
            <p dangerouslySetInnerHTML={{ __html: marked(topic.content) }} />
          </section>
        </Container>
        {
          topic.createdReplies && topic.createdReplies.length > 0 ?
            (
              <Paper elevation={4} className={classes.replies}>
                <header className={classes.replyHeader}>
                  <span>我的最新回复</span>
                  <span>{`${topic.createdReplies.length}条`}</span>
                </header>
                {
                  topic.createdReplies.map(reply => (
                    <Reply
                      key={reply.id}
                      reply={Object.assign({}, reply, {
                        author: {
                          avatar_url: info.avatar_url,
                          loginname: info.loginname,
                        },
                      })}
                    />
                  ))
                }
              </Paper>
            ) :
            null
        }
        <Paper elevation={4} className={classes.replies}>
          <header className={classes.replyHeader}>
            <span>{topic.reply_count} 回复</span>
            <span>{`最新回复 ${dateformat(topic.last_reply_at, 'yyyy-MM-dd HH:mm:ss')}`}</span>
          </header>
          {
            isLogin ?
              <section className={classes.replyEditor}>
                <SimpleMDE
                  onChange={this.handleNewReplyChange}
                  value={this.state.newReply}
                  options={{
                    toolbar: false,
                    autoFocus: false,
                    spellChecker: false,
                    placeholder: '添加您的精彩评论',
                  }}
                />
                <Button
                  fab
                  color="primary"
                  onClick={this.onDoReply}
                  className={classes.replyButton}
                >
                  <IconReply />
                </Button>
              </section> :
              null
          }
          {
            !isLogin ?
              <section className={classes.noLoginButton}>
                <Button raised color="accent" component={props => <Link to="/login" {...props} />}>
                  登录并进行评论
                </Button>
              </section> :
              null
          }
          <section>
            {
              topic.replies.map(reply => <Reply reply={reply} key={reply.id} />)
            }
          </section>
        </Paper>
      </div>
    )
  }
}

TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TopicDetail)
