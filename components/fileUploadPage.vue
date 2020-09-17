<template>
  <div class="container">
    <div class="fileUpload-title has-centered-text">
      <span class="fileUpload-title__span"> Upload a file </span>
    </div>
    <form @submit.prevent="sendFile(fileUpload)">
      <div class="field">
        <h1>Title</h1>
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
        <h1>Description</h1>
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
        <h1>Add an image</h1>
        <p class="control has-icons-left">
          <input
            ref="image"
            type="file"
            class="input"
            placeholder="Upload an image"
            @change="fileSelected('image')"
          />
        </p>
      </div>
      <span v-show="image">
        <button class="button is-right is-danger" @click.prevent="removeImage">
          remove
        </button>
        <br />
        <img :src="image" class="fileUpload-image-preview" />
        <br />
      </span>
      <div class="field">
        <h1>Add a file</h1>
        <p class="control has-icons-left">
          <input
            ref="file"
            type="file"
            class="input"
            placeholder="Upload a file"
            @change="fileSelected('file')"
          />
        </p>
      </div>
      <div class="buttons button-container is-right">
        <button class="button is-warning" @click.prevent="closeModalEvent()">
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
        newImage: null,
        image: null,
        newFile: null,
        file: null,
      },
      image: null,
      loading: false,
      error: false,
      success: false,
      errorMessage: null,
      successMessage: null,
    }
  },
  mounted() {
    if (this.editableItem.edit) {
      this.fileUpload.oldImage = this.editeableItem.oldImage
      this.fileUpload.oldFile = this.editableItem.oldFile
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
        oldImage: null,
        image: null,
        oldFile: null,
        file: null,
      }
      this.image = null
      this.loading = false
      this.error = false
      this.success = false
      this.$store.dispatch('clearEditableItem')
    },
    fileSelected(currentRef) {
      let ref = ''
      if (currentRef === 'image') {
        ref = this.$refs.image
        this.fileUpload.image = ref.files[0]
        this.createBase64Image(ref.files[0])
      } else if (currentRef === 'file') {
        ref = this.$refs.file
        this.fileUpload.file = ref.files[0]
      }
    },
    sendFile(fileUpload) {
      this.loading = true
      const formData = new FormData()

      formData.append('title', this.fileUpload.title)
      formData.append('description', this.fileUpload.description)
      formData.append('image', this.fileUpload.image)
      formData.append('file', this.fileUpload.file)

      if (this.editableItem.edit) {
        this.editFile(formData)
      }
      this.createFile(formData)
    },
    async editFile(formData) {
      formData.append('oldImage', this.fileUpload.oldImage)
      formData.append('oldFile', this.fileUpload.oldFile)
      return await this.$axios({
        method: 'put',
        url: `/doc/${this.editableItem.item.slug}`,
        data: formData,
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
    },
    async createFile(formData) {
      await this.$axios({
        method: 'post',
        url: '/doc',
        data: formData,
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
            this.error = false
            this.loading = false
            this.success = true
            this.successMessage = 'response.successMessage'
            return this.closeModalEvent()
          }
          this.loading = false
          this.error = true
          this.success = false
          this.errorMessage = 'response.errorMessage'
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error.response.data.message)
        })
    },
    createBase64Image(fileObject) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (!e.target.result) {
          return
        }
        this.image = e.target.result
      }
      reader.readAsDataURL(fileObject)
    },
    removeImage() {
      this.fileUpload.image = null
    },
    closeModalEvent() {
      this.reset()
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
.fileUpload-image-preview {
  height: 200px;
  width: 250px;
}
.messages {
  padding: 1.25em 20%;
}
</style>
