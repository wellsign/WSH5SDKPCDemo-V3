import React from 'react'
import {
  Button,
  Menu,
  Dropdown,
} from 'antd'
export default class TheWriteUI extends React.Component {

  constructor (props) {
    super (props)
    this.state = {
      colorArr: ['#ff0000', '#ff9100', '#eeff00', '#00a0ff'],
      colorNameArr: ['红', '橙', '黄', '蓝'],
      sizeArr: [1, 2, 3, 4, 5, 6, 7, 8],
      color: '#ff9100',
      size: 5,
      state: 'stroke' // stroke 书写 move 移动 earser 擦除
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
    if (this.state.state !== 'eraser') {
      this.setState({ state: 'eraser' })
      this.props.onEraser && this.props.onEraser()
    } else {
      this.setState({ state: 'stroke' })
      this.props.onStroke && this.props.onStroke()
    }
  }

  move () {
    if (this.state.state !== 'move') {
      this.setState({ state: 'move' })
      this.props.onMove && this.props.onMove()
    } else {
      this.setState({ state: 'stroke' })
      this.props.onStroke && this.props.onStroke()
    }
  }

  clear () {
    this.props.onClear && this.props.onClear()
  }

  ok () {
    this.props.onOk && this.props.onOk()
  }

  render () {
    return (
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '50px', background: '#eaeaea' }}>
        <div style={{ width: 'calc(100% - 800px)', marginLeft: '400px', height: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Dropdown overlay={<Menu>{this.state.sizeArr.map(i => (<Menu.Item key={i} onClick={() => this.size(i)}>{i}</Menu.Item>))}</Menu>}>
            <Button>粗细：{ this.state.size }</Button>
          </Dropdown>
          <Dropdown overlay={<Menu>{this.state.colorArr.map((i, idx) => (<Menu.Item key={i} onClick={() => this.color(i)}>{ this.state.colorNameArr[idx] }</Menu.Item>))}</Menu>}>
            <Button onClick={() => this.color()} style={{ color: this.state.color }}>颜色</Button>
          </Dropdown>
          <Button onClick={() => this.eraser()} type={ this.state.state === 'eraser' ? 'primary' : 'default' }>擦除:{this.state.state === 'eraser' ? '开' : '关'}</Button>
          <Button onClick={() => this.clear()}>清除</Button>
          <Button onClick={() => this.move()}>移动</Button>
          <Button onClick={() => this.ok()}>确定</Button>
        </div>
      </div>
    )
  }
}