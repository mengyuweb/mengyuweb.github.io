import{g as r,a as o}from"./currency-1843da70.js";const c=e=>{console.log(e);const t=45;return e=="province"?300:e=="city"?1e3:e=="district"?4e3:t},g=e=>{e.screenSpacePanning=!1,e.enableDamping=!0,e.maxPolarAngle=1.3},p=(e,t,i)=>{window.onresize=function(){const s=r(),n=o();t.setSize(s,n),i.setSize(s,n),e.aspect=s/n,e.updateProjectionMatrix()}};export{g as c,p as r,c as s};