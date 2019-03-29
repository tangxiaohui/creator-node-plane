cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

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
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
