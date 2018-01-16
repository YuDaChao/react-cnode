import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'

import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import Login from '../views/user/Login'
import UserInfo from '../views/user/UserInfo'

export default () => [
  <Route key="index" path="/" render={() => <Redirect to="/list" />} exact />,
  <Route key="list" path="/list" component={TopicList} />,
  <Route key="detail" path="/detail/:id" component={TopicDetail} />,
  <Route key="login" path="/login" component={Login} />,
  <Route key="user" path="/user/info" component={UserInfo} />,
]
