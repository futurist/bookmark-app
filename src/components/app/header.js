import {connect} from 'react-redux'
import {addFilter} from './filter.action'
import React from 'react'
import { Input } from 'antd'
import {cssLayout} from '../../css' // eslint-disable-line no-unused-vars


class Header extends React.Component{
  render(){
    const {like} = this.props
    console.log(12341234,this.props)
    return <header>
      <h3>{like ? '收藏' : '全部'}</h3>
      <Input.Search placeholder="Enter keyword" enterButton onSearch={
        val=>{
          this.props.addFilter({keyword: val})
        }
      } style={{maxWidth:'15rem'}} />
    </header>
  }
}

export default connect(
  (state) => {
    console.log(state.filter, 34234)
    return (state.filter)
  },
  {
    addFilter: addFilter()
  }
)(Header)

