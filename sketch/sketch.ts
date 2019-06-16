let playground: Playground;

function setup() {
    createCanvas(windowWidth, windowHeight)
    playground  = new Playground;
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