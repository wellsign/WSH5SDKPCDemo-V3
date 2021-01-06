import ReactDOM from 'react-dom'
/* 全局引入 antd 的样式 */
import 'antd/dist/antd.css'
/* 引入css样式 */
import './styles/app.css'
/* 路由 */
import Router from './scripts/router.js'
/* 渲染 */
ReactDOM.render(
  Router,
  document.getElementById('root')
)
