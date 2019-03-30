cc.Class({
    extends: cc.Component,

    properties: {
        _time:null,
    },
    
    onLoad: function () {
        var data = new Date();
        this._time = data.getTime();
        this._enemyArray[this._index] = this.node;
    },

    init: function (enemyArray,index) {
        this._enemyArray = enemyArray;
        this._index = index;
    },

    onDestroy: function () {
        delete this._enemyArray[this._index];
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var data = new Date();
        var time = data.getTime() - this._time;
        this.node.y -= time * 0.4;
        this._time = data.getTime();
        if(this.node.y < -450){
            this.node.destroy();
        }
    },
});
