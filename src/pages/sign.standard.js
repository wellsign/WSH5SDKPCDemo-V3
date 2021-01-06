import React, { Component } from 'react'
import {
  Button,
  Dropdown,
  Menu,
  Modal,
  message
} from 'antd'
import {
  ArrowLeftOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  SaveOutlined,
  AppstoreOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons'
export default class SignStandard extends Component {

  constructor (props) {
    super(props)
    this.state = {
      token: window.demoConfig.token,
      fileArr: window.demoConfig.fileArr,
      //
      verifyVisible: false, // 显示验签
      thumbnailVisible: true // 显示缩略图
    }
  }

  ctx

  componentDidMount () {
    const ctx = new window.WSContext('#ctx', {
      token: this.state.token,
      defaultBaseURL: 'http://106.14.242.137:8088/sdk',
      fileArr: this.state.fileArr,
      callerId: 'wellsign',
      callerName: '好签',
      callerDesc: '好签公司',
      contextWidth: 900,
      controlNode: '#control',
      thumbnailNode: '#thumbnail',
      verifyNode: '#verify',
      onRenderEnd: () => {
        this.ctx = ctx
      }
    })
    window.addEventListener('resize', this.windowResize)
  }

  componentWillUnmount () {
    this.ctx && this.ctx.Destroy()
    window.removeEventListener('resize', this.windowResize)
  }

  zoomOut () {
    this.ctx && this.ctx.Zoom(1)
  }

  zoomIn () {
    this.ctx && this.ctx.Zoom(4)
  }

  thumbnail () {
    this.ctx && this.setState({ thumbnailVisible: true, verifyVisible: false })
  }

  verify () {
    this.ctx && this.setState({ verifyVisible: true, thumbnailVisible: false })
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

  back () {
    this.props.history.goBack()
  }

  resizeTimer

  windowResize = () => {
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer)
      this.resizeTimer = undefined
    }
    setTimeout(() => {
      this.ctx && this.ctx.Resize()
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer)
        this.resizeTimer = undefined
      }
    }, 500)
  }

  render () {
    return (
      <div className="render">
        <div className="render-header">
          <div>
            <Button type="danger" onClick={() => this.back()}><ArrowLeftOutlined/>返回</Button>
          </div>
          <div>
            <Button type="link" onClick={() => this.zoomIn()}><ZoomInOutlined style={{ fontSize: '22px' }}/></Button>
            <Button type="link" onClick={() => this.zoomOut()}><ZoomOutOutlined style={{ fontSize: '22px' }}/></Button>
          </div>
          <div>
            <Dropdown.Button
              onClick={() => this.save()}
              trigger={['click']}
              overlay={(
                <Menu
                  style={{ width: '180px' }}
                  onClick={item => {
                    item.key === '1' && this.thumbnail()
                    item.key === '2' && this.verify()
                  }}>
                  <Menu.Item key="1"><AppstoreOutlined/>缩略图</Menu.Item>
                  <Menu.Item key="2"><SafetyCertificateOutlined/>验签</Menu.Item>
                </Menu>
              )}>
                <SaveOutlined/>保存
              </Dropdown.Button>
          </div>
        </div>
        <div className="render-body">
          <div id="control" className="render-control"></div>
          <div id="ctx" className="render-ctx"></div>
          <div id="thumbnail" className="render-right" style={{ display: this.state.thumbnailVisible ? 'block' : 'none' }}></div>
          <div id="verify" className="render-right" style={{ display: this.state.verifyVisible ? 'block' : 'none' }}></div>
        </div>
        {/* end */}
      </div>
    )
  }
}