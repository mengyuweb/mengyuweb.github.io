import{v as t}from"./index-5de0d8c7.js";const a=t("useStore",{state:()=>({user:{account:"MENG"},count:0,mapAdcodeUserData:{},mapBreadcrumbData:{},mapBreadcrumbHierarchy:""}),getters:{double:e=>e.count*2},actions:{increment(){this.count++},setUser(e){this.user=e},setAdcode(e){this.mapAdcodeUserData=e,e.adcode&&(this.mapBreadcrumbHierarchy=e.level,this.mapBreadcrumbData[e.level]=e)}}});export{a as u};