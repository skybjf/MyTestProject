/*
	妙味课堂 移动端事件工具函数集合
*/

/*
	Tween 对象 运动算法
	必写参数：
		 t：执行的是第几次
		 b:  运动前初始位置
		 c:  初始值和目标值得差值
		 d: 执行总次数	 
	内容 各种 运动的计算函数
	计算函数函数的返回值 类型 数值	 
*/
var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 2.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};

/*
	css 函数
	注意事项:
		第一种使用方法：两个参数css(element,attr) 获取当前元素对应的attr样式 返回值 number (!!!注意 transform中的相关样式，需要先通过css函数来设置，才可以获取，否则获取的时候，返回的是0)
		
		第二种使用方法：三个参数css(element,attr,val) 设置当前元素对应的attr样式 ，不用加单位（px、deg、无单位）;(注意只能设置 数值类型的样式:)
		
		注意:
		opacity 和 scale/scaleY/scaleX 获取的时候结果会被乘以100，设置的时候也需要乘以100
		
		transform中可以设置和获取的所有样式:(	scale/rotate/rotateX/rotateY/rotateZ/scaleX/scaleY/translateY/translateX/translateZ
		)
		
	
*/
function css(element, attr , val){ //依赖于setTransform
	if(attr=='scale'|| attr=='rotate'|| attr=='rotateX'|| attr=='rotateY'|| attr=='rotateZ'|| attr=='scaleX'|| attr=='scaleY'|| attr=='translateY'|| attr=='translateX'|| attr=='translateZ'){
		return setTransform(element, attr , val);
	}
	if(arguments.length == 2){
		var val = element.currentStyle?element.currentStyle[attr]:getComputedStyle(element)[attr];
		if(attr=='opacity'){
			val = Math.round(val*100);
		}
		return parseFloat(val);
	} else {
		switch(attr){
			case 'width':
			case 'height':
			case 'paddingLeft':
			case 'paddingTop':
			case 'paddingRight':
			case 'paddingBottom':
			case 'borderWidth':
			case 'borderLeftWidth':
			case 'borderRightWidth':
			case 'borderTopWidth':
			case 'borderBottomWidth':
				val = val < 0 ? 0 : val;
			case 'left':
			case 'top':
			case 'marginLeft':
			case 'marginTop':
			case 'marginRight':
			case 'marginBottom':
				element.style[attr] = val +"px";
				break;
			case 'opacity':
				element.style.filter= "alpha(opacity:"+val+")";
				element.style.opacity= val/100;
				break;	
			default:
				element.style[attr]=val;	
		}
	}
}
function setTransform(element,attr,val){
	if(!element["transform"]){
		element["transform"] = {};
	}
	if(typeof val == "undefined"){
		val = element["transform"][attr];
		if(typeof val == "undefined"){
			val = 0;
			element["transform"][attr] = 0;
		}
		return val;
	} else {
		var str = "";
		element["transform"][attr] = val;
		for(var s in element["transform"])	 {
			switch(s){
				case 'rotate':
				case 'rotateX':
				case 'rotateY':
				case 'rotateZ':
					str += s+"("+element["transform"][s]+"deg) ";
					break;
				case 'translateX':
				case 'translateY':
				case 'translateZ':	
					str += s+"("+element["transform"][s]+"px) ";
					break;
				default:
					str += s+"("+element["transform"][s]+") ";
			}
		}
		element.style.MozTransform = element.style.msTransform  = element.style.WebkitTransform = element.style.transform = str;
	}
}

