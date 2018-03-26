import { Menu, Icon, Card, } from 'antd'

import React from 'react'
import {cssLayout} from '../../css' // eslint-disable-line no-unused-vars

export default class Nav extends React.Component {

  handleClick = e => {
    console.log(e)
  }

  render() {
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


      <Card title="分类" bordered={false} extra={null}>
        <p>分类一</p>
        <p>分类一</p>
        <p>分类一</p>
      </Card>

    </nav>
  }
}

