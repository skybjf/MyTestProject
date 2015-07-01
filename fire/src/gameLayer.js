/**
 * Created by tomson on 14/12/3.
 */
var GameLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        this.text8="点击右上角\n可以发送给朋友\n或者分享到朋友圈哦！";
        this.textFont8="华文中宋";
        this.textsize8="45";
        this.canTouch=0;    //判断游戏结束后还能否touch，0是可以
        this.firstStatus=0;       //只第一次点击帮助界面的关闭按钮后调用游戏介绍动画
        this.size = cc.winSize;
        this.cellWidth=77;
        this.cellHeight=77;

        var logoLayer = new LogoLayer();
        this.addChild(logoLayer,6);
        //数据栏界面
        this.statusLayer = new StatusLayer();
        this.addChild(this.statusLayer,3);
        //格子界面
        this.plantLayer = new PlantLayer();
        this.addChild(this.plantLayer,1);
        //动画介绍界面
        this.animateLayer = new AnimateLayer();
        this.addChild(this.animateLayer,2);
        //帮助界面
        this.manualLayer = new ManualLayer();
        this.addChild(this.manualLayer,4);
        //结束界面
        this.resultLayer = new ResultLayer();
        this.addChild(this.resultLayer,5);

        this.addButton();
        //点击进入按钮需要等logo消失后才能消失
        var func = new cc.callFunc(function(){this.clickInto.setEnabled(true);},this);
        this.clickInto.runAction(cc.sequence(cc.delayTime(2.5),func));
    },
    addButton:function(){
        //添加关闭按钮
        this.menuItemClose = new cc.MenuItemImage(res.closePop_png,res.closePop_png,this.closeManulLayer,this);
        this.menuItemClose.attr({
            anchorX : 0.5,
            anchorY : 0.5
        });
        this.closePop = new cc.Menu(this.menuItemClose);
        this.closePop.setPosition(this.size.width/2,this.size.height/3);
        this.addChild(this.closePop,12);
        this.closePop.setVisible(false);
        //重新开始按钮
        this.menuItemAgain = new cc.MenuItemImage(res.Again_png,res.Again_png,this._playAgain,this);
        this.menuAgain = new cc.Menu(this.menuItemAgain);
        this.menuAgain.setPosition(cc.p(this.size.width/3,this.size.height-730));
        this.addChild(this.menuAgain,13);
        this.menuAgain.setVisible(false);
        //分享
        this.menuItemShareButt = new cc.MenuItemImage(res.ShareButt_png,res.ShareButt_png,this.share,this);
        this.shareButt = new cc.Menu(this.menuItemShareButt);
        this.shareButt.setPosition(cc.p(this.size.width/1.5,this.size.height-730));
        this.addChild(this.shareButt,13);
        this.shareButt.setVisible(false);
        //添加分享箭头
        this.arr = new cc.Sprite(res.s_arr);
        this.arr.setAnchorPoint(1,1);
        this.arr.setPosition(this.size.width-50,this.size.height-50);
        this.addChild(this.arr,15);
        this.arr.setVisible(false);
        //添加分享提示
        this.tmpLabel8 = new cc.LabelTTF(this.text8,this.textFont8,this.textsize8);
        this.tmpLabel8.setPosition(cc.p(this.size.width/2,2*this.size.height/3));
        this.addChild(this.tmpLabel8,15);
        this.tmpLabel8.setVisible(false);
        //添加透明背景
        this.layerGrey2 = new cc.LayerColor(cc.color(0,0,0,200),720,1280);
        this.layerGrey2.setPosition(cc.p(0,0));
        this.addChild(this.layerGrey2,14);
        this.layerGrey2.setVisible(false);

        //添加开始界面
        this.homePage = new cc.Sprite(res.homePage_jpg);
        this.homePage.attr({
            anchorX:0.5,
            anchorY: 0.5,
            x: this.size.width / 2,
            y: this.size.height/2
        });
        this.addChild(this.homePage,3);
        //添加点击进入按钮
        this.menuItemClickInto = new cc.MenuItemImage(res.clickInto_png,res.clickInto_png,this.hiddenPage,this);
        this.clickInto = new cc.Menu(this.menuItemClickInto);
        this.clickInto.setPosition(cc.p(this.size.width/2,this.size.height/3));
        this.addChild(this.clickInto,4);
        this.clickInto.setEnabled(false);
    },
    startHelp:function(){
        this.manualLayer.gameImg.visible=false;
        this.manualLayer.layerGrey.visible=false;
        this.closePop.setVisible(false);
        //添加开始按钮背景
        this.menuItemButtonStartBg = new cc.MenuItemImage(res.buttonBg_png,res.buttonBg_png,this.changeFont,this);
        this.startButtonBg = new cc.Menu(this.menuItemButtonStartBg);
        this.startButtonBg.attr({
            x: this.size.width / 2-180,
            y: this.size.height/2-this.cellHeight*5.7
        });
        this.addChild(this.startButtonBg,0);
        this.startButtonBgPosition = this.startButtonBg.getPosition();
        //添加中途重新开始按钮背景
        this.menuItemButtonMidwayBg = new cc.MenuItemImage(res.buttonBg_png,res.buttonBg_png,this.midwayPlayAgain,this);
        this.midwayButtonBg = new cc.Menu(this.menuItemButtonMidwayBg);
        this.midwayButtonBg.attr({
            x: this.size.width / 2-180,
            y: this.size.height/2-this.cellHeight*5.7
        });
        this.addChild(this.midwayButtonBg,0);
        //this.midwayButtonBgPosition = this.midwayButtonBg.getPosition();
        this.midwayButtonBg.setVisible(false);
        //添加帮助按钮背景
        this.menuItemButtonHelpBg = new cc.MenuItemImage(res.buttonBg_png,res.buttonBg_png,this.helpImg,this);
        this.helpButtonBg = new cc.Menu(this.menuItemButtonHelpBg);
        this.helpButtonBg.attr({
            x: this.size.width /2+180,
            y: this.size.height/2-this.cellHeight*5.7
        });
        this.addChild(this.helpButtonBg,0);
        this.helpButtonBgPosition = this.helpButtonBg.getPosition();
        this.helpButtonBg.setVisible(true);
        //字体
        this.startLable = new cc.LabelTTF("开始", "楷体", 60);
        this.startLable.attr({
            anchorX: 0.5,
            anchorY: 0.7,
            x: this.size.width / 2-180,
            y: this.startButtonBgPosition.y
        });
        this.startLable.setColor(cc.color(255, 0, 0, 255));
        this.addChild(this.startLable, 2);
        //字体
        this.midwayLable = new cc.LabelTTF("重新开始", "楷体", 60);
        this.midwayLable.attr({
            anchorX: 0.5,
            anchorY: 0.7,
            x: this.size.width / 2-180,
            y: this.startButtonBgPosition.y
        });
        this.midwayLable.setColor(cc.color(255, 0, 0, 255));
        this.addChild(this.midwayLable, 2);
        this.midwayLable.setVisible(false);
        //字体
        this.helpLable = new cc.LabelTTF("帮助", "楷体", 60);
        this.helpLable.attr({
            anchorX: 0.5,
            anchorY: 0.7,
            x: this.size.width / 2+180,
            y: this.helpButtonBgPosition.y
        });
        this.helpLable.setColor(cc.color(255, 0, 0, 255));
        this.addChild(this.helpLable, 2);
        this.helpLable.setVisible(true);

        this.iphoneShow();

        this.animateLayer.animationRep();
    },
    iphoneShow:function(){
        if(this.size.height<1000&&this.size.height>900){
            this.startButtonBg.setPosition(cc.p(this.size.width / 2-180,this.size.height/2-this.cellHeight*5.7+40));
            this.helpButtonBg.setPosition(cc.p(this.size.width / 2+180,this.size.height/2-this.cellHeight*5.7+40));
            this.midwayButtonBg.setPosition(cc.p(this.size.width / 2-180,this.size.height/2-this.cellHeight*5.7+40));
            this.midwayLable.setPosition(cc.p(this.size.width / 2-180,this.startButtonBgPosition.y+40));
            this.startLable.setPosition(cc.p(this.size.width / 2-180,this.startButtonBgPosition.y+40));
            this.helpLable.setPosition(cc.p(this.size.width / 2+180,this.helpButtonBgPosition.y+40));
        }
    },
    //跳转帮助界面
    helpImg:function(){
        this.canTouch=1;
        this.manualLayer.setVisible(true);
        this.manualLayer.showManulLayer();
        ////添加关闭按钮
        //this.menuItemClose = new cc.MenuItemImage(res.closePop_png,res.closePop_png,this.closeManulLayer,this);
        //this.menuItemClose.attr({
        //    anchorX : 0.5,
        //    anchorY : 0.5
        //});
        //this.closePop = new cc.Menu(this.menuItemClose);
        //this.closePop.setPosition(this.size.width/2,this.size.height-800);
        //this.addChild(this.closePop,12);
        this.closePop.setVisible(true);
    },
    closeManulLayer:function(){
        this.canTouch=0;
        this.manualLayer.setVisible(false);
        this.closePop.setVisible(false);
        if(this.firstStatus==0){
            this.firstStatus=1;
            //游戏教程动画
            this.startHelp();
        }
    },
    //开始按钮切换到帮助按钮
    changeFont:function(){
        this.startButtonBg.setVisible(false);
        this.midwayButtonBg.setVisible(true);
        this.startLable.setVisible(false);
        this.midwayLable.setVisible(true);
        this.animateLayer.removeFromParent();
        this.addCustomEvent();
    },
    //隐藏进入游戏界面
    hiddenPage:function(){
        this.homePage.setVisible(false);
        this.clickInto.setVisible(false);
        this.manualLayer.gameImg.visible=true;
        this.manualLayer.layerGrey.visible=true;
        this.closePop.setVisible(true);
        //游戏教程动画
        //this.startHelp();

    },
    //帮助界面第一次出现
    showHelpFirst:function(){

    },

    addCustomEvent:function(){
        var t = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                t.floorTargetWidth=Math.floor((locationInNode.x-13)/t.cellWidth);
                t.floorTargetHeight=Math.floor((locationInNode.y-18)/t.cellWidth);
                //var s = target.getContentSize();
                var rect = cc.rect(13, 18, 693, 693);
                if(cc.rectContainsPoint(rect, locationInNode)&&t.canTouch==0){
                    //出现爆炸效果
                    if(typeof (t.plantLayer.plantCells[t.floorTargetWidth][t.floorTargetHeight].hit()) =="undefined")
                    return;
                    //改变数据栏
                    t.statusLayer.hit(t.plantLayer.plantCells[t.floorTargetWidth][t.floorTargetHeight].partInCell);
                    console.log(t.statusLayer.stepNum);
                    //
                    var boxMoveLeft = cc.moveBy(0.02,cc.p(-15,0));
                    var boxMoveRight = cc.moveBy(0.02,cc.p(30,0));
                    var boxMoveTop = cc.moveBy(0.02,cc.p(0,15));
                    var boxMoveBottom = cc.moveBy(0.02,cc.p(0,-30));
                    if(t.plantLayer.plantCells[t.floorTargetWidth][t.floorTargetHeight].partInCell==2&&t.statusLayer.planeNum!=0){
                        t.plantLayer.plantBox.runAction(cc.sequence(boxMoveLeft,boxMoveRight,boxMoveLeft,boxMoveTop,boxMoveBottom,boxMoveTop,boxMoveLeft,boxMoveRight,boxMoveLeft,boxMoveTop,boxMoveBottom,boxMoveTop));
                    }
                    if(t.statusLayer.planeNum==0){
                        t.canTouch=1;
                        t.plantLayer.plantBox.runAction(cc.sequence(boxMoveLeft,boxMoveRight,boxMoveLeft,boxMoveTop,boxMoveBottom,boxMoveTop,boxMoveLeft,boxMoveRight,boxMoveLeft,boxMoveTop,boxMoveBottom,boxMoveTop));
                        //显示三架飞机摆放位置
                        setTimeout(function(){t.plantLayer.showPlanes()},1000);
                        //加载结束界面
                        setTimeout(function(){t.statusLayer.showResult(t.statusLayer.stepNum)},4000);
                        setTimeout(function(){t.resultLayer.resultPop(t.statusLayer.stepNum)},4000);
                        setTimeout(function(){t.menuAgain.setVisible(true)},4000);
                        setTimeout(function(){t.shareButt.setVisible(true)},4000);
                        //重新开始
                        //帮助按钮失效
                        t.helpButtonBg.setEnabled(false);
                        t.midwayButtonBg.setEnabled(false);

                    }
                }
            }
        },this.plantLayer.plantBox);
    },
    midwayPlayAgain:function(){
        cc.customStepNum=undefined;
        this.canTouch = 0;
        this.plantLayer.removeFromParent();
        this.statusLayer.removeFromParent();
        //格子界面
        this.plantLayer = new PlantLayer();
        this.addChild(this.plantLayer, 1);
        //数据栏界面
        this.statusLayer = new StatusLayer();
        this.addChild(this.statusLayer, 3);
        this.addCustomEvent();
    },
    _playAgain:function(){
        cc.customTitleRank=undefined;
        cc.customStepNum=undefined;
        this.arr.setVisible(false);
        this.layerGrey2.setVisible(false);
        this.shareButt.setVisible(false);
        this.resultLayer.addShareText();
        this.resultLayer.hideResultLayer();
            this.canTouch = 0;
            this.plantLayer.removeFromParent();
            this.statusLayer.removeFromParent();
            //格子界面
            this.plantLayer = new PlantLayer();
            this.addChild(this.plantLayer, 1);
            //数据栏界面
            this.statusLayer = new StatusLayer();
            this.addChild(this.statusLayer, 3);
            this.addCustomEvent();
            //重新开始按钮不可用
            this.menuAgain.setVisible(false);
            this.helpButtonBg.setEnabled(true);
            this.midwayButtonBg.setEnabled(true);

    },
    //分享
    share:function(){
        if(this.isWeixin()){
            this.weiXinShare();
        }
        else{
            this.weiBoShare();
        }

    },
    titleText: function () {
        if(cc.customStepNum){
            return ''+cc.customTitleRank+'就是我，击落灰机只用'+cc.customStepNum+'步！你行吗？';
        }else{
            return "这灰机打的倍儿爽！求超越！";
        }
    },
    weiXinShare:function(){
        var wait = new cc.DelayTime(5);
        console.log('分享');
        this.layerGrey2.setVisible(true);
        var func = new cc.callFunc(function(){this.layerGrey2.setVisible(false);},this);
        this.layerGrey2.runAction(new cc.Sequence(wait,func));

        this.arr.setVisible(true);
        var func1 = new cc.callFunc(function(){this.arr.setVisible(false);},this);
        this.arr.runAction(new cc.Sequence(wait,func1));

        this.tmpLabel8.setVisible(true);
        var func2 = new cc.callFunc(function(){this.tmpLabel8.setVisible(false);},this);
        this.tmpLabel8.runAction(new cc.Sequence(wait,func2));
    },
    weiBoShare:function(){
        var top = window.screen.height / 2 - 250;
        var left = window.screen.width / 2 - 300;

        /*title是标题，rLink链接，summary内容，site分享来源，pic分享图片路径,分享到新浪微博*/
        var pic = "http://"+"test"+".gm"+".jiayuan"+".com"+"/development/FirePlane/publish/html5/res/share.jpg";
        var title = this.titleText();
        var rLink = "http://"+"test"+".gm"+".jiayuan"+".com"+"/development/FirePlane/publish/html5";
        window.open("http://service.weibo.com/share/share.php?pic=" + encodeURIComponent(pic) + "&title=" +
            encodeURIComponent(title.replace(/&nbsp;/g, " ").replace(/<br \/>/g, " ")) + "&url=" + encodeURIComponent(rLink),
            "分享至新浪微博",
            "height=500,width=600,top=" + top + ",left=" + left + ",toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no");

    },
    isWeixin : function(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    }
});
//动画介绍
var AnimateLayer = cc.Layer.extend({
    ctor:function() {
        this._super();
    },
    animationRep: function () {
        var delay1 = cc.delayTime(8);
        var delay2 = cc.delayTime(1);
        var func1 = new cc.callFunc(function(){this.animationIntroLayer = new AnimationIntroLayer();
            this.addChild(this.animationIntroLayer,2);},this);
        var func2 = new cc.callFunc(function(){this.animationIntroLayer.removeFromParent();},this);
        this.runAction(new cc.RepeatForever(cc.sequence(delay2,func1,delay1,func2)));
    }
});