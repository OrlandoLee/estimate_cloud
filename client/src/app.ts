import React, { Component } from 'react'
import Taro, { Config } from '@tarojs/taro'

import './app.scss'

class App extends Component {

  componentDidMount () {
    if (process.env.TARO_ENV === 'weapp') {
      if(process.env.NODE_ENV === 'production'){
        Taro.cloud.init({env: 'cloud1-4gipv037fe9c09db'})
      } else {
        Taro.cloud.init({env: 'fire-dev-0gwql2e47df45c61'})
      }
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
