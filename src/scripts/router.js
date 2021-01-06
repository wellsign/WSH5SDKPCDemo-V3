/* 定义页面路由 */
import Loadable from 'react-loadable'
import { Route, HashRouter } from 'react-router-dom'

import pLoading from '../components/loading'

export default <HashRouter>
  <Route path="/" exact component={ Loadable({ loader: () => import('../pages/home.js'), loading: pLoading }) }></Route>
  {/* 标准签字 */}
  <Route path="/sign/standard" exact component={ Loadable({ loader: () => import('../pages/sign.standard.js'), loading: pLoading }) }></Route>
  {/* 自定义-签字板 */}
  <Route path="/sign/signboard" exact component={ Loadable({ loader: () => import('../pages/sign.signboard.js'), loading: pLoading }) }></Route>
  {/* 自定义-圈批 */}
  <Route path="/sign/write" exact component={ Loadable({ loader: () => import('../pages/sign.write.js'), loading: pLoading }) }></Route>
  {/* 签名模板+扫码签字（可拖动窗口） */}
  <Route path="/sign/signtemp/window" exact component={ Loadable({ loader: () => import('../pages/sign.signtemp.window.js'), loading: pLoading }) }></Route>
  {/* 签名模板+扫码签字（指定节点）） */}
  <Route path="/sign/signtemp/node" exact component={ Loadable({ loader: () => import('../pages/sign.signtemp.node.js'), loading: pLoading }) }></Route>
  {/* 缩略图+验签（可拖动窗口） */}
  <Route path="/sign/thumbnail/window" exact component={ Loadable({ loader: () => import('../pages/sign.thumbnail.window.js'), loading: pLoading }) }></Route>
  {/* 缩略图+验签（指定节点）） */}
  <Route path="/sign/thumbnail/node" exact component={ Loadable({ loader: () => import('../pages/sign.thumbnail.node.js'), loading: pLoading }) }></Route>
  {/* end */}
</HashRouter>