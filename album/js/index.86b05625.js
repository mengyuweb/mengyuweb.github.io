!function(t){"use strict";var e,a,i="",r=Math.PI,s=r/2,n="ontouchstart"in window,o=n?{down:"touchstart",move:"touchmove",up:"touchend",over:"touchstart",out:"touchend"}:{down:"mousedown",move:"mousemove",up:"mouseup",over:"mouseover",out:"mouseout"},h={backward:["bl","tl"],forward:["br","tr"],all:["tl","bl","tr","br","l","r"]},p=["single","double"],d=["ltr","rtl"],l={acceleration:!0,display:"double",duration:600,page:1,gradients:!0,turnCorners:"bl,br",when:null},g={cornerSize:150,whjjSize:50},c={init:function(r){var s;e="WebKitCSSMatrix"in window||"MozPerspective"in document.body.style,a=!(s=/AppleWebkit\/([0-9\.]+)/i.exec(navigator.userAgent))||parseFloat(s[1])>534.3,i=P();var h,p=0,d=this.data(),g=this.children();if(r=t.extend({width:this.width(),height:this.height(),direction:this.attr("dir")||this.css("direction")||"ltr"},l,r),d.opts=r,d.pageObjs={},d.pages={},d.pageWrap={},d.pageZoom={},d.pagePlace={},d.pageMv=[],d.zoom=1,d.totalPages=r.pages||0,d.eventHandlers={touchStart:t.proxy(c._touchStart,this),touchMove:t.proxy(c._touchMove,this),touchEnd:t.proxy(c._touchEnd,this),start:t.proxy(c._eventStart,this)},r.when)for(h in r.when)y(h,r.when)&&this.bind(h,r.when[h]);for(this.css({position:"relative",width:r.width,height:r.height}),this.turn("display",r.display),""!==r.direction&&this.turn("direction",r.direction),e&&!n&&r.acceleration&&this.transform(b(0,0,!0)),h=0;h<g.length;h++)"1"!=t(g[h]).attr("ignore")&&this.turn("addPage",g[h],++p);return t(this).bind(o.down,d.eventHandlers.touchStart).bind("end",c._eventEnd).bind("pressed",c._eventPressed).bind("released",c._eventReleased).bind("flip",c._flip),t(this).parent().bind("start",d.eventHandlers.start),t(document).bind(o.move,d.eventHandlers.touchMove).bind(o.up,d.eventHandlers.touchEnd),this.turn("page",r.page),d.done=!0,this},addPage:function(e,a){var i,r,s=!1,n=this.data(),o=n.totalPages+1;if(n.destroying)return!1;if((i=/\bp([0-9]+)\b/.exec(t(e).attr("class")))&&(a=parseInt(i[1],10)),a){if(a==o)s=!0;else if(a>o)throw z('Page "'+a+'" cannot be inserted')}else a=o,s=!0;return a>=1&&a<=o&&(r="double"==n.display?a%2?" odd":" even":"",n.done&&this.turn("stop"),a in n.pageObjs&&c._movePages.call(this,a,1),s&&(n.totalPages=o),n.pageObjs[a]=t(e).css({float:"left"}).addClass("page p"+a+r),-1!=navigator.userAgent.indexOf("MSIE 9.0")&&n.pageObjs[a].hasClass("hard")&&n.pageObjs[a].removeClass("hard"),c._addPage.call(this,a),c._removeFromDOM.call(this)),this},_addPage:function(e){var a=this.data(),i=a.pageObjs[e];if(i)if(c._necessPage.call(this,e)){if(!a.pageWrap[e]){a.pageWrap[e]=t("<div/>",{class:"page-wrapper",page:e,css:{position:"absolute",overflow:"hidden"}}),this.append(a.pageWrap[e]),a.pagePlace[e]||(a.pagePlace[e]=e,a.pageObjs[e].appendTo(a.pageWrap[e]));var r=c._pageSize.call(this,e,!0);i.css({width:r.width,height:r.height}),a.pageWrap[e].css(r)}a.pagePlace[e]==e&&c._makeFlip.call(this,e)}else a.pagePlace[e]=0,a.pageObjs[e]&&a.pageObjs[e].remove()},hasPage:function(t){return y(t,this.data().pageObjs)},center:function(e){var a=this.data(),i=t(this).turn("size"),r=0;if(!a.noCenter){if("double"==a.display){var s=this.turn("view",e||a.tpage||a.page);"ltr"==a.direction?s[0]?s[1]||(r+=i.width/4):r-=i.width/4:s[0]?s[1]||(r-=i.width/4):r+=i.width/4}t(this).css({marginLeft:r})}return this},destroy:function(){var e=this,a=this.data();if("prevented"!=M("destroying",this)){for(a.destroying=!0,t.each(["end","first","flip","last","pressed","released","start","turning","turned","zooming","missing"],(function(t,a){e.unbind(a)})),this.parent().unbind("start",a.eventHandlers.start),t(document).unbind(o.move,a.eventHandlers.touchMove).unbind(o.up,a.eventHandlers.touchEnd);0!==a.totalPages;)this.turn("removePage",a.totalPages);return a.fparent&&a.fparent.remove(),a.shadow&&a.shadow.remove(),this.removeData(),a=null,this}},is:function(){return"object"==typeof this.data().pages},zoom:function(e){var a=this.data();if("number"==typeof e){if(e<.001||e>100)throw z(e+" is not a value for zoom");if("prevented"==M("zooming",this,[e,a.zoom]))return this;var i=this.turn("size"),r=this.turn("view"),s=1/a.zoom,n=Math.round(i.width*s*e),o=Math.round(i.height*s*e);a.zoom=e,t(this).turn("stop").turn("size",n,o),a.opts.autoCenter&&this.turn("center"),c._updateShadow.call(this);for(var h=0;h<r.length;h++)r[h]&&a.pageZoom[r[h]]!=a.zoom&&(this.trigger("zoomed",[r[h],r,a.pageZoom[r[h]],a.zoom]),a.pageZoom[r[h]]=a.zoom);return this}return a.zoom},_pageSize:function(t,e){var a=this.data(),i={};if("single"==a.display)i.width=this.width(),i.height=this.height(),e&&(i.top=0,i.left=0,i.right="auto");else{var r=this.width()/2,s=this.height();if(a.pageObjs[t].hasClass("own-size")?(i.width=a.pageObjs[t].width(),i.height=a.pageObjs[t].height()):(i.width=r,i.height=s),e){var n=t%2;i.top=(s-i.height)/2,"ltr"==a.direction?(i[n?"right":"left"]=r-i.width,i[n?"left":"right"]="auto"):(i[n?"left":"right"]=r-i.width,i[n?"right":"left"]="auto")}}return i},_makeFlip:function(t){var e=this.data();if(!e.pages[t]&&e.pagePlace[t]==t){var a="single"==e.display,i=t%2;e.pages[t]=e.pageObjs[t].css(c._pageSize.call(this,t)).flip({page:t,next:i||a?t+1:t-1,turn:this}).flip("disable",e.disabled),c._setPageLoc.call(this,t),e.pageZoom[t]=e.zoom}return e.pages[t]},_makeRange:function(){var t,e;if(!(this.data().totalPages<1))for(t=(e=this.turn("range"))[0];t<=e[1];t++)c._addPage.call(this,t)},range:function(t){var e,a,i,r,s=this.data();if(t=t||s.tpage||s.page||1,r=c._view.call(this,t),t<1||t>s.totalPages)throw z('"'+t+'" is not a valid page');return r[1]=r[1]||r[0],r[0]>=1&&r[1]<=s.totalPages?(e=Math.floor(2),s.totalPages-r[1]>r[0]?i=2*e-(a=Math.min(r[0]-1,e)):a=2*e-(i=Math.min(s.totalPages-r[1],e))):(a=5,i=5),[Math.max(1,r[0]-a),Math.min(s.totalPages,r[1]+i)]},_necessPage:function(t){if(0===t)return!0;var e=this.turn("range");return this.data().pageObjs[t].hasClass("fixed")||t>=e[0]&&t<=e[1]},_removeFromDOM:function(){var t,e=this.data();for(t in e.pageWrap)y(t,e.pageWrap)&&!c._necessPage.call(this,t)&&c._removePageFromDOM.call(this,t)},_removePageFromDOM:function(t){var e=this.data();if(e.pages[t]){var a=e.pages[t].data();f._moveFoldingPage.call(e.pages[t],!1),a.f&&a.f.fwrapper&&a.f.fwrapper.remove(),e.pages[t].removeData(),e.pages[t].remove(),delete e.pages[t]}e.pageObjs[t]&&e.pageObjs[t].remove(),e.pageWrap[t]&&(e.pageWrap[t].remove(),delete e.pageWrap[t]),c._removeMv.call(this,t),delete e.pagePlace[t],delete e.pageZoom[t]},removePage:function(t){var e=this.data();if("*"==t)for(;0!==e.totalPages;)this.turn("removePage",e.totalPages);else{if(t<1||t>e.totalPages)throw z("The page "+t+" doesn't exist");e.pageObjs[t]&&(this.turn("stop"),c._removePageFromDOM.call(this,t),delete e.pageObjs[t]),c._movePages.call(this,t,-1),e.totalPages=e.totalPages-1,e.page>e.totalPages?(e.page=null,c._fitPage.call(this,e.totalPages)):(c._makeRange.call(this),this.turn("update"))}return this},_movePages:function(t,e){var a,i=this,r=this.data(),s="single"==r.display,n=function(t){var a=t+e,n=a%2,o=n?" odd ":" even ";r.pageObjs[t]&&(r.pageObjs[a]=r.pageObjs[t].removeClass("p"+t+" odd even").addClass("p"+a+o)),r.pagePlace[t]&&r.pageWrap[t]&&(r.pagePlace[a]=a,r.pageObjs[a].hasClass("fixed")?r.pageWrap[a]=r.pageWrap[t].attr("page",a):r.pageWrap[a]=r.pageWrap[t].css(c._pageSize.call(i,a,!0)).attr("page",a),r.pages[t]&&(r.pages[a]=r.pages[t].flip("options",{page:a,next:s||n?a+1:a-1})),e&&(delete r.pages[t],delete r.pagePlace[t],delete r.pageZoom[t],delete r.pageObjs[t],delete r.pageWrap[t]))};if(e>0)for(a=r.totalPages;a>=t;a--)n(a);else for(a=t;a<=r.totalPages;a++)n(a)},display:function(e){var a=this.data(),i=a.display;if(void 0===e)return i;if(-1==t.inArray(e,p))throw z('"'+e+'" is not a value for display');switch(e){case"single":a.pageObjs[0]||(this.turn("stop").css({overflow:"hidden"}),a.pageObjs[0]=t("<div />",{class:"page p-temporal"}).css({width:this.width(),height:this.height()}).appendTo(this)),this.addClass("shadow");break;case"double":a.pageObjs[0]&&(this.turn("stop").css({overflow:""}),a.pageObjs[0].remove(),delete a.pageObjs[0]),this.removeClass("shadow")}if(a.display=e,i){var r=this.turn("size");c._movePages.call(this,1,0),this.turn("size",r.width,r.height).turn("update")}return this},direction:function(e){var a=this.data();if(void 0===e)return a.direction;if(e=e.toLowerCase(),-1==t.inArray(e,d))throw z('"'+e+'" is not a value for direction');return"rtl"==e&&t(this).attr("dir","ltr").css({direction:"ltr"}),a.direction=e,a.done&&this.turn("size",t(this).width(),t(this).height()),this},animating:function(){return this.data().pageMv.length>0},corner:function(){var t,e,a=this.data();for(e in a.pages)if(y(e,a.pages)&&(t=a.pages[e].flip("corner")))return t;return!1},data:function(){return this.data()},disable:function(e){var a,i=this.data(),r=this.turn("view");for(a in i.disabled=void 0===e||!0===e,i.pages)y(a,i.pages)&&i.pages[a].flip("disable",!!i.disabled||-1==t.inArray(parseInt(a,10),r));return this},disabled:function(t){return void 0===t?!0===this.data().disabled:this.turn("disable",t)},size:function(t,e){if(void 0===t||void 0===e)return{width:this.width(),height:this.height()};this.turn("stop");var a,i,r=this.data(),s="double"==r.display?t/2:t;for(a in this.css({width:t,height:e}),r.pageObjs[0]&&r.pageObjs[0].css({width:s,height:e}),r.pageWrap)y(a,r.pageWrap)&&(i=c._pageSize.call(this,a,!0),r.pageObjs[a].css({width:i.width,height:i.height}),r.pageWrap[a].css(i),r.pages[a]&&r.pages[a].css({width:i.width,height:i.height}));return this.turn("resize"),this},resize:function(){var t,e=this.data();for(e.pages[0]&&(e.pageWrap[0].css({left:-this.width()}),e.pages[0].flip("resize",!0)),t=1;t<=e.totalPages;t++)e.pages[t]&&e.pages[t].flip("resize",!0);c._updateShadow.call(this),e.opts.autoCenter&&this.turn("center")},_removeMv:function(t){var e,a=this.data();for(e=0;e<a.pageMv.length;e++)if(a.pageMv[e]==t)return a.pageMv.splice(e,1),!0;return!1},_addMv:function(t){var e=this.data();c._removeMv.call(this,t),e.pageMv.push(t)},_view:function(t){var e=this.data();return t=t||e.page,"double"==e.display?t%2?[t-1,t]:[t,t+1]:[t]},view:function(t){var e=this.data(),a=c._view.call(this,t);return"double"==e.display?[a[0]>0?a[0]:0,a[1]<=e.totalPages?a[1]:0]:[a[0]>0&&a[0]<=e.totalPages?a[0]:0]},stop:function(t,e){if(this.turn("animating")){var a,i,r,s=this.data();for(s.tpage&&(s.page=s.tpage,delete s.tpage),a=0;a<s.pageMv.length;a++)s.pageMv[a]&&s.pageMv[a]!==t&&(i=(r=s.pages[s.pageMv[a]]).data().f.opts,r.flip("hideFoldedPage",e),e||f._moveFoldingPage.call(r,!1),i.force&&(i.next=i.page%2==0?i.page-1:i.page+1,delete i.force))}return this.turn("update"),this},pages:function(t){var e=this.data();if(t){if(t<e.totalPages)for(var a=e.totalPages;a>t;a--)this.turn("removePage",a);return e.totalPages=t,c._fitPage.call(this,e.page),this}return e.totalPages},_missing:function(t){var e=this.data();if(!(e.totalPages<1)){var a,i=this.turn("range",t),r=[];for(a=i[0];a<=i[1];a++)e.pageObjs[a]||r.push(a);r.length>0&&this.trigger("missing",[r])}},_fitPage:function(t){var e=this.data(),a=this.turn("view",t);if(c._missing.call(this,t),e.pageObjs[t]){e.page=t,this.turn("stop");for(var i=0;i<a.length;i++)a[i]&&e.pageZoom[a[i]]!=e.zoom&&(this.trigger("zoomed",[a[i],a,e.pageZoom[a[i]],e.zoom]),e.pageZoom[a[i]]=e.zoom);c._removeFromDOM.call(this),c._makeRange.call(this),c._updateShadow.call(this),this.trigger("turned",[t,a]),this.turn("update"),e.opts.autoCenter&&this.turn("center")}},_turnPage:function(e){var a,i,r=this.data(),s=r.pagePlace[e],n=this.turn("view"),o=this.turn("view",e);if(r.page!=e){var h=r.page;if("prevented"==M("turning",this,[e,o]))return void(h==r.page&&-1!=t.inArray(s,r.pageMv)&&r.pages[s].flip("hideFoldedPage",!0));-1!=t.inArray(1,o)&&this.trigger("first"),-1!=t.inArray(r.totalPages,o)&&this.trigger("last")}"single"==r.display?(a=n[0],i=o[0]):n[1]&&e>n[1]?(a=n[1],i=o[0]):n[0]&&e<n[0]&&(a=n[0],i=o[1]);var p=r.opts.turnCorners.split(","),d=r.pages[a].data().f,l=d.opts,g=d.point;c._missing.call(this,e),r.pageObjs[e]&&(this.turn("stop"),r.page=e,c._makeRange.call(this),r.tpage=i,l.next!=i&&(l.next=i,l.force=!0),this.turn("update"),d.point=g,"hard"==d.effect?"ltr"==r.direction?r.pages[a].flip("turnPage",e>a?"r":"l"):r.pages[a].flip("turnPage",e>a?"l":"r"):"ltr"==r.direction?r.pages[a].flip("turnPage",p[e>a?1:0]):r.pages[a].flip("turnPage",p[e>a?0:1]))},page:function(e){var a=this.data();if(void 0===e)return a.page;if(!a.disabled&&!a.destroying){if((e=parseInt(e,10))>0&&e<=a.totalPages)return e!=a.page&&(a.done&&-1==t.inArray(e,this.turn("view"))?c._turnPage.call(this,e):c._fitPage.call(this,e)),this;throw z("The page "+e+" does not exist")}},next:function(){return this.turn("page",Math.min(this.data().totalPages,c._view.call(this,this.data().page).pop()+1))},previous:function(){return this.turn("page",Math.max(1,c._view.call(this,this.data().page).shift()-1))},peel:function(t,e){var a=this.data(),i=this.turn("view");if(e=void 0===e||!0===e,!1===t)this.turn("stop",null,e);else if("single"==a.display)a.pages[a.page].flip("peel",t,e);else{var r;r="ltr"==a.direction?-1!=t.indexOf("l")?i[0]:i[1]:-1!=t.indexOf("l")?i[1]:i[0],a.pages[r]&&a.pages[r].flip("peel",t,e)}return this},_addMotionPage:function(){var e=t(this).data().f.opts,a=e.turn;a.data();c._addMv.call(a,e.page)},_eventStart:function(t,e,a){var i=e.turn.data(),r=i.pageZoom[e.page];t.isDefaultPrevented()||(r&&r!=i.zoom&&(e.turn.trigger("zoomed",[e.page,e.turn.turn("view",e.page),r,i.zoom]),i.pageZoom[e.page]=i.zoom),"single"==i.display&&a&&("l"==a.charAt(1)&&"ltr"==i.direction||"r"==a.charAt(1)&&"rtl"==i.direction?(e.next=e.next<e.page?e.next:e.page-1,e.force=!0):e.next=e.next>e.page?e.next:e.page+1),c._addMotionPage.call(t.target)),c._updateShadow.call(e.turn)},_eventEnd:function(e,a,i){t(e.target).data().f;var r=a.turn,s=r.data();if(i){var n=s.tpage||s.page;n!=a.next&&n!=a.page||(delete s.tpage,c._fitPage.call(r,n||a.next,!0))}else c._removeMv.call(r,a.page),c._updateShadow.call(r),r.turn("update")},_eventPressed:function(e){var a=t(e.target).data().f,i=a.opts.turn,r=i.data();r.pages;return r.mouseAction=!0,i.turn("update"),a.time=(new Date).getTime()},_eventReleased:function(e,a){var i,r=t(e.target),s=r.data().f,n=s.opts.turn,o=n.data();i="single"==o.display?"br"==a.corner||"tr"==a.corner?a.x<r.width()/2:a.x>r.width()/2:a.x<0||a.x>r.width(),((new Date).getTime()-s.time<200||i)&&(e.preventDefault(),c._turnPage.call(n,s.opts.next)),o.mouseAction=!1},_flip:function(e){e.stopPropagation();var a=t(e.target).data().f.opts;a.turn.trigger("turn",[a.next]),a.turn.data().opts.autoCenter&&a.turn.turn("center",a.next)},_touchStart:function(){var t=this.data();for(var e in t.pages)if(y(e,t.pages)&&!1===f._eventStart.apply(t.pages[e],arguments))return!1},_touchMove:function(){var t=this.data();for(var e in t.pages)y(e,t.pages)&&f._eventMove.apply(t.pages[e],arguments)},_touchEnd:function(){var t=this.data();for(var e in t.pages)y(e,t.pages)&&f._eventEnd.apply(t.pages[e],arguments)},calculateZ:function(t){var e,a,i,r,s,n=this,o=this.data(),h=this.turn("view"),p=h[0]||h[1],d=t.length-1,l={pageZ:{},partZ:{},pageV:{}},g=function(t){var e=n.turn("view",t);e[0]&&(l.pageV[e[0]]=!0),e[1]&&(l.pageV[e[1]]=!0)};for(e=0;e<=d;e++)a=t[e],i=o.pages[a].data().f.opts.next,r=o.pagePlace[a],g(a),g(i),s=o.pagePlace[i]==i?i:a,l.pageZ[s]=o.totalPages-Math.abs(p-s),l.partZ[r]=2*o.totalPages-d+e;return l},update:function(){var e,a=this.data();if(this.turn("animating")&&0!==a.pageMv[0]){var i,r,s=this.turn("calculateZ",a.pageMv),n=this.turn("corner"),o=this.turn("view"),h=this.turn("view",a.tpage);for(e in a.pageWrap)y(e,a.pageWrap)&&(r=a.pageObjs[e].hasClass("fixed"),a.pageWrap[e].css({display:s.pageV[e]||r?"":"none",zIndex:(a.pageObjs[e].hasClass("hard")?s.partZ[e]:s.pageZ[e])||(r?-1:0)}),(i=a.pages[e])&&(i.flip("z",s.partZ[e]||null),s.pageV[e]&&i.flip("resize"),a.tpage?i.flip("hover",!1).flip("disable",-1==t.inArray(parseInt(e,10),a.pageMv)&&e!=h[0]&&e!=h[1]):i.flip("hover",!1===n).flip("disable",e!=o[0]&&e!=o[1])))}else for(e in a.pageWrap)if(y(e,a.pageWrap)){var p=c._setPageLoc.call(this,e);a.pages[e]&&a.pages[e].flip("disable",a.disabled||1!=p).flip("hover",!0).flip("z",null)}return this},_updateShadow:function(){var e,a,i=this.data(),r=this.width(),s=this.height(),n="single"==i.display?r:r/2;e=this.turn("view"),i.shadow||(i.shadow=t("<div />",{class:"shadow",css:v(0,0,0).css}).appendTo(this));for(var o=0;o<i.pageMv.length&&(e[0]&&e[1]);o++)e=this.turn("view",i.pages[i.pageMv[o]].data().f.opts.next),a=this.turn("view",i.pageMv[o]),e[0]=e[0]&&a[0],e[1]=e[1]&&a[1];switch(e[0]?e[1]?3:"ltr"==i.direction?2:1:"ltr"==i.direction?1:2){case 1:i.shadow.css({width:n,height:s,top:0,left:n});break;case 2:i.shadow.css({width:n,height:s,top:0,left:0});break;case 3:i.shadow.css({width:r,height:s,top:0,left:0})}},_setPageLoc:function(t){var e=this.data(),a=this.turn("view"),i=0;if(t==a[0]||t==a[1]?i=1:("single"==e.display&&t==a[0]+1||"double"==e.display&&t==a[0]-2||t==a[1]+2)&&(i=2),!this.turn("animating"))switch(i){case 1:e.pageWrap[t].css({zIndex:e.totalPages,display:""});break;case 2:e.pageWrap[t].css({zIndex:e.totalPages-1,display:""});break;case 0:e.pageWrap[t].css({zIndex:0,display:e.pageObjs[t].hasClass("fixed")?"":"none"})}return i},options:function(e){if(void 0===e)return this.data().opts;var a=this.data();if(t.extend(a.opts,e),e.pages&&this.turn("pages",e.pages),e.page&&this.turn("page",e.page),e.display&&this.turn("display",e.display),e.direction&&this.turn("direction",e.direction),e.width&&e.height&&this.turn("size",e.width,e.height),e.when)for(var i in e.when)y(i,e.when)&&this.unbind(i).bind(i,e.when[i]);return this},version:function(){return"4.1.0"}},f={init:function(t){return this.data({f:{disabled:!1,hover:!1,effect:this.hasClass("hard")?"hard":"sheet"}}),this.flip("options",t),f._addPageWrapper.call(this),this},setData:function(e){var a=this.data();return a.f=t.extend(a.f,e),this},options:function(e){var a=this.data().f;return e?(f.setData.call(this,{opts:t.extend({},a.opts||g,e)}),this):a.opts},z:function(t){var e=this.data().f;return e.opts["z-index"]=t,e.fwrapper&&e.fwrapper.css({zIndex:t||parseInt(e.parent.css("z-index"),10)||0}),this},_cAllowed:function(){var t=this.data().f,e=t.opts.page,a=t.opts.turn.data(),i=e%2;return"hard"==t.effect?"ltr"==a.direction?[i?"r":"l"]:[i?"l":"r"]:"single"==a.display?1==e?"ltr"==a.direction?h.forward:h.backward:e==a.totalPages?"ltr"==a.direction?h.backward:h.forward:h.all:"ltr"==a.direction?h[i?"forward":"backward"]:h[i?"backward":"forward"]},_cornerActivated:function(e){var a=this.data().f,i=this.width(),r=this.height(),s={x:e.x,y:e.y,corner:""};const n=a.opts.whjjSize;let o=i/2-n;if(s.x<=0||s.y<=0||s.x>=i||s.y>=r)return!1;var h=f._cAllowed.call(this);switch(a.effect){case"hard":if(s.x>i-o)s.corner="r";else{if(!(s.x<o))return!1;s.corner="l"}break;case"sheet":const t=r/2-n;if(s.y<o)s.corner+="t";else{if(!(s.y>=t))return!1;s.corner+="b"}if(s.x<=o)s.corner+="l";else{if(!(s.x>=i-o))return!1;s.corner+="r"}}return!(!s.corner||-1==t.inArray(s.corner,h))&&s},_isIArea:function(t){var e=this.data().f.parent.offset();return t=n&&t.originalEvent?t.originalEvent.touches[0]:t,f._cornerActivated.call(this,{x:t.pageX-e.left,y:t.pageY-e.top})},_c:function(t,e){switch(e=e||0,t){case"tl":return m(e,e);case"tr":return m(this.width()-e,e);case"bl":return m(e,this.height()-e);case"br":return m(this.width()-e,this.height()-e);case"l":return m(e,0);case"r":return m(this.width()-e,0)}},_c2:function(t){switch(t){case"tl":case"l":return m(2*this.width(),0);case"tr":case"r":return m(-this.width(),0);case"bl":return m(2*this.width(),this.height());case"br":return m(-this.width(),this.height())}},_foldingPage:function(){var t=this.data().f;if(t){var e=t.opts;return e.turn?"single"==(t=e.turn.data()).display?e.next>1||e.page>1?t.pageObjs[0]:null:t.pageObjs[e.next]:void 0}},_backGradient:function(){var e=this.data().f,a=e.opts.turn.data(),i=a.opts.gradients&&("single"==a.display||2!=e.opts.page&&e.opts.page!=a.totalPages-1);return i&&!e.bshadow&&(e.bshadow=t("<div/>",v(0,0,1)).css({position:"",width:this.width(),height:this.height()}).appendTo(e.parent)),i},type:function(){return this.data().f.effect},resize:function(t){var e=this.data().f,a=e.opts.turn.data(),i=this.width(),r=this.height();switch(e.effect){case"hard":t&&(e.wrapper.css({width:i,height:r}),e.fpage.css({width:i,height:r}),a.opts.gradients&&(e.ashadow.css({width:i,height:r}),e.bshadow.css({width:i,height:r})));break;case"sheet":if(t){var s=Math.round(Math.sqrt(Math.pow(i,2)+Math.pow(r,2)));e.wrapper.css({width:s,height:s}),e.fwrapper.css({width:s,height:s}).children(":first-child").css({width:i,height:r}),e.fpage.css({width:i,height:r}),a.opts.gradients&&e.ashadow.css({width:i,height:r}),f._backGradient.call(this)&&e.bshadow.css({width:i,height:r})}if(e.parent.is(":visible")){var n=O(e.parent[0]);e.fwrapper.css({top:n.top,left:n.left}),n=O(e.opts.turn[0]),e.fparent.css({top:-n.top,left:-n.left})}this.flip("z",e.opts["z-index"])}},_addPageWrapper:function(){var e=this.data().f,a=e.opts.turn.data(),r=this.parent();if(e.parent=r,!e.wrapper)switch(e.effect){case"hard":var s={};s[i+"transform-style"]="preserve-3d",s[i+"backface-visibility"]="hidden",e.wrapper=t("<div/>",v(0,0,2)).css(s).appendTo(r).prepend(this),e.fpage=t("<div/>",v(0,0,1)).css(s).appendTo(r),a.opts.gradients&&(e.ashadow=t("<div/>",v(0,0,0)).hide().appendTo(r),e.bshadow=t("<div/>",v(0,0,0)));break;case"sheet":var n=this.width(),o=this.height();Math.round(Math.sqrt(Math.pow(n,2)+Math.pow(o,2)));if(e.fparent=e.opts.turn.data().fparent,!e.fparent){var h=t("<div/>",{css:{"pointer-events":"none"}}).hide();h.data().flips=0,h.css(v(0,0,"auto","visible").css).appendTo(e.opts.turn),e.opts.turn.data().fparent=h,e.fparent=h}this.css({position:"absolute",top:0,left:0,bottom:"auto",right:"auto"}),e.wrapper=t("<div/>",v(0,0,this.css("z-index"))).appendTo(r).prepend(this),e.fwrapper=t("<div/>",v(r.offset().top,r.offset().left)).hide().appendTo(e.fparent),e.fpage=t("<div/>",v(0,0,0,"visible")).css({cursor:"default"}).appendTo(e.fwrapper),a.opts.gradients&&(e.ashadow=t("<div/>",v(0,0,1)).appendTo(e.fpage)),f.setData.call(this,e)}f.resize.call(this,!0)},_fold:function(t){var e=this.data().f,n=e.opts.turn.data(),o=f._c.call(this,t.corner),h=this.width(),p=this.height();switch(e.effect){case"hard":"l"==t.corner?t.x=Math.min(Math.max(t.x,0),2*h):t.x=Math.max(Math.min(t.x,h),-h);var d,l,g,c,u,v=n.totalPages,w=e.opts["z-index"]||v,y={overflow:"visible"},P=o.x?(o.x-t.x)/h:t.x/h,M=90*P,z=M<90;switch(t.corner){case"l":c="0% 50%",u="100% 50%",z?(d=0,l=e.opts.next-1>0,g=1):(d="100%",l=e.opts.page+1<v,g=0);break;case"r":c="100% 50%",u="0% 50%",M=-M,h=-h,z?(d=0,l=e.opts.next+1<v,g=0):(d="-100%",l=1!=e.opts.page,g=1)}y[i+"perspective-origin"]=u,e.wrapper.transform("rotateY("+M+"deg)translate3d(0px, 0px, "+(this.attr("depth")||0)+"px)",u),e.fpage.transform("translateX("+h+"px) rotateY("+(180+M)+"deg)",c),e.parent.css(y),z?(P=1-P,e.wrapper.css({zIndex:w+1}),e.fpage.css({zIndex:w})):(P-=1,e.wrapper.css({zIndex:w}),e.fpage.css({zIndex:w+1})),n.opts.gradients&&(l?e.ashadow.css({display:"",left:d,backgroundColor:"rgba(0,0,0,"+.5*P+")"}).transform("rotateY(0deg)"):e.ashadow.hide(),e.bshadow.css({opacity:1-P}),z?e.bshadow.parent()[0]!=e.wrapper[0]&&e.bshadow.appendTo(e.wrapper):e.bshadow.parent()[0]!=e.fpage[0]&&e.bshadow.appendTo(e.fpage),_(e.bshadow,m(100*g,0),m(100*(1-g),0),[[0,"rgba(0,0,0,0.3)"],[1,"rgba(0,0,0,0)"]],2));break;case"sheet":var O,j,k,T,W,A,F,S=this,C=0,E=m(0,0),I=m(0,0),Z=m(0,0),D=f._foldingPage.call(this),q=(Math.tan(0),n.opts.acceleration),R=e.wrapper.height(),H="t"==t.corner.substr(0,1),L="l"==t.corner.substr(1,1),V=function(){var e=m(0,0),i=m(0,0);e.x=o.x?o.x-t.x:t.x,e.y=a?o.y?o.y-t.y:t.y:0,i.x=L?h-e.x/2:t.x+e.x/2,i.y=e.y/2;var d=s-Math.atan2(e.y,e.x),l=d-Math.atan2(i.y,i.x),g=Math.max(0,Math.sin(l)*Math.sqrt(Math.pow(i.x,2)+Math.pow(i.y,2)));if(C=d/r*180,Z=m(g*Math.sin(d),g*Math.cos(d)),d>s&&(Z.x=Z.x+Math.abs(Z.y*e.y/e.x),Z.y=0,Math.round(Z.x*Math.tan(r-d))<p))return t.y=Math.sqrt(Math.pow(p,2)+2*i.x*e.x),H&&(t.y=p-t.y),V();if(d>s){var c=r-d,u=R-p/Math.sin(c);E=m(Math.round(u*Math.cos(c)),Math.round(u*Math.sin(c))),L&&(E.x=-E.x),H&&(E.y=-E.y)}O=Math.round(Z.y/Math.tan(d)+Z.x);var v=h-O,w=v*Math.cos(2*d),b=v*Math.sin(2*d);if(I=m(Math.round(L?v-w:O+w),Math.round(H?b:p-b)),n.opts.gradients){W=v*Math.sin(d);var x=f._c2.call(S,t.corner),y=Math.sqrt(Math.pow(x.x-t.x,2)+Math.pow(x.y-t.y,2))/h;F=Math.sin(s*(y>1?2-y:y)),A=Math.min(y,1),T=W>100?(W-100)/W:0,j=m(W*Math.sin(d)/h*100,W*Math.cos(d)/p*100),f._backGradient.call(S)&&(k=m(1.2*W*Math.sin(d)/h*100,1.2*W*Math.cos(d)/p*100),L||(k.x=100-k.x),H||(k.y=100-k.y))}return Z.x=Math.round(Z.x),Z.y=Math.round(Z.y),!0},Y=function(t,a,i,r){var s=["0","auto"],o=(h-R)*i[0]/100,d=(p-R)*i[1]/100,l={left:s[a[0]],top:s[a[1]],right:s[a[2]],bottom:s[a[3]]},g={},c=90!=r&&-90!=r?L?-1:1:0,u=i[0]+"% "+i[1]+"%";S.css(l).transform(x(r)+b(t.x+c,t.y,q),u),e.fpage.css(l).transform(x(r)+b(t.x+I.x-E.x-h*i[0]/100,t.y+I.y-E.y-p*i[1]/100,q)+x((180/r-2)*r),u),e.wrapper.transform(b(-t.x+o-c,-t.y+d,q)+x(-r),u),e.fwrapper.transform(b(-t.x+E.x+o,-t.y+E.y+d,q)+x(-r),u),n.opts.gradients&&(i[0]&&(j.x=100-j.x),i[1]&&(j.y=100-j.y),g["box-shadow"]="0 0 20px rgba(0,0,0,"+.5*F+")",D.css(g),_(e.ashadow,m(L?100:0,H?0:100),m(j.x,j.y),[[T,"rgba(0,0,0,0)"],[.8*(1-T)+T,"rgba(0,0,0,"+.2*A+")"],[1,"rgba(255,255,255,"+.2*A+")"]],3),f._backGradient.call(S)&&_(e.bshadow,m(L?0:100,H?0:100),m(k.x,k.y),[[.6,"rgba(0,0,0,0)"],[.8,"rgba(0,0,0,"+.3*A+")"],[1,"rgba(0,0,0,0)"]],3))};switch(t.corner){case"l":case"r":break;case"tl":t.x=Math.max(t.x,1),V(),Y(Z,[1,0,0,1],[100,0],C);break;case"tr":t.x=Math.min(t.x,h-1),V(),Y(m(-Z.x,Z.y),[0,0,0,1],[0,0],-C);break;case"bl":t.x=Math.max(t.x,1),V(),Y(m(Z.x,-Z.y),[1,1,0,0],[100,100],-C);break;case"br":t.x=Math.min(t.x,h-1),V(),Y(m(-Z.x,-Z.y),[0,1,1,0],[0,100],C)}}e.point=t},_moveFoldingPage:function(t){var e=this.data().f;if(e){var a=e.opts.turn,i=a.data(),r=i.pagePlace;if(t){var s=e.opts.next;if(r[s]!=e.opts.page)e.folding&&f._moveFoldingPage.call(this,!1),f._foldingPage.call(this).appendTo(e.fpage),r[s]=e.opts.page,e.folding=s;a.turn("update")}else if(e.folding){if(i.pages[e.folding]){var n=i.pages[e.folding].data().f;i.pageObjs[e.folding].appendTo(n.wrapper)}else i.pageWrap[e.folding]&&i.pageObjs[e.folding].appendTo(i.pageWrap[e.folding]);e.folding in r&&(r[e.folding]=e.folding),delete e.folding}}},_showFoldedPage:function(t,e){var a=f._foldingPage.call(this),i=this.data(),r=i.f,s=r.visible;if(a){if(!s||!r.point||r.point.corner!=t.corner){var n="hover"==r.status||"peel"==r.status||r.opts.turn.data().mouseAction?t.corner:null;if(s=!1,"prevented"==M("start",this,[r.opts,n]))return!1}if(e){var o=this,h=r.point&&r.point.corner==t.corner?r.point:f._c.call(this,t.corner,1);this.animatef({from:[h.x,h.y],to:[t.x,t.y],duration:500,frame:function(e){t.x=Math.round(e[0]),t.y=Math.round(e[1]),f._fold.call(o,t)}})}else f._fold.call(this,t),i.effect&&!i.effect.turning&&this.animatef(!1);if(!s)switch(r.effect){case"hard":r.visible=!0,f._moveFoldingPage.call(this,!0),r.fpage.show(),r.opts.shadows&&r.bshadow.show();break;case"sheet":r.visible=!0,r.fparent.show().data().flips++,f._moveFoldingPage.call(this,!0),r.fwrapper.show(),r.bshadow&&r.bshadow.show()}return!0}return!1},hide:function(){var t=this.data().f,e=t.opts.turn.data(),a=f._foldingPage.call(this);switch(t.effect){case"hard":e.opts.gradients&&(t.bshadowLoc=0,t.bshadow.remove(),t.ashadow.hide()),t.wrapper.transform(""),t.fpage.hide();break;case"sheet":0==--t.fparent.data().flips&&t.fparent.hide(),this.css({left:0,top:0,right:"auto",bottom:"auto"}).transform(""),t.wrapper.transform(""),t.fwrapper.hide(),t.bshadow&&t.bshadow.hide(),a.transform("")}return t.visible=!1,this},hideFoldedPage:function(t){var e=this.data().f;if(e.point){var a=this,i=e.point,r=function(){e.point=null,e.status="",a.flip("hide"),a.trigger("end",[e.opts,!1])};if(t){var s=f._c.call(this,i.corner),n="t"==i.corner.substr(0,1)?Math.min(0,i.y-s.y)/2:Math.max(0,i.y-s.y)/2,o=m(i.x,i.y+n),h=m(s.x,s.y-n);this.animatef({from:0,to:1,frame:function(t){var e=w(i,o,h,s,t);i.x=e.x,i.y=e.y,f._fold.call(a,i)},complete:r,duration:800,hiding:!0})}else this.animatef(!1),r()}},turnPage:function(t){var e=this,a=this.data().f,i=a.opts.turn.data();t={corner:a.corner?a.corner.corner:t||f._cAllowed.call(this)[0]};var r=a.point||f._c.call(this,t.corner,a.opts.turn?i.opts.elevation:0),s=f._c2.call(this,t.corner);this.trigger("flip").animatef({from:0,to:1,frame:function(a){var i=w(r,r,s,s,a);t.x=i.x,t.y=i.y,f._showFoldedPage.call(e,t)},complete:function(){e.trigger("end",[a.opts,!0])},duration:i.opts.duration,turning:!0}),a.corner=null},moving:function(){return"effect"in this.data()},isTurning:function(){return this.flip("moving")&&this.data().effect.turning},corner:function(){return this.data().f.corner},_eventStart:function(t){var e=this.data().f,a=e.opts.turn;if(!e.corner&&!e.disabled&&!this.flip("isTurning")&&e.opts.page==a.data().pagePlace[e.opts.page]){if(e.corner=f._isIArea.call(this,t),e.corner&&f._foldingPage.call(this))return this.trigger("pressed",[e.point]),f._showFoldedPage.call(this,e.corner),!1;e.corner=null}},_eventMove:function(t){var e=this.data().f;if(!e.disabled)if(t=n?t.originalEvent.touches:[t],e.corner){var a=e.parent.offset();e.corner.x=t[0].pageX-a.left,e.corner.y=t[0].pageY-a.top,f._showFoldedPage.call(this,e.corner)}else if(e.hover&&!this.data().effect&&this.is(":visible")){var i=f._isIArea.call(this,t[0]);if(i){if("sheet"==e.effect&&2==i.corner.length||"hard"==e.effect){e.status="hover";var r=f._c.call(this,i.corner,e.opts.cornerSize/2);i.x=r.x,i.y=r.y,f._showFoldedPage.call(this,i,!0)}}else"hover"==e.status&&(e.status="",f.hideFoldedPage.call(this,!0))}},_eventEnd:function(){var t=this.data().f,e=t.corner;!t.disabled&&e&&"prevented"!=M("released",this,[t.point||e])&&f.hideFoldedPage.call(this,!0),t.corner=null},disable:function(t){return f.setData.call(this,{disabled:t}),this},hover:function(t){return f.setData.call(this,{hover:t}),this},peel:function(e,a){var i=this.data().f;if(e){if(-1==t.inArray(e,h.all))throw z("Corner "+e+" is not permitted");if(-1!=t.inArray(e,f._cAllowed.call(this))){var r=f._c.call(this,e,i.opts.cornerSize/2);i.status="peel",f._showFoldedPage.call(this,{corner:e,x:r.x,y:r.y},a)}}else i.status="",f.hideFoldedPage.call(this,a);return this}};function u(t,e,a){if(a[0]&&"object"!=typeof a[0]){if(e[a[0]])return e[a[0]].apply(t,Array.prototype.slice.call(a,1));throw z(a[0]+" is not a method or property")}return e.init.apply(t,a)}function v(t,e,a,i){return{css:{position:"absolute",top:t,left:e,overflow:i||"hidden",zIndex:a||"auto"}}}function w(t,e,a,i,r){var s=1-r,n=s*s*s,o=r*r*r;return m(Math.round(n*t.x+3*r*s*s*e.x+3*r*r*s*a.x+o*i.x),Math.round(n*t.y+3*r*s*s*e.y+3*r*r*s*a.y+o*i.y))}function m(t,e){return{x:t,y:e}}function b(t,a,i){return e&&i?" translate3d("+t+"px,"+a+"px, 0px) ":" translate("+t+"px, "+a+"px) "}function x(t){return" rotate("+t+"deg) "}function y(t,e){return Object.prototype.hasOwnProperty.call(e,t)}function P(){for(var t=["Moz","Webkit","Khtml","O","ms"],e=t.length,a="";e--;)t[e]+"Transform"in document.body.style&&(a="-"+t[e].toLowerCase()+"-");return a}function _(t,e,a,r,s){var n,o=[];if("-webkit-"==i){for(n=0;n<s;n++)o.push("color-stop("+r[n][0]+", "+r[n][1]+")");t.css({"background-image":"-webkit-gradient(linear, "+e.x+"% "+e.y+"%,"+a.x+"% "+a.y+"%, "+o.join(",")+" )"})}else{e={x:e.x/100*t.width(),y:e.y/100*t.height()};var h=(a={x:a.x/100*t.width(),y:a.y/100*t.height()}).x-e.x,p=a.y-e.y,d=Math.atan2(p,h),l=d-Math.PI/2,g=Math.abs(t.width()*Math.sin(l))+Math.abs(t.height()*Math.cos(l)),c=Math.sqrt(p*p+h*h),f=m(a.x<e.x?t.width():0,a.y<e.y?t.height():0),u=Math.tan(d),v=-1/u,w=(v*f.x-f.y-u*e.x+e.y)/(v-u),b={x:w,y:v*w-v*f.x+f.y},x=Math.sqrt(Math.pow(b.x-e.x,2)+Math.pow(b.y-e.y,2));for(n=0;n<s;n++)o.push(" "+r[n][1]+" "+100*(x+c*r[n][0])/g+"%");t.css({"background-image":i+"linear-gradient("+-d+"rad,"+o.join(",")+")"})}}function M(e,a,i){var r=t.Event(e);return a.trigger(r,i),r.isDefaultPrevented()?"prevented":r.isPropagationStopped()?"stopped":""}function z(t){function e(t){this.name="TurnJsError",this.message=t}return e.prototype=new Error,e.prototype.constructor=e,new e(t)}function O(t){var e={top:0,left:0};do{e.left+=t.offsetLeft,e.top+=t.offsetTop}while(t=t.offsetParent);return e}window.requestAnim=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)},t.extend(t.fn,{flip:function(){return u(t(this[0]),f,arguments)},turn:function(){return u(t(this[0]),c,arguments)},transform:function(t,e){var a={};return e&&(a[i+"transform-origin"]=e),a[i+"transform"]=t,this.css(a)},animatef:function(e){var a=this.data();if(a.effect&&a.effect.stop(),e){e.to.length||(e.to=[e.to]),e.from.length||(e.from=[e.from]);for(var i=[],r=e.to.length,s=!0,n=this,o=(new Date).getTime(),h=function(){if(a.effect&&s){for(var t=[],p=Math.min(e.duration,(new Date).getTime()-o),d=0;d<r;d++)t.push(a.effect.easing(1,p,e.from[d],i[d],e.duration));e.frame(1==r?t[0]:t),p==e.duration?(delete a.effect,n.data(a),e.complete&&e.complete()):window.requestAnim(h)}},p=0;p<r;p++)i.push(e.to[p]-e.from[p]);a.effect=t.extend({stop:function(){s=!1},easing:function(t,e,a,i,r){return i*Math.sqrt(1-(e=e/r-1)*e)+a}},e),this.data(a),h()}else delete a.effect}}),t.isTouch=n,t.mouseEvents=o,t.cssPrefix=P,t.cssTransitionEnd=function(){var t,e=document.createElement("fakeelement"),a={transition:"transitionend",OTransition:"oTransitionEnd",MSTransition:"transitionend",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in a)if(void 0!==e.style[t])return a[t]},t.findPos=O}(jQuery);