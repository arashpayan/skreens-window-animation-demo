'use strict';

// --- SET THIS TO THE ADDRESS OF YOUR SKREENS DEVICE ---
let skreensAddr = "192.168.1.172"
// --- END ---

function onSocketOpen(evt) {
    console.log("socket.onopen");
    console.log(evt);
}

function onSocketError(evt) {
    console.log("socket.onerror");
    console.log(evt);
}

function onSocketMessage(evt) {
}

function onAnimateClicked() {
    let duration = document.getElementById("duration_field").value;
    let fps = document.getElementById("fps_field").value;
    let winId = parseInt(document.getElementById("window_id_field").value);
    animateHDMIWindow(duration, fps, winId);
}

function animateHDMIWindow(animationDuration, framesPerSecond, windowId) {
    console.log("animating with ", animationDuration, framesPerSecond, windowId);
    let totalFrames = animationDuration * framesPerSecond;
    let stepInterval = 1.0 / framesPerSecond
    console.log("stepInterval: ", stepInterval);

    let pos = {x: 0, y: 0, width: 0, height: 0};
    // pos.x = 0;
    // pos.y = 0;
    // pos.width = 0;
    // pos.height = 0;
    let stepSize = 1.0 / totalFrames
    let stepCount = 0;
    let timerContext = setInterval(function() {
        // console.log("intervla func");
        if (stepCount > totalFrames) {
            clearInterval(timerContext);
            return;
        }
        pos.width = stepCount * stepSize;
        pos.height = stepCount * stepSize;
        let msg = {
            command: "reposition_window",
            window_id: windowId,
            position: pos
        };
        // console.log(JSON.stringify(msg));
        socket.send(JSON.stringify(msg));
        stepCount += 1;
    }, stepInterval * 1000);
}

let socket = new WebSocket("ws://"+skreensAddr+"/1/sockets");
socket.onopen = onSocketOpen;
socket.onerror = onSocketError;
socket.onmessage = onSocketMessage;
