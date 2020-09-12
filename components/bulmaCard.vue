<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="content.image.src" :alt="content.image.placeholder" />
      </figure>
    </div>
    <div class="card-content">
      <p class="title overflow-ellipsis">
        {{ content.title }}
      </p>
      <br />
      <div class="content overflow-ellipsis">
        {{ content.info }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped>
.overflow-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
