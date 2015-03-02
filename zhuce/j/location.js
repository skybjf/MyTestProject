/**
* 地区弹层js
* @author zhangbiao@jiayuan.com
**/
(function ($) {
	$(document).ready(function() {
	function BuildLocation(){
		var me = this;
		me.province_list = {
		'A-G':{34:'安徽',11:'北京',50:'重庆',35:'福建',62:'甘肃',44:'广东',45:'广西',52:'贵州',82:'澳门',83:'钓鱼岛',99:'国外'},
		'H-J':{46:'海南',13:'河北',41:'河南',23:'黑龙江',42:'湖北',43:'湖南',22:'吉林',32:'江苏',36:'江西'},
		'L-S':{21:'辽宁',15:'内蒙古',64:'宁夏',63:'青海',37:'山东',14:'山西',61:'陕西',31:'上海',51:'四川'},
		'T-Z':{71:'台湾',12:'天津',54:'西藏',81:'香港',65:'新疆',53:'云南',33:'浙江'}
		};
		me.prefix = 'show'; //show input id prefix, default show
		me.LCT = [];		//location id sets
		me.limit = false;	//whether display limit, default false
		
		me.init = function () {
			var locConfig = window["locationConfig"];
			if(typeof(locConfig) != "object" ) {
				locConfig = {};
			}
			for (var name in locConfig) {
				me[name] = locConfig[name];
			}
			me.limit = me.limit ? '<a v="0" href="javascript:;">不限</a>': '';
			var master_css = $("link[href$='master.css']").attr('href');
			if(typeof master_css == "undefined") {
				var css_base_url = $("link")[0].href;
				css_base_url = css_base_url.replace('http://', '');
				var base_url = css_base_url.split('/');
			    $('head').append("<link href='http://"+base_url[0]+"/css/common/master.css' rel='stylesheet' type='text/css'/>");
			}
		};
		
		me.location = function() {
			me.init();
			$.each(me.LCT, function(index, value) {
				var province = value[0];
				var city = value[1];
				var show_province = me.prefix+"_"+province;
				var show_city = me.prefix+"_"+city;
				
				//province input click
				$("#"+show_province).bind('click', function() {
					if($(".sel_province")) $(".sel_province").remove();
					var province_html = build_province();
					$("#"+show_city).after(province_html);
					$(".sel_city").hide();
					me.eventDoSomething(value);
					
					//bind province name a click
					$(".sel_province").find('a').bind('mouseover', function() {
						$("#"+show_province).unbind('blur');
					}).bind('mouseout', function() {
						$("#"+show_province).bind('blur', function() {
							$('.sel_province').hide();
							me.eventDoSomething(value);
						});
					}).bind('click', function() {
		    			$(".sel_province").hide();
		    			var loc = $(this).attr('v'); 
		    			$("#"+province).val(loc);
		    			$("#"+show_province).val($(this).html());
		    			if(loc == 0 || $(this).html() == '不限') {
		    				$("#"+city).val(loc);
				    		$("#"+show_city).val($(this).html());
				    		return false;
		    			}
		    			$("#"+show_city).focus();
		    			$("#"+show_city).val('选择市/区');
						$("#"+city).val(0);
		    			me.eventDoSomething(value);
		    			var city_html = build_city(loc);
		    			if($(".sel_city")) $(".sel_city").remove();
				    	$("#"+show_city).after(city_html);
				    	$(".sel_city").show();
				    	
				    	//bind city a click
				    	$(".sel_city").find('a').bind('mouseover', function() {
							$("#"+show_city).unbind('blur');
						}).bind('mouseout', function() {
							$("#"+show_city).bind('blur', function() {
								$('.sel_city').hide();
							});
						}).bind('click', function() {
				    		$(".sel_city").hide();
				    		$("#"+city).val($(this).attr('v'));
				    		$("#"+show_city).val($(this).html());
				    		$(".sel_province").find('a').unbind('click');
				    		me.eventDoSomething(value);
				    	});
				    	
					});
					$(".sel_province").show();
				}).bind('blur', function() {
					$(".sel_province").find('a').unbind('mouseout');
					$('.sel_province').hide();
					me.eventDoSomething(value);
				});
				
				//city input click
				$("#"+show_city).bind('click', function() {
					if($("#"+show_province).val() != "选择市/区" && $("#"+province).val() != 0) {
						var city_html = build_city($("#"+province).val());
						if($(".sel_city")) $(".sel_city").remove();
				    	$("#"+show_city).after(city_html);
				    	$(".sel_city").show();
				    	//bind city a click
				    	$(".sel_city").find('a').bind('mouseover', function(){
							$("#"+show_city).unbind('blur');
						}).bind('mouseout', function() {
							$("#"+show_city).bind('blur', function() {
								$('.sel_city').hide();
							});
						}).bind('click', function() {
				    		$(".sel_city").hide();
				    		$("#"+city).val($(this).attr('v'));
				    		$("#"+show_city).val($(this).html());
				    		$(".sel_province").find('a').unbind('click');
				    		me.eventDoSomething(value);
				    	});
						me.eventDoSomething(value);
					}
				}).bind('blur', function() {
					$('.sel_city').hide();
					me.eventDoSomething(value);
				});
				
			});
	
		};
		
		//build province pop div
		var build_province = function() {
			var province_html = '<div class="selectBox sel_province" style="display:none;left:-100px; top:22px; z-index:9999;">';
			province_html += '<div class="pl20 pt10 lh26 pb15"><h3>请选择省/直辖市&nbsp;&nbsp;&nbsp;'+ me.limit +'</h3>';
			$.each(me.province_list, function(key, value) {
				province_html += '<h6 class="fb">'+ key +'</h6><p class="try_text">';
				$.each(value, function(number, val) {
					province_html += '<a v="'+ number +'" href="javascript:;">'+ val +'</a> ';
				});
			});
			province_html += '</p></div>';
	        province_html += '<!--[if lte IE 6.5]><iframe src="javascript:\'\';"></iframe><![endif]--></div>';
	        return province_html;
		};
		
		//build city pop div
		var build_city = function(loc_num) {
			var city_html = '<div class="selectBox sel_city" style="display:none; left:10px; top:22px; z-index:9999;">';
	    	city_html += '<div class="pl20 pt10 lh26 pb15"><h3>请选择市/区&nbsp;&nbsp;&nbsp;'+ me.limit +'</h3><p class="try_text"> ';
	    	$.each(COK[loc_num], function(num, text) {
	    		if(typeof text != "undefined" && text != "--请选择--") {
	    			city_html += '<a v="'+ num +'" href="javascript:;">'+ text +'</a> ';
	    		}
	    	});
	    	city_html += '</p></div><!--[if lte IE 6.5]><iframe src="javascript:\'\';"></iframe><![endif]--></div>';
			return city_html;
		};
		
		me.eventDoSomething = function() {
			//do something
		}
	}
	
	var BL = new BuildLocation();
	BL.location();
	});
})(jQuery);