import React, { Component } from 'react'
import {
  Button,
  message,
  Modal
} from 'antd'
import {
  ArrowLeftOutlined,
  SaveOutlined
} from '@ant-design/icons'
import TheWriteUI from '../components/TheWriteUI.js'
export default class SignWrite extends Component {

  constructor (props) {
    super(props)
    this.state = {
      token: window.demoConfig.token,
      fileArr: window.demoConfig.fileArr,
      visible: false
    }
  }

  ctx

  control

  componentDidMount () {
    const ctx = new window.WSContext('#ctx', {
      token: this.state.token,
      defaultBaseURL: 'http://106.14.242.137:8088/sdk',
      fileArr: this.state.fileArr,
      callerId: 'wellsign',
      callerName: '好签',
      callerDesc: '好签公司',
      contextWidth: 900,
      customWriteUI: true,
      onRenderEnd: () => {
        this.ctx = ctx
      },
      onWriteStart: control => {
        this.control = control
        this.setState({ visible: true })
      },
      onWriteEnd: () => {
        this.control = undefined
        this.setState({ visible: false })
      }
    })
  }

  componentWillUnmount () {
    this.ctx && this.ctx.Destroy()
  }

  write () {
    if (this.state.visible) {
      this.ctx && this.ctx.OutfireWrite()
    } else {
      this.ctx && this.ctx.FireWrite()
    }
  }

  back () {
    this.props.history.goBack()
  }

  save () {
    if (!this.ctx) return
    message.loading('保存中')
    this.ctx.Save(res => {
      message.destroy()
      Modal.info({
        title: '保存结果',
        content: JSON.stringify(res)
      })
    })
  }

  render () {
    return (
      <div className="render">
        <div className="render-header">
          <div>
            <Button type="danger" onClick={() => this.back()}><ArrowLeftOutlined/>返回</Button>
          </div>
          <div>
            <Button type="primary" onClick={() => this.write()}>圈批</Button>
          </div>
          <div>
            <Button onClick={() => this.save()}><SaveOutlined/>保存</Button>
          </div>
        </div>
        <div className="render-body">
          <div class="render-control"></div>
          <div id="ctx" className="render-ctx"></div>
        </div>
        {/* 圈批的UI */}
        {
          this.state.visible ? <TheWriteUI
            onOk={() => {
              this.control && this.control.fireOk()
              this.setState({ visible: false })
              this.control = undefined
            }}
            onClear={() => {
              this.control && this.control.fireClear()
            }}
            onEraser={() => {
              this.control && this.control.fireEraser()
            }}
            onMove={() => {
              this.control && this.control.fireMove()
            }}
            onStroke={() => {
              this.control && this.control.fireStroke()
            }}
            onColor={color => {
              this.control && this.control.setLineColor(color)
            }}
            onSize={size => {
              this.control && this.control.setLineSize(size)
            }}
            onInit={(color, size) => {
              this.control && this.control.setLineSize(size)
              this.control && this.control.setLineColor(color)
            }}/> : undefined
        }
        {/* end */}
      </div>
    )
  }
}