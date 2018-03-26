import {connect} from 'react-redux'
import {addFilter} from './filter.action'
import React from 'react'
import { Input } from 'antd'
import {cssLayout} from '../../css' // eslint-disable-line no-unused-vars


class Header extends React.Component{
  render(){
    return <header>
      <h3>All Bookmarks</h3>
      <Input.Search placeholder="Enter keyword" enterButton onSearch={
        val=>{
          this.props.addFilter({keyword: val})
        }
      } style={{maxWidth:'15rem'}} />
    </header>
  }
}

export default connect(
  ({filter}) => ({filter}),
  {
    addFilter: addFilter()
  }
)(Header)

