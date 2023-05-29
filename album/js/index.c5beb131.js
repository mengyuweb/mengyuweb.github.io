!function(t){function e(t,e,a){if(!a[0]||"object"==typeof a[0])return e.init.apply(t,a);if(e[a[0]])return e[a[0]].apply(t,Array.prototype.slice.call(a,1));throw n(a[0]+" is an invalid value")}function a(t,e,a,i){return{css:{position:"absolute",top:t,left:e,overflow:i||"hidden","z-index":a||"auto"}}}function i(t,e,a,i,r){var n=1-r,o=n*n*n,d=r*r*r;return s(Math.round(o*t.x+3*r*n*n*e.x+3*r*r*n*a.x+d*i.x),Math.round(o*t.y+3*r*n*n*e.y+3*r*r*n*a.y+d*i.y))}function s(t,e){return{x:t,y:e}}function r(t,e){return Object.prototype.hasOwnProperty.call(e,t)}function n(t){function e(t){this.name="TurnJsError",this.message=t}return e.prototype=Error(),e.prototype.constructor=e,new e(t)}function o(){return""}var d="",p={down:"mousedown",move:"mousemove",up:"mouseup",over:"mouseover",out:"mouseout"},h={backward:["l"],forward:["r"],all:["l","r"]},l=["single","double"],g=["ltr","rtl"],c={acceleration:!0,display:"double",duration:600,page:1,gradients:!0,when:null},f={acceleration:!0,corners:"forward",cornerSize:100,duration:600,gradients:!0},u={init:function(e){if(1<this.length)throw n("This selector has more than 1 element");for(var a=(o=["Moz","Webkit","Khtml","O","ms"]).length,i="";a--;)o[a]+"Transform"in document.body.style&&(i="-"+o[a].toLowerCase()+"-");d=i;var s,o=0,h=this.data();a=this.children(),e=t.extend({width:this.width(),height:this.height(),direction:this.attr("dir")||this.css("direction")||"ltr"},c,e);if(h.opts=e,h.pageObjs={},h.pages={},h.pageWrap={},h.pagePlace={},h.pageMv=[],h.zoom=1,h.totalPages=e.pages||0,h.docEvents={mouseStart:function(t){for(var e in h.pages)if(r(e,h.pages)&&!1===v._eventStart.call(h.pages[e],t))return!1},mouseMove:function(t){for(var e in h.pages)r(e,h.pages)&&v._eventMove.call(h.pages[e],t)},mouseEnd:function(t){for(var e in h.pages)r(e,h.pages)&&v._eventEnd.call(h.pages[e],t)}},e.when)for(s in e.when)r(s,e.when)&&this.bind(s,e.when[s]);for(this.css({position:"relative",width:e.width,height:e.height}),this.turn("display",e.display),""!==e.direction&&this.turn("direction",e.direction),s=0;s<a.length;s++)"1"!=t(a[s]).attr("ignore")&&this.turn("addPage",a[s],++o);return t(this).bind(p.down,h.docEvents.mouseStart).bind("start",u._start).bind("end",u._end).bind("pressed",u._pressed).bind("released",u._released).bind("flip",u._flip),t(document).bind(p.move,h.docEvents.mouseMove).bind(p.up,h.docEvents.mouseEnd),this.turn("page",e.page),h.done=!0,this},addPage:function(e,a){var i,s=!1,r=this.data(),o=r.totalPages+1;if(r.destroying)return!1;if((i=/\bp([0-9]+)\b/.exec(t(e).attr("class")))&&(a=parseInt(i[1],10)),a){if(a==o)s=!0;else if(a>o)throw n('Page "'+a+'" cannot be inserted')}else a=o,s=!0;return 1<=a&&a<=o&&(i="double"==r.display?a%2?" odd":" even":"",r.done&&this.turn("stop"),a in r.pageObjs&&u._movePages.call(this,a,1),s&&(r.totalPages=o),r.pageObjs[a]=t(e).css({float:"left"}).addClass("page p"+a+i),u._addPage.call(this,a),r.done&&this.turn("update"),u._removeFromDOM.call(this)),this},_addPage:function(e){var a=this.data(),i=a.pageObjs[e];if(i)if(u._necessPage.call(this,e)){if(!a.pageWrap[e]){var s=u._pageSize.call(this,e,!0);i.css({width:s.width,height:s.height}),a.pagePlace[e]=e,a.pageWrap[e]=t("<div/>",{class:"turn-page-wrapper",page:e,css:{position:"absolute",overflow:"hidden"}}).css(s),this.append(a.pageWrap[e]),a.pageWrap[e].prepend(a.pageObjs[e])}(!e||1==u._setPageLoc.call(this,e))&&u._makeFlip.call(this,e)}else a.pagePlace[e]=0,a.pageObjs[e]&&a.pageObjs[e].remove()},hasPage:function(t){return r(t,this.data().pageObjs)},center:function(e){var a=this.data(),i=t(this).turn("size"),s=i.width/(2*a.zoom)-i.width/2;return"double"==a.display&&(e=this.turn("view",e||a.tpage||a.page),"ltr"==a.direction?e[0]?e[1]||(s+=i.width/4):s-=i.width/4:e[0]?e[1]||(s-=i.width/4):s+=i.width/4),t(this).css({marginLeft:s}),this},destroy:function(){var e=this.data();for(e.destroying=!0,t(this).unbind(p.down).unbind("end").unbind("first").unbind("flip").unbind("last").unbind("pressed").unbind("released").unbind("start").unbind("turning").unbind("turned").unbind("zooming"),t(document).unbind(p.move,e.docEvents.mouseMove).unbind(p.up,e.docEvents.mouseEnd);0!==e.totalPages;)this.turn("removePage",e.totalPages);return e.fparent&&e.fparent.remove(),e.shadow&&e.shadow.remove(),this.removeData(),this},is:function(){return"object"==typeof this.data().pages},zoom:function(e){var a=this.data();if("number"==typeof e){if(.001>e||100<e)throw n(e+" is not a value for zoom");var i=t.Event("zooming");if(this.trigger(i,[e,a.zoom]),i.isDefaultPrevented())return this;i=t(this).turn("size");var s=1/a.zoom,r=Math.round(i.width*s*e),o=Math.round(i.height*s*e);return a.zoom=e,t(this).turn("stop").turn("size",r,o).css({marginTop:i.height*s/2-o/2}),a.opts.autoCenter?this.turn("center"):t(this).css({marginLeft:i.width*s/2-r/2}),u._updateShadow.call(this),this}return a.zoom},_pageSize:function(t,e){var a=this.data(),i={};if("single"==a.display)i.width=this.width(),i.height=this.height(),e&&(i.top=0,i.left=0,i.right="auto");else{var s=this.width()/2,r=this.height();if(a.pageObjs[t].hasClass("own-size")?(i.width=a.pageObjs[t].width(),i.height=a.pageObjs[t].height()):(i.width=s,i.height=r),e){var n=t%2;i.top=(r-i.height)/2,"ltr"==a.direction?(i[n?"right":"left"]=s-i.width,i[n?"left":"right"]="auto"):(i[n?"left":"right"]=s-i.width,i[n?"right":"left"]="auto")}}return i},_makeFlip:function(t){var e=this.data();if(!e.pages[t]&&e.pagePlace[t]==t){var a="single"==e.display,i=t%2;e.pages[t]=e.pageObjs[t].css(u._pageSize.call(this,t)).flip({page:t,next:i||a?t+1:t-1,turn:this,duration:e.opts.duration,acceleration:e.opts.acceleration,gradients:e.opts.gradients}).flip("disable",e.disabled)}return e.pages[t]},_makeRange:function(){var t,e;if(!(1>this.data().totalPages))for(t=(e=this.turn("range"))[0];t<=e[1];t++)u._addPage.call(this,t)},range:function(t){var e,a,i,s=this.data();t=t||s.tpage||s.page||1;if(i=u._view.call(this,t),1>t||t>s.totalPages)throw n('"'+t+'" is not a page for range');return i[1]=i[1]||i[0],1<=i[0]&&i[1]<=s.totalPages?(t=Math.floor(2),s.totalPages-i[1]>i[0]?a=2*t-(e=Math.min(i[0]-1,t)):e=2*t-(a=Math.min(s.totalPages-i[1],t))):a=e=5,[Math.max(1,i[0]-e),Math.min(s.totalPages,i[1]+a)]},_necessPage:function(t){if(0===t)return!0;var e=this.data(),a=this.turn("range");return e.pageObjs[t].hasClass("fixed")||t>=a[0]&&t<=a[1]},_removeFromDOM:function(){var t,e=this.data();for(t in e.pageWrap)r(t,e.pageWrap)&&!u._necessPage.call(this,t)&&u._removePageFromDOM.call(this,t)},_removePageFromDOM:function(t){var e=this.data();if(e.pages[t]){var a=e.pages[t].data();v._moveFoldingPage.call(e.pages[t],!1),a.f&&a.f.fwrapper&&a.f.fwrapper.remove(),e.pages[t].removeData(),e.pages[t].remove(),delete e.pages[t]}e.pageObjs[t]&&e.pageObjs[t].remove(),e.pageWrap[t]&&(e.pageWrap[t].remove(),delete e.pageWrap[t]),delete e.pagePlace[t]},removePage:function(t){var e=this.data();if(1>t||t>e.totalPages)throw n("The page "+t+" doesn't exist");return e.pageObjs[t]&&(this.turn("stop"),u._removePageFromDOM.call(this,t),delete e.pageObjs[t]),u._movePages.call(this,t,-1),e.totalPages-=1,e.page>e.totalPages?this.turn("page",e.totalPages):u._makeRange.call(this),this},_movePages:function(t,e){var a,i=this,s=this.data(),r="single"==s.display,n=function(t){var a=t+e,n=a%2,o=n?" odd ":" even ";s.pageObjs[t]&&(s.pageObjs[a]=s.pageObjs[t].removeClass("p"+t+" odd even").addClass("p"+a+o)),s.pagePlace[t]&&s.pageWrap[t]&&(s.pagePlace[a]=a,s.pageWrap[a]=s.pageObjs[a].hasClass("fixed")?s.pageWrap[t].attr("page",a):s.pageWrap[t].css(u._pageSize.call(i,a,!0)).attr("page",a),s.pages[t]&&(s.pages[a]=s.pages[t].flip("options",{page:a,next:r||n?a+1:a-1,corners:r?"all":n?"forward":"backward"})),e&&(delete s.pages[t],delete s.pagePlace[t],delete s.pageObjs[t],delete s.pageWrap[t],delete s.pageObjs[t]))};if(0<e)for(a=s.totalPages;a>=t;a--)n(a);else for(a=t;a<=s.totalPages;a++)n(a)},display:function(e){var a=this.data(),i=a.display;if(e){if(-1==t.inArray(e,l))throw n('"'+e+'" is not a value for display');return"single"==e?a.pageObjs[0]||(this.turn("stop").css({overflow:"hidden"}),a.pageObjs[0]=t("<div />",{class:"page p-temporal"}).css({width:this.width(),height:this.height()}).appendTo(this)):a.pageObjs[0]&&(this.turn("stop").css({overflow:""}),a.pageObjs[0].remove(),delete a.pageObjs[0]),a.display=e,i&&(e=this.turn("size"),u._movePages.call(this,1,0),this.turn("size",e.width,e.height).turn("update")),this}return i},direction:function(e){var a=this.data();if(void 0===e)return a.direction;if(e=e.toLowerCase(),-1==t.inArray(e,g))throw n('"'+e+'" is not a value for direction');return"rtl"==e&&t(this).attr("dir","ltr").css({direction:"ltr"}),a.direction=e,a.done&&this.turn("size",t(this).width(),t(this).height()),this},animating:function(){return 0<this.data().pageMv.length},disable:function(e){var a,i=this.data(),s=this.turn("view");for(a in i.disabled=void 0===e||!0===e,i.pages)r(a,i.pages)&&i.pages[a].flip("disable",!!e&&t.inArray(a,s));return this},disabled:function(t){return void 0===t?!0===this.data().disabled:this.turn("disable",t)},size:function(t,e){if(t&&e){var a,i,s=this.data();for(a in i="double"==s.display?t/2:t,this.css({width:t,height:e}),s.pageObjs[0]&&s.pageObjs[0].css({width:i,height:e}),s.pageWrap)r(a,s.pageWrap)&&(i=u._pageSize.call(this,a,!0),s.pageObjs[a].css({width:i.width,height:i.height}),s.pageWrap[a].css(i),s.pages[a]&&s.pages[a].css({width:i.width,height:i.height}));return this.turn("resize"),this}return{width:this.width(),height:this.height()}},resize:function(){var t,e=this.data();for(e.pages[0]&&(e.pageWrap[0].css({left:-this.width()}),e.pages[0].flip("resize",!0)),t=1;t<=e.totalPages;t++)e.pages[t]&&e.pages[t].flip("resize",!0)},_removeMv:function(t){var e,a=this.data();for(e=0;e<a.pageMv.length;e++)if(a.pageMv[e]==t)return a.pageMv.splice(e,1),!0;return!1},_addMv:function(t){var e=this.data();u._removeMv.call(this,t),e.pageMv.push(t)},_view:function(t){var e=this.data();t=t||e.page;return"double"==e.display?t%2?[t-1,t]:[t,t+1]:[t]},view:function(t){var e=this.data();t=u._view.call(this,t);return"double"==e.display?[0<t[0]?t[0]:0,t[1]<=e.totalPages?t[1]:0]:[0<t[0]&&t[0]<=e.totalPages?t[0]:0]},stop:function(){if(this.turn("animating")){var t,e,a,i=this.data(),s=i.pageMv;for(i.pageMv=[],i.tpage&&(i.page=i.tpage,delete i.tpage),t=0;t<s.length;t++)e=(a=i.pages[s[t]]).data().f.opts,a.flip("hideFoldedPage",!1),v._moveFoldingPage.call(a,!1),i.pagePlace[e.next]=e.next,e.force&&(e.next=0==e.page%2?e.page-1:e.page+1,delete e.force)}return this.turn("update"),this},pages:function(t){var e=this.data();if(t){if(t<e.totalPages){for(var a=t+1;a<=e.totalPages;a++)this.turn("removePage",a);this.turn("page")>t&&this.turn("page",t)}return e.totalPages=t,this}return e.totalPages},_missing:function(t){var e=this.data(),a=this.turn("range",t),i=[];for(t=a[0];t<=a[1];t++)e.pageObjs[t]||i.push(t);0<i.length&&this.trigger("missing",[i])},_fitPage:function(t){var e=this.data(),a=this.turn("view",t);u._missing.call(this,t),e.pageObjs[t]&&(e.page=t,this.turn("stop"),u._removeFromDOM.call(this),u._makeRange.call(this),u._updateShadow.call(this),this.trigger("turned",[t,a]),e.opts.autoCenter&&this.turn("center"))},_turnPage:function(e,a){var i,s,r=this.data(),n=r.pagePlace[e],o=this.turn("view"),d=this.turn("view",e);if(r.page!=e){var p=t.Event("turning");if(this.trigger(p,[e,d]),p.isDefaultPrevented())return;-1!=t.inArray(1,d)&&this.trigger("first"),-1!=t.inArray(r.totalPages,d)&&this.trigger("last")}if(a)this.turn("stop",n);else{if(u._missing.call(this,e),!r.pageObjs[e])return;this.turn("stop"),r.page=e}u._makeRange.call(this),"single"==r.display?(i=o[0],s=d[0]):o[1]&&e>o[1]?(i=o[1],s=d[0]):o[0]&&e<o[0]&&(i=o[0],s=d[1]),r.pages[i]&&(n=r.pages[i].data().f.opts,r.tpage=s,n.next!=s&&(n.next=s,r.pagePlace[s]=n.page,n.force=!0),"single"==r.display?"ltr"==r.direction?r.pages[i].flip("turnPage",d[0]>o[0]?"r":"l"):r.pages[i].flip("turnPage",d[0]>o[0]?"l":"r"):r.pages[i].flip("turnPage"))},page:function(e){e=parseInt(e,10);var a=this.data();return 0<e&&e<=a.totalPages?(a.done&&-1==t.inArray(e,this.turn("view"))?u._turnPage.call(this,e):u._fitPage.call(this,e),this):a.page},next:function(){return this.turn("page",u._view.call(this,this.data().page).pop()+1)},previous:function(){return this.turn("page",u._view.call(this,this.data().page).shift()-1)},peel:function(){return this},_addMotionPage:function(){var e=t(this).data().f.opts,a=e.turn,i=a.data();u._addMv.call(a,e.page),i.pagePlace[e.next]=e.page,a.turn("update")},_start:function(t,e,a){var i=e.turn.data();t.isDefaultPrevented()||("single"==i.display&&a&&("l"==a&&"ltr"==i.direction||"r"==a&&"rtl"==i.direction?(e.next=e.next<e.page?e.next:e.page-1,e.force=!0):e.next=e.next>e.page?e.next:e.page+1),u._addMotionPage.call(t.target)),u._updateShadow.call(e.turn)},_end:function(e,a,i){t(e.target).data();var s=(e=a.turn).data();i||s.tpage?s.tpage!=a.next&&s.tpage!=a.page||(delete s.tpage,u._fitPage.call(e,s.tpage||a.next,!0)):(u._removeMv.call(e,a.page),u._updateShadow.call(e),e.turn("update"))},_pressed:function(e){e.stopPropagation();var a,i=(e=t(e.target).data().f).opts.turn.data().pages;for(a in i)a!=e.opts.page&&i[a].flip("disable",!0);return e.time=(new Date).getTime()},_released:function(e,a){e.stopPropagation();var i,s=t(e.target),r=s.data().f,n=r.opts.turn,o=n.data();i="single"==o.display?"r"==a.corner?a.x<s.width()/2:a.x>s.width()/2:0>a.x||a.x>s.width(),(200>(new Date).getTime()-r.time||i)&&(e.preventDefault(),u._turnPage.call(n,r.opts.next,!1===v._cornerActivated.call(s,a,1))),o.mouseAction=!1},_flip:function(e){e.stopPropagation(),(e=t(e.target).data().f.opts).turn.trigger("turn",[e.next]),e.turn.data().opts.autoCenter&&e.turn.turn("center",e.next)},calculateZ:function(t){var e,a,i,s,r=this,n=this.data(),o=(e=this.turn("view"))[0]||e[1],d={pageZ:{},partZ:{},pageV:{}},p=function(t){(t=r.turn("view",t))[0]&&(d.pageV[t[0]]=!0),t[1]&&(d.pageV[t[1]]=!0)};for(e=0;e<t.length;e++)a=t[e],i=n.pages[a].data().f.opts.next,s=n.pagePlace[a],p(a),p(i),a=n.pagePlace[i]==i?i:a,d.pageZ[a]=n.totalPages-Math.abs(o-a),d.partZ[s]=2*n.totalPages+Math.abs(o-a);return d},update:function(){var t,e=this.data();if(e.pageMv.length&&0!==e.pageMv[0]){var a,i=this.turn("calculateZ",e.pageMv);for(t in this.turn("view",e.tpage),e.pageWrap)r(t,e.pageWrap)&&(a=e.pageObjs[t].hasClass("fixed"),e.pageWrap[t].css({display:i.pageV[t]||a?"":"none","z-index":i.pageZ[t]||(a?-1:0)}),a=e.pages[t])&&(a.flip("z",i.partZ[t]||null),i.pageV[t]&&a.flip("resize"),e.tpage&&a.flip("disable",!0))}else for(t in e.pageWrap)r(t,e.pageWrap)&&(i=u._setPageLoc.call(this,t),e.pages[t]&&e.pages[t].flip("disable",e.disabled||1!=i).flip("z",null))},_updateShadow:function(){var e,i,s=this.data(),r=this.width(),n=this.height(),o="single"==s.display?r:r/2;e=this.turn("view"),s.shadow||(s.shadow=t("<div />",{class:"shadow",css:a(0,0,0).css}).appendTo(this));for(var d=0;d<s.pageMv.length&&e[0]&&e[1];d++)e=this.turn("view",s.pages[s.pageMv[d]].data().f.opts.next),i=this.turn("view",s.pageMv[d]),e[0]=e[0]&&i[0],e[1]=e[1]&&i[1];switch(e[0]?e[1]?3:"ltr"==s.direction?2:1:"ltr"==s.direction?1:2){case 1:s.shadow.css({width:o,height:n,top:0,left:o});break;case 2:s.shadow.css({width:o,height:n,top:0,left:0});break;case 3:s.shadow.css({width:r,height:n,top:0,left:0})}},_setPageLoc:function(t){var e=this.data(),a=this.turn("view");return t==a[0]||t==a[1]?(e.pageWrap[t].css({zIndex:e.totalPages,display:""}),1):"single"==e.display&&t==a[0]+1||"double"==e.display&&t==a[0]-2||t==a[1]+2?(e.pageWrap[t].css({zIndex:e.totalPages-1,display:""}),2):(e.pageWrap[t].css({zIndex:0,display:e.pageObjs[t].hasClass("fixed")?"":"none"}),0)},options:function(e){if(void 0===e)return this.data().opts;var a=this.data();if(t.extend(a.opts,e),e.pages&&this.turn("pages",e.pages),e.page&&this.turn("page",e.page),e.display&&this.turn("display",e.display),e.direction&&this.turn("direction",e.direction),e.width&&e.height&&this.turn("size",e.width,e.height),e.when)for(var i in e.when)r(i,e.when)&&this.unbind(i).bind(i,e.when[i]);return this},version:function(){return"4.1.0"}},v={init:function(t){return this.data({f:{effect:"r"==t.corners||"l"==t.corners?"hard":"sheet"}}),this.flip("options",t),v._addPageWrapper.call(this),this},setData:function(e){var a=this.data();return a.f=t.extend(a.f,e),this},options:function(e){var a=this.data().f;return e?(v.setData.call(this,{opts:t.extend({},a.opts||f,e)}),this):a.opts},z:function(t){var e=this.data().f;return e.fwrapper&&(e.opts["z-index"]=t,e.fwrapper.css({"z-index":t||parseInt(e.parent.css("z-index"),10)||0})),this},_cAllowed:function(){var t,e=(t=this.data().f).opts.turn.data(),a=(t=t.opts.page)%2;return"single"==e.display?1==t?"ltr"==e.direction?h.forward:h.backward:t==e.totalPages?"ltr"==e.direction?h.backward:h.forward:h.all:"ltr"==e.direction?h[a?"forward":"backward"]:h[a?"backward":"forward"]},_cornerActivated:function(e){var a=(r=this.data().f).parent.offset(),i=this.width(),s=this.height(),r=(e={x:Math.max(0,e.pageX-a.left),y:Math.max(0,e.pageY-a.top)},r.opts.cornerSize);if(0>=e.x||0>=e.y||e.x>=i||e.y>=s)return!1;if(s=v._cAllowed.call(this),e.x>i-r)e.corner="r";else{if(!(e.x<r))return!1;e.corner="l"}return-1!=t.inArray(e.corner,s)&&e},_c:function(t,e){switch(e=e||0,t){case"l":return s(e,0);case"r":return s(this.width()-e,0)}},_c2:function(t){switch(t){case"l":return s(2*this.width(),0);case"r":return s(-this.width(),0)}},_foldingPage:function(){var t=this.data().f,e=t.opts;return t.folding?t.folding:e.turn?"single"==(t=e.turn.data()).display?t.pageObjs[e.next]?t.pageObjs[0]:null:t.pageObjs[e.next]:void 0},_backGradient:function(){var t=this.data().f,e=t.opts.turn;return t.opts.gradients&&(!e||"single"==e.data().display||2!=t.opts.page&&t.opts.page!=e.data().totalPages-1)},resize:function(t){var e=this.data().f,a=this.width(),i=this.height();t&&(e.wrapper.css({width:a,height:i}),e.fpage.css({width:a,height:i}))},_addPageWrapper:function(){var e=this.data().f,i=this.parent();if(e.parent=i,!e.wrapper){var s={};e.wrapper=t("<div/>",a(0,0,2)).css(s).appendTo(i).prepend(this),e.fpage=t("<div/>",a(0,0,1)).css(s).appendTo(i)}v.resize.call(this,!0)},_fold:function(t){var e=this.data().f,a=(a=v._c.call(this,t.corner)).x?a.x-t.x:t.x,i=this.width();switch(this.height(),a=Math.min(2*i,Math.max(0,a)),t.corner){case"r":e.wrapper.css({width:Math.max(0,i-a)}),this.css({position:"relative",left:-a}),e.fpage.css({left:-a+i,width:Math.max(0,a-i)});break;case"l":e.wrapper.css({width:i}),this.css({position:"relative",left:a}),e.fpage.css({left:i,width:Math.max(0,a-i)}),e.folding&&e.folding.css({position:"relative",left:2*-i+a})}e.parent.css({overflow:"visible"}),e.point=t},_moveFoldingPage:function(t){var e=this.data().f;if(t){t=v._foldingPage.call(this);var a=e.opts.turn;if(t){if(e.folding){if(e.folding===t)return;v._moveFoldingPage.call(this,!1)}v.setData.call(this,{backParent:t.parent(),folding:t}),e.fpage.prepend(t)}a.turn("update")}else e.backParent&&(e.backParent.prepend(e.folding),delete e.backParent,delete e.folding)},_showFoldedPage:function(e,a){var i=v._foldingPage.call(this),s=this.data(),r=s.f,n=r.visible;if(!n||!r.point||r.point.corner!=e.corner){r.opts.turn.data();var o=t.Event("start");if(this.trigger(o,[r.opts,e.corner]),n=!1,o.isDefaultPrevented())return!1}if(i){if(a){var d=this;i=r.point&&r.point.corner==e.corner?r.point:v._c.call(this,e.corner,1);this.animatef({from:[i.x,i.y],to:[e.x,e.y],duration:500,frame:function(t){e.x=Math.round(t[0]),e.y=Math.round(t[1]),v._fold.call(d,e)}})}else v._fold.call(this,e),s.effect&&!s.effect.turning&&this.animatef(!1);return n||(r.visible=!0,v._moveFoldingPage.call(this,!0),r.fpage.show()),!0}return!1},hide:function(){var t=this.data().f;return v._foldingPage.call(this),this.css({position:"",left:"auto"}),t.wrapper.css({width:this.width()}),t.fpage.css({width:this.width()}),t.folding&&t.folding.css({position:"",left:"auto"}),t.fpage.hide(),t.visible=!1,this},hideFoldedPage:function(t){var e=this.data().f;if(e.point){var a=this,r=e.point,n=function(){e.point=null,a.flip("hide"),a.trigger("end",[e.opts,!1])};if(t){var o=v._c.call(this,r.corner),d=(t="t"==r.corner.substr(0,1)?Math.min(0,r.y-o.y)/2:Math.max(0,r.y-o.y)/2,s(r.x,r.y+t)),p=s(o.x,o.y-t);this.animatef({from:0,to:1,frame:function(t){t=i(r,d,p,o,t),r.x=t.x,r.y=t.y,v._fold.call(a,r)},complete:n,duration:800,hiding:!0})}else this.animatef(!1),n()}},turnPage:function(t){var e=this,a=this.data().f,s=(t={corner:a.corner?a.corner.corner:t||v._cAllowed.call(this)[0]},a.point||v._c.call(this,t.corner,a.opts.turn?a.opts.turn.data().opts.elevation:0)),r=v._c2.call(this,t.corner);this.trigger("flip").animatef({from:0,to:1,frame:function(a){a=i(s,s,r,r,a),t.x=a.x,t.y=a.y,v._showFoldedPage.call(e,t)},complete:function(){e.trigger("end",[a.opts,!0])},duration:a.opts.duration,turning:!0}),a.corner=null},moving:function(){return"effect"in this.data()},isTurning:function(){return this.flip("moving")&&this.data().effect.turning},_eventStart:function(t){var e=this.data().f;if(!e.disabled&&!this.flip("isTurning")){if(e.corner=v._cornerActivated.call(this,t),e.corner&&v._foldingPage.call(this,e.corner))return v._showFoldedPage.call(this,e.corner)&&this.trigger("pressed",[e.point]),!1;e.corner=null}},_eventMove:function(t){var e=this.data().f;if(!e.disabled)if(t=[t],e.corner){var a=e.parent.offset();e.corner.x=t[0].pageX-a.left,e.corner.y=t[0].pageY-a.top,v._showFoldedPage.call(this,e.corner)}else!this.data().effect&&this.is(":visible")&&((t=v._cornerActivated.call(this,t[0]))?(e=v._c.call(this,t.corner,e.opts.cornerSize/2),t.x=e.x,t.y=e.y,v._showFoldedPage.call(this,t,!0)):v.hideFoldedPage.call(this,!0))},_eventEnd:function(){var e=this.data().f;if(!e.disabled&&e.point){var a=t.Event("released");this.trigger(a,[e.point]),a.isDefaultPrevented()||v.hideFoldedPage.call(this,!0)}e.corner=null},disable:function(t){return v.setData.call(this,{disabled:t}),this}};window.requestAnim=function(t){window.setTimeout(t,1e3/60)},t.extend(t.fn,{flip:function(t,a){return e(this,v,arguments)},turn:function(t){return e(this,u,arguments)},transform:function(t,e){var a={};return e&&(a[d+"transform-origin"]=e),a[d+"transform"]=t,this.css(a)},animatef:function(e){var a=this.data();if(a.effect&&a.effect.stop(),e){e.to.length||(e.to=[e.to]),e.from.length||(e.from=[e.from]);for(var i=[],s=e.to.length,r=!0,n=this,o=(new Date).getTime(),d=function(){if(a.effect&&r){for(var t=[],p=Math.min(e.duration,(new Date).getTime()-o),h=0;h<s;h++)t.push(a.effect.easing(1,p,e.from[h],i[h],e.duration));e.frame(1==s?t[0]:t),p==e.duration?(delete a.effect,n.data(a),e.complete&&e.complete()):window.requestAnim(d)}},p=0;p<s;p++)i.push(e.to[p]-e.from[p]);a.effect=t.extend({stop:function(){r=!1},easing:function(t,e,a,i,s){return i*Math.sqrt(1-(e=e/s-1)*e)+a}},e),this.data(a),d()}else delete a.effect}}),t.isTouch=!1,t.mouseEvents=p,t.cssPrefix=o,t.cssTransitionEnd=o,t.findPos=function(t){var e={top:0,left:0};do{e.left+=t.offsetLeft,e.top+=t.offsetTop}while(t=t.offsetParent);return e}}(jQuery);