var Doodle = (function () {
    function Doodle(x, y, size) {
        this.FELL_OUT_OF_WINDOW = 0;
        this.x_ = x;
        this.y_ = y;
        this.size_ = size;
    }
    Doodle.prototype.draw = function () {
        this.shape = square(this.x_, this.y_, this.size_, 20);
    };
    Doodle.prototype.fall = function () {
        this.y_ += 3;
        if (this.y_ + this.size_ > windowHeight) {
            return this.FELL_OUT_OF_WINDOW;
        }
    };
    return Doodle;
}());
var Playground = (function () {
    function Playground() {
    }
    Playground.prototype.setup = function () {
        background(200);
        this.doodle = new Doodle(windowWidth / 2, windowHeight / 2, 55);
    };
    Playground.prototype.draw = function () {
        clear();
        background(200);
        if (this.doodle.fall() == this.doodle.FELL_OUT_OF_WINDOW) {
            this.gameOver();
        }
        this.doodle.draw();
    };
    Playground.prototype.gameOver = function () {
        console.log("Stop looping");
        noLoop();
    };
    return Playground;
}());
var Morph = (function () {
    function Morph() {
    }
    Morph.prototype.setup = function () {
        this.shapes = [];
        this.currentShape = 0;
        this.shapes.push({ points: Shapes.circle(100), color: color('#009CDF') });
        this.shapes.push({ points: Shapes.circle(150), color: color(255, 204, 0) });
        this.shapes.push({ points: Shapes.square(50), color: color(175, 100, 220) });
        this.morph = new Array();
        var highestCount = 0;
        for (var i = 0; i < this.shapes.length; i++) {
            highestCount = Math.max(highestCount, this.shapes[i].points.length);
        }
        for (var i = 0; i < highestCount; i++) {
            this.morph.push(new p5.Vector());
        }
    };
    Morph.prototype.recalc = function () {
        var totalDistance = 0;
        var points = this.shapes[this.currentShape].points;
        for (var i = 0; i < points.length; i++) {
            var v1 = points[i];
            var v2 = this.morph[i];
            v2.lerp(v1, 0.1);
            totalDistance += p5.Vector.dist(v1, v2);
        }
        if (totalDistance < 0.1) {
            this.currentShape++;
            if (this.currentShape >= this.shapes.length) {
                this.currentShape = 0;
            }
        }
    };
    Morph.prototype.draw = function () {
        this.recalc();
        var color = this.shapes[this.currentShape].color;
        var points = this.shapes[this.currentShape].points;
        translate(width / 2, height / 2);
        strokeWeight(4);
        beginShape();
        noFill();
        stroke(color);
        for (var i = 0; i < points.length; i++) {
            var v = this.morph[i];
            vertex(v.x, v.y);
        }
        endShape(CLOSE);
    };
    return Morph;
}());
var Shapes = (function () {
    function Shapes() {
    }
    Shapes.circle = function (size) {
        var points = new Array();
        for (var angle = 0; angle < 360; angle += 9) {
            var v = p5.Vector.fromAngle(radians(angle - 135));
            v.mult(size);
            points.push(v);
        }
        return points;
    };
    Shapes.square = function (size) {
        var points = new Array();
        for (var x = -size; x < size; x += 10) {
            points.push(createVector(x, -size));
        }
        for (var y = -size; y < size; y += 10) {
            points.push(createVector(size, y));
        }
        for (var x = size; x > -size; x -= 10) {
            points.push(createVector(x, size));
        }
        for (var y = size; y > -size; y -= 10) {
            points.push(createVector(-size, y));
        }
        return points;
    };
    Shapes.star = function (x, y, radius1, radius2, npoints) {
        var angle = TWO_PI / npoints;
        var halfAngle = angle / 2.0;
        var points = new Array();
        for (var a = 0; a < TWO_PI; a += angle) {
            var sx = x + cos(a) * radius2;
            var sy = y + sin(a) * radius2;
            points.push(createVector(sx, sy));
            sx = x + cos(a + halfAngle) * radius1;
            sy = y + sin(a + halfAngle) * radius1;
            points.push(createVector(sx, sy));
        }
        return points;
    };
    return Shapes;
}());
var playground;
function setup() {
    createCanvas(windowWidth, windowHeight);
    playground = new Playground;
    playground.setup();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    playground.draw();
}
function mousePressed() {
    noLoop();
}
//# sourceMappingURL=build.js.map