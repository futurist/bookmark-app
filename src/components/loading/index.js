import React from 'react'


class Loading extends React.Component{
  render(){
    const {props} = this
    const {error, timedOut, pastDelay} = props
    if(pastDelay) return <div>loading...</div>
    if(error) return <div>ERROR!</div>
    if(timedOut) return <div>TIMEOUT!</div>
    return null
  }
}

export default Loading
