// var myGamePiece;
// var blaster
// var myObstacles = [];
var playerBlaster = [];

function startGame() {
    myGameArea.start();
    myGamePiece = new ship("https://www.nicepng.com/png/full/36-365566_jedistarfighter-detail-star-wars-jedi-starfighter-top-view.png", "image");
    // blaster = new blast("https://www.pngarts.com/files/11/Green-Laser-PNG-Image.png", "image");
    myBackground = new background(innerWidth, innerHeight, "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80", 0, 0, "background");
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        })
        window.addEventListener('space', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}

function updateGameArea() {
    var x, y;
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    }

    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) moveleft()
    if (myGameArea.keys && myGameArea.keys[39]) moveright()
    if (myGameArea.keys && myGameArea.keys[38]) moveup()
    if (myGameArea.keys && myGameArea.keys[40]) movedown()
    if (myGameArea.keys && myGameArea.keys[32]) {
        blaster = new blast("https://www.pngarts.com/files/11/Green-Laser-PNG-Image.png", "image", myGamePiece.x, myGamePiece.y - 10);
        // playerBlaster.push(blast)
        myGamePiece.newPos();
        // blaster.update()
        playerBlaster.push(blaster)
    }
    myBackground.newPos();
    myBackground.update();
    // blaster.newPos()
    // blaster.update()
    myGamePiece.newPos();
    myGamePiece.update();
    playerBlaster.forEach(blast => {
        // blast.speedY = 0
        // blast.speedX = 0
        blast.newPos()
        blast.update()
    })
    myBackground.speedY = 1;
}

function blast(url, type, x, y) {
    this.type = type;
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = url;
    }
    this.width = 300 * .10;
    this.height = 300 * .10;
    this.speedX = 0;
    this.speedY = -3;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;

    }
}

function ship(url, type) {
    this.type = type;
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = url;
    }
    this.width = 341 * .12;
    this.height = 692 * .12;
    this.speedX = 0;
    this.speedY = 0;
    this.x = myGameArea.canvas.width / 2 - this.width / 2;
    this.y = myGameArea.canvas.height - this.height / 2;
    this.update = function () {
        ctx = myGameArea.context;
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.hitBoundary()

    }
    // if space ship goes throw the boundary
    this.hitBoundary = function () {
        var boundarybottom = myGameArea.canvas.height - this.height - 50;
        var boundarytop = 0 + this.height - 50;
        var boundaryright = myGameArea.canvas.width;
        var boundaryLeft = 0 - this.width
        if (this.y > boundarybottom) {
            this.y = boundarybottom;
        }
        if (this.y < boundarytop) {
            this.y = boundarytop;
        }
        if (this.x < boundaryLeft) {
            this.x = boundaryright
        }
        if (this.x > boundaryright) {
            this.x = 0
        }
    }
}




function background(width, height, url, x, y, type) {
    this.type = type;
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = url;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            if (type == "background") {
                ctx.drawImage(this.image, this.x, this.y - this.height, this.width, this.height);
            }
        }
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type == "background") {
            if (this.y == (this.height)) {
                this.y = 0;
            }

        }
    }
}


function moveup() {
    myGamePiece.speedY -= 15;
}

function movedown() {
    myGamePiece.speedY += 15;
}

function moveleft() {
    myGamePiece.speedX -= 15;
}

function moveright() {
    myGamePiece.speedX += 15;
}

function stopMove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}

function shoot() {

}