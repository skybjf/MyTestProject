$(document).ready(function() {
	var width=$(window).width();
	var height=$(window).height();
	var page=0;
	downloadboxleft=width/2;
	downloadboxheight=height/2;
	var stringA="section fp-section activesection fp-sectionsection fp-sectionsection fp-sectionsection fp-section";
	blockMove($('.box_1'),'left',1000,'swing');
	blockMove($('.downloadbox'),'right',1000,'swing');
	// 点击导航控制微信框移动
	// 点击控制需要检查第几页其他不需要
	$('#fp-nav ul li a').each(function(g,n){
		$(this).click(function(){
			delta=page-g;
			page=g;
			setTimeout(function(){
				move(delta);
			}, 1);
			allMove(page);
		})
	});
	// 第一页头像显示动画
	page1Style($('.mohu1 img'),500,800);
	page1Style($('.mohu2 img'),500,1000);
	page1Style($('.mohu3 img'),500,1200);
	page1Style($('.mohu4 img'),500,1300);
	page1Style($('.head_left img'),500,1500);
	page1Style($('.head_right img'),500,1600);
	setTimeout(function(){
		$('.page1tip').animate({width: 224,height: 75,top: 110,"margin-left": -118,opcity:0},500,"");
	},1800);
	// 鼠标滚动控制微信框移动
	$(window).mousewheel(function(event, delta) {
		var flag=checkMove();
		if(flag){}
		else{
			if(delta<0){
				moveDownloadBox("down");
				page++;
				allMove(page);
			}else if(delta>0){
				moveDownloadBox("up");
				page--;
				allMove(page);
			}
		}
	});
	// 按动上下键控制微信框移动
	$(document).keydown(function(e){
		var keycode=e.keyCode;
		switch(keycode){
			case 38:
				var flag=checkMove(); 
				if(flag){}
				else{
					moveDownloadBox("up");
					page--;
					allMove(page);
				}
				break;
			case 40:
				var flag=checkMove();
				if(flag){}
				else{
					moveDownloadBox("down");
					page++;
					allMove(page);
				}
				break;
		}
	});
	// 检测微信框是否移动
	function checkMove(){
		var stringB="";
		$('.section').each(function(){
			stringB+=$(this).attr("class");
		});
		if(stringA===stringB){
			return true;
		}
		else{
			stringA=stringB;
			return false;
		}
	}
	// 点击右侧导航条微信框移动
	function move(delta){
		var flag=checkMove();
		if(flag){}
		else{
			if(delta<0){
				moveDownloadBox("down");
			}else if(delta>0){
				moveDownloadBox("up");
			}
		}
	}
});
// str支持down和up两种方式  可扩充left和right
function moveDownloadBox(str){
	var str1="linear";
	var str2="linear";
	switch(str){
		case "down":
			$(".downloadbox").animate({'margin-top':-300},350, str1).animate({'margin-top': -180}, 200, str2);
			break;
		case "up":
			$(".downloadbox").animate({'margin-top': -60}, 350, str1).animate({'margin-top': -180}, 200, str2);
			break;
	}
}
// direction描述的方式是指飞入方向，分别为从 左/右/上/下 飞入
function blockMove (obj,direction,time,style) {
	switch(direction){
		case "left":
			obj.animate({left:0},time,style);
			break;
		case "right":
			obj.animate({left:'50%'},time,style);
			break;
		case "top":
			obj.animate({left:0},time,style);
			break;
		case "bottom":
			obj.animate({left:0},time,style);
			break;
	}
}

