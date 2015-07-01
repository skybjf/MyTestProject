/**
 * Created by Tomson on 14/11/25.
 */
var PlantLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.size = cc.winSize;
        this.cellWidth = 77;
        this.cellHeight = 77;

        //添加格子
        this.showPlantBox();

        this.plantCells = new Array(9);
        for (var i = 0; i < 9; i++) {
            var xxx = this.size.width / 2 - this.plantBoxSize.width / 2 + this.cellWidth * i + 13;
            this.plantCells[i] = new Array(9);
            for (var j = 0; j < 9; j++) {
                var yyy = this.size.height / 2 - this.plantBoxSize.height / 2 + this.cellHeight * (j) + 17;
                var newCellLayerColor = new CellLayerColor();
                this.plantCells[i][j] = newCellLayerColor;
                this.plantCells[i][j].setPosition(cc.p(xxx, yyy));
                this.addChild(this.plantCells[i][j], 3);
            }
        }

        this.planeManual = new PlaneManualLayer();
        this.planes = getRandomPlanes();
        this.planeManual.planes = this.planes;
        //console.log(this.planes[0]);
        //console.log(this.planes[1]);
        //console.log(this.planes[2]);
        this.addChild(this.planeManual, 2);
        this.addPlanes();
        //this.addCustomEvent();


    },
    //添加格子
    showPlantBox: function () {
        this.plantBox = new cc.Sprite(res.plantBox_png);
        this.plantBox.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.size.width / 2,
            y: this.size.height / 2
        });
        this.addChild(this.plantBox, 0);
        this.plantBoxSize = this.plantBox.getContentSize();
    },

    addPlanes: function () {
        //添加三架飞机
        this.targetPlanes = [];
        for (var i = 0; i < 3; i++) {
            var newPlane = new cc.Sprite(res.plantPlane_png);
            newPlane.attr({
                anchorX: 0.5,
                anchorY: 5 / 8,
                x: this.size.width / 2 - this.plantBoxSize.width / 2 + this.cellWidth * (this.planes[i].x + 0.5) + 12,
                y: this.size.height / 2 - this.plantBoxSize.height / 2 + this.cellHeight * (this.planes[i].y + 0.5) + 15,
                //x:0,
                //y:0,
                rotation: this.planes[i].angle
            });
            this.targetPlanes.push(newPlane);
            this.addChild(newPlane, 1);
            var currTargetPlane = this.planes[i];
            this.targetPlanes[i].setVisible(false);
            var headPos = this.getNewPosition(0, 1, currTargetPlane.angle, currTargetPlane.x, currTargetPlane.y);
            this.plantCells[headPos.X][headPos.Y].partInCell = PartInCell.Head;
            var planeBodyPos = [];
            planeBodyPos.push({x: -2, y: 0});
            planeBodyPos.push({x: -1, y: 0});
            planeBodyPos.push({x: 0, y: 0});
            planeBodyPos.push({x: 1, y: 0});
            planeBodyPos.push({x: 2, y: 0});
            planeBodyPos.push({x: 0, y: -1});
            planeBodyPos.push({x: 1, y: -2});
            planeBodyPos.push({x: 0, y: -2});
            planeBodyPos.push({x: -1, y: -2});
            //g给cell加PartInCell
            for (var j = 0; j < planeBodyPos.length; j++) {
                var newPos = this.getNewPosition(planeBodyPos[j].x, planeBodyPos[j].y, currTargetPlane.angle, currTargetPlane.x, currTargetPlane.y);

                this.plantCells[newPos.X][newPos.Y].partInCell = PartInCell.Body;
            }


        }

    },
    getNewPosition: function (nx, ny, angle, cx, cy) {
        var r = {};
        r.X = nx * Math.round(Math.cos(angle / 180 * Math.PI)) + ny * Math.round(Math.sin(angle / 180 * Math.PI)) + cx;
        r.Y = ny * Math.round(Math.cos(angle / 180 * Math.PI)) - nx * Math.round(Math.sin(angle / 180 * Math.PI)) + cy;
        return r;
    },

    //数据统计
    data: function () {

    },
    showPlanes: function () {
        for (var i = 0; i < 3; i++) {
            this.targetPlanes[i].setVisible(true);
        }
    },
    hit: function (touch) {
        //坐标对应操作
        var x, y;
        var result = this.plantCells[x][y].hit(touch);
        return result;
    },
    showPlaneManual: function () {
        this.planeManual.show()
    }
});