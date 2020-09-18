<template>
  <iframe
    class="doc-viewer"
    :src="`https://docs.google.com/gview?url=${baseUrl}/${fileUrl}&embedded=true`"
  ></iframe>
</template>

<script>
export default {
  props: {
    fileUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL,
    }
  },
}
</script>

<style scoped>
.doc-viewer {
  height: 100%;
  width: 100%;
}
</style>
