const cv = require('opencv4nodejs-prebuilt-install');
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const FPS=30;
const wCap = new cv.VideoCapture(0);
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 300);
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 300);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../cameracheck/src/index.html'));
});

setInterval(()=>{
    const frame =wCap.read();
    const image = cv.imencode('.jpg', frame).toString('base64');
    io.emit('image',image);
},1000 / FPS)

server.listen(3000);
