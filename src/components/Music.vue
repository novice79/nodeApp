<template>
  <music data-page="true">
    <header class="header-bar">
      <button class="btn pull-left icon icon-arrow-back" data-navigation="$previous-page"></button>
      <div class="center">
        <h1 class="title">音乐管理</h1>
      </div>
    </header>

    <div class="content">
      <div class="padded-full">
        <ul class="list">
          <li>
            <div style="display: flex;justify-content:space-around;margin-top:10px;">
              <div>所有音乐({{size(all_music)}})</div>
              <div class="raido_group" style="flex:1;">
                <div>
                  <label class="radio">
                      <input type="radio" name="all_play_style" value="list_repeat" v-model="all_play_style" @change="empty_input()">
                      <span></span>
                      <span class="text">列表循环</span>
                  </label>
                </div> 
                <div>
                  <label class="radio">
                      <input type="radio" name="all_play_style" value="single_repeat" v-model="all_play_style" @change="empty_input()">
                      <span></span>
                      <span class="text">单曲循环</span>
                  </label>
                </div> 
                <div>
                  <label class="radio">
                      <input type="radio" name="all_play_style" value="shuffle" v-model="all_play_style" @change="empty_input()">
                      <span></span>
                      <span class="text">随机播放</span>
                  </label>
                </div>
                <div>
                  <label class="radio">
                      <input type="radio" name="all_play_style" value="serialize" v-model="all_play_style" @change="empty_input()">
                      <span></span>
                      <span class="text">顺序播放</span>
                  </label>
                </div>
              </div>
              <button class="btn primary" @click.prevent="save_item(p)" >播放</button>
            </div>
          </li>
          <li v-for="p in play_lists">
            <div class="item" >
              <div><div class="caption">名称：</div><input v-model="p.name" placeholder="名称"></div>
              <div><div class="caption">价格(元)：</div><input v-model.number="p.price" type="number" placeholder="价格(元)" onclick="this.select()"></div>
              <div class="opertion">
                <button class="btn primary" @click.prevent="save_item(p)" >保存</button>
                <button class="btn negative" @click.prevent="delete_item(p)" >删除</button>
              </div>
              
            </div>
          </li>
        </ul>
        <button class="btn fit-parent positive" style="margin-top:15px;" @click.prevent="add_product()">添加商品</button>
 
      </div>
    </div>
  </music>
</template>

<script>
import Vue from 'vue'
import moment from "moment";
import _ from "lodash";
import util from "../common/util"
import adb from "../db";

export default {
  name: 'MusicMgr',
  props: {
    app: {
      type: Object
    }
  },

  data () {
    return {
      all_play_style:'list_repeat',
      play_lists: [],
      all_music:[],
      saved: true
    }
  },

  mounted () {
    /*
     * Phonon also supports objects
     * With VueJS, it is better to use "this"
     * instead of a callable function like other examples
     * If Phonon finds page events, it will call them
     * here we want to use onClose, onHidden and onHashChanged methods
     */
    this.app.on({page: 'music', preventClose: true}, this)
    
  },
  computed: {
    aaa(){
      return 0
    }
  },
  methods: {
    onReady() {
      this.all_music = _.filter(repo, f=>f.mime && _.includes(util.audio_type, f.mime) )
      this.show_pl();
    },
    size(list){
      return _.size(list)
    },
    onClose (self) {
      if (this.saved) {
        self.close()
      } else {
        let confirm = phonon.confirm('商品信息尚未保存', '确认离开吗？', true, '确认', '取消');
        confirm.on('confirm', ()=> {
          self.close()
        });
        confirm.on('cancel', ()=> {} );
      }
    },

    onHidden () {
      this.action = true
    },

    onHashChanged (pizza) {

    },
    save_item(p) {
      adb.then(db => {
        db.play_list.findAndUpdate(
          {
            $loki: p.$loki
          },
          obj => p
        );
        phonon.alert('商品信息修改成功', '保存成功')
        this.show_pl();
      });
    },
    delete_item(p) {
      adb.then(db => {
        db.play_list.remove(p);
        this.show_pl();
      });
    },
    show_pl() {
      adb.then(db => {
        this.play_lists = db.play_list.find({})
      })
    },
    add_product() {
      adb.then(db => {
        this.play_lists = db.play_list.insert({name:'测试商品', price:0.01})
        this.show_pl();
      })
    }
  }
}
</script>
<style scoped>
.raido_group {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  padding: 1px 2px;
  border: 2px ridge greenyellow;

  /* width: 50%; */
}
.item {
  border: dotted outset lightgreen;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}
.item > div{

  display: flex;
  flex-flow: row;
  justify-content: space-around;
}
input {
  flex: 1;
}
.opertion > button{
  flex: 1;
}
.caption {
  font-size: 16px;
  margin: auto;
}
</style>