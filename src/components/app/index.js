// public modules
import {connect} from 'react-redux'
import React from 'react'
import Loadable from 'react-loadable'
// local modules
import loading from '../loading'
import {cssLayout} from '../../css'
import Header from './header'
import Nav from './nav'
import Main from './main'
import {hideBG} from './ui.action'

const {mapClass} = cssLayout

class App extends React.Component {
  componentWillReceiveProps(a,b,c){
    console.log(a,b,c)
  }

  render () {
    // const d= cloneTree(
    //   <div className="a"><p className="b"><span>text</span></p></div>,
    //   el => el.type=='span' ? {children:<h1/>} : replacer(el.props.className)
    // ); return d;
    const {ui, hideBG} = this.props
    return mapClass(
      <div className={{
        container: true,
        unfold: ui.unfold,
      }}>
        <Header />
        <Nav />
        <div className="drawerBg" onClick={hideBG}></div>
        <Main />
      </div>
    )
  }
}

export default connect(
  state=>state,
  {
    hideBG:hideBG()
  }
)(App)
