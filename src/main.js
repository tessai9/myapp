// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false
var getConfigInfo = require('./firebase.env')
var firebaseConfig = {
  apiKey: getConfigInfo.firebaseInit.apiKey,
  authDomain: getConfigInfo.firebaseInit.authDomain,
  databaseURL: getConfigInfo.firebaseInit.databaseURL,
  projectId: getConfigInfo.firebaseInit.projectId,
  storageBucket: getConfigInfo.firebaseInit.storageBucket,
  messagingSenderId: getConfigInfo.firebaseInit.messagingSenderId
}
firebase.initializeApp(firebaseConfig)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
