var data = {};

data.socket = null;
data.player = null;
data.playerNodes = {};

data.startTime = 0;
data.serverTime = 0;

data.enemys = {
    1: [
    //第一波
        { time: 10, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 12, enemyid: 1, pos: { x: 200, y: 450 } }, { time: 13, enemyid: 1, pos: { x: 50, y: 450 } },
        { time: 14, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 15, enemyid: 1, pos: { x: 200, y: 450 } }, { time: 16, enemyid: 1, pos: { x: 50, y: 450 } },
        { time: 17, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 19, enemyid: 1, pos: { x: -100, y: 450 } }, { time: 19, enemyid: 1, pos: { x: 200, y: 450 } },
    
        { time: 20, enemyid: 1, pos: { x: -100, y: 450 } }, { time: 21, enemyid: 1, pos: { x: -50, y: 450 } }, { time: 22, enemyid: 1, pos: { x: -300, y: 450 } },
        { time: 23, enemyid: 1, pos: { x: 0, y: 450 } }, { time: 24, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 25, enemyid: 1, pos: { x: 250, y: 450 } },
        { time: 26, enemyid: 1, pos: { x: -250, y: 450 } }, { time: 27, enemyid: 1, pos: { x: 300, y: 450 } }, { time: 28, enemyid: 1, pos: { x: 0, y: 450 } },
        { time: 29, enemyid: 1, pos: { x: -250, y: 450 } }, { time: 29, enemyid: 1, pos: { x: 300, y: 450 } }, { time: 29, enemyid: 1, pos: { x: 0, y: 450 } },

        { time: 30, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 32, enemyid: 1, pos: { x: 200, y: 450 } }, { time: 33, enemyid: 1, pos: { x: 50, y: 450 } },
        { time: 34, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 35, enemyid: 1, pos: { x: 200, y: 450 } }, { time: 36, enemyid: 1, pos: { x: 50, y: 450 } },
        { time: 37, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 39, enemyid: 1, pos: { x: -100, y: 450 } }, { time: 39, enemyid: 1, pos: { x: 200, y: 450 } },

        { time: 40, enemyid: 1, pos: { x: -100, y: 450 } }, { time: 41, enemyid: 1, pos: { x: -50, y: 450 } }, { time: 42, enemyid: 1, pos: { x: -300, y: 450 } },
        { time: 43, enemyid: 1, pos: { x: 0, y: 450 } }, { time: 44, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 45, enemyid: 1, pos: { x: 250, y: 450 } },
        { time: 46, enemyid: 1, pos: { x: -250, y: 450 } }, { time: 47, enemyid: 1, pos: { x: 300, y: 450 } }, { time: 48, enemyid: 1, pos: { x: 0, y: 450 } },
        { time: 49, enemyid: 1, pos: { x: -250, y: 450 } }, { time: 49, enemyid: 1, pos: { x: 300, y: 450 } }, { time: 49, enemyid: 1, pos: { x: 0, y: 450 } },

    //第二波
        { time: 50, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 52, enemyid: 1, pos: { x: 200, y: 450 } }, { time: 53, enemyid: 1, pos: { x: 50, y: 450 } },
        { time: 54, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 55, enemyid: 1, pos: { x: 200, y: 450 } }, { time: 56, enemyid: 1, pos: { x: 50, y: 450 } },
        { time: 57, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 59, enemyid: 1, pos: { x: -100, y: 450 } }, { time: 59, enemyid: 1, pos: { x: 200, y: 450 } },
    
        { time: 60, enemyid: 1, pos: { x: -100, y: 450 } }, { time: 61, enemyid: 1, pos: { x: -50, y: 450 } }, { time: 62, enemyid: 1, pos: { x: -300, y: 450 } },
        { time: 63, enemyid: 1, pos: { x: 0, y: 450 } }, { time: 64, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 65, enemyid: 1, pos: { x: 250, y: 450 } },
        { time: 66, enemyid: 1, pos: { x: -250, y: 450 } }, { time: 67, enemyid: 1, pos: { x: 300, y: 450 } }, { time: 68, enemyid: 1, pos: { x: 0, y: 450 } },
        { time: 69, enemyid: 1, pos: { x: -250, y: 450 } }, { time: 69, enemyid: 1, pos: { x: 300, y: 450 } }, { time: 69, enemyid: 1, pos: { x: 0, y: 450 } },

        { time: 70, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 72, enemyid: 1, pos: { x: 200, y: 450 } }, { time: 73, enemyid: 1, pos: { x: 50, y: 450 } },
        { time: 74, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 75, enemyid: 1, pos: { x: 200, y: 450 } }, { time: 76, enemyid: 1, pos: { x: 50, y: 450 } },
        { time: 77, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 79, enemyid: 1, pos: { x: -100, y: 450 } }, { time: 79, enemyid: 1, pos: { x: 200, y: 450 } },

        { time: 80, enemyid: 1, pos: { x: -100, y: 450 } }, { time: 81, enemyid: 1, pos: { x: -50, y: 450 } }, { time: 82, enemyid: 1, pos: { x: -300, y: 450 } },
        { time: 83, enemyid: 1, pos: { x: 0, y: 450 } }, { time: 84, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 85, enemyid: 1, pos: { x: 250, y: 450 } },
        { time: 86, enemyid: 1, pos: { x: -250, y: 450 } }, { time: 87, enemyid: 1, pos: { x: 300, y: 450 } }, { time: 88, enemyid: 1, pos: { x: 0, y: 450 } },
        { time: 89, enemyid: 1, pos: { x: -250, y: 450 } }, { time: 89, enemyid: 1, pos: { x: 300, y: 450 } }, { time: 89, enemyid: 1, pos: { x: 0, y: 450 } },

    //第三波
        { time: 90, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 92, enemyid: 1, pos: { x: 200, y: 450 } }, { time: 93, enemyid: 1, pos: { x: 50, y: 450 } },
        { time: 94, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 95, enemyid: 1, pos: { x: 200, y: 450 } }, { time: 96, enemyid: 1, pos: { x: 50, y: 450 } },
        { time: 97, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 99, enemyid: 1, pos: { x: -100, y: 450 } }, { time: 99, enemyid: 1, pos: { x: 200, y: 450 } },
    
        { time: 100, enemyid: 1, pos: { x: -100, y: 450 } }, { time: 101, enemyid: 1, pos: { x: -50, y: 450 } }, { time: 102, enemyid: 1, pos: { x: -300, y: 450 } },
        { time: 103, enemyid: 1, pos: { x: 0, y: 450 } }, { time: 104, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 105, enemyid: 1, pos: { x: 250, y: 450 } },
        { time: 106, enemyid: 1, pos: { x: -250, y: 450 } }, { time: 107, enemyid: 1, pos: { x: 300, y: 450 } }, { time: 108, enemyid: 1, pos: { x: 0, y: 450 } },
        { time: 109, enemyid: 1, pos: { x: -250, y: 450 } }, { time: 109, enemyid: 1, pos: { x: 300, y: 450 } }, { time: 109, enemyid: 1, pos: { x: 0, y: 450 } },

        { time: 110, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 112, enemyid: 1, pos: { x: 200, y: 450 } }, { time: 113, enemyid: 1, pos: { x: 50, y: 450 } },
        { time: 114, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 115, enemyid: 1, pos: { x: 200, y: 450 } }, { time: 116, enemyid: 1, pos: { x: 50, y: 450 } },
        { time: 117, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 119, enemyid: 1, pos: { x: -100, y: 450 } }, { time: 119, enemyid: 1, pos: { x: 200, y: 450 } },

        { time: 120, enemyid: 1, pos: { x: -100, y: 450 } }, { time: 121, enemyid: 1, pos: { x: -50, y: 450 } }, { time: 132, enemyid: 1, pos: { x: -300, y: 450 } },
        { time: 123, enemyid: 1, pos: { x: 0, y: 450 } }, { time: 124, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 135, enemyid: 1, pos: { x: 250, y: 450 } },
        { time: 126, enemyid: 1, pos: { x: -250, y: 450 } }, { time: 127, enemyid: 1, pos: { x: 300, y: 450 } }, { time: 138, enemyid: 1, pos: { x: 0, y: 450 } },
        { time: 129, enemyid: 1, pos: { x: -250, y: 450 } }, { time: 129, enemyid: 1, pos: { x: 300, y: 450 } }, { time: 139, enemyid: 1, pos: { x: 0, y: 450 } },
        
    ],
    2: [
        { time: 10, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 15, enemyid: 1, pos: { x: 200, y: 450 } }, { time: 20, enemyid: 1, pos: { x: 50, y: 450 } }, { time: 25, enemyid: 1, pos: { x: -100, y: 450 } },
        { time: 30, enemyid: 1, pos: { x: -50, y: 450 } }, { time: 35, enemyid: 1, pos: { x: -300, y: 450 } }, { time: 40, enemyid: 1, pos: { x: 0, y: 450 } }, { time: 45, enemyid: 1, pos: { x: 100, y: 450 } },
        { time: 50, enemyid: 1, pos: { x: 250, y: 450 } }, { time: 55, enemyid: 1, pos: { x: -250, y: 450 } }, { time: 60, enemyid: 1, pos: { x: 300, y: 450 } }, { time: 65, enemyid: 1, pos: { x: 0, y: 450 } }
    ],
    3: [
        { time: 10, enemyid: 1, pos: { x: 100, y: 450 } }, { time: 15, enemyid: 1, pos: { x: 200, y: 450 } }, { time: 20, enemyid: 1, pos: { x: 50, y: 450 } }, { time: 25, enemyid: 1, pos: { x: -100, y: 450 } },
        { time: 30, enemyid: 1, pos: { x: -50, y: 450 } }, { time: 35, enemyid: 1, pos: { x: -300, y: 450 } }, { time: 40, enemyid: 1, pos: { x: 0, y: 450 } }, { time: 45, enemyid: 1, pos: { x: 100, y: 450 } },
        { time: 50, enemyid: 1, pos: { x: 250, y: 450 } }, { time: 55, enemyid: 1, pos: { x: -250, y: 450 } }, { time: 60, enemyid: 1, pos: { x: 300, y: 450 } }, { time: 65, enemyid: 1, pos: { x: 0, y: 450 } }
    ],
};

data.deltaLocalToServer = 0;

cc.gameData = data;