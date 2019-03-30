cc.Class({
    extends: cc.Component,

    properties: {
        edit: cc.EditBox
    },
 
    // use this for initialization
    onLoad: function () {
        this._gameData = cc.gameData;
    },
    click:function(){
        if(cc.sys.isNative){
            window.io = SocketIO;
        }else{
            require('socket.io')
        }
        var socket = io('127.0.0.1:9999');
        this._gameData.socket = socket; // 全局单例类存储socket
        
        //服务器反回链接请求结果//data格式{player:player}
        socket.on('connection',this._onconnection.bind(this));
        
        //服务器反回链接请求结果//data格式  {result:true,text:'进入房间成功',startTime:0}
        socket.on('joinHouse',this._onjoinHouse.bind(this));
        
        //发送进入房间请求
        socket.emit('joinHouse',{houseID:this.edit.string});
    },
    
    _onconnection:function(data){
        this._gameData.player = data.player;
        this._gameData.playerNodes = {};
    },
    
    _onjoinHouse:function(data){
        if(data.result){
            this._gameData.startTime = data.startTime;
            this._gameData.serverTime = data.serverTime;
            var time = new Date();
            this._gameData.deltaLocalToServer = time.getTime() - data.serverTime;
            cc.director.loadScene('fiting');
        }else{
            alert(data.message);
        }
    },

    onDestroy:function(){
        this._gameData.socket.off('connection');
        this._gameData.socket.off('joinHouse');
    }
});
