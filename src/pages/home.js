import React, { Component } from 'react'
import {
  List,
  Card,
  Divider
} from 'antd'
export default class Home extends Component {

  constructor (props) {
    super(props)
    this.state = {
      routerArr: [
        {
          name: '标准功能',
          pathArr: [
            { path: '/sign/standard', title: '标准签字界面' },
            
          ]
        },
        {
          name: '签字板',
          pathArr: [
            { path: '/sign/signboard', title: '自定义签字板UI' },
          ]
        },
        {
          name: '圈批',
          pathArr: [
            { path: '/sign/write', title: '自定义圈批UI' }
          ]
        },
        {
          name: '签名模板+扫码签字',
          pathArr: [
            { path: '/sign/signtemp/window', title: '签名模板+扫码签字（可拖动窗口）' },
            { path: '/sign/signtemp/node', title: '签名模板+扫码签字（指定节点）' }
          ]
        },
        {
          name: '缩略图+验签',
          pathArr: [
            { path: '/sign/thumbnail/window', title: '缩略图+验签（可拖动窗口）' },
            { path: '/sign/thumbnail/node', title: '缩略图+验签（指定节点）' }
          ]
        }
      ]
    }
  }

  RouterTo (path) {
    this.props.history.push(path)
  }

  render () {
    return <div style={{ width: '100%', height: '120%',  background: '#F0F2F5' }}>
      <div style={{ width: '1000px', margin: '0 auto' }}>
        <h2 style={{ padding: '20px 0' }}>好签H5SDK PC端签字示例</h2>
        {
          this.state.routerArr.map((i, idx) => (
            <div key={idx}>
              <Divider>{ i.name }</Divider>
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={i.pathArr}
                renderItem={item => (
                  <List.Item>
                    <Card bodyStyle={{ cursor: 'pointer' }} onClick={() => this.RouterTo(item.path)}>{ item.title }</Card>
                  </List.Item>
                )}>
              </List>
            </div>
          ))
        }
        {/* end */}
      </div>
      {/* end */}
    </div>
  }
}