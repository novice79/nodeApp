const fs = require('fs');
const cordova = require('cordova-bridge');

cordova.channel.on('message', function (msg) {
    console.log('[node] received:', msg);
    fs.writeFile('/sdcard/aaaa.txt', "Hey there! from nodejs on android", function (err) {
        if (err) {
            cordova.channel.send("The file created failed:"+JSON.stringify(err) );
        } else {
            cordova.channel.send("The file created success");
        }
        
    });    
});
////////////////////////////////////////////////////
const app = require('express')();
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
// Create the log directory if it does not exist
if (!fs.existsSync(media_dir)) {
    fs.mkdirSync(media_dir);
}
app.use(require('express').static(__dirname + '/public'));
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