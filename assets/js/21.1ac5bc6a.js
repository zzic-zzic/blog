(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{242:function(e,t,i){"use strict";var n=function(){var e=0,t=document.createElement("div");function i(e){return t.appendChild(e.dom),e}function s(i){for(var n=0;n<t.children.length;n++)t.children[n].style.display=n===i?"block":"none";e=i}t.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",t.addEventListener("click",(function(i){i.preventDefault(),s(++e%t.children.length)}),!1);var o=(performance||Date).now(),a=o,r=0,d=i(new n.Panel("FPS","#0ff","#002")),l=i(new n.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var h=i(new n.Panel("MB","#f08","#201"));return s(0),{REVISION:16,dom:t,addPanel:i,showPanel:s,begin:function(){o=(performance||Date).now()},end:function(){r++;var e=(performance||Date).now();if(l.update(e-o,200),e>=a+1e3&&(d.update(1e3*r/(e-a),100),a=e,r=0,h)){var t=performance.memory;h.update(t.usedJSHeapSize/1048576,t.jsHeapSizeLimit/1048576)}return e},update:function(){o=this.end()},domElement:t,setMode:s}};n.Panel=function(e,t,i){var n=1/0,s=0,o=Math.round,a=o(window.devicePixelRatio||1),r=80*a,d=48*a,l=3*a,h=2*a,c=3*a,p=15*a,u=74*a,f=30*a,w=document.createElement("canvas");w.width=r,w.height=d,w.style.cssText="width:80px;height:48px";var m=w.getContext("2d");return m.font="bold "+9*a+"px Helvetica,Arial,sans-serif",m.textBaseline="top",m.fillStyle=i,m.fillRect(0,0,r,d),m.fillStyle=t,m.fillText(e,l,h),m.fillRect(c,p,u,f),m.fillStyle=i,m.globalAlpha=.9,m.fillRect(c,p,u,f),{dom:w,update:function(d,x){n=Math.min(n,d),s=Math.max(s,d),m.fillStyle=i,m.globalAlpha=1,m.fillRect(0,0,r,p),m.fillStyle=t,m.fillText(o(d)+" "+e+" ("+o(n)+"-"+o(s)+")",l,h),m.drawImage(w,c+a,p,u-a,f,c,p,u-a,f),m.fillRect(c+u-a,p,a,f),m.fillStyle=i,m.globalAlpha=.9,m.fillRect(c+u-a,p,a,o((1-d/x)*f))}}},t.a=n},245:function(e,t,i){"use strict";i.d(t,"a",(function(){return a}));var n=i(241),s=i(244),o=i(242);class a{constructor(e){this.container=e,this.width=e.getBoundingClientRect().width,this.height=e.getBoundingClientRect().height,this.scene=new n.C,this.camera=new n.v(45,this.width/this.height,.1,1e3),this.camera.position.set(30,90,40),this.renderer=new n.P({antialias:!0}),this.renderer.shadowMap.enabled=!0,this.renderer.setClearColor(5683,.7),this.renderer.setSize(this.width,this.height),this.controller=new s.a(this.camera,this.renderer.domElement);let t=this;this.controller.addEventListener("change",(function(){t.renderFrame()})),this.stats=new o.a,this.stats.dom.style.position="absolute",this.stats.dom.style.bottom="0px",this.stats.dom.style.right="0px",this.stats.dom.style.top="",this.stats.dom.style.left="",this.container.appendChild(this.stats.dom);let i=new n.b(1e3);this.scene.add(i),this.container.appendChild(this.renderer.domElement),this.renderFrame(),window.addEventListener("resize",this.resizeWindow.bind(this)),this.step=0}renderFrame(){this.renderer.render(this.scene,this.camera),this.stats.update()}renderScene(){let e=this.cube,t=this.sphere;e&&t&&(e.rotation.x+=.02,e.rotation.y+=.02,e.rotation.z+=.02,this.step+=.04,t.position.x=20+10*Math.cos(this.step),this.renderFrame(),requestAnimationFrame(this.renderScene.bind(this)))}resizeWindow(){this.width=this.container.getBoundingClientRect().width,this.height=this.container.getBoundingClientRect().height,this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height)}addPlane(){let e=new n.x(60,20,1,1),t=new n.u({color:537692}),i=new n.s(e,t);i.name="plane",i.rotation.x=-.5*Math.PI,i.position.x=-20,i.receiveShadow=!0,this.scene.add(i)}addLight(){var e=new n.a("#ffffff");this.scene.add(e);const t=new n.G(16777215,1e3);t.position.set(-10,50,-10),t.castShadow=!0,this.scene.add(t)}addBasicObjects(){let e=new n.c(4,4,4),t=new n.u({color:16711680}),i=new n.s(e,t);i.castShadow=!0,i.position.x=-30,i.position.y=3,i.position.z=0,this.scene.add(i),this.cube=i;let s=new n.E(4,20,20),o=new n.u({color:"blue"}),a=new n.s(s,o);a.position.x=0,a.position.y=4,a.position.z=2,a.castShadow=!0,this.scene.add(a),this.sphere=a}async addGui(){const e=new((await i.e(2).then(i.bind(null,257))).GUI)({autoPlace:!1});this.container.appendChild(e.domElement),e.domElement.style.position="absolute",e.domElement.style.right="0px",e.domElement.style.top="0px",this.gui=e}addObject(e){this.scene.add(e),this.renderFrame()}}},291:function(e,t,i){},323:function(e,t,i){"use strict";i(291)},351:function(e,t,i){"use strict";i.r(t);var n=i(245),s=i(0),o=i(241),a={__name:"Ex01",setup:e=>(Object(s.b)(()=>{const e=document.getElementById("dom_chap01_ex01");if(!e)return;const t=new n.a(e);let i=new o.x(60,20,1,1),s=new o.t({color:13421772}),a=new o.s(i,s);a.rotation.x=-.5*Math.PI,a.position.x=15,t.scene.add(a);let r=new o.c(4,4,4),d=new o.t({color:16711680,wireframe:!0}),l=new o.s(r,d);l.position.x=-4,l.position.y=3,l.position.z=0,t.scene.add(l);let h=new o.E(4,20,20),c=new o.t({color:7829503,wireframe:!0}),p=new o.s(h,c);p.position.x=20,p.position.y=4,p.position.z=2,t.scene.add(p),t.renderFrame()}),{__sfc:!0})},r=(i(323),i(15)),d=Object(r.a)(a,(function(){this._self._c,this._self._setupProxy;return this._m(0)}),[function(){var e=this._self._c;this._self._setupProxy;return e("div",{staticClass:"example"},[e("div",{staticStyle:{width:"100%",height:"100%",position:"relative"},attrs:{id:"dom_chap01_ex01"}})])}],!1,null,null,null);t.default=d.exports}}]);