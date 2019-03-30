cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function () {
        this.node.on('touchstart',function(){
            this.node.scale = 1.1;
        }.bind(this))
        
        this.node.on('touchend',function(){
            this.node.scale = 1;
        }.bind(this))
        
        this.node.on('touchcancel',function(){
            this.node.scale = 1;
        }.bind(this))
    }
});
