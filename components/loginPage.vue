<template>
  <div class="login-page">
    <div class="has-text-centered">
      <h1>Login</h1>
    </div>
    <form @submit.prevent="loginUser(userInfo)">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input
            v-model="userInfo.email"
            class="input"
            type="email"
            placeholder="Email"
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
            v-model="userInfo.password"
            class="input"
            type="password"
            placeholder="Password"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div class="buttons is-right">
        <button class="button is-light">Forgot Info</button>
        <br />
        <button type="submit" class="button is-primary">
          <strong>Log In</strong>
        </button>
        <button
          class="button is-danger is-right"
          @click.prevent="closeModalEvent"
        >
          Cancel
        </button>
      </div>
    </form>
    <div v-if="error" class="has-text-centered">
      <p class="is-warning">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      userInfo: {
        email: 'admin@admin.com',
        password: 'admin',
      },
    }
  },
  methods: {
    loginUser(loginInfo) {
      try {
        this.$auth
          .loginWith('local', {
            data: loginInfo,
          })
          .then((res) => {
            // eslint-disable-next-line no-console
            console.log('res ', res)
            if (res.data.login === true) {
              return this.$store.dispatch('toggleLoginModal')
            }
          })
          .catch((errors) => {
            this.error = 'The username or password is invalid'
          })
      } catch (e) {
        this.error = e.message
      }
    },
    closeModalEvent() {
      return this.$store.dispatch('toggleLoginModal')
    },
  },
}
</script>

<style scoped>
.login-page {
  background-color: aliceblue;
  padding: 1.625em;
}
</style>
