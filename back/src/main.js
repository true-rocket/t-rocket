import Axios from 'axios';
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

Vue.prototype.$http = Axios
Vue.prototype.duplicateObject = function (fromObj) {
  return JSON.parse(JSON.stringify(fromObj))
}

const pageHome = { template: '<h1>TRocket</h1>' }
const pageHelp = { template: '<h1>Справка</h1>' }

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
  el: '#app',
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
