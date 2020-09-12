<template>
  <div class="container">
    <div class="navbar">
      <div class="navbar-end">
        <div class="buttons button-login">
          <button
            v-if="!$auth.user"
            class="button"
            @click.prevent="toggleLoginModal"
          >
            Login
          </button>
          <button v-else class="button is-success is-light">Add a File</button>
        </div>
      </div>
    </div>
    <div class="cardContainer">
      <div v-for="(item, idx) in books" :key="idx">
        <bulma-card class="card" :content="item" />
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
      books: [
        {
          title: 'Book',
          info: 'Some kinda book',
          image: {
            src: '',
            placeholder: 'A descriptive image of the book',
          },
        },
        {
          title: 'Book2',
          info: 'Some Other kinda book',
          image: {
            src: '',
            placeholder: 'A descriptive image of the book',
          },
        },
        {
          title: 'Book3',
          info: 'Some Other kinda book',
          image: {
            src: '',
            placeholder: 'A descriptive image of the book',
          },
        },
        {
          title: 'Book4',
          info: 'Some Other kinda book',
          image: {
            src: '',
            placeholder: 'A descriptive image of the book',
          },
        },
        {
          title: 'Book5',
          info: 'Some Other kinda book',
          image: {
            src: '',
            placeholder: 'A descriptive image of the book',
          },
        },
        {
          title: 'Book6',
          info: 'Some Other kinda book',
          image: {
            src: '',
            placeholder: 'A descriptive image of the book',
          },
        },
      ],
    }
  },
  methods: {
    toggleLoginModal() {
      this.$store.dispatch('toggleLoginModal')
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
