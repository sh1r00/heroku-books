<template>
  <div>
    <iframe
      class="doc-viewer"
      :src="`https://docs.google.com/gview?url=${baseUrl}${fileUrl2}&embedded=true&delayms=3000`"
      frameborder="0"
    ></iframe>
    <iframe
      class="doc-viewer"
      :src="`https://docs.google.com/viewer?url=${baseUrl}${fileUrl3}&embedded=true&delaysms=5000`"
      frameborder="0"
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
      fileUrl2: 'temp/6aeffe50-fb50-11ea-971c-9349fab85565.docx',
      fileUrl3: 'temp/89a5f670-fa0f-11ea-971c-9349fab85565.docx,',
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
