<template>
  <div>
    <iframe
      class="doc-viewer"
      :src="`https://docs.google.com/gview?url=${baseUrl}${fileUrl}%26embedded=true%26delayms=3000`"
      frameborder="0"
    ></iframe>
    <iframe
      :src="`https://docs.google.com/viewer?url=${baseUrl}${fileUrl}%26embedded=true%26delaysms=5000`"
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
