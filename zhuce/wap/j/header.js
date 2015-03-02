;(function($){
	/*此函数接受一个obj{}
	**键名cat表示调用的类别
	*cat为user表示调用带返回上一步的头
	*cat为login表示调用登录与注册的头
	*没有cat属性表示调用一级头(即cat为one)
	***********************
	*title为显示的标题
	*/
	var init_lock = false;
	init_header = function(){
		if(init_lock == true){
			return false;
		}
		init_lock = true;
		var conf = {};
		if(arguments.length > 0){
			conf = arguments[0];
		} 
		var htm = '';
		if(conf['cat'] == null){
			conf['cat'] = 'one';
		}
		if(conf['cat'] == 'user'){
			htm = get_html(tmp_func3);
			if(conf['hash'] == null){
				conf.hash = false;
			}
			htm = htm.replace(/#title#/g, conf['title'])
				 .replace(/#url#/g, conf['url'])
				 .replace(/#hash#/g, conf['hash']);
		}
		$(function(){
			if($('#izx-header').length > 0){
				$('#izx-header').remove();
			}
			$('body').prepend(htm);
			initEvent();
		});
	}
	unlock_header = function(){
		init_lock = false;
	}
	function login_reg_conf(conf){
		var login_obj = {
			login : '登录',
			register : '注册',
			client : '客户端',
			none : ''
		};
		if(conf['url'] == null){
			var curr = current_path.split('/')[0];
			if(curr == 'login'){
				conf['url'] = 'register';
			}
			if(curr == 'register'){
				conf['url'] = 'login';
			}
		}
		var url = conf['url'].replace(/^\/*|\/*$/g, '');
		url = url.split('/')[0];
		if(typeof conf['url_title'] == 'undefined'){
			conf['url_title'] = login_obj[url];
		}
		conf['display'] = 'block';
		if(url == 'client'){
			if(!is_android()){
				conf['display'] = 'none';
			}
		}
		if(conf['url'] == 'none'){
			conf['display'] = 'none';
		}
		return conf;
	}
	is_android = function(){
		var agent = navigator.userAgent;
		if(/(Android);?[\s\/]+([\d.]+)?/.test(agent)){
			return true;
		}else{
			return false;
		}
	}
	var onlogin_url = ['search', 'user'];
	//通用头部html模板
	var tmp_func1 = function(){/*
<header id="izx-header">
	<div class="tit">#title#</div>
</header>
	*/};
	//通用头部html模板
	//通用头部html模板

	function get_html(func_nm){
		return func_nm.toString().match(/[^]*\/\*([^]*)\*\/[^]*}$/)[1];
	}
	function initEvent(){
		$('.appDownload .close1').on('click', function(event){
			$(".appDownload").fadeOut(500);
			event.stopPropagation();
		});
		$('.appDownload').on('click', function(event){
			download_apk();
		});
		init_popbar();
	}
	var userinfo = getCookie('USERINFO');
	var uid = null;
	if(userinfo != null){
		uid = userinfo.split(':')[0];
	}
	var current_path = location.pathname;
	current_path = current_path.replace(/^\/*|\/*$/g, '');
	var one_conf = {
		home : '',
		me : '',
		search : '',
		message : '',
		topic : ''
	};

	//一级头部自动出现

	//顶部导航
	var EX = {
	  addEvent:function(k,v){
	    var me = this;
	    if (me.addEventListener)
	      me.addEventListener(k, v, false);
	    else if(me.attachEvent)
	      me.attachEvent("on" + k, v);
	    else
	      me["on" + k] = v;
	  },
	  removeEvent:function(k,v){
	    var me = this;
	    if (me.removeEventListener)
	      me.removeEventListener(k, v, false);
	    else if (me.detachEvent)
	      me.detachEvent("on" + k, v);
	    else
	      me["on" + k] = null;
	  },
	  stop:function(evt){
	    evt = evt || window.event;
	    evt.stopPropagation?evt.stopPropagation():evt.cancelBubble=true;
	  }
	};
	function init_popbar(){
	  if($('#popTopBar').length > 0){
	    document.getElementById('popTopBar').onclick = EX.stop;
	    var url = '#'; 
	    showaa =function(){ 
	      var o = document.getElementById('popTopBar'); 
	      o.style.display = "";
	      setTimeout(function(){EX.addEvent.call(document,'click',hideaa);});
	    }
	    hideaa = function(){ 
	      var o = document.getElementById('popTopBar');
	      o.style.display = "none";
	      EX.removeEvent.call(document,'click',hideaa);
	    }
	  }
	}
})($);