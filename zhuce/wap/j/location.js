/**
* 手机触屏地区弹层js
* @author zhangbiao@jiayuan.com
**/
(function ($) {
	$(document).ready(function() {
	function BuildLocation() {
		var me = this;
		
		me.province_list = {
			11:'北京',12:'天津',31:'上海',50:'重庆',13:'河北',14:'山西',32:'江苏',
			33:'浙江',34:'安徽',37:'山东',35:'福建',45:'广西',52:'贵州',46:'海南',
			41:'河南',42:'湖北',43:'湖南',21:'辽宁',22:'吉林',23:'黑龙江',36:'江西',
			44:'广东',15:'内蒙古',51:'四川',53:'云南',54:'西藏',61:'陕西',62:'甘肃',
			63:'青海',64:'宁夏',65:'新疆',71:'台湾',81:'香港',82:'澳门',83:'钓鱼岛',
			99:'国外'
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
		};
		
		me.location = function() {
			me.init();
			$.each(me.LCT, function(index, value) {
				var province = value[0];
				var city = value[1];
				var show_province = me.prefix + "_" + province;
				var show_city = me.prefix + "_" + city;

				//province input click
				$("#"+show_province).bind('click', function() {
					$("#sel_province,#sel_city").remove();

					var curr = $('#'+province).val();
					var province_html = build_province(curr);
					$("body").append(province_html);
					
					//bind province name a click
					$("#sel_province li").bind('click', function() {
				    	var loc = $(this).attr('v'); 
				    	$("#"+province).val(loc);
				    	$("#"+show_province).html($(this).html());
				    	$("#"+city).val(0);
				    	if (me.limit && loc == 0 && $(this).html() == '不限') {
				    		$("#"+show_city).html('不限');
				    		closediv('sel_province');
				    		return false;
				    	}
				    	$("#"+show_city).html('选择市/区').click();
				    	me.eventDoSomething(value);
					});
					showdiv('sel_province');
				});
				
				//city input click
				$("#"+show_city).bind('click', function() {
					if ($("#"+show_province).html() != "选择省/市" && $("#"+province).val() != 0) {
						$("#sel_province,#sel_city").remove();

						var curr = $('#'+city).val();
						var city_html = build_city($("#"+province).val(),curr);
						$("body").append(city_html);
						
						
						$('#sel_city li').bind('click', function(){
							$("#"+city).val($(this).attr('v'));
				    		$("#"+show_city).html($(this).html());
				    		closediv('sel_city');
							me.eventDoSomething(value);
						});
						showdiv('sel_city');
					}
				});
				
			});
			
			$('body').bind('tap', function(e) {
				var clickDOM = $(e.target);
				var y = clickDOM.parents('.popInput');
				var loc = [];
				$.each(me.LCT, function(index, value) {
					var province = value[0];
					var city = value[1];
					var show_province = me.prefix + "_" + province;
					var show_city = me.prefix + "_" + city;
					loc.push(show_province,show_city);
				});
				if (!y.hasClass('popInput') &&  $.inArray(e.target.id, loc) == -1 ) {
					if ($('#sel_province').is(':visible')) {
						closediv('sel_province');
					} 
					if ($('#sel_city').is(':visible')) {
						closediv('sel_city');
					}
				}
			});
		};
		
		//build province pop div
		var build_province = function(curr) {
			var province_html = '<div class="popInput" id="sel_province" style="display:none;">';

			province_html += '<div class="hd">省/市</div><ul class="bdB cle">';
			if (me.limit) {
				$.extend(me.province_list,{'0':'不限'});
			}
			$.each(me.province_list, function(key, value) {
				if (key == curr) {
					province_html += '<li v="'+ key +'" class="current">'+ value +'</li> ';
				} else {
					province_html += '<li v="'+ key +'">'+ value +'</li> ';
				}
			});
			province_html += '</ul>';
	        province_html += '</div>';
	        return province_html;
		};
		
		//build city pop div
		var build_city = function(loc_num,curr) {
			var city_html = '<div class="popInput" id="sel_city" style="display:none;">';
	    	city_html += '<div class="hd">市/区</div><ul class="bdB cle">';
	    	if (me.limit) {
				COK[loc_num][0] = '不限';
			}
	    	$.each(COK[loc_num], function(num, text) {
	    		if(typeof text != "undefined" && text != "--请选择--") {
	    			if (num == curr) {
	    				city_html += '<li v="'+ num +'" class="current">'+ text +'</li> ';
	    			} else {
	    				city_html += '<li v="'+ num +'">'+ text +'</li> ';
	    			}
	    		}
	    	});
	    	city_html += '</ul>';
	        city_html += '</div>';
			return city_html;
		};
		
		me.eventDoSomething = function() {
			//do something
		}
	}
	
	var BL = new BuildLocation();
	BL.location();
	});
})(Zepto);