import {connect} from 'react-redux'
import {addFilter} from './filter.action'
import React from 'react'
import { Input, Icon } from 'antd'
import {cssLayout} from '../../css' // eslint-disable-line no-unused-vars


class Header extends React.Component{
  state={}
  render(){
    const {filter={}} = this.props
    return cssLayout.mapClass(<header>
      <h3>{filter.like ? '收藏' : '全部'}</h3>
      <Input
        ref={el=>this.domKeyword=el}
        className="searchInput"
        placeholder="Enter keyword"
        prefix={<Icon type="search"
          style={{color: 'rgba(255,255,255,.6)'}}
          onClick={
            e=>{
              this.props.addFilter({keyword: this.state.keyword})
              e.target.blur()
            }
          }
        />}
        suffix={
          this.state.keyword && <Icon type="close-circle" style={{color:'white'}} onClick={
            e => {
              this.setState({ keyword: '' })
              this.domKeyword.focus()
              this.props.addFilter({keyword: ''})
            }
          } />
        }
        value={this.state.keyword||''}
        onChange={e=>this.setState({keyword: e.target.value})}
        onPressEnter={
        e=>{
          this.props.addFilter({keyword: this.state.keyword})
          e.target.blur()
        }
      } style={{maxWidth:'15rem'}} />
    </header>
  )}
}

export default connect(
  state=>state,
  {
    addFilter: addFilter()
  }
)(Header)

