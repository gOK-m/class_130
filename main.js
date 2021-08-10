rightWristX = 0;
leftWristX = 0;
leftWristY = 0;
rightWristY = 0;
song = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(550, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses)
}

function draw(){
    image(video, 0, 0, 550, 400);
    fill("#FF000");
    stroke("#FF000");
    circle(rightWristX, rightWristY, 20);
    if(rightWristY > 0 && rightWristY <= 100){
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(0.5); 
    }
    else if(rightWristY > 100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML = "speed = 1x";
        song.rate(1);
    }
    else if(rightWristY > 200 && rightWristY <= 300){
        document.getElementById("speed").innerHTML = "speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY > 300 && rightWristY <= 400){
        document.getElementById("speed").innerHTML = "speed = 2x";
        song.rate(2);
    }
    else if(rightWristY > 400 && rightWristY <= 500){
        document.getElementById("speed").innerHTML = "speed = 2.5x";
        song.rate(2.5);
    }
    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        inNumberLeftWristY = Number(leftWristY);
        removeDecimals = floor(inNumberLeftWristY);
        volume = removeDecimals / 500;
        document.getElementById("volume").innerHTML = "volume = " + volume;
        song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop(){
    song.stop();
}

function modelLoaded(){
    console.log("posenet is initialized!");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("left wrist x = " + leftWristX + "left wrist y = " + leftWristY + "right wrist x = " + rightWristX + "right wrist y = " + rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("score left wrist = " + scoreLeftWrist);
    }
}