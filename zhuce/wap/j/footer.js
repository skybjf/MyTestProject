
var footer_html = [];
footer_html.push('<footer class="aFooter">');
footer_html.push('<nav>');
footer_html.push('<a class="current" href="javascript:;">触屏版</a><span>|</span>');
footer_html.push('<a href="http://www.izhenxin.com/" >网页版</a><span>|</span>');
footer_html.push('<a href="javascript:;" onclick="download_apk();">客户端</a>');
footer_html.push('</nav>');
footer_html.push('<p>Copyright &copy; 2014 m.izhenxin.com 版权所有</p>');
footer_html.push('</footer>');


document.write(footer_html.join("\n"));

//baidu
;(function(){
	var head = document.getElementsByTagName('head')[0];
	var newScript = document.createElement('script');
	newScript.src = "//hm.baidu.com/hm.js?baa5cd4260cfb94a9fa1ba6d6077f602";
	newScript.charset = 'utf-8';
	newScript.type = 'text/javascript';
	head.appendChild(newScript);
})();

$.ajax({type:'get',url:'/home/getRelationNum/',dataType:'json',success:function(data){
	if(data.retcode == '00'){
		var all_num = data.data.all_num;
		if(parseInt(all_num) != 0){
			$('#unreadMessage').html('<i>消息<span class="iOne">'+all_num+'</span></i>');
			$('#head_msg').html('<i><span class="iOne">'+all_num+'</span></i><p>消息</p>');
		}
	}
}})