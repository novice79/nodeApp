import _ from 'lodash'
import moment from "moment";
import io from 'socket.io-client';
import ss from "socket.io-stream";
import adb from "./db";

class Net {
  constructor() {

      this.sock = io();      
      this.sock.on('connect', this.on_connect.bind(this));
      // this.sock.on('disconnect', (reason) => {
      //   alert('disconnect 11111111111111111111111111111'+JSON.stringify(reason) )
      // });
      // this.sock.on('error', (error) => {
      //   alert('error 11111111111111111111111111111'+JSON.stringify(error) )
      // });
    
  }
  register_ui_evt() {
    vm.$on("notify_seller_status", data => {
      this.emit('notify_seller_status', data)
    });
  }

  on_connect() {
    // this.register_ui_evt()
    alert('on_connect local nodejs server')
  }
  on_update_order_state(data) {
    vm.$emit('update_order_state', data);
  }
  on_refresh_file_list(data) {
    vm.$emit('refresh_file_list', '');
  }
  upload_file(file) {
    let stream = ss.createStream();
    let blobStream = ss.createBlobReadStream(file);
    ss(this.sock).emit("upload_file", stream, {
      name: file.name,
      type: file.type,
      size: file.size,
      metadata: ""
    });
    let size = 0;
    blobStream.on("data", function (chunk) {
      size += chunk.length;
      let progress = Math.floor(size / file.size * 100);
      vm.$emit('on_load_progress', progress);
      // console.log(progress + "%");
      // -> e.g. '42%'
    });

    blobStream.pipe(stream);
  }
  emit(name, data, cb) {
    if (this.sock) {
      this.sock.emit(name, data, cb)
    }
  }
  
}
export default new Net;