<template>
  <home data-page="true">
    <header class="header-bar">
      <div class="center">
        <h1 class="title">【音乐/书籍/视频】 管理</h1>
      </div>
    </header>
    <div class="content">
   
      <div style="justify-content:space-around;margin-top:10px;">
        <div v-if="nodejs_started"> {{wifi_state}}: http://{{address?address:'127.0.0.1'}}:{{node_port}} </div>
        <div>{{node_msg}}</div>
        <button class="btn primary" style="flex:1; margin-top:20px;">
          <h3 style="display:inline-block;margin:auto;">
            显示二维码
          </h3>
        </button> 
        <button v-if="file_type.audio_count" class="btn primary" style="flex:1; margin-top:20px;" data-navigation="music">
          <h3 style="display:inline-block;margin:auto;">
            音乐({{file_type.audio_count}})
          </h3>
        </button>
        <button v-if="file_type.video_count" class="btn primary" style="flex:1; margin-top:20px;">
          <h3 style="display:inline-block;margin:auto;">
            视频({{file_type.video_count}})
          </h3>
        </button>
        <button v-if="file_type.pic_count" class="btn primary" style="flex:1; margin-top:20px;">
          <h3 style="display:inline-block;margin:auto;">
            图片({{file_type.pic_count}})
          </h3>
        </button>
        <button v-if="file_type.book_count" class="btn primary" style="flex:1; margin-top:20px;">
          <h3 style="display:inline-block;margin:auto;">
            书籍({{file_type.book_count}})
          </h3>
        </button>
        <button v-if="file_type.other_count" class="btn primary" style="flex:1; margin-top:20px;">
          <h3 style="display:inline-block;margin:auto;">
            其它({{file_type.other_count}})
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
      this.node_port = port;
      this.get_file_list()
    });
    this.$root.$on("wifi_address", ip=>{ this.address = ip });
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
    file_type() {      
      let audio_count = 0, video_count = 0, pic_count = 0, book_count = 0, other_count = 0;
      _.each(this.file_list,  f=>{
        if( f.mime && _.includes(util.audio_type, f.mime) ) audio_count += 1
        else if(f.mime && _.includes(util.video_type, f.mime)) video_count += 1
        else if(f.mime && _.includes(util.pic_type, f.mime)) pic_count += 1
        else if(f.mime && _.includes(util.book_type, f.mime)) book_count += 1
        else other_count += 1
      })
      return {
        audio_count, 
        video_count,
        pic_count,
        book_count,
        other_count
      }
    },
    wifi_state(){
      return this.address ? 'WIFI已连接' : 'WIFI未连接'
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