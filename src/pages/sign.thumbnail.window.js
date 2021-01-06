import React, { Component } from 'react'
import {
  Button,
} from 'antd'
import {
  ArrowLeftOutlined,
} from '@ant-design/icons'
export default class ThumbnailWindow extends Component {

  constructor (props) {
    super(props)
    this.state = {
      token: window.demoConfig.token,
      fileArr: window.demoConfig.fileArr,
      //
      verifyVisible: false, // 显示验签
      thumbnailVisible: false // 显示缩略图
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
      onRenderEnd: () => {
        this.ctx = ctx
      }
    })
  }

  componentWillUnmount () {
    this.ctx && this.ctx.Destroy()
  }

  thumbnail () {
    if (this.state.thumbnailVisible) {
      this.ctx && this.ctx.FireThumbnail()
      this.setState({ thumbnailVisible: false })
    } else {
      this.ctx && this.ctx.OutfireThumbnail()
      this.setState({ thumbnailVisible: true })
    }
  }

  verify () {
    if (this.state.verifyVisible) {
      this.ctx && this.ctx.FireVerify()
      this.setState({ verifyVisible: false })
    } else {
      this.ctx && this.ctx.OutfireVerify()
      this.setState({ verifyVisible: true })
    }
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
            <Button type="primary" onClick={() => this.thumbnail()} style={{ marginRight: '10px' }}>缩略图</Button>
            <Button type="primary" onClick={() => this.verify()}>验签</Button>
          </div>
          <div></div>
        </div>
        <div className="render-body">
          <div className="render-control"></div>
          <div id="ctx" className="render-ctx"></div>
        </div>
        {/* end */}
      </div>
    )
  }
}