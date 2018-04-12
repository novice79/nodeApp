const fs = require('fs');
const cordova = require('cordova-bridge');
const app = require('express')();
const serveIndex = require('serve-index');
const session = require('express-session');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const ss = require('socket.io-stream');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const _ = require('lodash');
const moment = require('moment');

app.set('port', process.env.PORT || 8200);
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

const media_dir = '/sdcard/freego';
const liter_dir = `${media_dir}/literature`
const music_dir = `${media_dir}/music`
const video_dir = `${media_dir}/video`
// Create the log directory if it does not exist
if (!fs.existsSync(media_dir)) {
    fs.mkdirSync(media_dir);
}
if (!fs.existsSync(liter_dir)) {
    fs.mkdirSync(liter_dir);
}
if (!fs.existsSync(music_dir)) {
    fs.mkdirSync(music_dir);
}
if (!fs.existsSync(video_dir)) {
    fs.mkdirSync(video_dir);
}
cordova.channel.on('message', function (msg) {
    console.log('[node] received:', msg);
    fs.writeFile(`${liter_dir}/aaaa.txt`, "Hey there! from nodejs on android", function (err) {
        if (err) {
            cordova.channel.send("The file created failed:"+JSON.stringify(err) );
        } else {
            cordova.channel.send("The file created success");
        }
        
    });    
});
////////////////////////////////////////////////////
app.use(require('express').static(__dirname + '/public'));
app.use('/media', require('express').static(media_dir), serveIndex(media_dir, {'icons': true}) );

server.listen(app.get('port'), () => {
    console.log(`express listen on ${app.get('port')}`)
});

io.on('connection', function (socket) {
    socket.on('reg_uuid', function (data) {

    });
    ss(socket).on('upload_file', function (stream, data) {
        // stream.pipe(bucket.openUploadStream(data.name, {
        //     contentType: data.type,
        //     metadata: data.metadata
        // }))
        stream.pipe(fs.createWriteStream(`${media_dir}/${data.name}`))
        .on('error', function (error) {
            
        })
        .on('finish', function () {

            console.log('upload_file done!');
            io.emit('refresh_file_list','')
        });
    });
    socket.on('ferret', function (name, fn) {
        fn('woot');
        socket.emit('ww', 'pp', function (data) {
            console.log('emit ww return:', data); // data will be 'woot'
        });
    });
});