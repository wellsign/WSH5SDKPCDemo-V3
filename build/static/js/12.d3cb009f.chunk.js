(this["webpackJsonpwsh5sdkpcdemo-v3"]=this["webpackJsonpwsh5sdkpcdemo-v3"]||[]).push([[12],{230:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return b}));var c=n(3),s=n(15),i=n(16),r=n(18),o=n(17),a=n(0),d=n.n(a),l=n(223),j=n(236),h=n(96),u=n(239),x=n(240),b=function(e){Object(r.a)(n,e);var t=Object(o.a)(n);function n(e){var c;return Object(s.a)(this,n),(c=t.call(this,e)).state={token:window.demoConfig.token,fileArr:window.demoConfig.fileArr},c}return Object(i.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=new window.WSContext("#ctx",{token:this.state.token,defaultBaseURL:"http://106.14.242.137:8088/sdk",fileArr:this.state.fileArr,callerId:"wellsign",callerName:"\u597d\u7b7e",callerDesc:"\u597d\u7b7e\u516c\u53f8",contextWidth:900,signtempNode:"#signtemp",scansignNode:"#scansign",onRenderEnd:function(){e.ctx=t}})}},{key:"componentWillUnmount",value:function(){this.ctx&&this.ctx.Destroy()}},{key:"back",value:function(){this.props.history.goBack()}},{key:"save",value:function(){this.ctx&&(l.b.loading("\u4fdd\u5b58\u4e2d"),this.ctx.Save((function(e){l.b.destroy(),j.a.info({title:"\u4fdd\u5b58\u7ed3\u679c",content:JSON.stringify(e)})})))}},{key:"render",value:function(){var e=this,t={padding:"10px 14px"};return Object(c.jsxs)("div",{className:"render",children:[Object(c.jsxs)("div",{className:"render-header",children:[Object(c.jsx)("div",{children:Object(c.jsxs)(h.a,{type:"danger",onClick:function(){return e.back()},children:[Object(c.jsx)(u.a,{}),"\u8fd4\u56de"]})}),Object(c.jsx)("div",{}),Object(c.jsx)("div",{children:Object(c.jsxs)(h.a,{onClick:function(){return e.save()},children:[Object(c.jsx)(x.a,{}),"\u4fdd\u5b58"]})})]}),Object(c.jsxs)("div",{className:"render-body",children:[Object(c.jsxs)("div",{className:"render-control",children:[Object(c.jsxs)("div",{style:t,children:[Object(c.jsx)("i",{className:"iconfont iconsign"}),"\u7b7e\u5b57\u6a21\u677f"]}),Object(c.jsx)("div",{id:"signtemp"}),Object(c.jsxs)("div",{style:t,children:[Object(c.jsx)("i",{className:"iconfont iconqrcode"}),"\u626b\u7801\u7b7e\u5b57"]}),Object(c.jsx)("div",{id:"scansign"})]}),Object(c.jsx)("div",{id:"ctx",className:"render-ctx"})]})]})}}]),n}(d.a.Component)}}]);