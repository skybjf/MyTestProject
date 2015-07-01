/**
 * Created by Tomson on 14/11/25.
 */
var PlaneManualLayer=cc.Layer.extend({
    ctor:function(){
        this._super();
        this.size = cc.winSize;
        this.planes=[];
        ////添加飞机
        //this.plantPlane = new cc.Sprite(res.plantPlane_png);
        //this.plantPlane.attr({
        //    anchorX:0.5,
        //    anchorY:3/8,
        //    x: this.size.width /2,
        //    y: this.size.height/2
        //});
        //this.addChild(this.plantPlane);
    }

});