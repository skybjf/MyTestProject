$(function(){
	var $win=$(window);
	// 屏幕 宽高
	var wHieght=parseInt($win.height());
	var wWidth=parseInt($win.width())-20;
	// 
	var count=-1;
	var $boxs=$('#box li');
	$(window).mousewheel(function(eventA, delta){
		if(delta<0){
			$('#box1').animate({
				top: 0,
				opacity: 1 
			}, 500, 'easeOutSine');
		}else if(delta>0){
			$('#box1').animate({
				top: -wHieght,
				opacity: 1 
			}, 500, 'easeOutSine');
		}
	});
	// 屏幕重置宽高
	$win.resize(function(){
		wHieght=parseInt($win.height());
		wWidth=parseInt($win.width());
		console.info(wHieght+" - "+wWidth);
		if(count==-1){
			var box=$boxs.eq(0);
			box.css({"top":wHieght+'px'});
		}else{
			var box=$boxs.eq(count);
			box.css({"height":wHieght+'px'});
		}
	});
	console.log(wHieght+" - "+wWidth);
	$('.box').css({'height':wHieght,"top":wHieght});
	$('.btn').click(function(){
		console.log(12121);
		console.log($(document).height());
		console.log($(window).height());
		$('#box1').animate({ 
			top: 0,
			opacity: 1 
		}, 500, 'linear');
	})
})