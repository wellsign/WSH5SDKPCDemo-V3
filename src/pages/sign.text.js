import React, { Component } from 'react'
import {
  Button
} from 'antd'
import {
  ArrowLeftOutlined
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
      onRenderEnd: () => {
        this.ctx = ctx
      },
      onTextEdit: (textInfo, callback) => {
        const { text } = textInfo
        callback(text + '德玛西亚', '#00ffff')
      },
      onTimestempEdit: (text, callback) => {
        callback('select', 'YYYY-MM-DD hh:mm:ss', 20, false)
      }
    })
  }

  componentWillUnmount () {
    this.ctx && this.ctx.Destroy()
  }

  back () {
    this.props.history.goBack()
  }

  insertText () {
    // this.ctx.InsertText('一二三四五六七八九十一二三四五六七八九十一二三四五', '#00a0ff', 20, 200, false)
    this.ctx.InsertText('一二三四五六七八九十一二三四五六七八九十一二三四五', '#00a0ff', 20, 200, false)
  }

  singtemp () {
    this.ctx.FireSigntemp({ top: 100, left: 0 })
  }

  render () {
    return (
      <div className="render">
        <div className="render-header">
          <div>
            <Button type="danger" onClick={() => this.back()}><ArrowLeftOutlined/>返回</Button>
          </div>
          <div>
            <Button onClick={() => this.insertText()}>插入文本</Button>
            <Button onClick={() => this.singtemp()}>签名模板</Button>
          </div>
          <div></div>
        </div>
        <div className="render-body">
          <div id="control" className="render-control"></div>
          <div id="ctx" className="render-ctx"></div>
        </div>
        {/* end */}
      </div>
    )
  }
}