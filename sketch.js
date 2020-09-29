
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/PQSffntSm/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";


let question;
let questionFade = 0;

let  yes;
let  yesFade = 0;

let no;
let noFade = 0;

let funny;
let funnyFade = 0;

let love;
let loveFade = 0;


// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL+"model.json");
  question = loadImage("question.png");
  love = loadImage("love.png");
  funny = loadImage("funny.png");
  yes = loadImage("yes.png");
  no = loadImage("no.png");
}


function setup() {
  createCanvas(640, 480);
  // Create the video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  tint(255);
  image(flippedVideo, 0, 0);
   // console.log('qusetion');
  if ( label == 'question'){
     questionFade = 255;
    
  }
  else if (label == 'yes'){
    yesFade = 255;
  }
  else if (label == 'no'){
    noFade = 255;
  }
  else if (label == 'funny'){
    funnyFade = 255;
  }
  else if (label == 'love'){
    loveFade = 255;
  }
  
 
  if (questionFade > 0){
    tint(255,questionFade);
    image(question, 0, 0);
     questionFade -= 10;
  }
  
  if (yesFade > 0){
    tint(255,yesFade);
    image(yes, 0, 0);
     yesFade -= 10;
  }
  
  if (noFade > 0){
    tint(255,noFade);
    image(no, 50, 0);
     noFade -= 10;
  }
  
  if (loveFade > 0){
    tint(255,loveFade);
    image(love, 0, 50);
     loveFade -= 10;
  }
  if (funnyFade > 0){
    tint(255,funnyFade);
    image(funny, 0, 0);
     funnyFade -= 10;
  }
  
  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}