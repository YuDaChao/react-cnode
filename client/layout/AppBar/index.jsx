import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { withRouter, Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import ToolBar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui-icons/Home'
import {
  inject,
  observer,
} from 'mobx-react'


const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
}


@inject((stores) => {
  return {
    appState: stores.appState,
  }
}) @observer
class MainAppBar extends React.Component {
  componentDidMount() {
    // do something here
  }

  handleClickHome = () => {
    this.props.history.push('/list?tab=all')
  }

  handleLogin = () => {
    if (this.props.appState.user.isLogin) {
      this.props.history.push('/user/info')
    } else {
      this.props.history.push('/login')
    }
  }

  render() {
    const { classes, appState: { user } } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <ToolBar>
            <IconButton
              color="contrast"
              onClick={this.handleClickHome}
            >
              <HomeIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              CNode
            </Typography>
            <Button
              raised
              color="accent"
              component={props => (<Link to="/topic" {...props} />)}
            >
              创建话题
            </Button>
            <Button
              color="contrast"
              onClick={this.handleLogin}
            >
              {user.isLogin ? user.info.loginname : '登录'}
            </Button>
          </ToolBar>
        </AppBar>
      </div>
    )
  }
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
}

export default withRouter(withStyles(styles)(MainAppBar))
