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
        player: cc.Prefab,
        enemy: cc.Prefab,
        bg1: cc.Node,
        bg2: cc.Node,
        _bg1y: 0,
        _bg2y: 0,

        _enemyArray: null,//敌人数组
    },

    // use this for initialization
    onLoad: function () {
        this._enemyArray = {};

        this._bg1y = this.bg1.y;
        this._bg2y = this.bg2.y;

        this._gameData = cc.gameData;

        //入场 返回目前在场内的player(包括自己)
        this._gameData.socket.on('onload', this._ononload.bind(this));

        this._gameData.socket.on('move', this._onmove.bind(this));

        //有用户断开连接data=》{playerID:}
        this._gameData.socket.on('exit', this._onexit.bind(this));

        //登场
        this._gameData.socket.emit('onload');

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },
    _ononload: function (data) {
        var players = data.players;
        for (var key in players) {
            var player = players[key];
            var node = this.addPlayer(player);
            this._gameData.playerNodes[player.playerID] = node;

            // if(player.playerID == this._gameData.player.playerID){
            //     this.addTouchOnPlayer(node);
            // }
        }
    },
    _onmove: function (data) {
        var node = this._gameData.playerNodes[data.playerID];
        node.x = data.x;
        node.y = data.y;
    },
    _onexit: function (data) {
        if (data.playerID == this._gameData.player.playerID) {
            gameData.player = null;
        }
        this._gameData.playerNodes[data.playerID].destroy();
        delete this._gameData.playerNodes[data.playerID];
    },
    addPlayer: function (player) {
        var node = cc.instantiate(this.player);
        if (player.playerID == this._gameData.player.playerID) {
            node.getComponent('player').init(player, true);
            this.addTouchOnPlayer(node);
        } else {
            node.getComponent('player').init(player, false);
        }
        node.parent = this.node;

        return node;
    },
    addTouchOnPlayer: function (node) {
        // node.on('touchstart',function(){

        // });

        node.on('touchmove', function (event) {
            var delta = event.getDelta();
            node.x += delta.x;
            node.y += delta.y;

            this._gameData.socket.emit('move', { x: node.x, y: node.y });
        }.bind(this));

        // node.on('touchend',function(){

        // });
    },
    onDestroy: function () {
        this._gameData.socket.off('onload');
        this._gameData.socket.off('move');
        this._gameData.socket.off('exit');
    },
    addEnemy: function (enemy,index) {
        var node = cc.instantiate(this.enemy);
        node.getComponent('enemy').init(this._enemyArray,index);
        node.x = enemy.pos.x;
        node.y = enemy.pos.y;

        node.parent = this.node;
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var startTime = this._gameData.startTime;
        var time = new Date();
        var nowTime = time.getTime() - this._gameData.deltaLocalToServer;
        var delta = (nowTime - startTime) / 1000;

        //添加敌人
        var enemys = this._gameData.enemys[1];
        for (var index = enemys.length - 1; index > 0; --index) {
            var enemy = enemys[index];
            if (Math.floor(delta) == enemy.time){
                this.addEnemy(enemy,index);
                enemy.time = -1;
            } else if (Math.floor(delta) > enemy.time){
                break;
            }
        }


        //滚动背景
        var n = delta / 12.8;
        n = n - parseInt(n);

        var cuty = Math.round(n * 768);

        this.bg1.y = this._bg1y - cuty;
        this.bg2.y = this._bg2y - cuty;
    },
});
