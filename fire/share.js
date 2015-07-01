/**
 * 复杂的ajax封装
 * @version 1.0
 *
 * 用法
 *  var xmlhttp = new YAjax();
 *    xmlhttp.request({
 *         url : "./demo.php",  // get请求时 可以这样写 "./demo.php?name=zhangsan"
 *        method : "POST",
 *        data : "name=李四",  // 支持json传值 {"name":"zhangsan"}  get时不用该参数
 *        receiveType : "html",  // json html or xml
 *        timeout : 3000,  // 3秒
 *        success : function(d) {alert(d);},
 *        error : function(xmlhttp){alert('timeout');}
 *    });
 *
 */
function YAjax() {
	this._self = this;
	this.xmlhttp = this.init();
}
YAjax.prototype = {
	constructor : YAjax,

	// 初始化xmlhttpRequest
	init : function() {
		var xmlhttp = null;

		// 针对不同浏览器建立这个对象的不同方式写不同代码
		if(window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
			//针对某些特定版本的Mozillar浏览器的BUG进行修正
			if(xmlhttp.overrideMimeType) {
				xmlhttp.overrideMimeType("text/xml");
			}

		} else if (window.ActiveXObject) {
			var activexName = ['MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
			for (var i=0; i<activexName.length; i++) {
				try {
					xmlhttp = new ActiveXObject(activexName[i]);
					break;
				} catch(e) {}
			}
		}

		return xmlhttp;
	},

	extend : function(destination, source, override) {
		if(undefined == override) override = true;
		if(typeof destination != "object" && typeof destination != "function") {
			if(!override)
				return destination;
			else
				destination = {};
		}
		var property = '';
		for(property in source) {
			if(override || !(property in destination)) {
				destination[property] = source[property];
			}
		}

		return destination;
	},

	// json to string {name: 'lisi', age: 10} --> name=lisi&age=10
	json2String : function(jsonData) {
		var strArr = [];
		for(var k in jsonData) {
			strArr.push(k + "=" + jsonData[k]);
		}

		return strArr.join("&");
	},

	// 发送http 请求
	request : function(opt) {
		var _self = this,
			isTimeout = false,
			timeFlag = 0,
			options = {
				url : "",   // string
				data : "",  // json or string
				method : "POST",
				receiveType : "html",  // html json or xml
				timeout : 7000,
				async : true,
				success : function(){alert("define your success function");},
				error : function(xmlhttp){}
			};
		if("data" in opt) {
			if(typeof opt.data == "string"){} else {opt.data = this.json2String(opt.data); }
		}
		options = this.extend(options, opt);

		this.xmlhttp.onreadystatechange = function(){
			if(_self.xmlhttp.readyState == 4) {
				if(!isTimeout && _self.xmlhttp.status == 200) {
					clearTimeout(timeFlag);
					var t = options.receiveType.toLowerCase();
					if(t == "html") {
						options.success(_self.xmlhttp.responseText);

					} else if(t == "xml") {
						options.success(_self.xmlhttp.responseXML);

					} else if(t == 'json') {
						try {
							var obj = JSON.parse(_self.xmlhttp.responseText);
							options.success(obj);
						} catch(e) {
							var str = '(' + _self.xmlhttp.responseText + ')';  //json字符串
							options.success(eval(str));
						}
					} else {}

				} else {
					clearTimeout(timeFlag);
					options.error(_self.xmlhttp);
				}
			}
		};

		timeFlag = setTimeout(function(){
			if(_self.xmlhttp.readyState != 4) {
				isTimeout = true;
				_self.xmlhttp.abort();
				clearTimeout(timeFlag);
			}
		}, options.timeout);

		this.xmlhttp.open(options.method.toUpperCase(), options.url, options.async);  //打开与服务器连接
		if(options.method.toUpperCase() == "POST") {
			this.xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');  //post方式要设置请求类型
			this.xmlhttp.send(options.data);  //发送内容到服务器
		} else {
			this.xmlhttp.send(null);
		}
	}
};
if(isWeiXinApp()) {
	//获取wx参数
	var signature, tempNum = 0;

	function getWeiXinParam() {
		var xmlhttp = new YAjax();
		xmlhttp.request({
			url : "http://gm.jiayuan.com/weixin/getSignature",
			method : "POST",
			data : {surl: encodeURIComponent(location.href.split('#')[0])},  // 支持json传值 {"name":"zhangsan"}  get时不用该参数
			receiveType : "json",  // json html or xml
			timeout : 3000,  // 3秒
			success: function (data) {
				wx.config({
					debug: false,
					appId: data.appId, // 必填，公众号的唯一标识
					timestamp: data.timestamp, // 必填，生成签名的时间戳
					nonceStr: data.nonceStr, // 必填，生成签名的随机串
					signature: data.signature,// 必填，签名，见附录1
					jsApiList: [
						'onMenuShareTimeline',
						'onMenuShareAppMessage'
					]
				})
				signature = data.signature;
				tempNum++;
			}
		})


	}

	getWeiXinParam();
	setTimeout(function () {
		if (!signature && tempNum < 2) {
			getWeiXinParam();
		}
	}, 500);

}


function isWeiXinApp(){
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		return true;
	}else{
		return false;
	}
}


