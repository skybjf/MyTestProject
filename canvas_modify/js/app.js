var canvasModify = {}
canvasModify.init = function (obj) {
    var id=obj.id;
    var canvas = "#"+obj.id;
    var p_h = obj.p_h;//图片高度
    var p_w = obj.p_w;//图片宽度
    var img = obj.img;
    var unbind = obj.unbind;
    var currentScale = 1;
    var currentAngle = 0;
    var angle = 0;
    var initialScale = 1;
    var startX = false;
    var startY = false;
    var isDown = false;
    var element = "";

    function PicTouchstart(e) {
        e.preventDefault();
        //if (e.targetTouches.length == 1) {
        var pos = getMousePos(body, e.touches[0]);
        startX = pos.x;
        startY = pos.y;
        e.preventDefault();
        isDown = true;
    }

    function PicTouchmove(e) {
        e.preventDefault();
        // 如果这个元素的位置内只有一个手指的话
        //if (e.targetTouches.length == 1) {
        if (isDown === true) {
            var pos = getMousePos(body, e.touches[0]);
            var x = pos.x;
            var y = pos.y;
            element.translate(x - startX, y - startY);
            drawImage(img);
            startX = x;
            startY = y;

        }
    }

    function PicTouchend() {
        isDown = false;
    }

    function PicOnTouchstart(e) {
        e.preventDefault();
    }

    function PicOnrotate(ev) {
        currentAngle = angle + ev.rotation;
        if (ev.fingerStatus === 'end') {
            angle = angle + ev.rotation;
        }
        drawImage(img);
    }

    function PicOnpinch(ev) {
        currentScale = ev.scale * initialScale;
        drawImage(img);
    }

    function PicOnpinchend() {
        initialScale = currentScale;
    }

    //调整图片手势
    var touchPic = function (obj2) {
        console.log($(obj2)[0]);
        var body = document.getElementById(id);
        $(obj2)[0].addEventListener('touchstart', PicTouchstart, false);

        $(obj2)[0].addEventListener('touchmove', PicTouchmove, false);

        $(obj2)[0].addEventListener('touchend', PicTouchend, false);

        //rotation
        angle = 0;
        touch.on(obj2, 'touchstart', PicOnTouchstart);
        touch.on(obj2, 'rotate', PicOnrotate);
        //pinch
        touch.on(obj2, 'pinch', PicOnpinch);
        touch.on(obj2, 'pinchend', PicOnpinchend);
    }

    //初始化canvas
    var setCanvas = function (obj_canvas, p_w, p_h, image) {
        var canvas_face = document.getElementById(id);
        element = canvas_face.getContext("2d");
        //element.clearRect(-4000, -4000, 8000, 8000);
        var c_w = jQuery(obj_canvas).width();//canvas的宽
        var c_h = jQuery(obj_canvas).height();//canvas的高

        p_w = p_w;//图片的宽
        p_h = p_h;//图片的高
        console.log("c_w:" + c_w);
        console.log("c_h:" + c_h);
        console.log("p_w:" + p_w);
        console.log("p_h:" + p_h);
        if (c_w / c_h > p_w / p_h) {
            //alert(p_w/p_h)
            initialScale = c_w / p_w;
            //initialScale=c_h/p_h;
        }
        else {
            initialScale = c_h / p_h;
            //initialScale=c_w/p_w;
        }
        currentScale = initialScale;
        console.log("initialScale:" + initialScale);
        element.translate(c_w / 2, c_h / 2);
        drawImage(image);
        $('#canvas_face').attr('data-girar', 0);
    }

    //绘图
    var drawImage = function (image) {
        clear();
        element.save();
        element.scale(currentScale, currentScale);
        console.log(currentScale);
        element.rotate(currentAngle * Math.PI / 180);
        element.drawImage(image, -image.width / 2, -image.height / 2);
        element.restore();
    }
    //清除画布
    var clear = function () {
        element.clearRect(-4000, -4000, 8000, 8000);
    }
    //获取手指x、y
    var getMousePos = function (canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    setCanvas(canvas, p_w, p_h, img);
    touchPic(canvas);//调整图片手势

}

$(function () {
    var canvas_width = jQuery(window).width() * 0.9;
    var canvas_heidht = canvas_width / 2;
    $(".canvas_block").html('<canvas id="canvas_face" data-girar="0" class="pic_canvas" width="' + canvas_width + '" height="' + canvas_heidht + '"></canvas>');
    var imgUrl = "img/face_banner.jpg";
    var img = new Image();
    img.src = imgUrl;
    img.onload = function () {
        var p_w = this.width;
        var p_h = this.height;

        canvasModify.init({
            id:"canvas_face",
            // canvas: "#canvas_face",
            p_h: p_h,
            p_w: p_w,
            img: img
        });
    }
});