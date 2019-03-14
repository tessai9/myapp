<template>
  <div class='container-fluid'>
    <div class='card' style='width: 18rem; display:inline-block;' v-for='item in vtubersList' :key='item.name'>
      <img class='card-img-top' :src='item.image'>
      <div class='card-body'>
        <h5 class='card-title'>{{item.name}}</h5>
        <a :href='item.channel' target="_blank"><ion-icon name="logo-youtube" style="font-size: 50px;"></ion-icon></a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a :href='item.homepage' target="_blank"><ion-icon name="home" style="font-size: 50px;"></ion-icon></a>
      </div>
    </div>  <!-- end of card -->
  </div>  <!-- end of container -->
</template>
<script>
import firebase from 'firebase'

export default {
  name: 'Home',
  data () {
    return {
      vtubersList: [],
      getVtubersDatas: firebase.database().ref('/vtuber'),
      msg: 'ここがホーム'
    }
  },
  created: function () {
    const youtubeUrl = 'https://www.youtube.com/channel/'
    let self = this

    self.getVtubersDatas.once('value')
      .then(function (snapshot) {
        let n = 0
        while (snapshot.child(n).val() != null) {
          self.vtubersList.push({
            name: snapshot.child(n).child('name').val(),
            channel: youtubeUrl + snapshot.child(n).child('channel_id').val(),
            homepage: snapshot.child(n).child('homepage').val(),
            image: require('../assets/' + snapshot.child(n).child('image_name').val()),
            channelid: snapshot.child(n).child('channel_id').val()
          })
          self.getNewVideoImg(self.vtubersList[n])
          n++
        }
      })
    console.log(self.vtubersList)
  },
  methods: {
    getNewVideoImg: function (vtuberData) {
      let channelId = vtuberData.channelid
      let youtubeApiKey = process.env.YOUTUBE_API_KEY
      this.$axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' + channelId + '&maxResults=1&order=date&type=video&key=' + youtubeApiKey)
        .then(response => {
          vtuberData.newvideoimg = response.data.items[0].snippet.thumbnails.default.url
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
