import _ from 'lodash'
import moment from "moment";
import io from 'socket.io-client';
import Peer from 'simple-peer'
import adb from "./db";

class Net {
  constructor() {
    document.addEventListener('deviceready', this.init.bind(this), false);
    this.node_port = _.random(1025, 65534);
  }
  init() {
    nodejs.channel.setListener(msg => {
      console.log('[cordova] received: ' + msg);
      msg = JSON.parse(msg)
      switch (msg.cmd) {
        case 'start_express':
          console.log(msg.msg);
          vm.$emit('nodejs_svr_up', this.node_port);
          break;
        case 'get_file_list':
          vm.$emit('node_msg', msg.list);
          break;  
      }
    });
    nodejs.start('main.js', (err) => {
      if (err) {
        console.log(err);
        // vm.$emit('update_order_state', data);
      } else {
        const msg = JSON.stringify({
          cmd: 'start_express',
          port: this.node_port
        })
        nodejs.channel.send(msg);
      }
    });
    this.sock = io(`http://127.0.0.1:${this.node_port}`);
    this.sock.on('connect', this.on_connect.bind(this));
    this.sock.on('refresh_file_list', this.on_refresh_file_list.bind(this));
    this.sock.on('update_order_state', this.on_update_order_state.bind(this));
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
    console.log('on_connect to local server')
    if (Peer.WEBRTC_SUPPORT) {
      // webrtc support!
      vm.$emit('node_msg', "此浏览器支持webrtc by xwalk");
    } else {
      // fallback
      vm.$emit('node_msg', "此浏览器不支持webrtc");
    }
  }
  on_update_order_state(data) {
    vm.$emit('update_order_state', data);
  }
  on_refresh_file_list(data) {
    vm.$emit('refresh_file_list', '');
  }
  emit(name, data, cb) {
    if (this.sock) {
      this.sock.emit(name, data, cb)
    }
  }

}
export default new Net;