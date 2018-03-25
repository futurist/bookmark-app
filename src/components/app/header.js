import React from 'react'
import { Input } from 'antd'

import {cssLayout} from '../../css' // eslint-disable-line no-unused-vars


export default class Header extends React.Component{
  render(){
    return <header>
      <h3>All Bookmarks</h3>
      <Input.Search placeholder="Enter keyword" enterButton onPressEnter={
        el=>console.log(el)
      } style={{maxWidth:'15rem'}} />
    </header>
  }
}

