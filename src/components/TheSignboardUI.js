import React from 'react'
import {
  Button,
  Menu,
  Dropdown,
} from 'antd'
export default class TheSignboardUI extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      colorArr: ['#ff0000', '#ff9100', '#eeff00', '#00a0ff'],
      colorNameArr: ['红', '橙', '黄', '蓝'],
      sizeArr: [1, 2, 3, 4, 5, 6, 7, 8],
      color: '#ff9100',
      size: 5,
      eraserState: false
    }
  }

  componentDidMount () {
    this.props.onInit && this.props.onInit(this.state.color, this.state.size)
  }

  size (size) {
    this.setState({ size }, () => {
      this.props.onSize && this.props.onSize(this.state.size)
    })
  }

  color (color) {
    this.setState({ color }, () => {
      this.props.onColor && this.props.onColor(this.state.color)
    })
  }

  eraser () {
    const newEraserState = !this.state.eraserState
    this.setState({ eraserState: newEraserState })
    this.props.onEraser && this.props.onEraser(newEraserState)
  }

  clear () {
    this.props.onClear && this.props.onClear()
  }

  cancel () {
    this.props.onCancel && this.props.onCancel()
  }

  ok () {
    this.props.onOk && this.props.onOk()
  }

  render () {
    return (
      <div style={{ position: 'fixed', bottom: '0', left: '0', right: '0', padding: '8px 12px', display: 'flex', justifyContent: 'center', background: '#eaeaea', zIndex: '1000' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '600px' }}>
          <Dropdown overlay={<Menu>{this.state.sizeArr.map(i => (<Menu.Item key={i} onClick={() => this.size(i)}>{i}</Menu.Item>))}</Menu>}>
            <Button>粗细：{ this.state.size }</Button>
          </Dropdown>
          <Dropdown overlay={<Menu>{this.state.colorArr.map((i, idx) => (<Menu.Item key={i} onClick={() => this.color(i)}>{ this.state.colorNameArr[idx] }</Menu.Item>))}</Menu>}>
            <Button onClick={() => this.color()} style={{ color: this.state.color }}>颜色</Button>
          </Dropdown>
          <Button onClick={() => this.eraser()} type={ this.state.eraserState ? 'primary' : 'default' }>擦除:{this.state.eraserState ? '开' : '关'}</Button>
          <Button onClick={() => this.clear()}>清除</Button>
          <Button onClick={() => this.cancel()}>关闭</Button>
          <Button onClick={() => this.ok()}>确定</Button>
        </div>
      </div>
    )
  }
}