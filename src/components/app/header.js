import {connect} from 'react-redux'
import {addFilter} from './filter.action'
import React from 'react'
import { Input } from 'antd'
import {cssLayout} from '../../css' // eslint-disable-line no-unused-vars


class Header extends React.Component{
  render(){
    const {filter={}} = this.props
    return <header>
      <h3>{filter.like ? '收藏' : '全部'}</h3>
      <Input.Search placeholder="Enter keyword" enterButton onSearch={
        val=>{
          this.props.addFilter({keyword: val})
        }
      } style={{maxWidth:'15rem'}} />
    </header>
  }
}

export default connect(
  state=>state,
  {
    addFilter: addFilter()
  }
)(Header)

