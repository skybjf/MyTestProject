define(['jquery'],function(a){
	console.log(a);
	return {
		sayHello:function(){
			console.log($(this));
		},
		sayNo:function(){
			console.log("no");
		}
	}
})