/**
* 手机触屏生日弹层js
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
		$('#show_'+Config.input_year).bind('click', function() {
			$('#popYears,#popMonths,#popDays').remove();
			var curr = $('#'+Config.input_year).val();
			var year_html = build_year(curr);
			$('body').append(year_html);
			//Config['eventDoSomething']();
			showdiv('popYears');
			$('#popYears').css('top',0);
			
			$('#popYears span').bind('click', function(e) {
				if (!$(this).html().checkChinese()) {
					$('#show_'+Config.input_year).html($(this).html());
					$('#'+Config.input_year).val($(this).html());
					//Config['eventDoSomething']();
					$('#show_'+Config.input_month).click();
				}
			});
			
		});
		//month
		$('#show_'+Config.input_month).bind('click', function() {
			if ($('#'+Config.input_year).val() == 0) {
				return;
			}
			$('#popYears,#popMonths,#popDays').remove();
			var curr = $('#'+Config.input_month).val();
			var month_html = build_month(curr);
			$('body').append(month_html);
			//Config['eventDoSomething']();
			showdiv('popMonths');
			
			$('#popMonths li').bind('click', function(e) {
				$('#show_'+Config.input_month).html($(this).html());
				$('#'+Config.input_month).val($(this).html());
				//Config['eventDoSomething']();
				$('#show_'+Config.input_day).click();
			});
			
		});
		//day
		$('#show_'+Config.input_day).bind('click', function() {
			if ($('#'+Config.input_year).val() == 0 || $('#'+Config.input_month).val() == 0) {
				return;
			}
			$('#popYears,#popMonths,#popDays').remove();
			var curr = $('#'+Config.input_day).val();
			var day_html = build_day(curr);
			$('body').append(day_html);
			//Config['eventDoSomething']();
			showdiv('popDays');
			
			$('#popDays li').bind('click', function(e) {
				$('#show_'+Config.input_day).html($(this).html());
				$('#'+Config.input_day).val($(this).html());
				Config['eventDoSomething']();
				closediv('popDays');
				window.scrollTo(0, 0);
			});
			
		});

		$('body').bind('tap',function(e) {
			var clickDOM = $(e.target);
			var y = clickDOM.parents('.popInput');
			var birth = ['show_'+Config.input_year,'show_'+Config.input_month,'show_'+Config.input_day];
			if (!y.hasClass('popInput') && $.inArray(e.target.id, birth) == -1) {
				//window.scrollTo(0, 0);
				if ($('#popYears').is(':visible')) {
					closediv('popYears');
					Config['eventDoSomething']();
				}
				if ($('#popMonths').is(':visible')) {
					closediv('popMonths');
					Config['eventDoSomething']();
				}
				if ($('#popDays').is(':visible')) {
					closediv('popDays');
					Config['eventDoSomething']();
				}
			}
		});
		
		function build_year(curr) {
			var year = '<div class="popInput" id="popYears"><div class="hd">年份</div><ul class="bdC cle">';
			for (var y = 9; y >= 3; y --) {
				year += '<li><span>'+ y +'0\u540e\uff1a</span>';
				if (y == 9) {
					var valid_year = Config.cur_year - 18;
					for (var k = 1990; k <= valid_year; k ++) {
						if (curr == k) {
							year += '<span class="current">'+ k +'</span>';
						} else {
							year += '<span>'+ k +'</span>';
						}
					}
				} else {
					for (var k = 0; k < 10; k ++) {
						if (curr == '19'+y+k) {
							year += '<span class="current">19' + y + k +'</span>';
						} else {
							year += '<span>19' + y + k +'</span>';
						}
					}
				}
				year += '</li>';
			}
			year += '</ul></div>';
			return year;
		}
		
		function build_month(curr) {
			var inputYearVal = $('#'+Config.input_year).val();
			var month  = '<div class="popInput" id="popMonths" ><div class="hd">月份</div>';
			month += '<ul class="bdA cle">';
			var init_month = inputYearVal == Config.cur_year - 18 ? Config.cur_month : 12;
			for (var m = 1; m <= init_month; m ++) {
				if (curr == m) {
					month += '<li class="current">' + m + '</li>';
				} else {
					month += '<li>' + m + '</li>';
				}
			}
			month += '</ul></div>';
			return month;
		}
		
		function build_day(curr) {
			var init_day = {"1":31,"3":31,"4":30,"5":31,"6":30,"7":31,"8":31,"9":30,"10":31,"11":30,"12":31};
			var day = '<div class="popInput" id="popDays"><div class="hd">日期</div>';
			day += '<ul class="bdA cle">';
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
				if (curr == d) {
					day += '<li class="current">' + d + '</li>';
				} else {
					day += '<li>' + d + '</li>';
				}
			}
			day += '</ul></div>';
			return day;
		}
	});
})(Zepto);