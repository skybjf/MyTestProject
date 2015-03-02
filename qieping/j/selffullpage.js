$(function(){
	var $win=$(window);
	var wHieght=parseInt($win.height());
	var wWidth=parseInt($win.width());

	$win.resize(function(){
		wHieght=parseInt($win.height());
		wWidth=parseInt($win.width());
		// if(count==-1){
		// 	var box=$boxs.eq(0);
		// 	box.css({"top":wHieght+'px'});
		// }else{
		// 	var box=$boxs.eq(count);
		// 	box.css({"height":wHieght+'px'});
		// }
	});

	

})