function allMove(page){
	var initStyle=[
		{"box_1":{"left":"-100%"}},
		{"box_2":{"left":"-100%"}},
		{"top_3":{"margin":"-100% 0 0 0"},"bottom_3":{"margin":"0"}},
		{"top_4":{"top":"-100%"},"bottom_4":{"margin":"514px 0 0 0"}},
		{"box_5":{"left":"-100%"}}
	];
	var moveStyle=[
		{"box_1":{"left":"0"}},
		{"box_2":{"left":"0"}},
		{"top_3":{"margin":"-300px 0 0 0"},"bottom_3":{"margin":"-524px 0 0 0"}},
		{"top_4":{"top":"50%"},"bottom_4":{"margin":"-74px 0 0 0"}},
		{"box_5":{"left":"0"}}
	];
	switch(page){
		case 0:
			$('.box_1').animate({left:moveStyle[0].box_1.left},1000,"swing");

			$('.box_2').animate({left:initStyle[1].box_2.left},1000,"swing");
			$('.top_3').animate({margin:initStyle[2].top_3.margin},1000,"swing");
			$('.bottom_3').animate({margin:initStyle[2].bottom_3.margin},1000,"swing");
			$('.top_4').animate({top:initStyle[3].top_4.top},1000,"swing");
			$('.bottom_4').animate({margin:initStyle[3].bottom_4.margin},1000,"swing");
			$('.box_5').animate({left:initStyle[4].box_5.left},1000,"swing");
			break;
		case 1:
			$('.box_1').animate({left:initStyle[0].box_1.left},1000,"swing");
			$('.box_2').animate({left:moveStyle[1].box_2.left},1000,"swing");

			$('.top_3').animate({margin:initStyle[2].top_3.margin},1000,"swing");
			$('.bottom_3').animate({margin:initStyle[2].bottom_3.margin},1000,"swing");
			$('.top_4').animate({top:initStyle[3].top_4.top},1000,"swing");
			$('.bottom_4').animate({margin:initStyle[3].bottom_4.margin},1000,"swing");
			$('.box_5').animate({left:initStyle[4].box_5.left},1000,"swing");
			break;
		case 2:
			$('.box_1').animate({left:initStyle[0].box_1.left},1000,"swing");
			$('.box_2').animate({left:initStyle[1].box_2.left},1000,"swing");
			$('.top_3').animate({margin:moveStyle[2].top_3.margin},800,"swing");
			$('.bottom_3').animate({bottom:moveStyle[2].bottom_3.bottom,margin:moveStyle[2].bottom_3.margin},800,"swing");

			$('.top_4').animate({top:initStyle[3].top_4.top},1000,"swing");
			$('.bottom_4').animate({margin:initStyle[3].bottom_4.margin},1000,"swing");
			$('.box_5').animate({left:initStyle[4].box_5.left},1000,"swing");
			break;
		case 3:
			$('.box_1').animate({left:initStyle[0].box_1.left},1000,"swing");
			$('.box_2').animate({left:initStyle[1].box_2.left},1000,"swing");
			$('.top_3').animate({margin:initStyle[2].top_3.margin},1000,"swing");
			$('.bottom_3').animate({margin:initStyle[2].bottom_3.margin},1000,"swing");
			$('.top_4').animate({top:moveStyle[3].top_4.top},1000,"swing");
			$('.bottom_4').animate({margin:moveStyle[3].bottom_4.margin},1000,"swing");
			
			$('.box_5').animate({left:initStyle[4].box_5.left},1000,"swing");
			break;
		case 4:
			$('.box_1').animate({left:initStyle[0].box_1.left},1000,"swing");
			$('.box_2').animate({left:initStyle[1].box_2.left},1000,"swing");
			$('.top_3').animate({margin:initStyle[2].top_3.margin},1000,"swing");
			$('.bottom_3').animate({margin:initStyle[2].bottom_3.margin},1000,"swing");
			$('.top_4').animate({top:initStyle[3].top_4.top},1000,"swing");
			$('.bottom_4').animate({margin:initStyle[3].bottom_4.margin},1000,"swing");
			$('.box_5').animate({left:moveStyle[4].box_5.left},1000,"swing");
			break;
	}
}

function page1Style(obj,speed,time){
	setTimeout(function(){
		obj.animate({width:"100%",height:"100%",top:0,left:0,opcity:0},speed,"")
	},time);
}