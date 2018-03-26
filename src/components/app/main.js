import { List, Avatar, Button, Spin } from 'antd'
import { Icon } from 'antd'
import api from '../../api'

import React from 'react'
import {isEmpty} from 'cssobj-helper'
import { connect } from 'react-redux'
import {getList} from './main.action'
import {textOverflow} from '../../utils'
import wrapModal from './form'

class Main extends React.Component {
  state = {
    loading: false,
    loadingMore: false,
    showLoadingMore: true,
  }

  WrapModal = wrapModal()

  deleteItem = (id)=>{
    api.delete('/bookmark/'+id).then(this.getList)
  }

  toggleLike = (index)=>{
    const row = this.props.list.data[index]
    row.isLike = !row.isLike
    row && api.update('/bookmark/'+row.id, row).then(this.getList)
  }

  getList = ()=>{
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
    const {WrapModal} = this
    const { loading, loadingMore, showLoadingMore } = this.state
    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore}>加载更多</Button>}
      </div>
    ) : null

    return <main>{
      isEmpty(data)
      ? 'loading...'
      : (
      <List
        loading={loading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={data}
        renderItem={(item, i) => (
          <List.Item actions={[<a onClick={e=>this.setState({editID: i})}>编辑</a>, <a onClick={e=>this.deleteItem(item.id)}>删除</a>]}>
            <List.Item.Meta
              avatar={<Avatar size={16} src={item.favicon||''} />}
              title={<a href={item.url} title={item.url} target="_blank">{textOverflow(item.url,40)}</a>}
              description={<section>
                <div>{item.title}</div>
                <div>
                  <Icon type={item.isLike ? 'star' : 'star-o'} style={{marginRight: '1rem'}} onClick={e=>this.toggleLike(i)} />
                  {item.tags && item.tags.map(v=><a key={v}>{v} </a>)}
                </div>
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

      <WrapModal editID={this.state.editID} list={list} close={
        (refresh)=>{
          this.setState({editID: null})
          if(refresh) this.getList()
        }
      } />

    </main>
  }
}

export default connect(
  ({list}) => ({list}),
  {
    getList: getList()
  }
)(Main)

