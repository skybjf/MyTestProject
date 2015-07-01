/****************************************************************************
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
/**
 * <p>cc.LoaderScene is a scene that you can load it when you loading files</p>
 * <p>cc.LoaderScene can present thedownload progress </p>
 * @class
 * @extends cc.Scene
 * @example
 * var lc = new cc.LoaderScene();
 */
cc.LoaderScene = cc.Scene.extend({
    _interval : null,
    _label : null,
    _className:"LoaderScene",
    /**
     * Contructor of cc.LoaderScene
     * @returns {boolean}
     */
    init : function(){
        var self = this;
        self.size = cc.winSize;

        //添加能量条
        self.arrow1 = new cc.ProgressTimer(new cc.Sprite(res.logoTwo_png));
        self.arrow1.type=cc.ProgressTimer.TYPE_BAR;
        self.arrow1.barChangeRate=cc.p(0,1);
        self.arrow1.midPoint=cc.p(0,0);
        self.barSize = self.arrow1.getContentSize();
        //self.arrow1.anchorX=0.5;
        //self.arrow1.anchorY=0.5;
        self.arrow1.x=self.size.width/2-80;
        self.arrow1.y=self.size.height/2-88;
        self.addChild(self.arrow1,2);
        //var to1= cc.progressTo(1,50);
        //self.arrow1.runAction(to1);
        ////添加开始界面
        self.homePage = new cc.Sprite(res.logoOne_png);
        //self.homePage = self.homePage.getContentSize();
        self.homePage.attr({
            anchorX:0,
            anchorY: 0,
            x: self.size.width/2-80,
            y: self.size.height/2-88
        });
        self.addChild(self.homePage,3);

        //logo
        var logoWidth = 160;
        var logoHeight = 200;

        // bg
        var bgLayer = self._bgLayer = new cc.LayerColor(cc.color(255, 255, 255, 255));
        bgLayer.setPosition(cc.visibleRect.bottomLeft);
        self.addChild(bgLayer, 0);

        //image move to CCSceneFile.js
        var fontSize = 34, lblHeight =  -logoHeight / 2 - 300;
        //if(res.logoOne_png){
        //    //loading logo
        //    cc.loader.loadImg(res.logoOne_png, {isCrossOrigin : false }, function(err, img){
        //        logoWidth = img.width;
        //        logoHeight = img.height;
        //        self._initStage(img, cc.visibleRect.center);
        //    });
        //    fontSize = 34;
        //    lblHeight = -logoHeight / 2 - 300;
        //}
        //loading percent
        var label = self._label = new cc.LabelTTF("Loading... 0%", "Arial", fontSize);
        label.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(0, lblHeight)));
        label.setColor(cc.color(180, 180, 180));
        bgLayer.addChild(this._label, 10);
        return true;
    },

    _initStage: function (img, centerPos) {
        var self = this;
        var texture2d = self._texture2d = new cc.Texture2D();
        texture2d.initWithElement(img);
        texture2d.handleLoadedTexture();
        var logo = self._logo = new cc.Sprite(texture2d);
        logo.setScale(cc.contentScaleFactor());
        logo.x = centerPos.x;
        logo.y = centerPos.y;
        self.arrow1.x =centerPos.x-80;
        self.arrow1.y = centerPos.y-88;
        self._bgLayer.addChild(logo, 10);
    },
    /**
     * custom onEnter
     */
    onEnter: function () {
        var self = this;
        cc.Node.prototype.onEnter.call(self);
        self.schedule(self._startLoading, 0.3);
    },
    /**
     * custom onExit
     */
    onExit: function () {
        cc.Node.prototype.onExit.call(this);
        var tmpStr = "Loading... 0%";
        this._label.setString(tmpStr);
    },

    /**
     * init with resources
     * @param {Array} resources
     * @param {Function|String} cb
     */
    initWithResources: function (resources, cb) {
        if(cc.isString(resources))
            resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
    },

    _startLoading: function () {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;
        cc.loader.load(res,
            function (result, count, loadedCount) {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                self._label.setString("Loading... " + percent + "%");
                var to1= cc.progressTo(0,percent);
                self.arrow1.runAction(to1);
            }, function () {
                if (self.cb)
                    self.cb();
            });
    }
});
/**
 * <p>cc.LoaderScene.preload can present a loaderScene with download progress.</p>
 * <p>when all the resource are downloaded it will invoke call function</p>
 * @param resources
 * @param cb
 * @returns {cc.LoaderScene|*}
 * @example
 * //Example
 * cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new HelloWorldScene());
    }, this);
 */
cc.LoaderScene.preload = function(resources, cb){
    var _cc = cc;
    if(!_cc.loaderScene) {
        _cc.loaderScene = new cc.LoaderScene();
        _cc.loaderScene.init();
    }
    _cc.loaderScene.initWithResources(resources, cb);

    cc.director.runScene(_cc.loaderScene);
    return _cc.loaderScene;
};