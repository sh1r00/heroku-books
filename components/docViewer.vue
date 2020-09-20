<template>
  <div>
    <iframe
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
      fileUrl2: '/temp/6aeffe50-fb50-11ea-971c-9349fab85565.docx',
      fileUrl3: '/temp/89a5f670-fa0f-11ea-971c-9349fab85565.docx,',
      baseUrl: process.env.baseUrl,
      iFrameResult: '',
    }
  },
  mounted() {
    this.getIframeData()
  },
  methods: {
    async getIframeData() {
      const url = `${this.docViewerUrl}${this.fileUrl2}${this.docViewerOptions}`
      const response = await this.$axios.get(url, {
        headers: {
          'Acess-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
        },
      })
      if (response.status === 201) {
        // eslint-disable-next-line
        console.log('iframe result ', response)
        this.iFrameResult = response.data
      }
    },
  },
}
</script>

<style scoped>
.doc-viewer {
  height: auto;
  width: auto;
}
</style>
