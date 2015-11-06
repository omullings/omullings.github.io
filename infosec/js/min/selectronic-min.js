!function($,e,t){"use strict";function s(e,t,s){return this._schema=e,this._options={},this._callbacks={},this.set($.extend({},t,s||{}),!0),this}function i(e,t){this._name=i.pluginName,this.el=e,this.$el=$(e),this.ui={},this._selected=0,this._isEnable=!0,this._keyModes={},this.options=new s(c,u,t);var o=this;this.options.on("filter",function(e){return o._itemsSelector="."+o.options.get("listClass")+" "+e,e}),this.options.on("autoScroll",function(e){return o._setScrolledElem(e),e}),this._itemsSelector="."+this.options.get("listClass")+" "+this.options.get("filter"),this._setScrolledElem(this.options.get("autoScroll")),this._init()}var o=$.fn.outerHeight?"outerHeight":"height";$.fn.jquery||$.fn.zepto||($.fn.zepto=!0);var l=function(e,t,s){var i,o,l,n=null,r=0;s=s||{};var a=function(){r=s.leading===!1?0:new Date,n=null,l=e.apply(i,o)};return function(){var u=new Date;r||s.leading!==!1||(r=u);var c=t-(u-r);return i=this,o=arguments,0>=c?(clearTimeout(n),n=null,r=u,l=e.apply(i,o)):n||s.trailing===!1||(n=setTimeout(a,c)),l}},n=Array.prototype.indexOf||function(e){for(var t=0,s=this.length;s>t;t++)if(this[t]===e)return t;return-1},r=function(e,t){return e instanceof Array?n.call(e,t)>=0:!1},a=$(e.document);s.isCorrectType=function(e,t){var s=typeof e,i=null===e&&t.nullable;return t.type instanceof Array?r(t.type,s)||i:s===t.type||i},s.prototype.set=function(e,i){var o,l;for(o in e){var n=e[o],a=this._schema[o];if(a!==t){if(a.unchangeable&&!i)throw new Error('Option "'+o+'" could be setted once at the begining.');if(!s.isCorrectType(n,a)){var u='Option "'+o+'" must be '+(a.type instanceof Array?a.type.join(", "):a.type)+(a.nullable?" or null.":".");throw new TypeError(u)}if(a.values&&!r(a.values,n))throw new RangeError('Option "'+o+'" only could be in these values: "'+a.values.join('", "')+'".')}}for(o in e)(l=this._callbacks[o])&&(e[o]=l.call(this,e[o]));this._options=$.extend(this._options,e)},s.prototype.get=function(e){return e?this._options[e]:$.extend({},this._options)},s.prototype.on=function(e,t){this._callbacks[e]=t},s.prototype.off=function(e){this._callbacks[e]&&delete this._callbacks[e]};var u={filter:"> *",multi:!0,mouseMode:"standard",focusBlur:!1,selectionBlur:!1,handle:null,textSelection:!1,focusOnHover:!1,keyboard:!1,keyboardMode:"select",autoScroll:!0,loop:!1,preventInputs:!0,listClass:"j-selectable",focusClass:"j-focused",selectedClass:"j-selected",disabledClass:"j-disabled",create:null,before:null,focusLost:null,select:null,unselect:null,unselectAll:null,stop:null,destroy:null},c={filter:{type:"string"},multi:{type:"boolean"},mouseMode:{type:"string",values:["standard","mouseup","toggle"]},focusBlur:{type:"boolean"},selectionBlur:{type:"boolean"},handle:{type:"string",nullable:!0},textSelection:{type:"boolean"},focusOnHover:{type:"boolean"},keyboard:{type:"boolean"},keyboardMode:{type:"string",values:["select","toggle"]},autoScroll:{type:["boolean","string"]},loop:{type:"boolean"},preventInputs:{type:"boolean"},listClass:{type:"string",unchangeable:!0},focusClass:{type:"string",unchangeable:!0},selectedClass:{type:"string",unchangeable:!0},disabledClass:{type:"string",unchangeable:!0},create:{type:"function",nullable:!0},before:{type:"function",nullable:!0},focusLost:{type:"function",nullable:!0},select:{type:"function",nullable:!0},unselect:{type:"function",nullable:!0},unselectAll:{type:"function",nullable:!0},stop:{type:"function",nullable:!0},destroy:{type:"function",nullable:!0}};i.pluginName="selectonic",i.keyCode={DOWN:40,UP:38,SHIFT:16,END:35,HOME:36,PAGE_DOWN:34,PAGE_UP:33,A:65,SPACE:32,ENTER:13},i.getDataObject=function(e){return $(e).data("plugin_"+i.pluginName)},i.prototype._init=function(){this.$el.addClass(this.options.get("listClass")),this._bindEvents(),this.$el.data("plugin_"+i.pluginName,this),this._trigger("create")},i.prototype._setScrolledElem=function(e){var t;if(null===e||!1===e)return void delete this._scrolledElem;if("string"==typeof e){if(t=$(e),!(t.length>0))throw new Error('There are no elements that matches to selector - "'+e+'"');return void(this._scrolledElem=t[0])}this._scrolledElem=this.el},i.prototype._cancel=function(e,t){if(!t.wasCancelled){t.isCancellation=this._isPrevented=!0;var s=this;$.each($(t.changedItems),function(i,o){t.prevItemsStates[i]?s._select(e,t,$(o),!0):s._unselect(e,t,$(o),!0)}),t.prevFocus&&this._setFocus(t.prevFocus),delete t.isCancellation,t.wasCancelled=!0}},i.prototype._bindEvents=function(){var e=this,t=this._name;this._mouseEvent=function(t){e._isEnable&&1===t.which&&e._mouseHandler.call(e,t)},this._keyboardEvent=function(t){e.options.get("keyboard")&&e._isEnable&&e._keyHandler.call(e,t)},this._selectstartEvent=function(){return e.options.get("textSelection")?void 0:!1},this._mousemoveEvent=l(function(t){e._isEnable&&e.options&&e.options.get("focusOnHover")&&e._mousemoveHandler.call(e,t)},20),a.on("keydown."+t,this._keyboardEvent),a.on("keyup."+t,this._keyboardEvent),a.on("mousemove."+t,this._mousemoveEvent),a.on("click."+t,this._mouseEvent),a.on("mousedown."+t,this._mouseEvent),a.on("mouseup."+t,this._mouseEvent),this.$el.on("selectstart."+t,this._selectstartEvent)},i.prototype._unbindEvents=function(){var e=this._name;a.off("keydown."+e,this._keyboardEvent),a.off("keyup."+e,this._keyboardEvent),a.off("mousemove."+e,this._mousemoveEvent),a.off("click."+e,this._mouseEvent),a.off("mousedown."+e,this._mouseEvent),a.off("mouseup."+e,this._mouseEvent),this.$el.off("selectstart."+e,this._selectstartEvent)},i.prototype._getTarget=function(t){for(var s=t.target,i=this.options.get("handle"),o,l,n;null!==s&&s!==this.el;)o=$(s),o.context=e.document,o.is(this._itemsSelector)&&(l=s),i&&o.is(i)&&(n=s),s=s.parentNode;return i&&s&&n?l:!i&&s?l:null},i.prototype._getItems=function(t,s,i){var o;switch(s){case"next":case"prev":for(var l=i.jquery?i:$(i),n=$.fn[s];;){if(l=n.call(l),0===l.length)break;if(l.context=e.document,l.is(this._itemsSelector))return l}return null;case"pageup":case"pagedown":return this._getNextPageElem(t,s,i);case"first":return o=t.allItems?t.allItems:this.$el.find(this.options.get("filter")),t.allItems=o,o.first();case"last":return o=t.allItems?t.allItems:this.$el.find(this.options.get("filter")),t.allItems=o,o.last();default:return o=t.allItems?t.allItems:this.$el.find(this.options.get("filter")),t.allItems=o,void 0!==s&&$.isNumeric(s)?o.eq(s):o}},i.prototype._getNextPageElem=function(t,s,i){var l=t.isShiftPageRange,n=this._scrolledElem||this.el,r=n.clientHeight,a=$(e)[o](),u=$(i),c=r>a,h=c?a:r,d=u[o](),f=d,p=d,g="pageup"===s?"prev":"next",_,m,y,v,S;for(l&&(g="pageup"===s?-1:1,v=this._getItems(t),t.rangeStart=y=v.index(i));;){if(l?(y+=g,S=y>=0?v.eq(y):null,_=S&&S.length>0?S:null):_=this._getItems(t,g,u),!_&&u[0]===i)break;if(!_)return l&&(t.rangeEnd=y-g),u;if(m=_[o](),p+=m,p>h)return f+m>h?(l&&(t.rangeEnd=y),_):(l&&(t.rangeEnd=y-g),u);f=m,u=_}return null},i.prototype._trigger=function(e,t,s){var i,o=this.options.get(e);if(o){if("create"===e||"destroy"===e)return o.call(this.$el);switch(i={},s.target&&(i.target=s.target),this.ui.focus&&(i.focus=this.ui.focus),e){case"select":i.items=s.selected;break;case"unselectAll":case"unselect":i.items=s.unselected;break;case"stop":s.wasCancelled||(i.items=s.changedItems)}o.call(this.$el,t||null,i)}},i.prototype._controller=function(e,s){var i;return s.changedItems=[],s.prevItemsStates=[],delete this._isPrevented,this._trigger("before",e,s),this._isPrevented?(this._cancel(e,s),void this._stop(e,s)):(s.wasSelected=this._selected>0,s.target&&s.isTargetWasSelected===t&&(s.isTargetWasSelected=this._getIsSelected(s.target)),s.isRangeSelect&&s.isTargetWasSelected&&s.target===this.ui.focus||(s.isRangeSelect?this._perfomRangeSelect(e,s):s.isMultiSelect?(i=s.isTargetWasSelected?this._unselect:this._select,i.call(this,e,s,s.items)):s.target&&!s.items&&"mouseover"===e.type||(s.target&&s.items?(this._selected&&1===this._selected&&this._getIsSelected(this.ui.focus)?this._unselect(e,s,this.ui.focus,s.isTargetWasSelected):this._selected&&this._unselectAll(e,s),this._select(e,s,s.items,s.isTargetWasSelected)):!s.target&&this._selected>0&&this.options.get("selectionBlur")&&this._unselectAll(e,s))),!this._selected&&s.wasSelected&&this._trigger("unselectAll",e,s),s.prevFocus=this.ui.focus?this.ui.focus:null,!s.target&&this.options.get("focusBlur")?this._blur(e,s):s.target&&!s.wasCancelled&&this._setFocus(s.target),void this._stop(e,s))},i.prototype._perfomRangeSelect=function(e,t){var s,i,o,l,n,r,a,u=t.rangeStart<t.rangeEnd,c=this._getItems(t),h=u?t.rangeStart:t.rangeEnd,d=u?t.rangeEnd:t.rangeStart;t.isNewSolidSelection?(i=c.slice(0,h),i=i.add(c.slice(d+1)),this._unselect(e,t,i),this._select(e,t,t.items)):this.ui.solidInitialElem&&!t.isTargetWasSelected&&(o=t.items.index(this.ui.solidInitialElem))>=0?(o=u?t.rangeStart+o:t.rangeEnd+o,l=o<t.rangeStart,n=t.rangeStart<o,r=o<t.rangeEnd,a=t.rangeEnd<o,(!r&&l||!a&&n)&&(i=n?c.slice(h,o):c.slice(o+1,d+1),i.length>0&&this._unselect(e,t,i)),(a&&!n||r&&!l)&&(i=a?c.slice(h,o):c.slice(o+1,d+1),i.length>0&&this._select(e,t,i))):(s=t.isTargetWasSelected?this._unselect:this._select,s.call(this,e,t,t.items))},i.prototype._changeItemsStates=function(e,t,s){var i=t>0,o=[],l=this;$(e).each(function(e,n){var r=l._getIsSelected(n),a=i?!r:r,u=n===s.target&&s.isTargetWasSelected;(!u||i||s.isMultiSelect||s.isRangeSelect)&&(a&&(s.isCancellation||(o.push(n),s.prevItemsStates.push(r)),l._selected+=t),$(n).toggleClass(l.options.get("selectedClass"),i))}),s.isCancellation||(s[i?"selected":"unselected"]=$(o),s.changedItems=s.changedItems.concat(o))},i.prototype._select=function(e,t,s,i){this._changeItemsStates(s,1,t),i||this._trigger("select",e,t),this._isPrevented&&!t.isCancellation&&this._cancel(e,t)},i.prototype._unselect=function(e,t,s,i){this._changeItemsStates(s,-1,t),i||this._trigger("unselect",e,t),this._isPrevented&&!t.isCancellation&&this._cancel(e,t)},i.prototype._unselectAll=function(e,t){var s,i;this._selected&&0!==this._selected&&(i=this._getItems(t),s=t.target&&t.isTargetWasSelected&&1===this._selected,this._unselect(e,t,i,s))},i.prototype._multiSelect=function(e){return e.isMultiSelect=!0,$(e.target)},i.prototype._rangeSelect=function(e){if(e.isRangeSelect=!0,e.target===this.ui.focus)return $(e.target);var t=e.allItems?e.allItems:this._getItems(e),s=t.index(e.target),i=t.index(this.ui.focus),o=i>s?t.slice(s,i):t.slice(i,s);return o.push(i>s?t[i]:t[s]),e.allItems=t,e.rangeStart=i,e.rangeEnd=s,o},i.prototype._getIsSelected=function(e){var t=this.options.get();return $(e).length<=1?$(e).hasClass(t.selectedClass):$.map($(e),function(e){return $(e).hasClass(t.selectedClass)})},i.prototype._blur=function(e,t,s){!s&&this.ui.focus&&this._trigger("focusLost",e,t),this.ui.focus&&($(this.ui.focus).removeClass(this.options.get("focusClass")),delete this.ui.focus)},i.prototype._setFocus=function(e){return e?(this.ui.focus&&$(this.ui.focus).removeClass(this.options.get("focusClass")),this.ui.focus=e,$(this.ui.focus).addClass(this.options.get("focusClass")),this.ui.focus):void 0},i.prototype._stop=function(e,t){this._trigger("stop",e,t),this._isPrevented&&this._cancel(e,t)},i.prototype._checkIfElem=function(e){var t;return e&&(e.jquery||e.zepto||e.nodeType)?(e=e.jquery||e.zepto?e:$(e),t=e.filter(this._itemsSelector),t.length>0?t:null):!1},i.prototype._checkIfSelector=function(e){var t;return e&&"string"==typeof e?(t=this.$el.find(e).filter(this._itemsSelector),t.jquery&&t.length>0?t:null):!1},i.prototype._keyHandler=function(e){if(this.options.get("keyboard")&&!(this.options.get("preventInputs")&&"INPUT"===e.target.tagName||"TEXTAREA"===e.target.tagName)){var t=e.which,s={},o,l,n,r;if("keyup"===e.type)return void(t===i.keyCode.SHIFT&&(delete this._shiftModeAction,delete this._keyModes.shift));if(t===i.keyCode.A&&this._isMulti(e)&&this.options.get("multi"))o=this._getItems(s),l=!0;else switch(t){case i.keyCode.DOWN:n="next",o=this._findNextTarget("next",s);break;case i.keyCode.UP:n="prev",o=this._findNextTarget("prev",s);break;case i.keyCode.HOME:n="prev",o=this._getItems(s,"first");break;case i.keyCode.END:n="next",o=this._getItems(s,"last");break;case i.keyCode.PAGE_DOWN:case i.keyCode.PAGE_UP:var a=t===i.keyCode.PAGE_DOWN;n=a?"next":"prev",r=a?"pagedown":"pageup",s.isShiftPageRange=this.options.get("multi")&&e.shiftKey&&!l,o=this._findNextTarget(r,s);break;case i.keyCode.SPACE:o=$(this.ui.focus);break;case i.keyCode.ENTER:this.options.get("multi")||(o=$(this.ui.focus))}n&&e.preventDefault(),o&&o.length>0?(s.target=o[0],s.items=o,"toggle"===this.options.get("keyboardMode")?(t===i.keyCode.SPACE||t===i.keyCode.ENTER&&!this.options.get("multi")||delete s.items,this.options.get("multi")&&(s.isMultiSelect=!0),delete this.ui.solidInitialElem):this.ui.focus&&this.options.get("multi")&&e.shiftKey&&!l?(t===i.keyCode.END||t===i.keyCode.HOME||t===i.keyCode.PAGE_UP||t===i.keyCode.PAGE_DOWN?this._rangeVariator(s):this._multiVariator(s,t,n,o),this.ui.solidInitialElem||s.target===this.ui.focus||(this.ui.solidInitialElem=this.ui.focus,s.isNewSolidSelection=!0),this._shiftModeAction||(this._shiftModeAction="select"),this._keyModes.shift||(this._keyModes.shift=t)):delete this.ui.solidInitialElem,this._controller(e,s),this.scroll()):(s.prevItemsStates=[],this._trigger("before",e,s),this._trigger("stop",e,s))}},i.prototype._rangeVariator=function(e){var t=void 0===e.isFocusSelected?this._getIsSelected(this.ui.focus):e.isFocusSelected,s=e.isTargetWasSelected=this._getIsSelected(e.target);t||s?(e.items=this._rangeSelect(e),s&&(e.items=e.rangeStart<e.rangeEnd?e.items.slice(0,e.items.length-1):e.items.slice(1))):(e.target=e.items=this.ui.focus,e.isMultiSelect=!0)},i.prototype._multiVariator=function(e,t,s,i){var o=void 0===e.isFocusSelected?this._getIsSelected(this.ui.focus):e.isFocusSelected,l=this._getIsSelected(e.target),n=this._getItems(e,s,i),r=this._getIsSelected(n),a;if(this._keyModes.shift&&this._keyModes.shift!==t&&(this._keyModes.shift=this._shiftModeAction=null),this._keyModes.shift&&"select"===this._shiftModeAction&&l){for(;this._getIsSelected(e.items)&&e.items.length>0;)a=e.items,e.items=this._getItems(e,s,e.items);e.target=e.items?e.items:a}else l&&o&&!r?(this._keyModes.shift=this._shiftModeAction=null,e.items=this.ui.focus):o&&l?(e.items=this.ui.focus,this._shiftModeAction||(this._shiftModeAction="unselect")):o||(e.target=e.items=this.ui.focus);e.isMultiSelect=!0},i.prototype._findNextTarget=function(e,t){var s="next"===e||"pagedown"===e?"first":"last",i=this.ui.focus?this._getItems(t,e,this.ui.focus):this._getItems(t,s);return null!==i&&0!==i.length||!this.options.get("loop")||(i=this._getItems(t,s)),i},i.prototype._refreshBoxScroll=function(t){var s=$(t),i=t===e,l=i?s[o]():t.clientHeight,n=s.scrollTop(),r=i?0:s.offset().top,a=$(this.ui.focus),u=a[o](),c=i?a.offset().top:a.offset().top-r+n;n>c?s.scrollTop(c):c+u>n+l&&s.scrollTop(c+u-l)},i.prototype._isRange=function(e){return e.shiftKey||e.shiftKey&&e.ctrlKey||e.shiftKey&&e.metaKey},i.prototype._isMulti=function(e){return e.ctrlKey||e.metaKey},i.prototype._mouseHandler=function(e){var t=this.options.get(),s=e.type,i=this._isMulti(e),o=this._isRange(e),l={};if("mouseup"===t.mouseMode){if(l.target=this._getTarget(e),"click"===s||l.target&&"mousedown"===s)return}else{if("click"===s&&!this._mousedownOnItem)return;if("mousedown"!==s&&"click"!==s)return;if(l.target=this._getTarget(e),"mousedown"===s&&l.target&&(!t.multi||!i&&!o||"standard"!==t.mouseMode))return void(this._mousedownOnItem=l.target);if(delete this._mousedownOnItem,!l.target&&"click"===s)return}t.multi&&l.target&&(o&&this.ui.focus?l.items=this._rangeSelect(l):(i||"toggle"===t.mouseMode)&&(l.items=this._multiSelect(l))),l.target&&!l.items&&(l.items=$(l.target)),delete this.ui.solidInitialElem,this._controller(e,l)},i.prototype._mousemoveHandler=function(e){if(!this._isFocusOnHoverPrevented){var t={},s=this._getTarget(e);s?(delete this.ui.solidInitialElem,this._isHovered=!0,s!==this.ui.focus&&(t.target=s,this._controller(e,t))):this._isHovered&&(this._isHovered=!1,this._controller(e,t))}},i.prototype._preventMouseMove=function(){var e=this;this._isFocusOnHoverPrevented=!0,this._focusHoverTimeout&&(clearTimeout(this._focusHoverTimeout),delete this._focusHoverTimeout),this._focusHoverTimeout=setTimeout(function(){delete e._isFocusOnHoverPrevented,delete e._focusHoverTimeout},250)},i._callPublicMethod=function(e){var t=i.getDataObject(this),s,o;if(null===t||void 0===t)throw new Error("Element "+this[0]+" has no plugin "+i.pluginName);if(t[e]&&$.isFunction(t[e])&&(s=t[e]),s&&$.isFunction(s)&&"_"!==e.charAt(0))return o=Array.prototype.slice.call(arguments),o.shift(),s.apply(t,o);throw new Error('Plugin "'+i.pluginName+'" has no method "'+e+'"')},i.prototype.isEnabled=function(){return this._isEnable},i.prototype.option=function(e,t){var s=arguments.length;if(s>0&&"string"==typeof e){if(s>1){var i={};return i[e]=t,this.options.set(i),this.$el}return this.options.get(e)}if(s>0&&$.isPlainObject(e))return this.options.set(e),this.$el;if(0===s)return this.options.get();throw new Error('Format of "option" could be: "option" or "option","name" or "option","name",val or "option",{}')},i.prototype.destroy=function(){this._trigger("destroy"),this._unbindEvents(),this._focusHoverTimeout&&clearTimeout(this._focusHoverTimeout),this.ui.focus&&($(this.ui.focus).removeClass(this.options.get("focusClass")),delete this.ui.focus),this._selected>0&&this.getSelected().removeClass(this.options.get("selectedClass")),this.$el.removeClass(this.options.get("disabledClass")),this.$el.removeClass(this.options.get("listClass")),this.options.off(),delete this.options,delete this._scrolledElem,delete this.ui.solidInitialElem,this.$el.removeData("plugin_"+i.pluginName),this.$el=null},i.prototype.unselect=function(e){return this.select(e,!0)},i.prototype.select=function(e,t){var s,i;if(t===!0&&void 0===e)i={isTargetWasSelected:!0,isMultiSelect:!0},i.items=this._getItems(i);else if(i={isTargetWasSelected:t?!0:!1,isMultiSelect:!0},void 0!==e&&$.isNumeric(e))i.items=this._getItems(i,e);else{if(s=this._checkIfElem(e),s===!1&&(s=this._checkIfSelector(e)),s===!1)throw new Error('You shold pass DOM element or selector to "select" method.');i.items=null===s?null:s.addClass?s:$(s)}return delete this.ui.solidInitialElem,this._controller(null,i),this.$el},i.prototype.blur=function(){return this._controller(null,{target:null}),this.$el},i.prototype.getSelected=function(e){var t,s=this._getItems({}).filter("."+this.options.get("selectedClass"));if(e){t=[];for(var i=0;i<s.length;i++)t.push(s[i].id||null);return t&&t.length>0?t:null}return s},i.prototype.getSelectedId=function(){return this.getSelected(!0)},i.prototype.focus=function(e){var t;if(arguments.length>0){if(t=$.isNumeric(e)?this._getItems({},e):(t=this._checkIfElem(e))===!1?this._checkIfSelector(e):t,t&&(t.jquery||t.zepto))this._setFocus(t[0]);else if(t===!1)throw new Error("You shold pass DOM element or CSS selector to set focus or nothing to get it.");return this.$el}return this.ui.focus?this.ui.focus:null},i.prototype.scroll=function(){this._preventMouseMove(),this.ui.focus&&(this._scrolledElem&&this._refreshBoxScroll(this._scrolledElem),this._refreshBoxScroll(e))},i.prototype.enable=function(){return this._isEnable=!0,this.$el.removeClass(this.options.get("disabledClass")),this.$el},i.prototype.disable=function(){return this._isEnable=!1,this._isHovered=!1,this.$el.addClass(this.options.get("disabledClass")),this.$el},i.prototype.cancel=function(){return this._isPrevented=!0,this.$el},i.prototype.refresh=function(){var e=this.ui.focus;return e&&!$(e).is(":visible")&&delete this.ui.focus,this._selected=this.getSelected().length,this.$el},$.fn[i.pluginName]=function(e){return e&&e.charAt?i._callPublicMethod.apply(this,arguments):this.each(function(t,s){i.getDataObject(s)||new i(s,e)})},$.fn[i.pluginName].defaults=u}(window.jQuery||window.Zepto,window);