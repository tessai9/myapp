<template>
  <div class='container-fluid'>
    <div class='card' style='width: 18rem; display:inline-block;' v-for='item in vtubersList' :key='item.name'>
      <img class='card-img-top' :src='item.image'>
      <div class='card-body'>
        <h5 class='card-title'>{{item.name}}</h5>
        <a :href='item.channel' target="_blank"><ion-icon name="logo-youtube" style="font-size: 50px;"></ion-icon></a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a :href='item.homepage' target="_blank"><ion-icon name="home" style="font-size: 50px;"></ion-icon></a>
        <div>最新動画</div>
        <a :href='item.videourl' target="_blank"><img :src='item.newvideoimg'></a>
      </div>
    </div>  <!-- end of card -->
  </div>  <!-- end of container -->
</template>
<script>
import firebase from 'firebase'

// firebase database
async function getVtubersDatas () {
  return firebase.database().ref('/vtuber').once('value')
}

// youtube api
async function searchForYoutube (dataList) {
  const youtubeApiKey = process.env.YOUTUBE_API_KEY
  const youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/search'
  const reqUrl = '?part=snippet&maxResults=1&order=date&type=video&channelId=' + dataList.channelid + '&key=' + youtubeApiKey
  return fetch(youtubeApiUrl + reqUrl)
}

export default {
  name: 'Home',
  data () {
    return {
      vtubersList: [],
      msg: 'ここがホーム'
    }
  },
  created: function () {
    const youtubeUrl = 'https://www.youtube.com/channel/'
    const youtubeVideoUrl = 'https://www.youtube.com/watch?v='
    let self = this
    getVtubersDatas()
      .then(function (snapshot) {
        let n = 0
        let dataList = []
        while (snapshot.child(n).val() != null) {
          dataList.push({
            name: snapshot.child(n).child('name').val(),
            channel: youtubeUrl + snapshot.child(n).child('channel_id').val(),
            homepage: snapshot.child(n).child('homepage').val(),
            image: require('../assets/' + snapshot.child(n).child('image_name').val()),
            channelid: snapshot.child(n).child('channel_id').val()
          })
          n++
        }
        return dataList
      })
      .then(async function (dataList) {
        let n = 0
        while (dataList[n] != null) {
          let imgUrl = ''
          let videoId = ''
          await searchForYoutube(dataList[n])
            .then(function (response) {
              return response.json()
            })
            .then(function (youtubeData) {
              console.log(youtubeData.items[0].id)
              imgUrl = youtubeData.items[0].snippet.thumbnails.default.url
              videoId = youtubeData.items[0].id.videoId
            })
            .catch(e => function (e) {
              console.log(e)
            })
          dataList[n].newvideoimg = imgUrl
          dataList[n].videourl = youtubeVideoUrl + videoId
          n++
        }
        self.vtubersList = dataList
      })
  }
}
</script>
