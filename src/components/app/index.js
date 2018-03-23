// public modules
import React from 'react'
import Loadable from 'react-loadable'
import assignMap from 'assign-map'

import { Input } from 'antd'
import { Menu, Icon } from 'antd'
import { Card, Tag } from 'antd'
import { Modal, Button } from 'antd'

// local modules
import loading from '../loading'
import {cssLayout} from '../../css'
import api from '../../api'
import {arrayUnique, ensureHTTP, fetchURLInfo} from '../../utils'

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

function handleClick(e) {
  console.log('click', e)
}

class App extends React.Component {
  componentWillReceiveProps(a,b,c){
    console.log(a,b,c)
  }

  state = {visible: false}
  showAdd = ()=>{
    this.setState({
      visible: true
    })
  }
  handleOk = (e) => {
    console.log(this.state)
    this.setState({
      confirmLoading: true,
    })
    api.post('/bookmark', assignMap(this.state, {
      visible: null,
      tagInput: v=>(v && {tags: v.split(/\s*,\s*/)})
    }))
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    })
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
          
          
          <Card title="分类" bordered={false} extra={null}>
            <p>分类一</p>
            <p>分类一</p>
            <p>分类一</p>
          </Card>
          <Modal
            title="Add new bookmark"
            visible={this.state.visible}
            onOk={this.handleOk}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel}
          >
            <Input
            placeholder="Enter URL here"
            prefix={
              <Icon type="link" style={{color: 'gray'}}/>
            }
            suffix={
              this.state.url && <Icon type="close-circle" onClick={
                e=>{
                  this.setState({url: ''})
                  this.urlInput.focus()
                }
              } />
            }
            value={this.state.url}
            onChange={e => {
              const {value} = e.target
              this.setState({url: ensureHTTP(value)})
            }}
            onBlur={e=>{
              fetchURLInfo(this.state.url)
              .then(json=>{
                if(!json.error){
                  const {
                    url,
                    title,
                    desc,
                    favicon
                  } = json
                  this.setState({
                    url,title,desc,favicon
                  })
                }
              })
              .catch(err=>console.log(err))
            }}
            ref={el => this.urlInput = el}
            />

            <Input
            style={{marginTop: '.5rem'}}
            placeholder="Enter Title here"
            prefix={
              <Icon type="info-circle-o" style={{color: 'gray'}}/>
            }
            suffix={
              this.state.title && <Icon type="close-circle" onClick={
                e=>{
                  this.setState({title: ''})
                  this.titleInput.focus()
                }
              } />
            }
            value={this.state.title}
            onChange={e => this.setState({title: e.target.value})}
            ref={el => this.titleInput = el}
            />

            <TextArea
            style={{marginTop: '.5rem'}}
            onChange={e=>this.setState({desc: e.target.value})}
            placeholder="Description here" autosize={{
              minRows:2, maxRows:6
              }}>{this.state.desc}</TextArea>
            <Input
            style={{marginTop: '.5rem'}}
            placeholder="Enter Tags ( ',' separated )"
            prefix={
              <Icon type="tags-o" style={{color: 'gray'}}/>
            }
            value={this.state.tagInput}
            onChange={e => this.setState({tagInput: e.target.value})}/>
            <div style={{marginTop: '.5rem'}}>{
              arrayUnique((this.state.tagInput||'')
              .split(/\s*,\s*/))
              .map((v,i, arr)=>
                v && <Tag key={v} closable onClose={
                  e=>{
                    arr.splice(i,1)
                    this.setState({tagInput: arr.join(',')})
                  }
                }>{v}</Tag>
              )
            }</div>
          </Modal>
        </nav>
        <LoadableComponent />
        {/* <footer>copyright</footer> */}
        

        <Button style={{
          position:'fixed', bottom: '20px', right:'15px', display:'flex',
          padding:0, border:0, fontSize: '3rem', height: '3rem'
          }} onClick={this.showAdd}>
          <Icon type="plus-circle" />
        </Button>

      </div>
    )
  }
}

export default App
