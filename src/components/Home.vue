<template>
  <home data-page="true">
    <header class="header-bar">
      <div class="center">
        <h1 class="title">【音乐/书籍】 管理</h1>
      </div>
    </header>
    <div class="content">
   
      <div style="justify-content:space-around;margin-top:10px;">
        <div v-if="nodejs_started && address"> nodejs服务监听在: http://{{address}}:{{node_port}} </div>
        <div>{{node_msg}}</div>
        <button class="btn primary" style="flex:1; margin-top:20px;" @click.prevent="get_file_list()">
          <h3 style="display:inline-block;margin:auto;">
            显示二维码({{audio_count}})
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
    this.$root.$on("nodejs_svr_up", port => {
      this.nodejs_started = true;
      networkinterface.getWiFiIPAddress( ip=>{ this.address = ip });
      this.node_port = port;
    });
    this.$root.$on("node_msg", msg => {
      this.node_msg = msg;
    });
    this.$root.$on("file_list_changed", list => {
      this.file_list = list;
    });
  },
  mounted() {
    this.app.on({ page: "home", preventClose: false, content: null }, this);//add this for onReady function 
  },
  data() {
    return {
      file_list:[],
      node_port:'',
      node_msg:'',
      nodejs_started: false,
      address: ''
    };
  },
  computed: {
    audio_count() {
      const audio_type = ['audio/ogg', 'audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/flac'];
      return _.reduce(this.file_list, (sum, f)=>{
        return f.mime && _.includes(audio_type, f.mime) ? sum + 1 : sum;
      }, 0)
    }
  },
  methods: {    
    get_file_list(){
      const msg = JSON.stringify({
        cmd:'get_file_list'
      })
      nodejs.channel.send(msg);
    },
    exit_app(){
      navigator.app.exitApp();
    },
    
    //run after device ready
    register_user(qr_code) {

    },
    onReady() {
      this.file_list = repo;
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