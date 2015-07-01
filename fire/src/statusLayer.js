/**
 * Created by Tomson on 14/11/25.
 */
var StatusLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.size = cc.winSize;
        this.stepNum = "0";
        this.planeNum = 3;
        this.planeManual=null;


        //添加状态栏左边背景
        this.statusBgLeft = new cc.Sprite(res.statusBg_png);
        this.statusBgLeft.attr({
            anchorX: 0,
            anchorY: 1,
            x: this.size.width / 2 - 300,
            y: this.size.height/2 + 500
        });
        this.addChild(this.statusBgLeft, 0);

        //添加状态栏右边背景
        this.statusBgRight = new cc.Sprite(res.statusBg_png);
        this.statusBgRight.attr({
            anchorX: 1,
            anchorY: 1,
            x: this.size.width / 2 + 300,
            y: this.size.height/2 + 500
        });
        this.addChild(this.statusBgRight, 0);

        //数字用 Axure Handwriting   字母用 MV Boli
        this.stepLabel = new cc.LabelTTF("Step:", "MV Boli", 50);
        this.stepLabel.attr({
            anchorX: 0,
            anchorY: 1,
            x: this.size.width / 2 + 55,
            y: this.size.height/2 + 490
        });
        this.stepLabel.setColor(cc.color(0, 0, 0, 255));
        this.addChild(this.stepLabel, 1);

        this.showStep(this.stepNum);
        this.showPlane();
        this.iphoneShow();
    },
    //背景显示
    iphoneShow:function(){
        var startLeft = 285;
        var planeSpace = 75;
        var planePositionTop = 490;
        if(this.size.height<1000&&this.size.height>900){
            this.statusBgLeft.setPosition(cc.p(this.size.width / 2 - 300,this.size.height/2 + 450));
            this.statusBgRight.setPosition(cc.p(this.size.width / 2 + 300,this.size.height/2 + 450));
            this.stepLabel.setPosition(cc.p(this.size.width / 2 + 55,this.size.height/2 + 440));
            this.stepNumLabel.setPosition(cc.p(this.size.width / 2 + 195,this.size.height/2 + 440));
            for (var i = 0; i < 3; i++) {
                this.statusPlanes[i].setPosition(cc.p(this.size.width / 2 - (startLeft - planeSpace * i),this.size.height/2 + planePositionTop-50))
            }
        }
    },
    //步数显示
    showStep: function (stepNum) {
        this.stepNumLabel = new cc.LabelTTF(stepNum, "Axure Handwriting", 50);
        this.stepNumLabel.attr({
            anchorX: 0,
            anchorY: 1,
            x: this.size.width / 2 + 195,
            y: this.size.height/2 + 490
        });
        this.stepNumLabel.setColor(cc.color(0, 0, 0, 255));
        if(this.size.height<1000&&this.size.height>900){
            this.stepNumLabel.setPosition(cc.p(this.size.width / 2 + 195,this.size.height/2 + 440));
        }
        this.addChild(this.stepNumLabel, 1);
    },
    //剩余飞机显示
    showPlane: function () {
        var startLeft = 285;
        var planeSpace = 75;
        var planePositionTop = 490;
        this.statusPlanes = [];
        for (var i = 0; i < 3; i++) {
            var newPlane = new StatusPlane(res.statusPlane_png);
            newPlane.attr({
                anchorX: 0,
                anchorY: 1,
                x: this.size.width / 2 - (startLeft - planeSpace * i),
                y: this.size.height/2 + planePositionTop
            });
            this.statusPlanes.push(newPlane);
            this.addChild(newPlane, 1);
        }
    },
    hit:function(r){
        this.stepNumLabel.removeFromParent();
        this.stepNum++;
        this.showStep(this.stepNum);

        if(r!=2) {
            return;
        }
        this.planeNum--;
        this.statusPlanes[this.planeNum].turnOff();
        //if(this.planeNum==0){
        //    //调用ResultLayer
        //   //this.planeManual.show();
        //    setTimeout(this.showResult,1000);
        //
        //}
    },
    showResult:function(r){
        console.log(this.stepNum);
        //this.resultLayer = new ResultLayer();
        //this.addChild(this.resultLayer,6);
        //this.resultLayer.setVisible(false);
        //this.resultLayer.resultPop(r);

        //var wait = new cc.DelayTime(3);
        //var func = new cc.callFunc(function(){this.resultLayer.setVisible(true);},this);
        //this.resultLayer.runAction(cc.sequence(func));
    }
});
var StatusPlane = cc.Sprite.extend({
    turnOff: function () {
        this.setColor(cc.color(100, 100, 100, 255));
    }
});

//var test = cc.Scene.extend({
//    onEnter:function(){
//        var t= this;
//        t._super();
//        t.statusLayer = new StatusLayer();
//        t.addChild(t.statusLayer);
//        setTimeout(function(){t.statusLayer.hit(2)},1000);
//        setTimeout(function(){t.statusLayer.hit(2)},2000);
//        setTimeout(function(){t.statusLayer.hit(2)},3000);
//    }
//});