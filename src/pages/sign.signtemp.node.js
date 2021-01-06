import React from 'react'
import {
  Button,
  message,
  Modal
} from 'antd'
import {
  ArrowLeftOutlined,
  SaveOutlined,
} from '@ant-design/icons'
export default class SigntempNode extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      token: window.demoConfig.token,
      fileArr: window.demoConfig.fileArr,
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
      signtempNode: '#signtemp',
      scansignNode: '#scansign',
      onRenderEnd: () => {
        this.ctx = ctx
      }
    })
  }

  componentWillUnmount () {
    this.ctx && this.ctx.Destroy()
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
    const controlBtnCSS = { padding: '10px 14px' }
    return (
      <div className="render">
        <div className="render-header">
          <div>
            <Button type="danger" onClick={() => this.back()}><ArrowLeftOutlined/>返回</Button>
          </div>
          <div></div>
          <div>
            <Button onClick={() => this.save()}><SaveOutlined/>保存</Button>
          </div>
        </div>
        <div className="render-body">
          <div className="render-control">
            <div style={controlBtnCSS}><i className="iconfont iconsign"></i>签字模板</div>
            <div id="signtemp"></div>
            <div style={controlBtnCSS}><i className="iconfont iconqrcode"></i>扫码签字</div>
            <div id="scansign"></div>
          </div>
          <div id="ctx" className="render-ctx"></div>
        </div>
        {/* end */}
      </div>
    )
  }
}