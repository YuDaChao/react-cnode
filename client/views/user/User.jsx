import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import UserIcon from 'material-ui-icons/AccountCircle'
import { withStyles } from 'material-ui/styles'
import {
  inject,
  observer,
} from 'mobx-react'

import Container from '../../layout/Container'

import userStyle from './styles/userStyle'


@inject((stores) => {
  return {
    user: stores.appState.user,
  }
}) @observer
class User extends React.Component {
  componentDidMount() {
    // do something here
  }

  render() {
    const { classes, user } = this.props
    return (
      <Container>
        <div className={classes.avatar}>
          <div className={classes.bg} />
          {
            user.info.avatar_url ?
              <Avatar className={classes.avatarImg} src={user.info.avatar_url} /> :
              <Avatar className={classes.avatarImg}>
                <UserIcon />
              </Avatar>
          }
          <span className={classes.userName}>{user.info.loginname || '未登录'}</span>
        </div>
        {this.props.children}
      </Container>
    )
  }
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
}

User.wrappedComponent.propTypes = {
  user: PropTypes.object.isRequired,
}

export default withStyles(userStyle)(User)
