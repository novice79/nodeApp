// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'noty/lib/noty.css'
import App from './App'

Vue.config.ignoredElements = ['home', 'music']

require('phonon/dist/css/phonon.min.css')
require('phonon/dist/js/phonon.js')
window.repo = []
/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

import './net'