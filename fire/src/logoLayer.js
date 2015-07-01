var LogoLayer = cc.Layer.extend({
    ctor: function () {
        this.size = cc.winSize;
        this._super();

        var action1 = cc.fadeOut(1);
        var action2 = cc.fadeOut(1);
        //this.runAction(action1);

        //添加透明背景
        this.layerGrey = new cc.LayerColor(cc.color(255,255,255,255),720,1280);
        this.layerGrey.setPosition(cc.p(0,0));
        this.addChild(this.layerGrey,0);
        //添加logo
        this.ourLogo = new cc.Sprite(res.logo_png);
        this.ourLogo.attr({
            anchorX:0.5,
            anchorY:0.5,
            x: this.size.width / 2,
            y: this.size.height/2
        });
        this.addChild(this.ourLogo,1);


        this.ourLogo.runAction(cc.sequence(cc.delayTime(2),action2));
        this.layerGrey.runAction(cc.sequence(cc.delayTime(2),action1));

    }
});