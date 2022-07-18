<template>
  <div class="container">
    <div class="navbar">
      <div class="navbar-end">
        <button
          v-if="!$auth.user"
          class="button button-login"
          @click.prevent="toggleLoginModal"
        >
          Login
        </button>
        <button
          v-else
          class="button is-success is-light"
          @click.prevent="toggleFileUploadModal"
        >
          Add a File
        </button>
      </div>
    </div>
    <div class="card-container">
      <div v-for="(item, idx) in categories" :key="idx">
        <bulma-card
          link-base-url="categories"
          :content-link="item.id"
          :content="item"
          :card-actions="contentActions"
          :emit-card-actions="emitCardActions"
          @edit-card-event="editCardMethod"
          @delete-card-event="deleteCardMethod"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BulmaCard from '~/components/bulmaCard.vue'

export default {
  components: {
    BulmaCard,
  },
  data() {
    return {
      contentActions: {
        isActive: true,
        items: [
          {
            name: 'edit',
            style: 'button is-warning',
          },
          {
            name: 'delete',
            style: 'button is-danger',
          },
        ],
      },
      errorMessage: null,
      categories: [],
    }
  },
  created() {
    this.fetchCategories()
  },
  methods: {
    emitCardActions(item) {
      if (item.value === 'delete') {
        return this.deleteCardMethod(item.content)
      }
      return this.editCardMethod(item.content)
    },
    async fetchCategories(params) {
      await this.$axios({
        method: 'get',
        url: `/categories`,
      })
        .then((res) => {
          const response = res.data
          const data = response.data
          // eslint-disable-next-line
          console.log(response)
          this.categories = data.files
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log(err)
        })
    },
    editCardMethod(item) {
      return this.$store.dispatch('toggleFileEditModal', item)
    },
    async deleteCardMethod(item) {
      await this.$axios({
        method: 'get',
        url: `/category/${item.slug}/delete`,
      }).then((response) => {
        if (response.status === 200) {
          location.reload()
          return false
        }
        this.errorMesage = 'Something went wrong trying to delete'
      })
    },
    toggleLoginModal() {
      return this.$store.dispatch('toggleLoginModal')
    },
    toggleFileUploadModal() {
      return this.$store.dispatch('toggleFileUploadModal')
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.card-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.button-login {
  padding: 0 0.25em;
  margin: 1.25em 0;
  left: calc(100% - 85px);
}
.cardContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
