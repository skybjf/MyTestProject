(function ($) {
	$(document).ready(function() {
		$('#nick').blur(function() {
			var nick = $.trim($(this).val());
			if (nick.length < 2 || nick.length > 20) {
				mAlert({'content': '昵称限2~20个字符'});
				$(this).parents('li').addClass('iptError');
				_setConfig('nick', false);
				return false;
			}
			if (nick != '') {
				if (!nick.checkNickname()) {
					mAlert({'content':'昵称限数字、字母、中文'});
					$(this).parents('li').addClass('iptError');
					_setConfig('nick', false);
					return false;
				}
				if (!isNaN(nick)) {
					mAlert({'content':'昵称不能全是数字'});
					$(this).parents('li').addClass('iptError');
					_setConfig('nick', false);
					return false;
				}
				$(this).parents('li').removeClass();
				_setConfig('nick', true);
				return true;
			}
		}).keyup(function(){
			if ($(this).val() != '') {
				$('#nick_cls').show();
			} else {
				$('#nick_cls').hide();
			}
		}).focus(function(){
			$(this).parents('li').removeClass();
		});

		var mobile_right=false;
		$('#mobile').blur(function() {
			var mobile = $.trim($(this).val());
			if(!is_mobile(mobile)){
				mAlert({'content': '请输入正确的手机号'});
				$(this).parents('li').addClass('iptError');
				_setConfig('mobile', false);
				return false;
			}else{
				$(this).parents('li').removeClass();
				_setConfig('mobile', true);
				mobile_right=true;
				return true;
			}
		}).focus(function(){
			$(this).parents('li').removeClass();
		});
		var mobile_code_right=false;
		$('#get_mcode').bind('click',function(){
			if(!mobile_right){
				mAlert({'content': '请输入正确的手机号'});
				$('#mobile').parents('li').addClass('iptError');
				return false;
			}else{
				// 获得验证码
			}
		});
		$('#mobile_code').blur(function() {
			var mobile_code = $.trim($(this).val());
			if (mobile_code.length=0 || mobile_code=="") {
				mAlert({'content': '请输入验证码'});
				$(this).parents('li').addClass('iptError');
				_setConfig('mobile_code', false);
				return false;
			}else{
				$(this).parents('li').removeClass();
				_setConfig('mobile_code', true);
				mobile_code_right=true;
				return true;
			}
		}).focus(function(){
			$(this).parents('li').removeClass();
		});

		$('#password').blur(function() {
			var password = $.trim($(this).val());
			if(password=="" || password.length==0){
				mAlert({'content': '请输入密码'});
				$(this).parents('li').addClass('iptError');
				_setConfig('password', false);
				return false;
			}
			else if(password.length<6){
				mAlert({'content': '密码太短了，至少6个字符'});
				$(this).parents('li').addClass('iptError');
				_setConfig('password', false);
				return false;
			}
			else if(password.length>20){
				mAlert({'content': '密码太长了，最多20个字符'});
				$(this).parents('li').addClass('iptError');
				_setConfig('password', false);
				return false;
			}
			else if(password.checkChinese()){
				mAlert({'content': '含有非法字符'});
				$(this).parents('li').addClass('iptError');
				_setConfig('password', false);
				return false;
			}
			else{
				$(this).parents('li').removeClass();
				_setConfig('password', true);
				return true;
			}
		}).keyup(function(){
			if ($(this).val() != '') {
				$('#password_cls').show();
			} else {
				$('#password_cls').hide();
			}
		}).focus(function(){
			$(this).parents('li').removeClass();
		});

		$('#realname').blur(function() {
			var realname = $.trim($(this).val());
			if(realname=="" || realname.length==0){
				mAlert({'content': '请输入您的姓名'});
				$(this).parents('li').addClass('iptError');
				_setConfig('realname', false);
				return false;
			}else{
				$(this).parents('li').removeClass();
				_setConfig('realname', true);
				return true;
			}
		}).keyup(function(){
			if ($(this).val() != '') {
				$('#realname_cls').show();
			} else {
				$('realname_cls').hide();
			}
		}).focus(function(){
			$(this).parents('li').removeClass();
		});

		$('#sex_m,#sex_f').click(function() {
			var sex = $(this).val();
			_setConfig('sex', true);
			_setConfig('intro', true);
		});
		$('#height').change(function() {
			if ($(this).val() == 0) {
				$(this).parents('li').addClass('iptError');
				_setConfig('height', false);
				return false;
			} else {
				$(this).parents('li').removeClass();
				_setConfig('height', true);
			}
		});
		$("input[name='marriage']").click(function() {
			_setConfig('marriage', true);
		});
		$('#education').change(function() {
			if ($(this).val() == 0) {
				$(this).parents('li').addClass('iptError');
				_setConfig('education', false);
				return false;
			} else {
				$(this).parents('li').removeClass();
				_setConfig('education', true);
			}
		});
		
		$('#salary').change(function() {
			if ($(this).val() == 0) {
				$(this).parents('li').addClass('iptError');
				_setConfig('salary', false);
				return false;
			} else {
				$(this).parents('li').removeClass();
				_setConfig('salary', true);
			}
		});
		$('#assets').change(function() {
			if ($(this).val() == 0) {
				$(this).parents('li').addClass('iptError');
				_setConfig('assets', false);
				return false;
			} else {
				$(this).parents('li').removeClass();
				_setConfig('assets', true);
			}
		});

		$('.clearTxt').click(function(){
			$(this).parent().find('input').val('').focus();
			$(this).hide();
		});

		if (!$.isEmptyObject(params)) {
			$.each(params, function(key, value) {
				if(key == 'sex') {
					var sex = parseInt(value) ? "sex_m":"sex_f";
					$("#"+sex).click();
				}
				if (key == 'location') {
					$("#province").val(value.live_location);
					$("#show_province").html(value.live_location_str);
					if(typeof(value.live_sublocation) != "undefined") {
						$("#city").val(value.live_sublocation);
						$("#show_city").html(value.live_sublocation_str);
						$("#show_city").removeClass();
						_setConfig('location', true);
					} else {
						$("#city").val(0);
						$("#show_city").html('选择市/区');
					}
				}
				if (key == 'marriage') {
					$.each($('input[name="marriage"]'),function(index, item){
						if (item.value == value) {
							 $(this).attr('checked', true);
						 	_setConfig(key, true);
						}
					})
				} 
				if (key == 'birth') {
					$('#birth_year').val(value.birth_year);
					$('#show_birth_year').html(value.birth_year).removeClass();
					$('#birth_month').val(value.birth_moth);
					$('#show_birth_month').html(value.birth_month).removeClass();
					$('#birth_day').val(value.birth_day);
					$('#show_birth_day').html(value.birth_day).removeClass();
					_setConfig('birthday', true);
				}
			});
		}
		$('select').change(function() {
			if ($(this).val() == 0) {
				$(this).addClass('hui');
			} else {
				$(this).removeClass();
			}
		});

	$('.buttonSub').bind('click', function() {
		if(_ckConfig()){
			$('#regfillbasic').submit();
		}else{
		      if($("#nick").val() == "" || !$("#nick").val().checkNickname() 
		        || $("#nick").val().strLength() < 2 || $("#nick").val().strLength() > 20 || !isNaN($("#nick").val())){
		        $("#nick").focus().blur();
		        checkAll('nick');
				return false;
		      }

		      if(!mobile_right){
		        $("#mobile").focus().blur();
		        checkAll('mobile');
				return false;
		      }

		      if(!mobile_code_right){
		      	$("#mobile_code").focus().blur();
		        checkAll('mobile_code');
				return false;
		      }

		      if($("#password").val() == "" || $("#password").val().length < 6 || $("#password").val().length > 20) {
		        $("#password").focus().blur();
		        checkAll('password');
				return false;
		      }

		      if($("#realname").val() == ''){
		        $("#realname").focus().blur();
		        checkAll('realname');
				return false;
		      }

			if(!$("#sex_f").attr('checked') && !$("#sex_m").attr('checked')) {
				$("#sex_m").focus();
				checkAll('sex_m');
				return false;
			}
			if ($("#show_birth_year").html() == "选择年" || $("#show_birth_month").html() == "选择月" || $("#show_birth_day").html() == "选择日"|| $('#birth_year').val() == '' || $('#birth_month').val() == '' || $('#birth_day').val() == '') {
				DateConfig['eventDoSomething']();
				$('#birth_year').focus();
				checkAll('birth_year');
				return false;
			}else{
				$('#birth_month').parents('li').removeClass();
			}
			
			if($("#height").val() == "0") {
				$("#height").focus().blur();
				checkAll('height');
				return false;
			}
			
			if($("#show_province").val() == "选择省/直辖市" || $("#show_city").val() == "选择市/区"|| $("#province").val() == 0 || $("#city").val() == 0 ) {
				$("#show_province").focus().blur();
				if($("#show_province").val() == "选择省/直辖市" || $("#province").val() == 0 || $("#show_city").val() == "选择市/区" || $("#city").val() == 0) {
					checkAll('show_province');
					return false;
				} 
			}else{
				$('#show_province').parents('li').removeClass();
			}
			
			if($("#education").val() == "0") {
				$("#education").focus().blur();
				checkAll('education');
				return false;
			}
      
		      if($("#marriage").val() == "0") {
		        $("#marriage").focus().blur();
		        checkAll('marriage');
				return false;
		      }

			if($("#salary").val() == "0") {
				$("#salary").focus().blur();
				checkAll('salary');
				return false;
			}
			if($("#assets").val()== "0") {
		      $("#assets").focus().blur();
		      checkAll('assets');
				return false;
		    }
		}
	});
	});
})(Zepto);
// var Config = ['sex','birthday','height','location','marriage','education','salary','nick'];
var Config = ['nick','mobile','mobile_code','password','realname','sex','birthday','height','location','education','marriage','salary','assets'];
var initConfig = {};
$.each(Config, function(index, value) {
	var temp = false;
	if (value == 'education' || value == "marriage") {
		temp = true;
	}
	initConfig[value] = temp;
});
$(function(){
	
})


