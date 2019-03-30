var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

/**
1.计入某组
    socket.join('group1');

2.离开某组
    socket.leave('group1');

3.向某组全体成员发送消息
    io.sockets.in('group1').emit('event_name', data);
    io.in('group1').emit('event_name', data);
    io.to('group1').emit('event_name', data);

4.向除自己以外的、在某组里面的所有成员发送消息
    socket.broadcast.to('group1').emit('my message', msg);
 */

//房间内最大人数
var houseMaxNum = 2;
var id = 0;
var house = {};
var players = {};

// 游戏内玩家飞机的状态
var state = {}
state.normal = 0;       //正常
state.weak = 1;         //虚弱
state.Invincible = 2;   //无敌
state.moveFast = 3;     //快速移动
state.fireFast = 4;     //快速发子
state.twoFire = 5;      //双发子弹
state.threeFire = 6;    //三发子弹

var goodID = 0;

io.on('connection',
    function (socket) {
        console.log('a user connected');
        //将新连接的用户存储到用户列表中
        var player = {
            playerID: id,          //用户ID
            x: 0,                //用户位置x
            y: 0,                //用户位置y
            blood: 100,          //血量
            state: state.normal, //状态（吃到某些道具后会获得状态，比如无敌，快速发射，子弹改变等）
        }
        players[id] = player;
        socket.playerID = id;
        id++;
      
        //向用户发送登录成功消息,发送自身信息
        socket.emit('connection', { player: player });

        socket.on('disconnect', function () { // 用户离开时
            if (socket.houseID) {
                console.log(socket.playerID);
                socket.broadcast.in(socket.houseID).emit('exit', { playerID: socket.playerID });
                socket.leave(socket.houseID);

                var ahouse = house[socket.houseID];
                for (var i = 0; i < ahouse.players.length; ++i) {
                    if (ahouse.players[i].playerID == socket.playerID) {
                        ahouse.players.splice(i, 1);
                        break;
                    }
                }

                if (ahouse.players.length == 0) {
                    delete house[socket.houseID];
                }
            }

            delete players[socket.playerID];
        })

        socket.on('joinHouse', function (data) { //用户登录房间 data=>{houseID:houseID};
            if (house[data.houseID]) {
                if (house[data.houseID].players.length < houseMaxNum) {
                    socket.houseID = data.houseID;
                    house[data.houseID].players.push(socket);
                    //加入房间
                    socket.join(data.houseID);
                    var time = new Date();
                    socket.emit('joinHouse', { result: true, message: '进入房间成功', startTime: house[data.houseID].startTime, serverTime: time.getTime()});
                } else {
                    socket.emit('joinHouse', { result: false, message: '房间用户数量已达上限' + houseMaxNum });
                }
            } else {
                socket.houseID = data.houseID;
                var time = new Date();
                house[data.houseID] = { players: [], startTime: time.getTime() };
                house[data.houseID].players.push(socket);
                //加入房间
                socket.join(data.houseID);
                socket.emit('joinHouse', { result: true, message: '进入房间成功', startTime: time.getTime(), serverTime: time.getTime()});
            }
        });

        socket.on('bgMove', function () { }) // 背景移动
        
        socket.on('onload', function () { // 入场
            //向自己发送消息，发送房间内所有player(包括自己)
            var data = {};
            for (var i = 0; i < house[socket.houseID].players.length; ++i) {
                var playerID = house[socket.houseID].players[i].playerID;
                var player = players[playerID];
                data[playerID] = player;
            }
            socket.emit('onload', { players: data });

            //向其它客户端发送消息，发送自己
            data = {};
            data.players = {};
            data.players[socket.playerID] = players[socket.playerID];
            socket.broadcast.in(socket.houseID).emit('onload', data);
        })

        socket.on('changeState', function (data) { // 自己状态改变 data=>{state:}
            var sockets = house[socket.houseID].players;
            for (var key in sockets) {
                var so = sockets[key];
                so.emit('changeState', { playerID: socket.playerID, state: data.state });
            }
        })

        socket.on('move', function (data) { // 移动 data=>{x:x,y:y}
            var player = players[socket.playerID];
            player.x = data.x;
            player.y = data.y;

            io.in(socket.houseID).emit('move', { playerID: player.playerID, x: player.x, y: player.y });
        })

        //发射子弹
        socket.on('attack', function (data) {
            io.in(socket.houseID).emit('attack', { playerID: player.playerID });
        })

        //杀死敌人
        socket.on('kill', function (data) {
            var sockets = house[socket.houseID].players;
            for (var key in sockets) {
                sockets[key].emit('kill', { playerID: socket.playerID, enemyID: data.enemyID });
            }
        })

        //自己吃到道具
        socket.on('eat', function (data) {
            var sockets = house[socket.houseID].players;
            for (var key in sockets) {
                sockets[key].emit('eat', { playerID: socket.playerID, goodID: data.goodID });
            }
        })

        //自己减少血量
        socket.on('cutBlood', function (data) {
            var sockets = house[socket.houseID].players;
            for (var key in sockets) {
                sockets[key].emit('cutBlood', { playerID: socket.playerID, cutNum: data.cutNum });
            }
        })

        //自己死亡
        socket.on('dile', function () {
            var sockets = house[socket.houseID].players;
            for (var key in sockets) {
                sockets[key].emit('dile', { playerID: socket.playerID });
            }
        })

    }
);

var port = 9999;
server.listen(port, function () {
    console.log('server start at port= ', port);
});

