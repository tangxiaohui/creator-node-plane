var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));//将在server.js同级的public目录下寻找  
// app.get('/b.html', function(req, res){  
//     console.log('get')
//     var user_name=req.query.user;   
//     res.send('<h1>Welcome Realtime Server'+user_name+'</h1>');  
// });


//计入某组
//socket.join('group1');

//离开某组
//socket.leave('group1');

//向某组全体成员发送消息
//io.sockets.in('group1').emit('event_name', data);
//io.in('group1').emit('event_name', data);
//io.to('group1').emit('event_name', data);

//向除自己以外的、在某组里面的所有成员发送消息
//socket.broadcast.to('group1').emit('my message', msg);

//房间内最大人数
var houseMaxNum = 2;

var id = 0;

var house = {};
//house[data.houseID] = {players:[],fiting:false};

var players = {};

//游戏内玩家飞机的状态
var state = {}
state.normal = 0;       //正常
state.weak = 1;         //虚弱
state.Invincible = 2;   //无敌
state.moveFast = 3;     //快速移动
state.fireFast = 4;     //快速发子

state.twoFire = 5;      //双发子弹
state.threeFire = 6;    //三发子弹

/*
player = {
    playerID:,          //用户ID
    x:0,                //用户位置x
    y:0,                //用户位置y
    blood:100,          //血量
    state:state.normal, //状态（吃到某些道具后会获得状态，比如无敌，快速发射，子弹改变等）
}

*/
// var enemys = {
//     1: [
//         { time: 10, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 15, enemyid: 1, pos: { x: 200, y: 450 } }, { time: 20, enemyid: 1, pos: { x: 50, y: 450 } }, { time: 25, enemyid: 1, pos: { x: -100, y: 450 } },
//         { time: 30, enemyid: 1, pos: { x: -50, y: 450 } }, { time: 35, enemyid: 1, pos: { x: -300, y: 450 } }, { time: 40, enemyid: 1, pos: { x: 0, y: 450 } }, { time: 45, enemyid: 1, pos: { x: 100, y: 450 } },
//         { time: 50, enemyid: 1, pos: { x: 250, y: 450 } }, { time: 55, enemyid: 1, pos: { x: -250, y: 450 } }, { time: 60, enemyid: 1, pos: { x: 300, y: 450 } }, { time: 65, enemyid: 1, pos: { x: 0, y: 450 } }
        
//     ],
//     2: [
//         { time: 10, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 15, enemyid: 1, pos: { x: 200, y: 450 } }, { time: 20, enemyid: 1, pos: { x: 50, y: 450 } }, { time: 25, enemyid: 1, pos: { x: -100, y: 450 } },
//         { time: 30, enemyid: 1, pos: { x: -50, y: 450 } }, { time: 35, enemyid: 1, pos: { x: -300, y: 450 } }, { time: 40, enemyid: 1, pos: { x: 0, y: 450 } }, { time: 45, enemyid: 1, pos: { x: 100, y: 450 } },
//         { time: 50, enemyid: 1, pos: { x: 250, y: 450 } }, { time: 55, enemyid: 1, pos: { x: -250, y: 450 } }, { time: 60, enemyid: 1, pos: { x: 300, y: 450 } }, { time: 65, enemyid: 1, pos: { x: 0, y: 450 } }
//     ],
//     3: [
//         { time: 10, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 15, enemyid: 1, pos: { x: 200, y: 450 } }, { time: 20, enemyid: 1, pos: { x: 50, y: 450 } }, { time: 25, enemyid: 1, pos: { x: -100, y: 450 } },
//         { time: 30, enemyid: 1, pos: { x: -50, y: 450 } }, { time: 35, enemyid: 1, pos: { x: -300, y: 450 } }, { time: 40, enemyid: 1, pos: { x: 0, y: 450 } }, { time: 45, enemyid: 1, pos: { x: 100, y: 450 } },
//         { time: 50, enemyid: 1, pos: { x: 250, y: 450 } }, { time: 55, enemyid: 1, pos: { x: -250, y: 450 } }, { time: 60, enemyid: 1, pos: { x: 300, y: 450 } }, { time: 65, enemyid: 1, pos: { x: 0, y: 450 } }
//     ],
// };


var goodID = 0;
//用来存放敌人死亡时生成的道具，每个道具有唯一的编号
var goods = {};
/*
good ={
    goodID:,
    x:,
    y:,
    state:state.Invincible  //物品给玩家带来的状态
}
*/


io.on('connection',
    function (socket) {
        console.log('a user connected' + socket.playerID);
        //向客户端socket发送消息

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
        //end


        //向用户发送登录成功消息,发送自身信息
        socket.emit('connection', { player: player });

        //用户离开时
        socket.on('disconnect', function () {
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
                    console.log('deleteHouse ' + socket.houseID);
                    delete house[socket.houseID];
                }
            }

            delete players[socket.playerID];

            // delete socket.playerID;
            // delete socket.houseID;
        })

        //用户登录房间data=>{houseID:houseID};
        socket.on('joinHouse', function (data) {
            //将消息输出到控制台

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
            //广播消息
            // io.sockets.emit('joinHouse', user);
        });

        //背景移动
        socket.on('bgMove', function () {

        })


        //入场
        socket.on('onload', function () {
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

        //自己状态改变 data=>{state:}
        socket.on('changeState', function (data) {
            var sockets = house[socket.houseID].players;
            for (var key in sockets) {
                var so = sockets[key];
                so.emit('changeState', { playerID: socket.playerID, state: data.state });
            }
        })

        //移动 data=>{x:x,y:y}
        socket.on('move', function (data) {
            var player = players[socket.playerID];
            player.x = data.x;
            player.y = data.y;

            io.in(socket.houseID).emit('move', { playerID: player.playerID, x: player.x, y: player.y });

            // var sockets = house[socket.houseID].players;
            // for (var key in sockets){
            //     sockets[key].emit('move', {playerID:socket.playerID,x:data.x,y:data.y});
            // }
        })

        //发射子弹
        socket.on('attack', function (data) {
            // var sockets = house[socket.houseID].players;
            // for (var key in sockets){
            //     sockets[key].emit('kill', {playerID:socket.playerID,enemyID:data.enemyID});
            // }

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
server.listen(9999, function () {
    console.log('listening on 9999')
});



// function addScale(name)
//     //根据控件名字name增加0.1的scale
//     Window.SetWindowStyle(name,"scale",mTunShiData.mtunshixuetiao[HuoInd]/10)
// end

// function cutScale(name)
//     //根据控件名字name减少0.1的scale
//     Window.SetWindowStyle(name,"scale",mTunShiData.mtunshixuetiao[HuoInd]/10)
// end

// function scaleTo(name, scale, scaltTo)
//     local chazhi = scaltTo - scale;
//     local n = cut>0?cut*10:-cut*10
//     for i= 0,n do
//         if chazhi> 0 then
//             Window.SetDelayEvent( name, 0.1*i, "konghuoxiulian/konghuoxiulianui:addScale",name);
//         else
//             Window.SetDelayEvent( name, 0.1*i, "konghuoxiulian/konghuoxiulianui:cutScale",name);
//         end

//     end    
// end

// function scaleTo(name, scale)
//     Window.StopAction(name,-1)
//     Window.RunAction( "qyjhzstatic", 1, "elasticout:scaleto", scale, scale, 1.0 )
// end

