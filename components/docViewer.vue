<template>
  <div>
    <iframe
      class="doc-viewer"
      :src="`https://docs.google.com/gview?url=${baseUrl}${fileUrl}&embedded=true&delayms=3000`"
      frameborder="0"
    ></iframe>
    <iframe
      :src="`https://view.officeapps.live.com/op/embed.aspx?src=${baseUrl}${fileUrl}`"
    />
  </div>
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
      baseUrl: process.env.baseUrl,
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
