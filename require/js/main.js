requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'jquery.min',
        hello: 'hello'
    },
    shim: {
        hello: {
            init: function() {
                return {
                    hello: hello,
                    hello1: hello1,
                    hello2: hello2
                }
            }
        }
    },
    urlArgs: "v=" + new Date().getTime()
});

requirejs(["jquery", "app", "hello"], function($, app, hello) {
    hello2();
    $(".btn").on("click", function() {
        app.sayHello();
    });
});
