import Axios from 'axios';
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

Vue.prototype.$http = Axios
Vue.prototype.duplicateObject = function (fromObj) {
  return JSON.parse(JSON.stringify(fromObj))
}

const pageHome = { template: '<div class="tab-head"><h1>TRocket</h1></div> <div class="tab-body"></div>' }
const pageHelp = { template: '<div class="tab-head"><h1>Справка</h1></div> <div class="tab-body"></div>' }

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: pageHome },
    { path: '/help', component: pageHelp }
  ]
})

new Vue({
  router,
  el: '#tabs',
  data() {
    return {
    }
  },
  mounted () {

  },
  methods: {

  },
  watch: {

  }
})
