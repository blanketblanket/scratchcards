var canvas;
var scratchLayer;
var eraserLine =[];
var cards=[];
var scratchCards =[];

function setup() {
  canvas = createCanvas(500, 1200);
  canvas.position((windowWidth - width) / 2,700);
  canvas.style("z-index","-1");
  var n = Math.ceil(Math.random() * 42);
  var cardImage = loadImage('images/'+n+'back.png');
  cards.push(cardImage);
  var cardImage = loadImage('images/'+n+'front.png');
  scratchCards.push(cardImage);
  n=n+1;
  var cardImage = loadImage('images/'+n+'back.png');
  cards.push(cardImage);
  var cardImage = loadImage('images/'+n+'front.png');
  scratchCards.push(cardImage);
}

function draw() {

  background(255);
  textAlign(CENTER, CENTER);

  scratchLayer = createGraphics(500,1200)
  scratchLayer.imageMode(CENTER);
  scratchLayer.image(scratchCards[0],250,250)
  scratchLayer.image(scratchCards[1],250,950)
  scratchLayer.imageMode(CORNER);

  imageMode(CENTER);
  image(cards[0],250,250)
  image(cards[1],250,950)

  
  eraseLine(scratchLayer)

  image(scratchLayer, 500/2, 1200/2)

  imageMode(CORNER);
  fill([255,255,0])
  imageMode(CENTER);
  imageMode(CORNER);
}

function addToEraserLine() {
  if(mouseIsPressed) {
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
  if (eraserLine.length>3000){eraserLine.shift();eraserLine.shift();}
  layer.noErase(); 
}

function touchMoved() {
  // prevent the display from moving around when you touch it
  return false;
}
