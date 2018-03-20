import React from 'react'
import { connect } from 'react-redux'
import {getList} from './actions'

class User extends React.Component {
  render(){
    const {props} = this
    const {list} = props
    console.log(list)
    return <div onClick={props.getList}>{list ? list.total : 'osdifjo'}</div>
  }
}

export default connect(
  ({list}) => ({list}),
  {
    getList: getList()
  }
)(User)


