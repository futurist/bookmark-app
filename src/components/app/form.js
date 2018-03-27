import { Input, Icon, Tag, Modal } from 'antd'
import { arrayUnique, ensureHTTP, moveCaretAtEnd, fetchURLInfo } from '../../utils'
import mapValue from 'map-value'
import api from '../../api'
import React from 'react'

export default function wrapModal () {
  return class ModalWrap extends React.Component {
    state = {}

    componentWillReceiveProps (props){
      const {editID, list} = props
      const row = list && list.data[editID]
      this.setState(mapValue(
        {
          id: '',
          title:'',
          url:'',
          desc:'',
          tagInput: '',
          isLike: false
        },
        row && {
          id: v=> row,
          tags: v=>({tagInput: row.tags.join(',')})
        }
      ))
      // console.log(this.state)
    }

  handleOk = (e) => {
    console.log(this.state)
    this.setState({
      confirmLoading: true,
    })
    const {state} = this
    const method = state.id ? 'update' : 'post'
    const url = '/bookmark/'+(state.id||'')
    api[method](
      url,
      mapValue(this.state, {
        tagInput: v => (v && { tags: v.split(/\s*,\s*/) })
      }))
      .then(() => {
        this.props.close(true)
      })
      .catch(err => {
        console.log('error post', err)
      })
  }

  handleCancel = (e) => {
    console.log(e)
    this.props.close()
  }

  validModal = ()=>{
    return !this.state.confirmLoading && this.visible
  }

  render() {
    this.visible = this.props.editID!=null

    return <Modal
      style={{zIndex: 9e9}}
      title="Add new bookmark"
      visible={this.visible}
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
          let {target} = e
          let { value } = target
          let url = ensureHTTP(value)
          this.setState({ url })
          target.value = url
          if(url!=value){
            target.blur()
            moveCaretAtEnd(e)
            setTimeout(()=>{
              this.domUrl.focus()
            })
          }
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

