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
    <div v-for="(item, idx) in books" :key="idx">
      <bulma-card
        class="card"
        :content="item"
        :card-actions="contentActions"
        :emit-card-actions="emitCardActions"
        @edit-card-event="editCardMethod"
        @delete-card-event="deleteCardMethod"
      />
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
          image: {
            src: '',
            placeholder: 'A descriptive image of the book',
          },
        },
        {
          title: 'Book2',
          description: 'Some Other kinda book',
          image: {
            src: '',
            placeholder: 'A descriptive image of the book',
          },
        },
        {
          title: 'Book3',
          description: 'Some Other kinda book',
          image: {
            src: '',
            placeholder: 'A descriptive image of the book',
          },
        },
        {
          title: 'Book4',
          description: 'Some Other kinda book',
          image: {
            src: '',
            placeholder: 'A descriptive image of the book',
          },
        },
        {
          title: 'Book5',
          description: 'Some Other kinda book',
          image: {
            src: '',
            placeholder: 'A descriptive image of the book',
          },
        },
        {
          title: 'Book6',
          descrpition: 'Some Other kinda book',
          image: {
            src: '',
            placeholder: 'A descriptive image of the book',
          },
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
        .then((response) => {
          // eslint-disable-next-line
          console.log(response)
          this.books = response.data.data.files
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
        method: 'post',
        url: `/doc/${item.slug}/delete`,
      }).then((response) => {
        if (response.status === 200) {
          this.alert('deleted')
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
.card {
  height: 500px;
  width: 300px;
  padding: 0;
  margin: 1.25em;
}
</style>
