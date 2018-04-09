<template>
  <home data-page="true">
    <header class="header-bar">
      <div class="center">
        <h1 class="title">【音乐/书籍】 管理</h1>
      </div>
    </header>
    <div class="content">
   
      <div style="justify-content:space-around;margin-top:10px;">
        <div v-if="nodejs_started && address"> nodejs服务监听在: http://{{address}}:8200 </div>
        <div>{{node_msg}}</div>
        <button class="btn primary" style="flex:1; margin-top:20px;" @click.prevent="create_file()">
          <h3 style="display:inline-block;margin:auto;">
            test create file
          </h3>
        </button> 
        <button class="btn negative" style="flex:1; margin-top:20px;" @click.prevent="exit_app()">
          <h3 style="display:inline-block;margin:auto;">
            退出程序
          </h3>
        </button>  
        
      </div>
      
    </div>
  </home>
</template>

<script>
import moment from "moment";
import _ from "lodash";
import Noty from "noty";
import adb from "../db";
import net from "../net";
import util from "../common/util"


  
export default {
  name: "PhononHomePage",
  props: {
    app: {
      type: Object
    }
  },
  created: function() {
    this.$root.$on("on_qrcode", qr_code => {
   
    });
    document.addEventListener(
      "deviceready",
      () => {
        this.device_ready = true;
        nodejs.channel.setListener(msg=> {
            console.log('[cordova] received: ' + msg);
            this.node_msg = msg;
        });
        nodejs.start('main.js', (err)=> {
          if (err) {
              console.log(err);
          } else {
              console.log ('Node.js Mobile Engine Started');
              this.nodejs_started = true;
              
          }
        });
        // To disable the stdout/stderr redirection to the Android logcat:
        // nodejs.start('main.js', startupCallback, { redirectOutputToLogcat: false });

        networkinterface.getWiFiIPAddress( ip=>{ this.address = ip });
      },
      false
    );
  },
  mounted() {
    this.app.on({ page: "home", preventClose: false, content: null }, this);//add this for onReady function 
  },
  data() {
    return {
      node_msg:'',
      nodejs_started: false,
      address: '',
      device_ready: false
    };
  },
  computed: {
    is_empty() {
      return ''
    }
  },
  methods: {    
    create_file(){
      nodejs.channel.send('create file');
    },
    exit_app(){
      navigator.app.exitApp();
    },
    
    //run after device ready
    register_user(qr_code) {

    },
    onReady() {
      
    }
    
  }
};
</script>
<style scoped>
.order_info {
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  background-color: aquamarine;
  border-style: inset;
}
.order {
  margin-top: 5px;
  border: 1px dotted purple;
}
.content {
  display: flex;
  flex-flow: column;
}
.content > div {
  display: flex;
  flex-flow: column;
}
.his-data,
.order {
  display: flex;
  flex-flow: column;
}


.parameters {
  margin-bottom: 10px;
}
.result {
  padding-right: 10px;
}
.parameters > div {
  border: 2px dashed coral;
  display: flex;
  flex-flow: row;
}
.caption {
  font-size: 28px;
  margin: auto;
}
input {
  flex: 1;
}

.btn.primary {
  flex: 1;
  min-width: 100px;
}
input[type="checkbox"] {
  margin-left: auto;
  width: 28px; 
  height:28px;
}
input[type="date"]:after {
  content: attr(placeholder);
}
</style>