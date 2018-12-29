<template>
    <div id="home_list">
        {{msg}}
    </div>
</template>
<script>
import firebase from 'firebase'

export default {
  name: 'Home',
  created: function () {
    this.database = firebase.database()
    this.vtuberList = this.database.ref('vtuber')
  },
  data () {
    return {
      msg: 'ここがホーム'
    }
  }
}
</script>
