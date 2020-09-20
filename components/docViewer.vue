<template>
  <div>
    <iframe
      ref="docViewer"
      class="doc-viewer"
      :src="`${docViewerUrl}${baseUrl}${fileUrl2}${docViewerOptions}`"
      frameborder="0"
    ></iframe>
    <div>
      {{ iFrameResult }}
    </div>
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
      docViewerUrl: 'https://docs.google.com/gview?url=',
      docViewerOptions: '&embedded=true&delaysms=3000ms',
      docViewerBackground: 'white',
      fileUrl2: '/temp/6aeffe50-fb50-11ea-971c-9349fab85565.docx',
      fileUrl3: '/temp/89a5f670-fa0f-11ea-971c-9349fab85565.docx,',
      baseUrl: process.env.baseUrl,
      iFrameResult: '',
    }
  },
}
</script>

<style scoped>
.doc-viewer {
  height: 90vh;
  width: 100vw;
  background-color: white;
}
</style>
