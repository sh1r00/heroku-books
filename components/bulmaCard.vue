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
    <div v-show="content.image" class="card-image">
      <router-link :to="`${linkBaseUrl}/${contentLink}`">
        <div class="card-image--overlay">
          <figure class="image is-4by3">
            <img :src="`/${content.image}`" :alt="content.title" />
          </figure>
        </div>
      </router-link>
    </div>
    <div class="card-content">
      <router-link :to="`${linkBaseUrl}/${contentLink}`">
        <p class="title overflow-ellipsis">
          {{ content.title }}
        </p>
      </router-link>
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
    contentLink: {
      type: [String, Number],
      default: () => null,
    },
    cardActions: {
      type: Object,
      default: () => {},
    },
    emitCardActions: {
      type: Function,
      default: () => {},
    },
    linkBaseUrl: {
      type: String,
      default: () => '',
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
.card-image {
  height: 45%;
  position: relative;
}
.card-image--overlay:hover {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.65;
  transition: 0.5s ease;
  background-color: rgb(0, 0, 0);
  overflow: hidden;
  z-index: 2;
}
</style>
