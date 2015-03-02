//----------------------------------------test1------------------
// function Cat(){
// 	this.name="小呆猫";
// }

// var cat1 =new Cat();
// // alert(cat1.name);

// Cat.prototype.makeSound= function(){
// 	alert("喵喵喵");
// }
// cat1.makeSound();

//-----------------------------------------test2-----------------
// 　var name = "The Window";
// 　　var object = {
// 　　　　name : "My Object",
// 　　　　getNameFunc : function(){
// 　　　　　　var that = this;
// 　　　　　　return function(){
// 　　　　　　　　return that.name;
// 　　　　　　};
// 　　　　}
// 　　};
// 　　alert(object.getNameFunc()());

// // test3
// 　　function Animal(){
// 　　　　this.species = "动物";
// 　　}
// 	function Cat(name,color){
// 　　　　this.name = name;
// 　　　　this.color = color;
// 　　}
// 　　Cat.prototype = new Animal();
// // 　　Cat.prototype.constructor = Cat;
// 　　var cat1 = new Cat("大毛","黄色");
// 　　alert(cat1.species); // 动物
// 	alert(Cat.prototype.constructor == Animal); //true

// -------------------------------------------test4-----------------------------
$(function(){
	var Test = function(){
		var massage ={
			tip:'测试闭包'
		};
		this.getName = function(){
			return massage.tip;
		}
  	};
	var test = new Test();
	test.name;        //  => undefined
	test.getName();   //  => 'fooname'
	$(".bibao").click(function(){
		alert(test.getName());
	})	
})
