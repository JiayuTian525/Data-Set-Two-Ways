//The data provides statistics on the lifetime prevalence of physical or sexual violence, or both, by intimate partners among women (aged 15-49 years) worldwide in 2018.
//data source:https://www.thelancet.com/article/S0140-6736(21)02664-7/fulltext


let violence;
let canvas;
let img;

function preload() {
  img = loadImage('crying.png');
}

function setup() {
  //createCanvas(650, 500);
  canvas = createCanvas(windowWidth, windowHeight);
  
  //no animation / interaction chart
  noLoop();

  //read json file
  fetch("./json/DomesticViolence.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    // console.log(data);
    
    //store the DomesticViolence from json in violence variable
    violence = data.DomesticViolence;

    //using no Loop? you can just call your function once the data is loaded
    
    //call drawChart()
    drawChart();
  
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });

}

function draw() {
  
  background(224);
  
  textAlign(CENTER);
  fill(0);
  textSize(windowWidth*0.018);
  text('Africa', windowWidth*0.1, windowHeight/2*0.91);
  textSize(windowWidth*0.016);
  text('33%', windowWidth*0.1, windowHeight/2*0.97);
  
  textSize(windowWidth*0.018);
  text('Americas', windowWidth*0.3, windowHeight/2*0.91);
  textSize(windowWidth*0.016);
  text('25%', windowWidth*0.3, windowHeight/2*0.97);
  
  textSize(windowWidth*0.018);
  text('Asia', windowWidth*0.5, windowHeight/2*0.91);
  textSize(windowWidth*0.016);
  text('27%', windowWidth*0.5, windowHeight/2*0.97);

  textSize(windowWidth*0.018);
  text('Europe', windowWidth*0.7, windowHeight/2*0.91);
  textSize(windowWidth*0.016);
  text('20%', windowWidth*0.7, windowHeight/2*0.97);
  
  textSize(windowWidth*0.018);
  text('Oceania', windowWidth*0.9, windowHeight/2*0.91);
  textSize(windowWidth*0.016);
  text('30%', windowWidth*0.9, windowHeight/2*0.97);
  
  //Lifetime prevalence of physical or sexual violence, or both, by an intimate partner among women (15-49 years) globally, 2018
  
  textSize(windowWidth*0.018);
  text('Lifetime prevalence of physical or sexual violence, or both', windowWidth*0.5, windowHeight*0.05);
  text('by an intimate partner among women (15-49 years) globally, 2018', windowWidth*0.5, windowHeight*0.09);
  
  push();
  
  rectMode(CENTER);
  noStroke();
  fill(119,61,61);
  rect(windowWidth*0.1,windowHeight*3/4,windowWidth/5,windowHeight/2);
  
  fill(191,153,153);
  rect(windowWidth*0.3,windowHeight*3/4,windowWidth/5,windowHeight/2);
  
  fill(170,123,133);
  rect(windowWidth*0.5,windowHeight*3/4,windowWidth/5,windowHeight/2);
  
  fill(217,191,193);
  rect(windowWidth*0.7,windowHeight*3/4,windowWidth/5,windowHeight/2);
  
  fill(153,97,97);
  rect(windowWidth*0.9,windowHeight*3/4,windowWidth/5,windowHeight/2);
  pop();

}

function windowResized() {//Responsive design
  resizeCanvas(windowWidth, windowHeight);
  redraw();
  drawChart();
}

function drawChart(){

  //console.log(breakfast);
  
  //go through violence array，accumulate the amount of each item.
  //finally，total contain the sum of the amounts of all items
  let total = 0;
  for(let i = 0; i < violence.length; i++){
    //get total
    total += violence[i].percentage;
    
  }
  
  //console.log(total);
  
  let x = windowWidth*0.05;
  let y = windowHeight/2 - windowHeight/2*0.15;
  let barWidth = windowWidth*0.1;
  let tearX = windowWidth*0.15;
  
  for(let i = 0; i < violence.length; i++){
    //draw
    //iterate through each violence and, using the previous data, draw the rectangle
    let item = violence[i];//read each item
    
    console.log(item);
    
    let itemFraction = item.percentage;
    let barHeight = itemFraction*windowHeight/2*0.018;
    

    fill(item.color);
    noStroke();
    rect(x, y - barHeight, barWidth, barHeight);
    
    x += barWidth + windowWidth*0.1;
    
    push();
    translate(tearX, item.percentage*2.8 + windowHeight*0.76)
    scale(item.percentage/6*windowWidth*windowHeight*0.002*0.001);
    drawTear();
    tearX += windowWidth*0.2;
    pop();

    image(img, windowWidth*0.025, windowHeight*0.7, windowWidth*0.15, windowWidth*0.15);
    image(img, windowWidth*0.225, windowHeight*0.7, windowWidth*0.15, windowWidth*0.15);
    image(img, windowWidth*0.425, windowHeight*0.7, windowWidth*0.15, windowWidth*0.15);
    image(img, windowWidth*0.625, windowHeight*0.7, windowWidth*0.15, windowWidth*0.15);
    image(img, windowWidth*0.825, windowHeight*0.7, windowWidth*0.15, windowWidth*0.15);
    
    
  }
    
}

function drawTear() {
  noStroke();
  fill(104,164,173);
  beginShape();
  vertex(0,-5);
  quadraticVertex(3, 0, 0, 1);
  quadraticVertex(-3,0, 0, -5);
  endShape();
}