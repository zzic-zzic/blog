(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{242:function(e,t,i){"use strict";var n=function(){var e=0,t=document.createElement("div");function i(e){return t.appendChild(e.dom),e}function s(i){for(var n=0;n<t.children.length;n++)t.children[n].style.display=n===i?"block":"none";e=i}t.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",t.addEventListener("click",(function(i){i.preventDefault(),s(++e%t.children.length)}),!1);var a=(performance||Date).now(),r=a,o=0,d=i(new n.Panel("FPS","#0ff","#002")),h=i(new n.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var l=i(new n.Panel("MB","#f08","#201"));return s(0),{REVISION:16,dom:t,addPanel:i,showPanel:s,begin:function(){a=(performance||Date).now()},end:function(){o++;var e=(performance||Date).now();if(h.update(e-a,200),e>=r+1e3&&(d.update(1e3*o/(e-r),100),r=e,o=0,l)){var t=performance.memory;l.update(t.usedJSHeapSize/1048576,t.jsHeapSizeLimit/1048576)}return e},update:function(){a=this.end()},domElement:t,setMode:s}};n.Panel=function(e,t,i){var n=1/0,s=0,a=Math.round,r=a(window.devicePixelRatio||1),o=80*r,d=48*r,h=3*r,l=2*r,c=3*r,p=15*r,u=74*r,f=30*r,m=document.createElement("canvas");m.width=o,m.height=d,m.style.cssText="width:80px;height:48px";var w=m.getContext("2d");return w.font="bold "+9*r+"px Helvetica,Arial,sans-serif",w.textBaseline="top",w.fillStyle=i,w.fillRect(0,0,o,d),w.fillStyle=t,w.fillText(e,h,l),w.fillRect(c,p,u,f),w.fillStyle=i,w.globalAlpha=.9,w.fillRect(c,p,u,f),{dom:m,update:function(d,g){n=Math.min(n,d),s=Math.max(s,d),w.fillStyle=i,w.globalAlpha=1,w.fillRect(0,0,o,p),w.fillStyle=t,w.fillText(a(d)+" "+e+" ("+a(n)+"-"+a(s)+")",h,l),w.drawImage(m,c+r,p,u-r,f,c,p,u-r,f),w.fillRect(c+u-r,p,r,f),w.fillStyle=i,w.globalAlpha=.9,w.fillRect(c+u-r,p,r,a((1-d/g)*f))}}},t.a=n},245:function(e,t,i){"use strict";i.d(t,"a",(function(){return r}));var n=i(241),s=i(244),a=i(242);class r{constructor(e){this.container=e,this.width=e.getBoundingClientRect().width,this.height=e.getBoundingClientRect().height,this.scene=new n.C,this.camera=new n.v(45,this.width/this.height,.1,1e3),this.camera.position.set(30,90,40),this.renderer=new n.P({antialias:!0}),this.renderer.shadowMap.enabled=!0,this.renderer.setClearColor(5683,.7),this.renderer.setSize(this.width,this.height),this.controller=new s.a(this.camera,this.renderer.domElement);let t=this;this.controller.addEventListener("change",(function(){t.renderFrame()})),this.stats=new a.a,this.stats.dom.style.position="absolute",this.stats.dom.style.bottom="0px",this.stats.dom.style.right="0px",this.stats.dom.style.top="",this.stats.dom.style.left="",this.container.appendChild(this.stats.dom);let i=new n.b(1e3);this.scene.add(i),this.container.appendChild(this.renderer.domElement),this.renderFrame(),window.addEventListener("resize",this.resizeWindow.bind(this)),this.step=0}renderFrame(){this.renderer.render(this.scene,this.camera),this.stats.update()}renderScene(){let e=this.cube,t=this.sphere;e&&t&&(e.rotation.x+=.02,e.rotation.y+=.02,e.rotation.z+=.02,this.step+=.04,t.position.x=20+10*Math.cos(this.step),this.renderFrame(),requestAnimationFrame(this.renderScene.bind(this)))}resizeWindow(){this.width=this.container.getBoundingClientRect().width,this.height=this.container.getBoundingClientRect().height,this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height)}addPlane(){let e=new n.x(60,20,1,1),t=new n.u({color:537692}),i=new n.s(e,t);i.name="plane",i.rotation.x=-.5*Math.PI,i.position.x=-20,i.receiveShadow=!0,this.scene.add(i)}addLight(){var e=new n.a("#ffffff");this.scene.add(e);const t=new n.G(16777215,1e3);t.position.set(-10,50,-10),t.castShadow=!0,this.scene.add(t)}addBasicObjects(){let e=new n.c(4,4,4),t=new n.u({color:16711680}),i=new n.s(e,t);i.castShadow=!0,i.position.x=-30,i.position.y=3,i.position.z=0,this.scene.add(i),this.cube=i;let s=new n.E(4,20,20),a=new n.u({color:"blue"}),r=new n.s(s,a);r.position.x=0,r.position.y=4,r.position.z=2,r.castShadow=!0,this.scene.add(r),this.sphere=r}async addGui(){const e=new((await i.e(2).then(i.bind(null,257))).GUI)({autoPlace:!1});this.container.appendChild(e.domElement),e.domElement.style.position="absolute",e.domElement.style.right="0px",e.domElement.style.top="0px",this.gui=e}addObject(e){this.scene.add(e),this.renderFrame()}}},293:function(e,t,i){},325:function(e,t,i){"use strict";i(293)},353:function(e,t,i){"use strict";i.r(t);var n=i(245),s=i(0),a={__name:"Ex03",setup(e){let t=null;return Object(s.b)(()=>{const e=document.getElementById("dom_chap01_ex03");e&&(t=new n.a(e),t.addPlane(),t.addBasicObjects(),t.addLight(),t.renderScene())}),{__sfc:!0,threeLayer:t}}},r=(i(325),i(15)),o=Object(r.a)(a,(function(){this._self._c,this._self._setupProxy;return this._m(0)}),[function(){var e=this._self._c;this._self._setupProxy;return e("div",{staticClass:"example"},[e("div",{staticStyle:{width:"100%",height:"100%"},attrs:{id:"dom_chap01_ex03"}})])}],!1,null,null,null);t.default=o.exports}}]);