/*
	mTween 动画函数  
	参数 (
		el运动的元素，
		target 对应样式的目标值 类型对象 示例{left:200,width:200,height:300.....}
		time 动画时间
		type 动画类型(必须是Tween里边已有的类型)
		callBack 动画结束后的回调函数
	)
	注意：
		1.依赖于tween 和 css函数
		2.可以做动画的样式必须是css函数中可以设置和获取的样式
		3.动画类型必须是Tween里边已有的类型
*/
function mTween(el, target, time, type, callBack){
	var t = 0;
	var b = {};
	var c = {};
	var d = time / 20;
	for(var s in target){  /* 根据target对象进行便利，拿到所有需要修改的样式的初始值和差值 */
		b[s] = css(el, s); //获取修改的样式的初始值存入对象b
		c[s] = target[s] - b[s]; //计算修改的样式的差值 存入对象c
	}
	clearInterval(el.timer); 
	el.timer = setInterval(
		function(){
			t++;
			if(t>=d){
				clearInterval(el.timer);
				callBack&&callBack.call(el);
			}
			for(var s in b){
				var val = (Tween[type](t,b[s],c[s],d)).toFixed(2); //调用Tween对象对应的类型函数传入 对应的(t,b,c,d)拿到第t次应该到达的位置
				css(el, s, val);
			}
		},
		20
	);
}
/*
	类型:MScroll(init)
	调用:new MScroll(init)
	参数: init 类型 对象
			init:{
				element: 元素// 滑动区域(必写)
				showBar: true||false 是否显示滚动条
				dir: "x"||"y" 滚动方向
				isOver: true||false 是否添加超出范围限制 true 不能超出范围，false不加限制可以一直的进行滑动
				offMove: true||false  true关闭元素移动,但是iScroll值还在一直进行变化
				offScroll: true||false  true关闭元素移动,并且iScroll值不会变化
			}
	其他属性:
		MScroll.Scroll 移动的元素，为 element下的第0个子元素
		MScroll.iScroll 滑动距离
		MScroll.backout 回弹距离
		MScroll.move(dis,type,time,callBack) 进行滑动动画 参数(距离差值，动画形式，动画时间，动画结束后的回调函数)
	其他函数:	
		MScroll.reSize() 当MScroll.Scroll的高度（或宽度）发生改变之后，可通过此方法重新计算，滚动条比例 以及 范围限制
		MScroll.setTranslate() 操作MScroll.Scroll进行滑动，以及同步滚动条的位置
	事件：
		MScroll.onscrollstart = function(){};  用户手指按下
		MScroll.onscrollend = function(){};  	用户手指抬起
		MScroll.onscroll = function(){}; 元素滑动中(跟所用户手指滑动以及缓冲动画都会执行)
	关闭缓冲:
		MScroll.onscrollend = function(){
			clearInterval(this.timer);
		}; 
	关闭回弹:
		MScroll.backout = 0;
	注意：
		MScroll 依赖于css 和 Tween
*/
function MScroll(init){
	this.showBar = false;
	this.dir = "y";
	this.isOver = true;
	this.offMove = false;
	this.offScroll = false;
	for(var s in init){
		this[s] = init[s];
	}
	var _this = this;
	this.Scroll =  this.element.children[0]; /*为 element下的第0个子元素*/
	this.startPage = 0;   /* 记录用户按下去时的手指坐标 */
	this.startTranslate = 0; /* 记录用户按下去时，iScroll的数值 */
	this.iScroll = 0; /* 滚动的距离 */
	/*this.lastTime/this.lastTranslate/this.timeDis/this.translateDis 用来计算用户滑动玩缓冲动画的距离*/
	this.lastTime = 0;  /* 记录上次move触发事件的时候的时间戳 */
	this.lastTranslate = 0; /* 记录上次move触发事件的时候的iScroll值 */
	this.timeDis = 0;  /*记录上次move的时间戳和当前次move时间戳的差值*/
	this.translateDis = 0; /*记录上次move的iScroll值和当前次moveiScroll值的差值*/
	this.backout = 100; /* 回弹距离，默认100 */
	this.timer = 0; /* 记录定时器 */
	var isMove = false; /* 判断用户是否触发了touchmove */
	this.minTranslate = this.dir == "y"?(this.element.clientHeight - this.Scroll.offsetHeight):(this.element.clientWidth - this.Scroll.offsetWidth); /* 滑动的时候，iscroll向上滑动（或者向右滑动）的最大距离(数值为为负值，所有标min) */
	if(this.showBar){ /* 判断是否加滚动条*/
		this.scrollBar = document.createElement("div");
		if(this.dir == "y"){
			this.scale =  this.element.clientHeight  / this.Scroll.offsetHeight;
		 	this.scrollBar.style.cssText="width:4px;position:absolute;background:rgba(0,0,0,.5);right:0;top:0;border-radius:2px;min-height:4px; opacity:0; transition:.2s opacity;";
			this.scrollBar.style.height = this.element.clientHeight * this.scale +"px";
			
		} else {
			this.scale =   this.element.clientWidth  / this.Scroll.offsetWidth;
			this.scrollBar.style.cssText="height:4px;position:absolute;background:rgba(0,0,0,.5);left:0;bottom:0;border-radius:2px;min-width:4px;opacity:0; transition:.2s opacity;";
			this.scrollBar.style.width = this.element.clientWidth * this.scale +"px";
		}
		/*
			this.scale  滑动距离 和 this.scroll 滑动距离之间的比例 
			this.scrollBar 滚动条元素
		*/
		this.element.appendChild(this.scrollBar);
	}
	this.element.addEventListener("touchstart",
		function(e){
			isMove = false;
			_this.toStart(e);
		},
		false
	);
	this.element.addEventListener("touchmove",
		function(e){
			isMove = true;
			_this.toMove(e);
			e.preventDefault();
		},
		false
	);
	this.element.addEventListener("touchend",
		function(e){
			if(!isMove){
				return;
			}
			_this.toEnd(e);
		},
		false
	);
}
MScroll.prototype = {
	toStart: function(e){ /* 用户手指按下，准备开始滑动 */
		this.onscrollstart &&  this.onscrollstart();
		clearInterval(this.timer);
		var touch = e.changedTouches[0];
		this.startPage = this.dir == "y"? touch.pageY : touch.pageX;
		this.startTranslate = this.iScroll;
		this.lastTime = new Date().getTime(); // 100
		this.lastTranslate = this.iScroll;
		this.timeDis = 0;
		this.translateDis = 0; 
		if(this.showBar){
			this.scrollBar.style.opacity = 1;
		}
	},
	toMove: function(e){  /* 用户手指移动，跟随用户手指滑动 */
		if(this.offScroll){
			return;
		}
		var touch = e.changedTouches[0];
		var nowPage = this.dir == "y"? touch.pageY : touch.pageX;
		var nowTime = new Date().getTime(); 
		this.iScroll = this.startTranslate + (nowPage - this.startPage);
		if(this.minTranslate -  this.backout > this.iScroll && this.isOver){
			this.iScroll = this.minTranslate - this.backout;
		}
		if(this.iScroll > this.backout  && this.isOver){
			this.iScroll = this.backout;
		}
		this.timeDis = nowTime - this.lastTime; 
		this.lastTime = nowTime;
		this.translateDis = this.iScroll - this.lastTranslate; 
		this.lastTranslate =  this.iScroll;
		this.setTranslate();
	},
	toEnd: function(e){ /* 用户手指抬起 */
		var type = "easeOutStrong";
		/* 计算缓冲距离 */
		var speed = this.translateDis / this.timeDis*10;
		speed = this.timeDis == 0 ? 0 : speed; 
		speed = Math.abs(speed) > 5? speed*15 : speed*5;
		var target = speed + this.iScroll; 
		
		/* 判断缓冲完 是否会超出 */
		if( this.minTranslate > target  && this.isOver ){
			target = this.minTranslate;
			type = "backOut";
		}
		if(target > 0  && this.isOver){
			target = 0;
			type = "backOut";
		}
		
		
		this.move(target - this.iScroll,type); /*执行用户手指抬起时的缓冲动画 */
		
		this.onscrollend &&  this.onscrollend(target); //用户如果自定义了onscrollend事件就执行
	},
	setTranslate: function(){ // 同步元素移动距离 和 滚动条距离
		this.onscroll&&this.onscroll(); //用户如果自定义了onscroll事件就执行
		if(this.offMove){ //this.offMove 为true关闭元素移动
			return;
		}
		if(this.dir == "y"){
			this.scrollBar&&css(this.scrollBar,"translateY", -this.iScroll * this.scale);
			css(this.Scroll,"translateY",this.iScroll);
		} else {
			this.scrollBar&&css(this.scrollBar,"translateX", -this.iScroll * this.scale)
			css(this.Scroll,"translateX",this.iScroll);
		}
	},
	move: function(dis,type,time,callBack){  //动画函数  dis差值 /type 类型 /time时间/callback回调
	var _this = this;
	var t = 0;
	var b = this.iScroll;
	var c = dis;
	var d = 0;
	if(!time){
		d = 40;
	} else {
		d = time / 20;
	}
	clearInterval(this.timer);
	this.timer = setInterval(
		function(){
			t++;
			if(t >= d){
				clearInterval(_this.timer);
				callBack&&callBack();
				if(_this.showBar){
					_this.scrollBar.style.opacity = 0;
				}
			}
			var val = Tween[type](t,b,c,d);
			_this.iScroll = val;
			_this.setTranslate();
		},
		20
	);
	},
	reSize: function(){ //重置滚动条位置 和 最小距离
			this.minTranslate = this.dir == "y"?(this.element.clientHeight - this.Scroll.offsetHeight):(this.element.clientWidth - this.Scroll.offsetWidth); //重新计算最小距离
			this.scale =  this.dir == "y"? this.element.clientHeight  / this.Scroll.offsetHeight:this.element.clientWidth  / this.Scroll.offsetWidth;//重新计算滚动条比例
			if(this.scrollBar){
				/* 重新计算滚动条高度 */
				if( this.dir == "y"){
					this.scrollBar.style.height = this.element.clientHeight * this.scale +"px";
				} else {
					this.scrollBar.style.width = this.element.clientWidth * this.scale +"px";
				}
			}
			this.setTranslate();
	}
};
/*
	mTouch 调用滑屏事件
	示例：mTouch(el||els).swipeLeft(fn执行函数);
	注意：mTouch 依赖 TouchEevent
*/
function TouchEevent(obj){  // 参数objs
	var _this = this;
	this.obj = obj; 
	for(var i=0; i<this.obj.length; i++){ //循环一组元素进行操作
		this.obj[i].touches={x:0,y:0}; // 初始每个元素的初始值
		this.obj[i].isMove = false; //判断用户是否发生move事件
		this.obj[i].index = i;
		this.obj[i].addEventListener("touchstart",
			function(e){
				_this.fnStart(e,this.index);
			},
			false
		);
		this.obj[i].addEventListener("touchmove",
			function(e){
				this.isMove = true;
			},
			false
		);
		this.obj[i].addEventListener("touchend",
			function(e){
				_this.fnEnd(e,this.index);
			},
			false
		);
	}
}
TouchEevent.prototype = {
	fnStart: function(e,index){
			this.obj[index].touches={x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY}; //记录用户按下初始值
			this.obj[index].isMove = false; 
	},
	fnEnd: function(e,index){
			var nowTouches = {x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY}; //记录手指抬起坐标
			/* 计算坐标差值 */
			var disX = nowTouches.x -this.obj[index].touches.x;
			var disY = nowTouches.y - this.obj[index].touches.y;
			
			if(disX != 0 || disY != 0){ //判断用户发生了移动
				if(this.swipe){ 
					this.swipe.call(this.obj[index]);//如果有swipe就执行
				}
				if(disX > 10 && this.swipeRight){  //x差值  >10 并且 swipeRight存在，执行swipeRight
						this.swipeRight.call(this.obj[index]);
				}
				if(disX < -10 && this.swipeLeft){ //x差值 < -10 并且 swipeLeft存在，执行swipeLeft
					this.swipeLeft.call(this.obj[index]);
				}
				if(disY < -10 && this.swipeTop){ //y差值 < -10 并且 swipeTop存在，执行swipeTop
						this.swipeTop.call(this.obj[index]);
				}
				if(disY > 10 && this.swipeDown){ //y差值 > 10 并且 swipeDown存在，执行swipeDown
					this.swipeDown.call(this.obj[index]);
				}
			}
			if(!this.obj[index].isMove && this.tap){ //当用户没有发生move 并且tap存在，执行tap 
				this.tap.call(this.obj[index]);
			}
	},
	tap: function(fn){
		this.tap = fn; //如果传入了 tap要执行的函数了 就把函数赋给 this.tap
	},
	swipe: function(fn){
		this.swipe = fn;
	},
	swipeLeft: function(fn){
		this.swipeLeft = fn;
	},
	swipeRight: function(fn){
		this.swipeRight = fn;
	},
	swipeTop: function(fn){
		this.swipeTop = fn;
	},
	swipeDown: function(fn){
		this.swipeDown = fn;
	}
};
function mTouch(obj){ // obj: "css选择器"||object||objects  依赖:TouchEevent
	if(typeof obj == "string"){
		obj = document.querySelectorAll(obj);
	}
	if(typeof obj.length == "number")
	{
		return new TouchEevent(obj);
	}
	return new TouchEevent([obj]);
}
function getIos() //判断是否是IOS系统 是 返回true 否则 false
{
      var u = navigator.userAgent;
      return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

function setGravity(fn3){ //重力感应  依赖getIos
	var mEvent={
		x:0,   //x速度
		y:0,  //y加速
		z:0,  //z加速
		gamma:0, // rotateY
		alpha:0, // rotateZ
		beta:0 //rotateX
	};
	window.addEventListener("devicemotion",fn,false); //添加重力感应事件 -- 重力加速 
	window.addEventListener("deviceorientation",fn2,false); //添加重力感应事件 --  旋转角度
	function fn(e){
		var oMotion=e.accelerationIncludingGravity; //拿到加速对象
		/*
			处理Ios和安卓差异 
			获取重力加速
		*/
		if(getIos()){
			mEvent.x = oMotion.x;
			mEvent.y = oMotion.y;
			mEvent.z = oMotion.z;
		} else {
			mEvent.x = -oMotion.x;
			mEvent.y = -oMotion.y;
			mEvent.z = -oMotion.z;
		}
		fn3&&fn3(mEvent);
	}
	function fn2(e){
		/*获取旋转角度 */
		mEvent.gamma = e.gamma;
		mEvent.beta = e.beta;
		mEvent.alpha = e.alpha;
	}
}

function gravityShake(callBack,calling){ /*摇一摇函数   callBack摇完之后执行  calling摇动中执行*/
	var SHAKERANGE = 1500; //设置摇晃幅度 >幅度执行 
	var lastX = 0; 
	var lastY = 0;
	var lastZ = 0;
	var lastTime = 0;
	var isShanke = false;
	window.addEventListener("devicemotion",fnShake,false);
	function fnShake(e){
		var acceleratio = e.accelerationIncludingGravity;
		var nowTime = new Date().getTime();
		var disTime = nowTime - lastTime; 
		if(disTime > 100){
			var x = acceleratio.x;
			var y = acceleratio.y;
			var z = acceleratio.z;
			
			var speed = (x+y+z - lastX - lastY - lastZ)/disTime * 5000; /*检测当前的摇晃幅度*/
			
			if(speed > SHAKERANGE){ /*当前值>幅度参考界限 认定用户进行了摇一摇*/
				calling&&calling();
				isShanke = true;
			}
			if(isShanke&&speed<200){ /*当前值<200 认定用户摇一摇幅度变小结束了摇一摇*/
				isShanke = false;
				callBack&&callBack();
			}
			lastX = x;
			lastY = y;
			lastZ = z;
			lastTime = nowTime;
		}
	}
}
function getDistance(p1, p2) { /* 获取两点间的距离（勾股定理）p1第一个点的x,y坐标{pageX:10,pageY:10}   p2第二个点的x,y坐标{pageX:10,pageY:10} */
    var x = p2.pageX - p1.pageX,
        y = p2.pageY - p1.pageY;
    return Math.sqrt((x * x) + (y * y));
}

function getAngle(p1, p2) { /* 获取两个坐标点连成的直线，与x的交点的正方向夹角 */
    var x = p1.pageX - p2.pageX,
        y = p1.pageY- p2.pageY;
    return Math.atan2(y, x) * 180 / Math.PI;
}
function setGesture(el){ //el 执行多指操作的元素对象  依赖:getDistance 和 getAngle
	var obj = {}; 
	var isGesTure = false;
	var startPinter = [];
	el.addEventListener("touchstart",
		function(e){
			if(e.touches.length >= 2){ //判断在屏幕上的手指列表>=2时
				isGesTure = true; //认定用户开始了多指操作
				startPinter = e.touches; //记录初始手指坐标
				obj.gesturestart&&obj.gesturestart.call(el); //如果定了了gesturestart，执行 gesturestart
			}
		},
		false
	);
	document.addEventListener("touchmove",
		function(e){
			if(e.touches.length >= 2&&isGesTure){ //判断在屏幕上的手指列表>=2时 并且 在start时已经认定是多指操作
				var nowPinter = e.touches;
				var scale = getDistance(nowPinter[0], nowPinter[1]) / getDistance(startPinter[0], startPinter[1]); /* 获取当前两个手指间的距离 和 start时两个手指的距离的比例*/
				var rotate =  getAngle(nowPinter[0], nowPinter[1]) -  getAngle(startPinter[0], startPinter[1]); /*获取(当前两个手指连成的直线，与x的交点的正方向夹角)与( start时两个手指连成的直线，与x的交点的正方向夹角)的差值 */
				e.scale = scale; // 把缩放值加入 event中，ios下 event中默认有scale(只读) ，就不识别，安卓下 就在 event中新建立了一个 scale属性
				e.rotation = rotate; // 把旋转值加入 event中，ios下 event中默认有rotation(只读) ，就不识别，安卓下 就在 event中新建立了一个 rotation属性
				obj.gesturemove&&obj.gesturemove.call(el,e); //如果定了了gesturemove，执行 gesturemove 并且传入 event
			}
		},
		false
	)
	document.addEventListener("touchend",
		function(){
			if(isGesTure){
				isGesTure = false; //关闭多指判断
				obj.gestureend&&obj.gestureend.call(el); //如果定了了gestureend，执行 gestureend 
			}
		},
		false
	);
	return obj;
}
