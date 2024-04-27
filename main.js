let status = ""
let input = ""
objects = []

const synth = window.speechSynthesis

function setup(){
    canvas = createCanvas(380,380)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(480,380)
    video.hide()
}
function draw(){
    image(video,0,0,480,380)
    
    if(status!=""){
        objDetector.detect(video,gotResults)
        for(i = 0;i<objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected"
            fill(255,0,0)
            confidencePercent = floor(objects[i].confidence * 100)
            text(objects[i].label + " "+confidencePercent+"% ",objects[i].x+5,objects[i].y+15)
            noFill()
            stroke(255,0,0)
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
            if(input == objects[i].label){
                document.getElementById("checkingIfFound").innerHTML = "Object Name : "+input
                video.stop()
                objDetector.detect(gotResults)
                const utterThis = new SpeechSynthesisUtterance(input+" found");
                synth.speak(utterThis)
            }else{
                document.getElementById("checkingIfFound").innerHTML = "Object not found"
            }
        }
    }
    
}
function start(){
    objDetector = ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
    input  = document.getElementById("inp").value 

}
function modelLoaded(){
    status="true"
}
function gotResults(error,results){
    if(error){
        console.log(error)
    }else{
        objects = results
    }
}