function _setConfig(name, value) {
	initConfig[name] = value;	
	if (_ckConfig() && $('.buttonSub').hasClass('closeB')) {
		// $('.buttonSub').removeClass().addClass('buttonSub').bind('click', function() {
		// 	$('.buttonSub').removeClass().addClass('buttonSub closeB').unbind('click');
		// 	$('#regfillbasic').submit();
		// });
	}
	else if (!_ckConfig() && !$('.buttonSub').hasClass('closeB')) {
		// $('.buttonSub').removeClass().addClass('buttonSub closeB').unbind('click');
	}
	return true;
}

function _ckConfig() {
	for (var cfg in initConfig) {
		if (initConfig[cfg] == false) {
			return false;
		}
	}
	return true;
}
function checkAll(type) {
	$('#'+type).parents('li').addClass('iptError');
	switch(type) {
	case 'nick':
		mAlert({'content':'请检查您的昵称'});
		break;
	case 'mobile':
		mAlert({'content':'请检查您的手机号'});
		break;
	case 'mobile_code':
		mAlert({'content':'请检查您的验证码'});
		break;
	case 'password':
		mAlert({'content':'请检查您的密码'});
		break;
	case 'realname':
		mAlert({'content':'请检查您的姓名'});
		break;
	case 'sex_m':
		mAlert({'content':'请选择您的性别'});
		break;
	case 'birth_year':
		mAlert({'content':'请检查出生年月'});
		break;
	case 'height':
		mAlert({'content':'请检查您的身高'});
		break;
	case 'show_province':
		mAlert({'content':'请检查您的现居地'});
		break;
	case 'education':
		mAlert({'content':'请检查您的学历'});
		break;
	case 'marriage':
		mAlert({'content':'请检查您的婚史'});
		break;
	case 'salary':
		mAlert({'content':'请检查您的月薪'});
		break;
	case 'assets':
		mAlert({'content':'请检查您的资产'});
		break;
	default:
		break;
	}
	return;
}