<template>
  <div>
    <div v-show="messages">
      {{ messages }}
    </div>
    <div>
      {{ fileAsHtml }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      fileAsHtml: '',
      messages: '',
    }
  },
}
</script>
