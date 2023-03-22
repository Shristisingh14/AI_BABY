
audio = "";
objects = [];
status = "";

function preload() {
    audio = loadSound("best_alarm.mp3");
}
function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,400);
    video.hide();
   
}

function start(){
    Object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Searching the baby";
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    
}
function gotResult(error, results) {
    if(error){
        console.log(error);
    }
    console.log(results);

    objects = results;
}
person = "person";

function draw() {
    image(video, 0, 0, 400, 400);
    
    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        Object_detector.detect(video, gotResult);
       
           for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Oject Detected";
            fill(r,g,b);
             percent = floor(objects[i].confidence * 100);
             text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y- 5);
             noFill();
             stroke(r,g,b);
             rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
             if(objects[i].label != person)
            {
               audio.play();
               document.getElementById("status").innerHTML = "Status : Baby not found";
               
            }
            else{
                audio.stop();
                document.getElementById("status").innerHTML = "Status : Baby found";
              
         }
    }

         if(objects.length == 0) {
                audio.play();
                document.getElementById("status").innerHTML = "Status : Baby not found";
                
         }
            
 }
}