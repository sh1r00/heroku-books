<template>
  <div :class="modal" tab-index="-1" role="dialog">
    <div class="modal-background" @click.stop="closeModalEvent"></div>
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
  mounted() {
    this.$el.focus()
    document.addEventListener('keydown', this.handleKeydown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeydown)
  },
  methods: {
    closeModalEvent() {
      return this.$emit('close-modal-event')
    },
    handleKeydown(e) {
      if (e.target === this.$el && e.keyCode === 27) {
        e.preventDefault()
        this.close()
      }
    },
  },
}
</script>
