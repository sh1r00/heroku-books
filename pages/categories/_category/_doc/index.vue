<template>
  <div class="doc-container">
    <div class="doc-hero">
      <div class="doc-hero--overlay" />
      <h1 class="doc-hero--text">{{ item.title }}</h1>
      <img class="doc-hero--image" :src="`${item.image}`" :alt="item.title" />
    </div>
    <div class="doc-title">
      <small> {{ item.date }}</small>
    </div>
    <div class="doc-content">
      <doc-viewer :file="item.content" />
    </div>
  </div>
</template>

<script>
import DocViewer from '~/components/docViewer'
export default {
  components: {
    DocViewer,
  },
  data() {
    return {
      item: {
        date: '',
        title: '',
        description: '',
        image: '',
        content: '',
      },
    }
  },
  created() {
    const slug = this.$route.params.slug
    this.fetchDoc(slug)
  },
  beforeDestroyed() {
    this.removeItem()
  },
  methods: {
    fetchDoc(params) {
      this.$axios.get(`/doc/${params}`).then((res) => {
        const data = res.data
        this.item = data
        // eslint-disable-next-line
        console.log('fetch data ', data)
      })
    },
    removeItem() {
      this.$axios.get(`/doc/${this.item.content}/remove`)
    },
  },
}
</script>

<style scoped>
.doc-container {
  height: auto;
}
.doc-hero {
  height: 40vh;
  padding: auto;
  position: relative;
}
.doc-title {
  height: auto;
  padding: 0.625em 0 1.25em 0;
}
.doc-hero--image {
  height: 100%;
  width: 100%;
  position: absolute;
}
.doc-hero--overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.65;
  transition: 0.5s ease;
  background-color: rgb(0, 0, 0);
  overflow: hidden;
  z-index: 2;
}
.doc-hero--text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  font-weight: bold;
  z-index: 3;
}
.doc-content {
  height: auto;
}
</style>
