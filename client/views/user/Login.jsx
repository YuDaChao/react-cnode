/**
 * Created by YuDc on 2018/1/13.
 */
import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import {
  inject,
  observer,
} from 'mobx-react'

import UserWrapper from './User'

import loginStyle from './styles/loginStyle'


@inject((stores) => {
  return {
    appState: stores.appState,
    user: stores.appState.user,
  }
}) @observer
class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      accessToken: '',
      helpText: '',
    }
  }
  componentWillMount() {
    if (this.props.user.isLogin) {
      this.props.history.replace('/user/info')
    }
  }
  componentDidMount() {
    // do something here
  }
  handleChangeAccessToken = (event) => {
    this.setState({
      accessToken: event.target.value.trim(),
    })
  }

  handleLogin = () => {
    const { accessToken } = this.state
    if (!accessToken) {
      return this.setState({
        helpText: '必须填写',
      })
    }
    this.setState({
      helpText: '',
    })
    return this.props.appState.login(accessToken)
      .then(() => {
        this.props.history.replace('/user/info')
      })
      .catch((error) => {
        console.log(error) // eslint-disable-line
      })
  }

  render() {
    const { classes } = this.props
    return (
      <UserWrapper>
        <div className={classes.root}>
          <TextField
            id="accessToken"
            label="请输入accessToken"
            placeholder="请输入accessToken"
            required
            value={this.state.accessToken}
            helperText={this.state.helpText}
            className={classes.input}
            onChange={this.handleChangeAccessToken}
          />
          <Button
            raised
            color="accent"
            className={classes.loginBottom}
            onClick={this.handleLogin}
          >
            登录
          </Button>
        </div>
      </UserWrapper>
    )
  }
}


Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

Login.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default withStyles(loginStyle)(Login)
