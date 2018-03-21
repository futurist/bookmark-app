import React from 'react'
import Loadable from 'react-loadable'
import loading from '../loading'
import {cssLayout} from '../../css'

import { Input } from 'antd'
import { Menu, Icon } from 'antd';
import { Card } from 'antd';

const Search = Input.Search
const SubMenu = Menu.SubMenu;

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

function handleClick(e) {
  console.log('click', e)
}

class Category extends React.Component{
  render(){
    return <div>
      
    </div>
  }
}

class App extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = {}
  }
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
        <header>
          <h3>All Bookmarks</h3>
          <Search placeholder="Enter keyword" enterButton onPressEnter={
            el=>console.log(el)
          } style={{maxWidth:'15rem'}} />
        </header>
        <nav>
          <Menu
            defaultSelectedKeys={['1']}
            mode="vertical"
            onClick={handleClick}
          >
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>全部</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>收藏</span>
            </Menu.Item>
          </Menu>
          
          
          <Card title="分类" bordered={false} extra={<a href="#">添加</a>}>
            <p>分类一</p>
            <p>分类一</p>
            <p>分类一</p>
          </Card>
          
        </nav>
        <LoadableComponent />
        {/* <footer>copyright</footer> */}
      </div>
    )
  }
}

export default App
