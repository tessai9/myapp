// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

console.log(process.env.firebase)

var firebaseConfig = {
  apiKey: 'AIzaSyAimS8LuaTrUOO2HnQ7Q8jeWRzoCrcsG74',
  authDomain: 'myapp-21f69.firebaseapp.com',
  databaseURL: 'https://myapp-21f69.firebaseio.com',
  projectId: 'myapp-21f69',
  storageBucket: 'myapp-21f69.appspot.com',
  messagingSenderId: '486585044717'
}
firebase.initializeApp(firebaseConfig)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
