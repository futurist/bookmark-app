import {connect} from 'react-redux'
import {addFilter} from './filter.action'
import { Menu, Icon, Card, } from 'antd'
import React from 'react'
import {cssLayout} from '../../css' // eslint-disable-line no-unused-vars

class Nav extends React.Component {

  handleClick = e => {
    console.log(e)
    this.props.addFilter({like: e.key==2})
  }

  render() {
    const {list={}, filter, fontMin=14, fontMax=50} = this.props
    let {tagsMin, tagsMax} = list
    tagsMax = Math.max(tagsMax, 10)
    return <nav>

      <Menu
        defaultSelectedKeys={['1']}
        mode="vertical"
        onClick={this.handleClick}>
        <Menu.Item key="1">
          <Icon type="pie-chart" />
          <span>全部</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="desktop" />
          <span>收藏</span>
        </Menu.Item>
      </Menu>


      <Card title="标签" bordered={false} extra={filter.tag
          ? <a onClick={e=>{
            this.props.addFilter({tag: ''})
          }}>清除</a>
          : null
        }>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>{
          Object.keys(list.tags||{}).map(tag=>{
            const val = list.tags[tag]
            return <a
              key={tag}
              style={{
                color: filter.tag==tag ? 'red' : '',
                marginRight: 10,
                fontSize: val <= tagsMin
                  ? fontMin
                  : (val / tagsMax) * (fontMax - fontMin) + fontMin
              }}
              onClick={e=>{this.props.addFilter({tag})}}
            >
              {tag}
            </a>
          })
        }</div>
      </Card>

    </nav>
  }
}

export default connect(
  state=>state,
  {
    addFilter: addFilter(),
  }
)(Nav)
