<template>
  <home data-page="true">
    <header class="header-bar">
      <div class="center">
        <h1 class="title">【音乐/书籍/视频】上传</h1>
      </div>
    </header>
    <div class="content">
      <input type="file" @change="processFile($event)">
      <div style="justify-content:space-around;margin-top:10px;">
        <button class="btn" style="flex:1; margin-top:20px;" @click.prevent="upload_file()">
          <h3 style="display:inline-block;margin:auto;">
            上传文件
          </h3>
        </button> 
        {{progress}}
        <button class="btn" style="flex:1; margin-top:20px;" @click.prevent="test_sock()">
          <h3 style="display:inline-block;margin:auto;">
            test socket.io
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
    this.$root.$on("on_load_progress", progress => {
      this.progress = progress
    });
    
  },
  mounted() {
    this.app.on({ page: "home", preventClose: false, content: null }, this);//add this for onReady function 
  },
  data() {
    return {
      progress:0,
      address: ''
    };
  },
  computed: {
    is_empty() {
      return ''
    }
  },
  methods: {    
    upload_file(){
      $('input[type="file"]').click();
    },
    processFile(event) {
      if (event.target.files.length == 0) return;
      let file = event.target.files[0];
      // const allow_file_types = ["mp4", "png", "jpg", "gif", "bmp"];
      // let ext = file.name
      //   .split(".")
      //   .pop()
      //   .toLowerCase();
      // let valid = allow_file_types.indexOf(ext) > -1;
      // if (!valid) {
      //   let n = new Noty({
      //     text: "文件格式错误，只能上传媒体文件。",
      //     layout: "center",
      //     buttons: [
      //       Noty.button("确定", "blue lighten-1", function() {
      //         console.log("button 2 clicked");
      //         n.close();
      //       })
      //     ]
      //   }).show();
      //   return;
      // }
      net.upload_file(file);
    },
    test_sock(){
      net.emit('ferret', '', data=>{alert(data)})
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
input[type="file"] {
  display: none;
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