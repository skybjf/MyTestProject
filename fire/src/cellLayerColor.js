/**
 * Created by Tomson on 14/11/25.
 */
var CellLayerColor =cc.LayerColor.extend({
  ctor:function(){
    this.size = cc.winSize;
    //this.canHit=true;
    //this.resultImgUrl=res.hitMiss_png;
    this.partInCell=PartInCell.Miss;
    //this.expDuration=0.6;
    this.cellWidth = 77;
    this._super(cc.color(255,0,255,0),this.cellWidth,this.cellWidth);
    //this.canHit=true;
    this.attr({
      anchorX:0,
      anchorY:0,
      //x:this.size.width/4-25,
      //y:this.size.height/4+10,
      canHit:true,
      resultImgUrl:res.hitMiss_png,
      resultFont:"击空",
      //partInCell:PartInCell.Miss,
      expDuration:0.6
    });

  },
  hit:function(){
    if(!this.canHit)
    {
      return undefined;
    }
    this.canHit=false;
    this.showExpAnimation();
    this.showResultAnimation();
    return this.partInCell;
  },
  hitIntro:function(r){
    this.partInCell=r;
    this.showExpAnimation();
    this.showResultAnimation();
  },
  //显示爆炸效果
  showExpAnimation:function(){
    this.explodeSprite =new ExplodeSprite();
    this.explodeSprite.attr({
      anchorX:0.5,
      anchorY:0.5,
      x:this.cellWidth/2,
      y:this.cellWidth/2
    });
    this.addChild(this.explodeSprite,4);
    this.explodeSprite.runAction(this.explodeSprite.animate);
  },
  //显示爆炸后的图片和文字
  showResultAnimation:function(){
    var t=this;
    switch(t.partInCell){
      case PartInCell.Body :t.resultImgUrl=res.hitBody_png;t.resultFont="机身";break;
      case PartInCell.Head :t.resultImgUrl=res.hitHead_png;t.resultFont="击毁";break;

      case PartInCell.Miss : default :break;
    }
    t.scheduleOnce(t.createResultImg, t.expDuration);
    t.scheduleOnce(function(){t.explodeSprite.setVisible(false)}, t.expDuration);
    t.scheduleOnce(t.createResultFont, t.expDuration+0.1);
  },
  //创建爆炸后的图片
  createResultImg:function(){
    var t=this;
    t.hitImage = new cc.Sprite(t.resultImgUrl);
    t.hitImage.attr({
      anchorX: 0.5,
      anchorY: 0.5,
      x: t.cellWidth/2,
      y: t.cellWidth/2
    });
    t.addChild(t.hitImage,1)
  },
  //创建爆炸后的文字
  createResultFont:function(){
    var t=this;
    t.expFontLabel = new cc.LabelTTF(t.resultFont, "楷体", 50);
    t.expFontLabel.attr({
      anchorX: 0.5,
      anchorY: 0,
      x: t.cellWidth/2,
      y: t.cellWidth/2
    });
    t.expFontLabel.setColor(cc.color(255, 50, 50, 255));
    t.addChild(t.expFontLabel, 3);
    var expFontLabelMove = cc.moveBy(2,cc.p(0,100));
    var expFontLabelFade = cc.fadeOut(2,cc.p(0,100));
    this.expFontLabel.runAction(new cc.Spawn(expFontLabelMove,expFontLabelFade));
  }
});
//爆炸效果
var ExplodeSprite = cc.Sprite.extend({
  ctor:function(){
    this._super();
    var texture1 = cc.textureCache.addImage(res.exploadView1_png);
    var texture2 = cc.textureCache.addImage(res.exploadView2_png);
    var texture3 = cc.textureCache.addImage(res.exploadView3_png);

    var f0 = cc.SpriteFrame.createWithTexture(texture1,cc.rect(0,0,89,79));
    var f1 = cc.SpriteFrame.createWithTexture(texture2,cc.rect(0,0,218,131));
    var f2 = cc.SpriteFrame.createWithTexture(texture3,cc.rect(0,0,207,154));

    this.animFrame = [];
    this.animFrame.push(f0);
    this.animFrame.push(f1);
    this.animFrame.push(f2);

    this.animation = cc.Animation.create(this.animFrame,0.2);
    this.animate = cc.Animate.create(this.animation);
    this.animateRep = cc.RepeatForever.create(this.animate);
  }
});
//var testCell = cc.Scene.extend({
//  onEnter:function(){
//    var t= this;
//    t._super();
//    t.cellLayerColor = new CellLayerColor();
//    t.addChild(t.cellLayerColor);
//    var dd=t.cellLayerColor.hit();
//    //cc.log(dd);
//  }
//});