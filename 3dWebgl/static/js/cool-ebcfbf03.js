import{S as mA,P as gA,C as cA,V as w,B as dA,v as uA,z as IA,U as wA,aU as E,M as m,d as l,ak as h,aV as O,aW as T,b,c as C,H as MA,h as BA,aX as SA,T as QA,q as EA}from"./three.module-96598850.js";import{g as F}from"./index-9e2476f3.js";import{O as CA}from"./OrbitControls-104f536d.js";import{r as y}from"./webGLRenderer-38a6fef0.js";import{d as yA,k as R,l as fA,o as f,b as J,i as x,u as k,y as j,t as JA,F as kA,q as xA,s as GA}from"./index-5de0d8c7.js";import{_ as KA}from"./_plugin-vue_export-helper-c27b6911.js";import"./currency-1843da70.js";const PA="data:image/gif;base64,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",DA=g=>(xA("data-v-705bab69"),g=g(),GA(),g),HA={key:0,class:"loading"},_A={key:1,class:"progress"},vA=DA(()=>x("img",{src:PA,alt:""},null,-1)),OA=yA({__name:"cool",setup(g){let G=R(null),c=R(0);const Y=(A,o,r)=>{let t=o*Math.PI/180;const n=r*Math.PI/180;t=-t;const M=A*Math.cos(n)*Math.cos(t),B=A*Math.sin(n),S=A*Math.cos(n)*Math.sin(t);return new w(M,B,S)},a=(A="",o=!0)=>{const r="/src/assets/img/theEarth/texture/"+A,t=new QA().load(r);return o&&(t.colorSpace=EA),t};return fA(()=>{let A=new mA,o=new gA(45,window.innerWidth/window.innerHeight,.1,1e5);o.position.set(0,50,300),G.value.appendChild(y.domElement);let r=new CA(o,y.domElement);r.autoRotate=!0,A.background=new cA(197393);const t=[];for(let i=0;i<500;i++){const e=new w;e.x=800*Math.random()-400,e.y=800*Math.random()-400,e.z=800*Math.random()-400,t.push(e.x,e.y,e.z)}let n=new dA;n.setAttribute("position",new uA(new Float32Array(t),3));const M=a("stars.png",!1),B=new IA({size:2,sizeAttenuation:!0,color:5076687,transparent:!0,opacity:1,map:M});let S=new wA(n,B);A.add(S);let q=new E(50,32,32),W=a("map.jpg"),L=new m({map:W}),U=new l(q,L);A.add(U);let K=a("earth.jpg"),Z=new E(53,32,32),z=new m({map:K,alphaMap:K,blending:h,transparent:!0}),V=new l(Z,z);A.add(V);let N=a("glow.png"),X=new O({map:N,color:5076687,transparent:!0,depthWrite:!1,depthTest:!1,blending:h}),P=new T(X);P.scale.set(155,155,0),A.add(P);let $=a("innerGlow.png"),AA=new O({map:$,color:5076687,transparent:!0,depthWrite:!1,depthTest:!1,blending:h}),D=new T(AA);D.scale.set(128,128,0),A.add(D),new w(1,1,1);for(let i=0;i<30;i++){let e=a("light_column.png"),Q=new b(3,20),nA=new m({color:16777215,map:e,alphaMap:e,transparent:!0,blending:h,side:C,depthWrite:!1}),s=new l(Q,nA);s.add(s.clone().rotateY(Math.PI/2));let iA=new b(6,6),sA=a("label.png"),lA=new m({color:16777215,map:sA,transparent:!0,blending:h,depthWrite:!1,side:C}),u=new l(iA,lA);u.rotation.x=-Math.PI/2,u.position.set(0,-7,0),s.add(u),F.to(u.scale,{duration:1+Math.random()*.5,x:2,y:2,z:2,repeat:-1,delay:Math.random()*.5,yoyo:!0,ease:"power2.inOut"});let hA=Math.random()*180-90,pA=Math.random()*360-180,I=Y(60,pA,hA);s.position.set(I.x,I.y,I.z),s.quaternion.setFromUnitVectors(new w(0,1,0),I.clone().normalize()),A.add(s)}let H=a("moon.jpg"),eA=new MA({map:H,emissive:16777215,emissiveMap:H}),tA=new E(5,32,32),p=new l(tA,eA);p.position.set(150,0,0),A.add(p);let aA=a("moon_ring.png"),oA=new m({map:aA,transparent:!0,blending:h,side:C,depthWrite:!1,opacity:.5}),rA=new BA(145,155,64),_=new l(rA,oA);_.rotation.x=-Math.PI/2,A.add(_);let d={value:0};F.to(d,{value:1,duration:10,repeat:-1,ease:"linear",onUpdate:()=>{p.position.x=150*Math.cos(d.value*Math.PI*2),p.position.z=150*Math.sin(d.value*Math.PI*2),p.rotation.y=d.value*Math.PI*8}});function v(){r.update(),requestAnimationFrame(v),y.render(A,o)}v(),SA.onProgress=function(i,e,Q){c.value=new Number(e/Q*100).toFixed(2)}}),(A,o)=>(f(),J(kA,null,[x("div",{class:"canvas-container",ref_key:"screenDom",ref:G},null,512),k(c)!=100?(f(),J("div",HA)):j("",!0),k(c)!=100?(f(),J("div",_A,[vA,x("span",null,"地球加载中："+JA(k(c))+"%",1)])):j("",!0)],64))}});const WA=KA(OA,[["__scopeId","data-v-705bab69"]]);export{WA as default};