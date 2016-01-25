/*绑定事件与取消绑定*/
/*原理解析：
*	handleHash做哈希表缓存事件的function，
*	handleHash['事件名称']是一个数组，
*	来添加多个事件监听的方法，
*	unbind哪个事件的时候遍历handleHash['事件名称']的数组，
*	然后移除
*/
var handleHash = {};

// 使用方法 bind(obj,'event',function(){});
var bind = (function() {
	if (window.addEventListener) {
		return function(el, type, fn, capture) {
			el.addEventListener(type, function(){
				fn();
				handleHash[type] = handleHash[type] || [];
				handleHash[type].push(arguments.callee);
			}, capture);
		};
	} else if (window.attachEvent) {
		return function(el, type, fn, capture) {
			el.attachEvent("on" + type, function(){
				fn();
				handleHash[type] = handleHash[type] || [];
				handleHash[type].push(arguments.callee);
			});
		};
	}
})();

// 使用方法 unbind(obj,'event');
var unbind = (function(){
	if (window.addEventListener) {
		return function(el, type ) {
			if(handleHash[type]){
				var i = 0, len = handleHash[type].length;
				for (i; i<len ; i += 1){
					el.removeEventListener(type, handleHash[type][i]);
				}
			};
		};
	} else if (window.attachEvent) {
		return function(el, type) {
			if(handleHash[type]){
				var i = 0, len = handleHash[type].length;
				for (i; i<len ; i += 1){
					el.detachEvent("on" + type, handleHash[type][i]);
				}
			};
		};
	}
})();
