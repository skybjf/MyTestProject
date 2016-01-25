requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery:'jquery.min'
    },
    urlArgs: "v=" + new Date().getTime()
});

requirejs(["jquery","app"],function($,app) {
    $(".btn").on("click",function(){
        console.log(9999);    
    });
    app.sayHello();
});