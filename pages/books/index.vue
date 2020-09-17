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
      <div v-for="(item, idx) in books" :key="idx">
        <bulma-card
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
      books: [
        {
          title: 'Book',
          desctiption: 'Some kinda book',
          image: '',
        },
        {
          title: 'Book2',
          description: 'Some Other kinda book',
          image: '',
        },
        {
          title: 'Book3',
          description: 'Some Other kinda book',
          image: '',
        },
        {
          title: 'Book4',
          description: 'Some Other kinda book',
          image: '',
        },
        {
          title: 'Book5',
          description: 'Some Other kinda book',
          image: '',
        },
        {
          title: 'Book6',
          descrpition: 'Some Other kinda book',
          image: '',
        },
      ],
    }
  },
  mounted() {
    this.fetchBooks()
  },
  methods: {
    emitCardActions(item) {
      if (item.value === 'delete') {
        return this.deleteCardMethod(item.content)
      }
      return this.editCardMethod(item.content)
    },
    async fetchBooks() {
      await this.$axios({
        method: 'get',
        url: '/docs',
      })
        .then((res) => {
          const response = res.data
          const data = response.data
          // eslint-disable-next-line
          console.log(response)
          this.books = data.files
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
        url: `/doc/${item.slug}/delete`,
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
