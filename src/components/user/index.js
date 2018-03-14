import React from 'react'
import { connect } from 'react-redux'
import {getList, USER_ACTION} from './actions'

class User extends React.Component {
  constructor(props, context){
    super(props, context)
  }
  render(){
    const {props} = this
    const {list} = props
    console.log(list)
    return <div onClick={props.getList}>{list && list.total || 'osdifjo'}</div>
  }
}

export default connect(
  ({list}) => ({list}),
  {
    getList: getList()
  }
)(User)


