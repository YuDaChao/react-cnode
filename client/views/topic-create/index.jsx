import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import SimpleMDE from 'react-simplemde-editor'
import Radio from 'material-ui/Radio'
import Button from 'material-ui/Button'
import IconReply from 'material-ui-icons/Reply'
import Snackbar from 'material-ui/Snackbar'
import { withStyles } from 'material-ui/styles'
import styles from './styles'
import { tabs } from '../../util/variableDefine'

import Container from '../../layout/Container'

class TopicCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      tab: 'dev',
      newReply: '',
      open: false,
    }
  }

  handleChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    })
  }

  handleChangeContent = (value) => {
    this.setState({
      newReply: value,
    })
  }

  handleChangeTab = (event) => {
    this.setState({
      tab: event.currentTarget.value,
    })
  }

  handleCreateTopic = () => {
    const {
      title,
      newReply,
    } = this.state
    if (!title) {
      this.showMessage('标题必填')
      return
    }
    if (!newReply) {
      this.showMessage('话题内容必填')
    }
  }

  showMessage = (message) => {
    this.setState({
      open: true,
      message,
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
  }

  render() {
    const { classes } = this.props
    return (
      <Container>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.open}
          message={this.state.message}
          onClose={this.handleClose}
        />
        <div className={classes.root}>
          <TextField
            fullWidth
            label="标题"
            value={this.state.title}
            className={classes.title}
            onChange={this.handleChangeTitle}
          />
          <SimpleMDE
            value={this.state.newReply}
            onChange={this.handleChangeContent}
            options={{
              toolbar: false,
              spellChecker: false,
              placeholder: '发表您的精彩评论',
            }}
          />
          <div>
            {
              Object.keys(tabs).map(tab => (
                <span className={classes.selectedItem} key={tab}>
                  <Radio
                    value={tab}
                    checked={tab === this.state.tab}
                    onChange={this.handleChangeTab}
                  />
                  {tabs[tab]}
                </span>
              ))
            }
          </div>
          <Button
            fab
            color="primary"
            className={classes.replyButton}
            onClick={this.handleCreateTopic}
          >
            <IconReply />
          </Button>
        </div>
      </Container>
    )
  }
}

TopicCreate.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TopicCreate)
