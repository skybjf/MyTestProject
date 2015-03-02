function DBC2SBC(str) {
    var i;
    var result='';
    for(i=0; i < str.length; i++) {
        code = str.charCodeAt(i);
        if (code == 12290) {
             result += String.fromCharCode(46);
        }
        else if (code == 183) {
             result += String.fromCharCode(64);
        }
        else if(code >= 65281 && code<65373) {
             result += String.fromCharCode(str.charCodeAt(i)-65248);
        }
        else {
             result += str.charAt(i);
        }
    }
    return result;
}

function build_select(first_id,second_id,first_array,second_array,def_value) {
    if(def_value == "" || def_value == "0") {
        for( key in first_array ) {
            var sOption = new Option(first_array[key],key);
            document.getElementById(first_id).options.add(sOption);
        }
        var secondOption = new Option('--请选择--', 0);
        document.getElementById(second_id).options.add(secondOption);
    }
    else {
        pro_key = def_value.substr(0,2);
        for( key in first_array ) {
            var sOption =  new Option(first_array[key],key);
            if(pro_key == key) {
                sOption.id = "sele_pro"+first_id;
            }
            document.getElementById(first_id).options.add(sOption);
        }
        document.getElementById("sele_pro"+first_id).selected = true;
        for( key in second_array[pro_key] ) {
            var sOption = new Option(second_array[pro_key][key],key);
            if(def_value == key) {
                sOption.id = "sele_city"+second_id;
            }
            document.getElementById(second_id).options.add(sOption);
        }
        document.getElementById("sele_city"+second_id).selected = true;
    }
}

function build_second(first_value,second_id,second_array) {
    document.getElementById(second_id).innerHTML = "";
    for( key in second_array[first_value]) {
        var sOption = new Option(second_array[first_value][key],key);
        document.getElementById(second_id).options.add(sOption);
    }
}

function readSelectData(id,select_array,N) {
	var k=1;
    for( key in select_array) {
		if (key == 0 && N == 1) {
			continue;
		}
        var sOption   = document.createElement("OPTION");
        sOption.text  = select_array[key];
        sOption.value = key;
        document.getElementById(id).options.add(sOption,k);
		k++;
    }
}
//去空格
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

//Count string byte number, return integer
String.prototype.ByteCount = function(html) {
    if(typeof html =="undefined" || html == false) {
		txt = this.replace(/(<.*?>)/ig,"");
		txt = txt.replace(/([\u0391-\uFFE5])/ig, "11");
	}
	else {
		txt = this.replace(/([\u0391-\uFFE5])/ig, "11");
	}
	var count = txt.length;
	return count;
}

String.prototype.checkNickname = function() {
	var reg = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$");
	if (!reg.test(this)) {
	     return false;
	} else {
	     return true;
	}
}

String.prototype.checktruename = function() {
	var reg = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]){2,15}$");
	if (!reg.test(this)) {
	     return false;
	} else {
	     return true;
	}
}

String.prototype.strLength = function() {
	var str = this.replace(/([\u4E00-\uFA29]|[\uE7C7-\uE7F3])/ig, "**");
	return str.length;
}

String.prototype.checkChinese = function() {
	if(this.match(/[^\x00-\xff]/ig)) {
		return true;
	}
	return false;
}

// 手机号码验证，验证13系列和150-159(154除外)、180、185、186、187、188、189几种号码，长度11位 
function is_mobile(value) {
	 if(value.match(/^13\d{9}$/g)||value.match(/^15[0-35-9]\d{8}$/g)||value.match(/^18[0-9]\d{8}$/g)||value.match(/^14\d{9}$/g)){       
		return true;   
	 }
	 else{   
		return false;   
	 }   
}
 
