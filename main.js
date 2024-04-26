video = "";
status = "";



function setup(){
    canvas =  createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
 }
 
 function draw(){
     image(video, 0, 0, 480, 380);
 }

function start(){
    objectDetetctor = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input_text = document.getElementById("input").value;
}

function modelLoaded(){
    console.log("Model loaded");
    status = "true";
}

