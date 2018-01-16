import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import ListItemText from 'material-ui/List/ListItemText'
import Avatar from 'material-ui/Avatar'
import {
  inject,
  observer,
} from 'mobx-react'
import dateformat from 'dateformat'

import UserWrapper from './User'

import styles from './styles/userInfo'


const TopicItem = ({ topic, onClick }) => {
  return (
    <ListItem button onClick={onClick}>
      <Avatar src={topic.author.avatar_url} />
      <ListItemText
        primary={topic.title}
        secondary={`最新回复 ${dateformat(topic.last_reply_at, 'yyyy-MM-dd HH:mm:ss')}`}
      />
    </ListItem>
  )
}

@inject((stores) => {
  return {
    user: stores.appState.user,
    appState: stores.appState,
  }
}) @observer
class UserInfo extends React.Component {
  componentWillMount() {
    // 判断用户是否登录
    const { user: { isLogin }, history, appState } = this.props;
    if (!isLogin) {
      history.replace('/login')
    } else {
      appState.getUserDetail()
      appState.getCollection()
    }
  }

  handleClick = (id) => {
    this.props.history.push(`/detail/${id}`)
  }

  render() {
    const {
      classes,
      user: { detail: { recentTopics, recentReplies }, collection: { list } },
    } = this.props
    return (
      <UserWrapper>
        <div className={classes.root}>
          <Grid container spacing={16} alignContent="stretch" className={classes.root}>
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>最近发布的话题</span>
                </Typography>
                <List>
                  {
                    recentTopics && recentTopics.map(topic => (
                      <TopicItem
                        key={topic.id}
                        topic={topic}
                        onClick={() => { this.handleClick(topic.id) }}
                      />
                    ))
                  }
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>新的回复</span>
                </Typography>
                <List>
                  {
                    recentReplies && recentReplies.map(reply => (
                      <TopicItem
                        key={reply.id}
                        topic={reply}
                        onClick={() => { this.handleClick(reply.id) }}
                      />
                    ))
                  }
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>新的收藏</span>
                </Typography>
                <List>
                  {
                    list && list.map(c => (
                      <TopicItem
                        key={c.id}
                        topic={c}
                        onClick={() => { this.handleClick(c.id) }}
                      />
                    ))
                  }
                </List>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </UserWrapper>
    )
  }
}

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UserInfo)
