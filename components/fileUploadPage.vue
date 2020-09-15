<template>
  <div class="container">
    <div class="fileUpload-title has-centered-text">
      <span class="fileUpload-title__span"> Upload a file </span>
    </div>
    <form @submit.prevent="sendFile(fileUpload)">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input
            v-model="fileUpload.title"
            class="input"
            type="text"
            placeholder="Title"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input
            v-model="fileUpload.description"
            class="input"
            type="textArea"
            placeholder="description"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input
            ref="file"
            type="file"
            class="input"
            placeholder="Upload a file"
            @change="fileSelected"
          />
        </p>
      </div>
      <div class="buttons button-container is-right">
        <button
          class="button is-warning"
          @click.prevent="
            reset()
            closeModalEvent()
          "
        >
          Finished
        </button>
        <button
          v-if="editableItem.edit"
          class="button is-primary"
          type="submit"
        >
          <strong>Edit</strong>
        </button>
        <button
          v-else
          type="submit"
          class="button is-primary"
          :disabled="Boolean(!fileUpload.file)"
        >
          <strong>Submit</strong>
        </button>
      </div>
    </form>
    <div>
      <div v-if="error === true" class="messages has-text-centered is-warning">
        {{ errorMessage }}
      </div>
      <div
        v-if="success === true"
        class="messages has-text-centered is-success"
      >
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    editableItem: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      fileUpload: {
        title: null,
        description: null,
        file: null,
      },
      loading: false,
      error: false,
      success: false,
      errorMessage: null,
      successMessage: null,
    }
  },
  update() {
    if (this.editableItem.edit === true) {
      // eslint-disable-next-line
      console.log('mounted ')
      const newItem = this.editableItem.item
      this.fileUpload.title = newItem.title
      this.fileUpload.description = newItem.description
      this.fileUpload.file = newItem.content
    }
  },
  beforeDestroyed() {
    // eslint-disable-next-line
    console.log('destroyed ')
    this.reset()
  },
  methods: {
    reset() {
      this.fileUpload = {
        title: null,
        description: null,
        file: null,
      }
      this.loading = false
      this.error = false
      this.success = false
      this.$store.dispatch('clearEditableItem')
    },
    fileSelected(e) {
      this.$emit('input', e.target.files[0])
      this.fileUpload.file = this.$refs.file.files[0]
    },
    async sendFile(fileUpload) {
      const vm = this
      vm.loading = true
      if (vm.editableItem.edit) {
        return await this.$axios({
          method: 'put',
          url: `/doc/${vm.editableItem.item.slug}`,
          data: fileUpload,
          config: {
            headers: {
              'content-type': 'multipart/formData',
            },
          },
        })
          .then((response) => {
            if (response === 200) {
              return this.closeModalEvent()
            }
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log(error)
          })
      }

      await this.$axios({
        method: 'post',
        url: '/doc',
        data: fileUpload,
        config: {
          headers: {
            'content-type': 'multipart/form-data',
          },
        },
      })
        .then((response) => {
          // eslint-disable-next-line
          console.log(response)
          if (response.status === 200) {
            vm.error = false
            vm.loading = false
            vm.success = true
            vm.successMessage = 'response.successMessage'
          }
          vm.loading = false
          vm.error = true
          vm.success = false
          vm.errorMessage = 'response.errorMessage'
        })
        .catch((errors) => {
          // eslint-disable-next-line
          console.log(errors)
        })
    },
    closeModalEvent() {
      if (!this.editableItem.edit) {
        return this.$store.dispatch('toggleFileUploadModal')
      }
      return this.$store.dispatch('toggleFileEditModal')
    },
  },
}
</script>

<style scoped>
.container {
  background-color: aliceblue;
  padding: 2em;
}
.fileUpload-title {
  font-size: 2.5em;
  width: 100%;
  height: 125px;
  line-height: 125px;
  text-align: center;
}
.fileUpload-title__span {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}
.messages {
  padding: 1.25em 20%;
}
</style>
