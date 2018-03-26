import { Input,  Menu, Icon, Card, Tag, Modal, Button } from 'antd'
import { arrayUnique, ensureHTTP, fetchURLInfo } from '../../utils'

import React from 'react'
import mapValue from 'map-value'
import api from '../../api'
import {cssLayout} from '../../css' // eslint-disable-line no-unused-vars

export default class Nav extends React.Component {
  state = { visible: false }

  handleClick = e => {
    console.log(e)
  }

  showAdd = () => {
    this.setState({
      visible: true
    })
  }

  handleOk = (e) => {
    console.log(this.state)
    this.setState({
      confirmLoading: true,
    })
    api
      .post('/bookmark', mapValue(this.state, {
        visible: v => ({ kkk: 1234, }),
        tagInput: v => (v && { tags: v.split(/\s*,\s*/) })
      }))
      .then(() => this.setState({
        visible: false,
      }))
      .catch(err => {
        console.log('error post', err)
      });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    })
  }

  validModal = ()=>{
    return !this.state.confirmLoading && this.state.visible
  }

  render() {
    return <nav>

      <Menu
        defaultSelectedKeys={['1']}
        mode="vertical"
        onClick={this.handleClick}>
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

      <Button style={{
        position: 'fixed', bottom: '20px', right: '15px', display: 'flex',
        padding: 0, border: 0, fontSize: '3rem', height: '3rem',
        zIndex: 999
      }} onClick={this.showAdd}>
        <Icon type="plus-circle" />
      </Button>

      <Modal
        style={{zIndex: 9e9}}
        title="Add new bookmark"
        visible={this.state.visible}
        onOk={this.handleOk}
        confirmLoading={this.state.confirmLoading}
        onCancel={this.handleCancel}>
        <Input
          ref={el => this.domUrl = el}
          placeholder="Enter URL here"
          prefix={
            <Icon type="link" style={{ color: 'gray' }} />
          }
          suffix={
            this.state.url && <Icon type="close-circle" onClick={
              e => {
                this.setState({ url: '' })
                console.log(this.domUrl)
                this.domUrl.focus()
              }
            } />
          }
          value={this.state.url}
          onChange={e => {
            const { value } = e.target
            this.setState({ url: ensureHTTP(value) })
          }}
          onBlur={e => {
            fetchURLInfo(this.state.url)
              .then(json => {
                console.log(json)
                if (!json.error && this.validModal()) {
                  const {
                    url,
                    title,
                    desc,
                    favicon
                  } = json
                  this.setState(mapValue({
                    url, title, desc, favicon
                  }, {
                    url: v=>this.state.url ? {} : v,
                    title: v=>this.state.title ? {} : v,
                    desc: v=>this.state.desc ? {} : v,
                  }))
                }
              })
              .catch(err => console.log(err))
          }}
        />

        <Input
          ref={el => this.domTitle = el}
          style={{ marginTop: '.5rem' }}
          placeholder="Enter Title here"
          prefix={
            <Icon type="info-circle-o" style={{ color: 'gray' }} />
          }
          suffix={
            this.state.title && <Icon type="close-circle" onClick={
              e => {
                this.setState({ title: '' })
                this.domTitle.focus()
              }
            } />
          }
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
        />

        <Input.TextArea
          ref={el => this.domDesc = el}
          style={{ marginTop: '.5rem' }}
          value={this.state.desc}
          onChange={e => this.setState({ desc: e.target.value })}
          placeholder="Description here" autosize={{
            minRows: 2, maxRows: 6
          }} />
        <Input
          ref={el => this.domTagInput = el}
          style={{ marginTop: '.5rem' }}
          placeholder="Enter Tags ( ',' separated )"
          prefix={
            <Icon type="tags-o" style={{ color: 'gray' }} />
          }
          value={this.state.tagInput}
          onChange={e => this.setState({ tagInput: e.target.value })} />
        <div style={{ marginTop: '.5rem' }}>{
          arrayUnique((this.state.tagInput || '')
            .split(/\s*,\s*/))
            .map((v, i, arr) =>
              v && <Tag key={v} closable onClose={
                e => {
                  arr.splice(i, 1)
                  this.setState({ tagInput: arr.join(',') })
                }
              }>{v}</Tag>
            )
        }</div>
      </Modal>

    </nav>
  }
}

