<template>
  <iframe
    class="doc-viewer"
    :src="`https://docs.google.com/gview?url=${file}&embedded=true`"
  ></iframe>
</template>

<script>
export default {
  props: {
    file: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>
.doc-viewer {
  height: 100%;
  width: 100%;
}
</style>
