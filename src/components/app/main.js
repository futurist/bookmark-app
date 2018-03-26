import { List, Avatar, Button, Spin } from 'antd'
import React from 'react'
import {isEmpty} from 'cssobj-helper'
import { connect } from 'react-redux'
import {getList} from './main.actions'

class Main extends React.Component {
  state = {
    loading: false,
    loadingMore: false,
    showLoadingMore: true,
  }

  getList(){
    this.props.getList().then(()=>{
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
        {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
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
        renderItem={item => (
          <List.Item actions={[<a>编辑</a>, <a>删除</a>]}>
            <List.Item.Meta
              avatar={<Avatar size={16} src={item.favicon||''} />}
              title={<a href={item.url} target="_blank">{item.url}</a>}
              description={item.title}
            />
            <div>{item.desc}</div>
          </List.Item>
        )}
      />
      )
    }</main>
  }
}

export default connect(
  ({list}) => ({list}),
  {
    getList: getList({resize:true})
  }
)(Main)


