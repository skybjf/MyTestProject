/**
 * Created by Tomson on 14/11/25.
 */
var GameScene =cc.Scene.extend({
  onEnter:function () {
    this._super();
    this.size = cc.winSize;
    //添加大背景
    this.bg = new cc.Sprite(res.bg_jpg);
    this.bg.attr({
      anchorX:0.5,
      anchorY:1,
      x: this.size.width / 2,
      y: this.size.height
    });
    this.addChild(this.bg, 0);

    var gameLayer = new GameLayer();
    this.addChild(gameLayer,1);

    //var logoLayer = new LogoLayer();
    //this.addChild(logoLayer,2);
    //var action1 = cc.fadeOut(1);
    //logoLayer.runAction(cc.sequence(cc.delayTime(2),action1));
  }
});