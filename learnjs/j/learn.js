(function($){
	$.fn.extend({
		'alertHI':function(){
			$(this).bind('click',function(){
				alert("hi");	
			})
		}
	})

})(jQuery)