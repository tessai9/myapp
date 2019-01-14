<template>
  <div>
    <div class='card' style='width: 18rem; display:inline-block;' v-for='item in vtubersList' :key='item.name'>
      <img class='card-img-top' :src='item.image'>
      <div class='card-body'>
        <h5 class='card-title'>{{item.name}}</h5>
        <p class='card-text'>.....</p>
        <a :href='item.homepage' class='btn btn-primary'>Youtubeチャンネルへ</a>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase'

export default {
  name: 'Home',
  data () {
    return {
      vtubersList: [],
      msg: 'ここがホーム'
    }
  },
  created: function () {
    var database = firebase.database()
    var getVtubersDatas = database.ref('/vtuber')
    var vList = this.vtubersList
    getVtubersDatas.once('value')
      .then(function (snapshot) {
        var n = 0
        while (snapshot.child(n).val() != null) {
          vList.push({
            name: snapshot.child(n).child('name').val(),
            channel: snapshot.child(n).child('youtube_channel').val(),
            homepage: snapshot.child(n).child('homepage').val(),
            image: require('../assets/' + snapshot.child(n).child('image_name').val())
          })
          n++
        }
      })
  }
}
</script>
