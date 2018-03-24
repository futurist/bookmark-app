// public modules
import React from 'react'
import Loadable from 'react-loadable'

import { Input } from 'antd'
import { Menu, Icon } from 'antd'
import { Card, Tag } from 'antd'
import { Modal, Button } from 'antd'

// local modules
import loading from '../loading'
import {cssLayout} from '../../css'
import Header from './header'
import Nav from './nav'

const Search = Input.Search
const {TextArea} = Input
const SubMenu = Menu.SubMenu

const {css, mapClass} = cssLayout
const LoadableComponent = Loadable({
  loader: () => import('../user'),
  loading,
  delay: 1000,
  timeout: 15e3,
  render (el, props){
    const Component = el.default
    return <main><Component/></main>
  }
})

class App extends React.Component {
  componentWillReceiveProps(a,b,c){
    console.log(a,b,c)
  }

  render () {
    // const d= cloneTree(
    //   <div className="a"><p className="b"><span>text</span></p></div>,
    //   el => el.type=='span' ? {children:<h1/>} : replacer(el.props.className)
    // ); return d;
    return mapClass(
      <div className='container'>
        <Header/>
        <Nav/>
        <LoadableComponent />
        
      </div>
    )
  }
}

export default App
