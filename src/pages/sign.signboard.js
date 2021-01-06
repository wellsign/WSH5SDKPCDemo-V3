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
import TheSignboardUI from '../components/TheSignboardUI.js'
export default class SignSignboard extends Component {

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
      customSignboardUI: true,
      onRenderEnd: () => {
        this.ctx = ctx
      },
      onSignboardStart : control => {
        this.control = control
      }
    })
  }

  componentWillUnmount () {
    this.ctx && this.ctx.Destroy()
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

  signboard () {
    this.setState({ visible: true })
    this.ctx && this.ctx.FireSignboard()
  }

  back () {
    this.props.history.goBack()
  }

  render () {
    return (
      <div className="render">
        <div className="render-header">
          <div>
            <Button type="danger" onClick={() => this.back()}><ArrowLeftOutlined/>返回</Button>
          </div>
          <div>
            <Button type="primary" onClick={() => this.signboard()}>签字板</Button>
          </div>
          <div>
            <Button onClick={() => this.save()}><SaveOutlined/>保存</Button>
          </div>
        </div>
        <div className="render-body">
          <div className="render-control"></div>
          <div id="ctx" className="render-ctx"></div>
        </div>
        {/*  */}
        { this.state.visible ? <TheSignboardUI
          onCancel={() => {
            this.control && this.control.fireCancel()
            this.setState({ visible: false })
            this.control = undefined
          }}
          onOk={() => {
            this.control && this.control.fireOk()
            this.setState({ visible: false })
            this.control = undefined
          }}
          onClear={() => {
            this.control && this.control.fireClear()
          }}
          onEraser={eraserState => {
            if (eraserState === true) {
              this.control && this.control.fireEraser()
            } else {
              this.control && this.control.fireStroke()
            }
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
      </div>
    )
  }
}