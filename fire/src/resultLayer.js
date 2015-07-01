/**
 * Created by Tomson on 14/11/25.
 */
var ResultLayer=cc.Layer.extend({
    ctor: function () {
        this._super();
        this.size = cc.winSize;


        //添加透明背景
        this.layerGrey = new cc.LayerColor(cc.color(0,0,0,100),720,1280);
        this.layerGrey.setPosition(cc.p(0,0));
        this.addChild(this.layerGrey,10);
        this.layerGrey.setVisible(false);

        //添加背景
        this.resultBg = new cc.Sprite(res.ResultBg_png);
        this.resultBg.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x: this.size.width / 2,
            y: this.size.height - 440
        });
        this.addChild(this.resultBg,11);
        this.resultBg.setVisible(false);

        //添加banner
        this.menuItemBanner = new cc.MenuItemImage(res.banner_jpg,res.banner_jpg,this.goToJiaYuan,this);
        this.jiayuanBanner = new cc.Menu(this.menuItemBanner);
        this.jiayuanBanner.attr({
            x: this.size.width/2,
            y: this.size.height - 886
        });
        this.addChild(this.jiayuanBanner,11);
        this.jiayuanBanner.setVisible(false);



    },
    goToJiaYuan:function(){
        window.location = "http:"+"//"+"m."+"jiayuan"+".com"+"/register/?from=jywebgame_4";
    },
    resultPop:function(stepNum){
        var t=this;
        t.titleRank = undefined;
        //显示
        t.layerGrey.setVisible(true);
        t.resultBg.setVisible(true);
        if(location.href.split('?')[1]){
            var tempHeight = cc.winSize.height;
            if(tempHeight>1000){
                t.jiayuanBanner.attr({
                    anchorX : 0.5,
                    anchorY : 0.5,
                    x: t.size.width/2,
                    y: t.size.height - (tempHeight-50)
                });
            }
            t.jiayuanBanner.setVisible(true);
        }


        //步数
        cc.customStepNum=stepNum;
        if(stepNum==3){t.titleRank="打飞机之神";}
        if(stepNum>3&&stepNum<7){t.titleRank="炮兵司令";}
        if(stepNum>6&&stepNum<11){t.titleRank="百步穿杨";}
        if(stepNum>10&&stepNum<21){t.titleRank="久战沙场";}
        if(stepNum>20&&stepNum<41){t.titleRank="新兵蛋子";}
        if(stepNum>40&&stepNum<61){t.titleRank="高级菜鸟";}
        if(stepNum>60&&stepNum<71){t.titleRank="平凡菜鸟";}
        if(stepNum>70&&stepNum<82){t.titleRank="下等菜鸟";}
        cc.customTitleRank=t.titleRank;
        t.resultText = ""+t.titleRank+",只用了"+stepNum+"步";
        t.resultTextFont = "Axure Handwriting";
        t.resultTextSize = "46";
        t.tmpResult = new  cc.LabelTTF(t.resultText, t.resultTextFont, t.resultTextSize);
        t.tmpResult.setPosition(t.size.width/2,t.size.height-320);
        t.tmpResult.setColor(cc.color(255,215,0,1));
        t.addChild(t.tmpResult,12);
        t.tmpResult.setVisible(true);
        t.addShareText('n');
        shareText();

    },
    addShareText : function(n){
        var t = this;
        if(n){
            document.getElementById("text_summary").innerHTML =t.titleRank+'就是我，击落灰机只用'+cc.customStepNum+'步！你行吗？';
        }else{
            document.getElementById("text_summary").innerHTML ='灰机，动手又动脑，一起来玩';
        }

    },
    hideResultLayer:function(){
        var t=this;
        t.layerGrey.setVisible(false);
        t.resultBg.setVisible(false);
        //this.menuAgain.setVisible(false);
        t.tmpResult.setVisible(false);
        t.jiayuanBanner.setVisible(false);
        //this.shareButt.setVisible(false);
    },
    again:function(){
        this.hideResultLayer();
    }
});

//var test1 = cc.Scene.extend({
//    onEnter:function(){
//        this._super();
//        this.resultLayer = new ResultLayer();
//        this.addChild(this.resultLayer);
//        this.resultLayer.resultPop(85);
//    }
//});