//邮箱合法验证
function is_email(value) {
 	var reg = /^[_a-zA-Z0-9\-\.]+@([\-_a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,3}$/;
 	if(value.match(reg)) {
 		return true;
 	}
 	return false;
 }
 
//全角半角字符转换
function convertValue(input) {
	var isIE = (document.uniqueID)?1:0;
	if(isIE) {
		try{
			var cuRange=document.selection.createRange();
			var tbRange=input.createTextRange();
			tbRange.collapse(true);
			tbRange.select();
			var headRange=document.selection.createRange();
			headRange.setEndPoint("EndToEnd",cuRange);
			var position=headRange.text.length;
			cuRange.select();
			
			var originValue = input.value;
			input.value = DBC2SBC(originValue);
			
			//var r = input.createTextRange();
			tbRange.moveStart("character",position); 
			if(position == originValue.length) {
				tbRange.collapse(false);	    
			} else {
				tbRange.collapse(true);	    
			}
		}catch(e){}
		tbRange.select();
	} else {
		var originValue = input.value;
		input.value = DBC2SBC(originValue);
	}
}
//取url中的参数值
function get_query_string(url,name){ 
	var reg = new RegExp("(^|&|)"+ name +"=([^&]*)(&|$)"); 
	var r = url.substr(1).match(reg); 
	if (r!=null) return unescape(r[2]); return false; 
} 
//关键字过滤
function check_durty_words(thisinput){
	var durty_words = new Array("系统","管理","佳缘","master","版主","斑竹","龙女","客服","root","颁奖","活动","提示","兑奖","通知","百合","珍爱");
	for(i=0;i<durty_words.length;i++){
		if (thisinput.indexOf(durty_words[i])>=	0){
			return durty_words[i];
		}
	}
		//add by liuwei 特殊字符的验证
		//var req =/\!|\#|\^|\||\*|\&|\;|\$|\%|\@|\'|\"|\\\'|\\\"|\/|\\|\<.*\>|\<|\>|\(|\)|\+|\,|\r|\t|\f|\n|\s/gi;
		//var req2 =/\！|\#|\……|\：|\￥|\%|\@|\‘|\”|\、|\?|\\|\<.*\>|\《|\》|\（|\）|\+|\,/gi;//中文半角
		//var req3 =/\！|\＃|\……|\：|\×|\￥|\％|\＠|\‘|\“|\＼|\？|\＼|\《|\》|\（|\）|\+|\,/gi;//中文全角


	var req3 =/\<|\>/g;
		//if(null!=thisinput.match(req)){
		//  return thisinput.match(req).join(",");
		//}
		//if(null!=thisinput.match(req2)){
		//  return thisinput.match(req2).join(",");
		//}
	if(null!=thisinput.match(req3)){
		return thisinput.match(req3)[0];
	}
		//end add 
	return false;
}

function isIdCard(number){
	var date, Ai;
	var verify = "10X98765432";
	var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
	var area = ['','','','','','','','','','','','北京','天津','河北','山西','内蒙古','','','','','','辽宁','吉林','黑龙江','','','','','','','','上海','江苏','浙江','安微','福建','江西','山东','','','','河南','湖北','湖南','广东','广西','海南','','','','重庆','四川','贵州','云南','西藏','','','','','','','陕西','甘肃','青海','宁夏','新疆','','','','','','台湾','','','','','','','','','','香港','澳门','','','','','','','','','国外'];
	var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[X\d])))$/i);
	if(re == null) return false;
	if(re[1] >= area.length || area[re[1]] == "") return false;
	if(re[2].length == 12){
		Ai = number.substr(0, 17);
		date = [re[9], re[10], re[11]].join("-");
	}
	else {
		Ai = number.substr(0, 6) + "19" + number.substr(6);
		date = ["19" + re[4], re[5], re[6]].join("-");
	}
	if(!this.isDate(date, "ymd")) return false;
	var sum = 0;
	for(var i = 0;i<=16;i++){
		sum += Ai.charAt(i) * Wi[i];
	}
	Ai +=  verify.charAt(sum%11);
	if(number.length ==15 || number.length == 18 && number == Ai){
		return date;
	}
	return false;
}
function isDate(op, formatString){
		formatString = formatString || "ymd";
		var m, year, month, day;
		switch(formatString){
			case "ymd" :
				m = op.match(new RegExp("^((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})$"));
				if(m == null ) return false;
				day = m[6];
				month = m[5]*1;
				year =  (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
				break;
			case "dmy" :
				m = op.match(new RegExp("^(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))$"));
				if(m == null ) return false;
				day = m[1];
				month = m[3]*1;
				year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10));
				break;
			default :
				break;
		}
		if(!parseInt(month)) return false;
		month = month==0 ?12:month;
		var date = new Date(year, month-1, day);
        return (typeof(date) == "object" && year == date.getFullYear() && month == (date.getMonth()+1) && day == date.getDate());
		function GetFullYear(y){return ((y<30 ? "20" : "19") + y)|0;}
}

function showdiv(popDivid, is_scroll) {
	if($("#__MASKDIV")) $("#__MASKDIV").remove();
	var div_css = 'position:absolute;z-index:10000;top:0px;left:0px;background:#33393C;filter:alpha(opacity=80);opacity:0.8;';
	$("body").append("<div id='__MASKDIV' style='"+div_css+"'></div>");
	$("#"+popDivid).css({"position":"absolute","z-index": 99999});
	$("#"+popDivid).show();
	var createScroll = function() {
		var _Width = Math.max($(document).width(), $(window).width());
		var _Height = Math.max($(document).height(), $(window).height());
		$("#__MASKDIV").css({'width':_Width,'height': _Height});
		var scrollTop = $(document).scrollTop() || $(window).scrollTop();
		var _top = (scrollTop + $(window).height() / 2 - $('#'+popDivid).height() / 2);
		$("#"+popDivid).css({"top":_top});
	}
	createScroll();	
	if (typeof is_scroll == undefined) {
		//$(window).scroll(createScroll);
		//$(window).resize(createScroll);
	}
}

function closediv(popDivid) {
	if($("#__MASKDIV")) $("#__MASKDIV").remove();
	$("#"+popDivid).hide();
}

// 例子  mAlert({'content':'下载失败，稍后再试！', type : 'permission'})；
function mAlert(params) {
	if (typeof params != 'object') {
		return false;
	}
	var type = 'ts2';
	switch (params.type) {
		case 'error':
			type = 'ts2';
			break;
		case 'right':
			type = 'ts3';
			break;
		case 'warning':
			type = 'ts1';
			break;
		case 'permission':
			type = 'ts4';
			break;
	}
	var html = '<div class="popTs" id="touchPop" style="display:none;"><p class="'+ type +'"></p></div>';
	if ($("#touchPop")) {
		$("#touchPop").remove();
	}
	$('body').append(html);
	$('#touchPop p').html(params.content);
	if (typeof params.timer == 'undefined') {
		params.timer = '3000';
    }
	var createScroll = function() {
	    var scrollTop = $(document).scrollTop() || $(window).scrollTop();
		var _top = (scrollTop + $(window).height() / 2 - $('#touchPop').height() / 2 + 10);
		$("#touchPop").css({"top":_top});
	};
	createScroll();
	$(window).scroll(createScroll);
	$(window).resize(createScroll);
	
    $('#touchPop').show();
    
    setTimeout(function() {
    	$('#touchPop').hide();
    	if (typeof params.callback == 'function') {
    		params.callback();
    	}
    	params.callback = 'undefined';
    }, params.timer);   
}