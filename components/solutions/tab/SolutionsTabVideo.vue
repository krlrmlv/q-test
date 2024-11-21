<template>
  <div>
    <b-row>
      <b-col
        v-for="(video, index) in videos"
        :key="`col-${index}`"
        md="6"
        lg="4"
        class="mb-16 mb-md-24"
      >
        <CatalogVideoCard :item="video" @click.native="showModal(video)" />
      </b-col>
    </b-row>

    <ModalYoutube v-model="modalVisible" :video="currentVideo" />
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      currentVideo: {},
      modalVisible: false,
    }
  },

  computed: {
    videos() {
      return this.items?.map(({ image, title, video }) => ({
        id: this.getYoutubeId(video),
        image,
        name: title,
      }))
    },
  },

  methods: {
    // https://stackoverflow.com/questions/3452546
    getYoutubeId(url) {
      const regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
      const match = url.match(regExp)
      return match && match[7].length === 11 ? match[7] : false
    },

    showModal(video) {
      this.currentVideo = video
      this.modalVisible = true
    },
  },
}
</script>
