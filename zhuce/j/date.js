/**
* 生日弹层js
* @author zhangbiao@jiayuan.com
**/
(function ($) {
	$(document).ready(function() {
		var myDate = new Date();
		var Config = {
			"cur_year" : myDate.getFullYear(),
			"cur_month" : myDate.getMonth() + 1,
			"cur_day" : myDate.getDate(),
			"input_year" : "birth_year",
			"input_month": "birth_month",
			"input_day" : "birth_day",
			"input_err" : "birthday_error",
			"input_right": "birthday_right"
		}
		var DateConfig = window["DateConfig"];
		if(typeof(DateConfig) != "object" ) {
			DateConfig = {};
		}
		$.extend(Config, DateConfig);
		//year
		$('#'+Config.input_year).bind('click', function() {
			if ($('#birthyearpop')) $('#birthyearpop').remove(); 
			$('#birthmonthpop, #birthdaypop').hide();
			var year_html = build_year();
			$('#'+Config.input_day).after(year_html);
			Config['eventDoSomething']();
			$('#birthyearpop a').bind('click', function(e) {
				$('#'+Config.input_year).val($(this).html());
				Config['eventDoSomething']();
				$('#'+Config.input_month).click();
			});
		});
		//month
		$('#'+Config.input_month).bind('click', function() {
			if ($('#birthmonthpop')) $('#birthmonthpop').remove(); 
			$('#birthyearpop, #birthdaypop').hide();
			var month_html = build_month();
			$('#'+Config.input_day).after(month_html);
			Config['eventDoSomething']();
			$('#birthmonthpop a').bind('click', function(e) {
				$('#'+Config.input_month).val($(this).html());
				Config['eventDoSomething']();
				$('#'+Config.input_day).click();
			});
		});
		//day
		$('#'+Config.input_day).bind('click', function() {
			if ($('#birthdaypop')) $('#birthdaypop').remove(); 
			$('#birthyearpop, #birthmonthpop').hide();
			var day_html = build_day();
			$('#'+Config.input_day).after(day_html);
			Config['eventDoSomething']();
			$('#birthdaypop a').bind('click', function(e) {
				$('#'+Config.input_day).val($(this).html());
				Config['eventDoSomething']();
				$('#birthdaypop').remove();
			});
		});
		
		$('body').bind('click', function(e) {
			var clickDOM = $(e.target);
			var y = clickDOM.parents('.birthdayPop');
			if (!y.hasClass('birthdayPop') && e.target.id != Config.input_year 
				&& e.target.id != Config.input_month && e.target.id != Config.input_day) {
				$('#birthyearpop, #birthmonthpop, #birthdaypop').remove();
			}
		});
		
		function build_year() {
			var year = '<div class="birthdayPop" id="birthyearpop"><h4 class="birthdayPopTitle">\u8bf7\u9009\u62e9\u5e74</h4>';
			for (var y = 9; y >= 3; y --) {
				year += '<dl class="birthdayPopYear fn-clear"><dt>'+ y +'0\u540e\uff1a</dt>';
				if (y == 9) {
					var valid_year = Config.cur_year - 18;
					for (var k = 1990; k <= valid_year; k ++) {
						year += '<dd><a href="javascript:;">'+ k +'</a></dd>';
					}
				} else {
					for (var k = 0; k < 10; k ++) {
						year += '<dd><a href="javascript:;">19' + y + k +'</a></dd>';
					}
				}
				year += '</dl>';
			}
			year += '</div>';
			return year;
		}
		
		function build_month() {
			var inputYearVal = $('#'+Config.input_year).val();
			var month  = '<div class="birthdayPop" id="birthmonthpop"><h4 class="birthdayPopTitle">\u8bf7\u9009\u62e9\u6708</h4>';
			month += '<ul class="birthdayPopUl fn-clear">';
			var init_month = inputYearVal == Config.cur_year - 18 ? Config.cur_month : 12;
			for (var m = 1; m <= init_month; m ++) {
				month += '<li class="fn-left"><a href="javascript:;">' + m + '</a></li>';
			}
			month += '</ul></div>';
			return month;
		}
		
		function build_day() {
			var init_day = {"1":31,"3":31,"4":30,"5":31,"6":30,"7":31,"8":31,"9":30,"10":31,"11":30,"12":31};
			var day = '<div class="birthdayPop" id="birthdaypop"><h4 class="birthdayPopTitle">\u8bf7\u9009\u62e9\u65e5</h4>';
			day += '<ul class="birthdayPopUl fn-clear">';
			var inputMonthVal = $('#'+Config.input_month).val();
			var inputYearVal =  $('#'+Config.input_year).val();
			if ((inputYearVal % 4 == 0 && inputYearVal % 100 != 0) 
			    || (inputYearVal % 100 == 0 && inputYearVal % 400 == 0)) {
				$.extend(init_day, {"2":29});
			} else {
				$.extend(init_day, {"2":28});
			}
			var dayCount = (inputYearVal == Config.cur_year - 18) && inputMonthVal == Config.cur_month ? Config.cur_day : init_day[inputMonthVal];
			for (var d = 1; d <= dayCount; d ++) {
				day += '<li class="fn-left"><a href="javascript:;">' + d + '</a></li>';
			}
			day += '</ul></div>';
			return day;
		}
	});
})(jQuery);