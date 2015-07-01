/**
 * Created by Tomson on 14/11/25.
 */

var ManualLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        this.size = cc.winSize;

        //添加透明背景
        this.layerGrey = new cc.LayerColor(cc.color(0,0,0,150),720,1280);
        this.layerGrey.setPosition(cc.p(0,0));
        this.addChild(this.layerGrey,10);
        this.layerGrey.setVisible(false);

        //添加游戏提示图片
        this.gameImg = new cc.Sprite(res.gameImg_jpg);
        this.gameImg.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x: this.size.width / 2,
            y: this.size.height/2
        });
        this.addChild(this.gameImg,11);
        this.gameImg.setVisible(false);

        ////添加关闭按钮
        //this.menuItemClose = new cc.MenuItemImage(res.closePop_png,res.closePop_png,this.closeManulLayer,this);
        //this.menuItemClose.attr({
        //    anchorX : 0.5,
        //    anchorY : 0.5
        //});
        //this.closePop = new cc.Menu(this.menuItemClose);
        //this.closePop.setPosition(this.size.width/2,this.size.height-800);
        //this.addChild(this.closePop,12);
        //this.closePop.setVisible(false);

    },
    showManulLayer:function(){
        this.layerGrey.setVisible(true);
        this.gameImg.setVisible(true);
        //this.closePop.setVisible(true);
    }
    //closeManulLayer:function(){
    //    this.layerGrey.setVisible(false);
    //    this.gameImg.setVisible(false);
    //    this.closePop.setVisible(false);
    //}
});

//var test2 = cc.Scene.extend({
//    onEnter : function(){
//        this._super();
//        this.manualLayer = new ManualLayer();
//        this.addChild(this.manualLayer);
//        this.manualLayer.showManulLayer();
//    }
//});