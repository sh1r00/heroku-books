<template>
  <div :class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <slot></slot>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click.stop="closeModalEvent"
    ></button>
  </div>
</template>

<script>
export default {
  props: {
    modal: {
      type: String,
      default: 'modal',
    },
  },
  methods: {
    closeModalEvent() {
      return this.$emit('close-modal-event')
    },
  },
}
</script>
