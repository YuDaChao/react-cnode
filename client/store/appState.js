import {
  observable,
  action,
} from 'mobx'

import { post, get } from '../util/http'

export default class AppState {
  @observable user = {
    isLogin: false,
    info: {},
    detail: {
      recentTopics: [],
      recentReplies: [],
      syncing: true,
    },
    collection: {
      syncing: true,
      list: [],
    },
  }

  @action login(accessToken) {
    return new Promise((resolve, reject) => {
      post('/user/login', {
        accessToken,
      }).then((resp) => {
        if (resp.success) {
          this.user.isLogin = true
          this.user.info = resp.data
          resolve()
        } else {
          reject(resp)
        }
      }).catch(reject)
    })
  }

  @action getUserDetail() {
    return new Promise((resolve, reject) => {
      get(`/user/${this.user.info.loginname}`)
        .then((resp) => {
          this.user.detail.syncing = true
          if (resp.success) {
            this.user.detail.recentTopics = resp.data.recent_topics
            this.user.detail.recentReplies = resp.data.recent_replies
            resolve()
          } else {
            reject()
          }
          this.user.detail.syncing = false
        })
        .catch((err) => {
          this.user.detail.syncing = false
          reject(err)
        })
    })
  }

  @action getCollection() {
    this.user.collection.syncing = true
    return new Promise((resolve, reject) => {
      get(`/topic_collect/${this.user.info.loginname}`)
        .then((resp) => {
          if (resp.success) {
            this.user.collection.list = resp.data
            this.user.collection.syncing = false
            resolve()
          } else {
            reject()
          }
          this.user.collection.syncing = false
        })
        .catch((err) => {
          this.user.collection.syncing = false
          reject(err)
        })
    })
  }
}

