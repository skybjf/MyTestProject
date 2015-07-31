/**
 * Created by Administrator on 2015/7/31.
 */
angular.module('app', []).controller('login', function ($scope) {
    $scope.user = {name: '', pwd: ''};
    $scope.loginIn = function () {
        if ($scope.user.name === 'bjf' && $scope.user.pwd === "000") {
            console.log("登录成功了");
        } else {
            console.log("呵呵，登录失败哦");
        }
    };
}).controller('test', function ($scope) {
    $scope.list = ['a', 'b', 'c'];
}).controller('register', function ($scope) {
        $scope.user = {
            name: '',
            age : '',
            sex : '0',
            habit: ''
        };
        $scope.registerOne = function () {
            console.log($scope.user);
        };
    }
)