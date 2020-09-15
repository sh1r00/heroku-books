<template>
  <div class="card">
    <div v-show="$auth.user" class="navbar">
      <div class="navbar-end">
        <div
          v-for="(item, indx) in cardActions.items"
          :key="indx"
          :class="item.style"
          @click.prevent="emitChildCardActions(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="card-image">
      <figure class="image is-4by3">
        <img
          v-if="content.image"
          :src="content.image.src"
          :alt="content.image.placeholder"
        />
        <img v-else src="" Palt="placeholder" />
      </figure>
    </div>
    <div class="card-content">
      <p class="title overflow-ellipsis">
        {{ content.title }}
      </p>
      <br />
      <div class="content overflow-ellipsis">
        {{ content.description }}
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
    cardActions: {
      type: Object,
      default: () => {},
    },
    emitCardActions: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    emitChildCardActions(item) {
      const newItem = {
        value: item.name,
        content: this.content,
      }
      this.emitCardActions(newItem)
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
.card {
  height: 500px;
  width: 300px;
  padding: 0;
  margin: 1.25em;
}
</style>
