var canvas;
var canvasHeight=2200;
var scratchLayer;
var eraserLine =[];
var coinX = 388;
var coinY = 490; 
var coinActive = false;
var cards=[]
var scratchCards =[];
var coin;

function setup() {
  canvas = createCanvas(windowWidth, canvasHeight);
  if(width<850) {coinX=100;}
  canvas.position((windowWidth - width) / 2,0);
  canvas.style("z-index","-1");
  coin = loadImage('images/coin.png')
  for (var i =0; i<3; i++){
    var n = Math.ceil(Math.random() * 42);
    var cardImage = loadImage('images/'+n+'back.png')
    cards.push(cardImage)
    var scratchImage = loadImage('images/'+n+'front.png')
    scratchCards.push(scratchImage)
  }
  
}

function draw() {
  background(255);
  //background(255);
  textAlign(CENTER, CENTER);
  
 
  scratchLayer = createGraphics(width,canvasHeight)
  scratchLayer.imageMode(CENTER);
  for (var i =0; i<3; i++){
    scratchLayer.image(scratchCards[i],width/2,(i+1)*500+200)
  }
  scratchLayer.imageMode(CORNER);

  imageMode(CENTER);
  for (var i =0; i<3; i++){
    image(cards[i],width/2,(i+1)*500+200)
  }
  imageMode(CORNER);

  
  eraseLine(scratchLayer)

  image(scratchLayer, 0, 0)

  fill([255,255,0])
  
  if (mouseIsPressed && dist(mouseX, mouseY, coinX, coinY)<=36){
    coinActive=true;
  } 
  if (coinActive){
    coinX=mouseX;
    coinY=mouseY;
  }
  if (!mouseIsPressed){
    coinActive=false;
  }
  imageMode(CENTER);
  image(coin,coinX,coinY)
  imageMode(CORNER);
  
}

function addToEraserLine() {
  if(mouseIsPressed&&coinActive) {
    var lineSegment = [pmouseX,pmouseY, mouseX, mouseY];
    eraserLine.push(lineSegment);
  }
}

function eraseLine(layer) {
  addToEraserLine()
  layer.erase();
  layer.stroke(0);
  layer.strokeWeight(35);
  for (i = 0; i < eraserLine.length; i++) {
    var coord = eraserLine[i]
    layer.line(coord[0],coord[1],coord[2],coord[3])
  }
  layer.noErase(); 
}

function touchMoved() {
  // prevent the display from moving around when you touch it
  if (coinActive){
    return false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, canvasHeight);
}