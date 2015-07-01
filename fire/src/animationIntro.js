var AnimationIntroLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        this.size = cc.winSize;
        this.cellWidth=77;
        this.cellHeight=77;

        //添加飞机
        this.plantPlane = new cc.Sprite(res.plantPlane_png);
        this.plantPlane.attr({
            anchorX:0.5,
            anchorY:3/8,
            x: this.size.width /2,
            y: this.size.height/2
        });
        this.addChild(this.plantPlane,0);
        this.plantPlane.setVisible(true);
        //添加机头目标
        this.targetHead = new cc.Sprite(res.target_png);
        this.targetHead.attr({
            anchorX:0.5,
            anchorY:0.5,
            x:this.size.width/2,
            y:this.size.height/2+this.cellWidth*2
        });
        this.addChild(this.targetHead,1);
        //添加小手
        this.hand = new cc.Sprite(res.hand_png);
        this.hand.attr({
            anchorX : 0,
            anchorY : 1,
            x: this.size.width / 2+this.cellWidth*2,
            y: this.size.height/2-this.cellHeight*2
        });
        this.addChild(this.hand,3);

        ////演示文案
        //this.text6 = "点中机头部位\n才算成功击落飞机";
        //this.textFont6 = "楷体";
        //this.textsize6 = "40";
        //this.tmpLabel6 = new  cc.LabelTTF(this.text6, this.textFont6, this.textsize6);
        //this.tmpLabel6.setAnchorPoint(0.5,0.5);
        //this.tmpLabel6.setPosition(this.size.width/2,this.size.height/2+280);
        //this.tmpLabel6.setColor(cc.color(100, 100, 0, 255));
        //this.addChild(this.tmpLabel6,18);
        //this.tmpLabel6.setVisible(true);
        //var aaa=cc.scaleBy(0.4,1.1);
        //this.tmpLabel6.runAction(cc.sequence(aaa, aaa.reverse())).repeatForever();


        this.plantCellsIntro = [];
        for (var i = 0; i < 3; i++) {
            var newPlane = new CellLayerColor();
            newPlane.attr({
                anchorX: 0,
                anchorY: 1,
                x: this.size.width / 2+this.cellWidth*(i-2.5),
                y: this.size.height/2+this.cellWidth*(i-0.5)
                //x:0,
                //y:0,
                //rotation: this.planes[i].angle
            });
            this.plantCellsIntro.push(newPlane);
            this.addChild( newPlane, 2);
            //this.plantCellsIntro[i].setVisible(true);
        }
        //this.plantCellsIntro[0].hitIntro(PartInCell.Miss);
        //this.plantCellsIntro[1].hitIntro(PartInCell.Body);
        //this.plantCellsIntro[2].hitIntro(PartInCell.Head);


        //this.schedule(this.animationFuc,1,10,1);
        this.animationFuc();

    },
    animationFuc:function(){
        var delay1 = cc.delayTime(2);
        var delay2 = cc.delayTime(1);
        this.targetHead.setVisible(false);
        var handMove1 = cc.moveBy(0.5,cc.p(-this.cellWidth*4, this.cellWidth*2));
        var handMove2 = cc.moveBy(0.5,cc.p(this.cellWidth*4, -this.cellWidth*2));
        var handMove3 = cc.moveBy(0.5,cc.p(-this.cellWidth*3, this.cellWidth*3));
        var handMove4 = cc.moveBy(0.5,cc.p(this.cellWidth*3, -this.cellWidth*3));
        var handMove5 = cc.moveBy(0.5,cc.p(-this.cellWidth*2, this.cellWidth*4));
        var handMove6 = cc.moveBy(0.5,cc.p(this.cellWidth*2, -this.cellWidth*4));
        var blink = cc.blink(2,5);
        var func1 = new cc.callFunc(function(){this.plantCellsIntro[0].hitIntro(PartInCell.Miss);},this);
        var func2 = new cc.callFunc(function(){this.plantCellsIntro[1].hitIntro(PartInCell.Body);},this);
        var func3 = new cc.callFunc(function(){this.plantCellsIntro[2].hitIntro(PartInCell.Head);},this);
        var func4 = new cc.callFunc(function(){this.plantPlane.setVisible(false);},this);
        var func5 = new cc.callFunc(function(){this.plantPlane.setVisible(true);},this);
        var func6 = new cc.callFunc(function(){this.targetHead.runAction(blink);},this);
        var seq = cc.sequence(func6,delay1,func4,handMove1,func1,handMove2,handMove3,func2,handMove4,handMove5,func3,handMove6,delay2,func5,delay2);
        //var rep = new cc.RepeatForever(seq);
        this.hand.runAction(seq);
    }
});
