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

const util = require('./util');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

const media_dir = '/sdcard/fl_repo';
const liter_dir = `${media_dir}/book`
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

cordova.channel.on('message', (msg) => {
    // console.log('[node] received:', msg);
    try {
        msg = JSON.parse(msg)
    } catch (err) {
        return cordova.channel.send(JSON.stringify({
            ret: -1,
            msg: '消息格式不正确，需要json消息'
        }));
    }
    switch (msg.cmd) {
        case 'get_file_list':
            util.filewalker(media_dir, (err, data) => {
                if (err) {
                    Object.assign(msg, {
                        ret: -1,
                        msg: err
                    });
                } else {
                    Object.assign(msg, {
                        ret: 0,
                        list: data
                    });
                }
                // console.log(data);
                cordova.channel.send( JSON.stringify(msg) );
            }, {dir:media_dir, url:`http://127.0.0.1:${app.get('port')}`});
            break;
        case 'start_express':
            server.listen(msg.port, () => {
                const info = `Express server listen on ${msg.port}`;
                app.set('port', msg.port);
                console.log(info)
                Object.assign(msg, {
                    ret: 0,
                    msg: info
                });
                cordova.channel.send( JSON.stringify(msg) );
            });    
            break;
        default:{

        }
        
    }
    // fs.writeFile(`${liter_dir}/aaaa.txt`, "Hey there! from nodejs on android", function (err) {
    //     if (err) {
    //         cordova.channel.send("The file created failed:"+JSON.stringify(err) );
    //     } else {
    //         cordova.channel.send("The file created success");
    //     }

    // });    
});
////////////////////////////////////////////////////
app.use(require('express').static(__dirname + '/public'));
app.use('/media', require('express').static(media_dir), serveIndex(media_dir, { 'icons': true }));

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
                io.emit('refresh_file_list', '')
            });
    });
    socket.on('ferret', function (name, fn) {
        fn('woot');
        socket.emit('ww', 'pp', function (data) {
            console.log('emit ww return:', data); // data will be 'woot'
        });
    });
});