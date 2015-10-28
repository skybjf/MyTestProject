(function () {
    var el = document.querySelector('.test');
    var startPosition, endPosition, deltaX, deltaY, moveLength;

    el.addEventListener('touchstart', function (e) {
        e.preventDefault();
        var touch = e.touches[0];
        startPosition = {
            x: touch.pageX,
            y: touch.pageY
        }
    },false);

    el.addEventListener('touchmove', function (e) {
        e.preventDefault();
        var touch = e.touches[0];
        endPosition = {
            x: touch.pageX,
            y: touch.pageY
        }
        deltaX = endPosition.x - startPosition.x;
        deltaY = endPosition.y - startPosition.y;
        // 移动的距离
        moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
        // console.log(moveLength);
    },false);

    el.addEventListener('touchend', function (e) {
        e.preventDefault();
        if(deltaX>0){
            // 左滑
        }else if(deltaX<0){
            // 右滑
        }else {
            // 没动
            // console.log("Mid");
        }
    },false);
})();