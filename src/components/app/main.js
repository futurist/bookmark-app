import { List, Avatar, Button, Spin } from 'antd'
import { Input, Icon, Tag, Modal } from 'antd'
import { arrayUnique, ensureHTTP, fetchURLInfo } from '../../utils'
import mapValue from 'map-value'
import api from '../../api'

import React from 'react'
import {isEmpty} from 'cssobj-helper'
import { connect } from 'react-redux'
import {getList} from './main.actions'
import {textOverflow} from '../../utils'

class Main extends React.Component {
  state = {
    loading: false,
    loadingMore: false,
    showLoadingMore: true,
  }

  getList(){
    this.props.getList().then(data=>{
      this.setState({
        loadingMore: false,
      }, () => {
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      })
    })
  }

  componentDidMount(){
    this.getList()
  }

  onLoadMore = () => {
    this.setState({
      loadingMore: true,
    })
    this.getList()
  }

  render(){
    const {props} = this
    const {list} = props
    const {data} = list||{}
    console.log('list', list)

    const { loading, loadingMore, showLoadingMore } = this.state
    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore}>加载更多</Button>}
      </div>
    ) : null

    const WrapModal = wrapModal({
      editID: this.state.editID
    })

    return <main>{
      isEmpty(data)
      ? 'loading...'
      : (
      <List
        loading={loading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={data}
        renderItem={item => (
          <List.Item actions={[<a onClick={e=>this.setState({editID: item.id})}>编辑</a>, <a>删除</a>]}>
            <List.Item.Meta
              avatar={<Avatar size={16} src={item.favicon||''} />}
              title={<a href={item.url} title={item.url} target="_blank">{textOverflow(item.url,40)}</a>}
              description={<section>
                <div>{item.title}</div>
                <div>{item.tags.map(v=><a key={v}>{v} </a>)}</div>
              </section>}
            />
            <div>{item.desc}</div>
          </List.Item>
        )}
      />
      )
    }
    

      <Button style={{
        position: 'fixed', bottom: '20px', right: '15px', display: 'flex',
        padding: 0, border: 0, fontSize: '3rem', height: '3rem',
        zIndex: 999
      }} onClick={e=>this.setState({editID: -1})}>
        <Icon type="plus-circle" />
      </Button>

      <WrapModal editID={this.state.editID} list={list} close={()=>this.setState({editID: 0})} />

    </main>
  }
}

export default connect(
  ({list}) => ({list}),
  {
    getList: getList()
  }
)(Main)




function wrapModal () {
  return class ModalWrap extends React.Component {
  
  state = { visible: !!this.props.editID }

  showModal = () => {
    this.setState({
      visible: true,
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
      .then(() => {
        this.setState({
          visible: false,
        })
        this.props.close()
      })
      .catch(err => {
        console.log('error post', err)
      })
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    })
    this.props.close()
  }

  validModal = ()=>{
    return !this.state.confirmLoading && this.state.visible
  }

  render() {
    return <Modal
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
    }
  }
}
