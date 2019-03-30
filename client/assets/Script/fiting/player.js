cc.Class({
    extends: cc.Component,

    properties: {
        bullet: cc.Prefab,
        _gameData: null,
        _playerID: 0,
        _blood: 0,
        _state: 0,
        _isSelf: false,
        _time: 0,
    },

    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter: function (other, self) {
        cc.log('死了');
    },

    // use this for initialization
    onLoad: function () {
        this._gameData = cc.gameData;
        this._gameData.socket.on('changeState', this._onchangeState, this);
    },
    
    init: function (player, isSelf) { // 初始化，参数1player是初始化数据，isSelf代表是不是自己控制的player
        this.node.x = player.x;
        this.node.y = player.y;
        this._playerID = player.playerID;
        this._blood = player.blood;
        this._state = player.state;
        this._isSelf = isSelf;
    },

    _onchangeState: function (data) {
        if (data.playerID == this._playerID) {
            this._state = data.state;
        }
    },

    changeState: function (state) {
        this._gameData.socket.emit('changeState', { state: state });
    },

    attack: function () {
        var node = cc.instantiate(this.bullet);
        node.getComponent('bullet').init(this._isSelf);
        node.x = this.node.x;
        node.y = this.node.y + 60;
        node.parent = this.node.parent;
    },

    onDestroy: function () {
        this._gameData.socket.off('changeState', this._onchangeState);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this._time++;
        if (this._time == 20) { // 不停添加子弹
            this._time = 0;
            this.attack();
        }
    }
});
