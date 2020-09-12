<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          width="112"
          height="28"
        />
      </a>

      <a
        role="button"
        :class="navBurgerClass"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click.stop="toggleBurgerMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" :class="navbarMenuClass">
      <br />
      <button
        class="navbar-item button is-large is-danger is-rounded"
        @click.stop="toggleDonationModal()"
      >
        Donate Here
      </button>
      <div class="navbar-end navbar-items-container">
        <div v-for="(item, idx) in navItems" :key="idx">
          <router-link class="navbar-item nav-item" :to="item.link">
            {{ item.name }}
          </router-link>
        </div>
        <hr class="navbar-divider" />
        <div class="navbar-item">
          <div class="buttons">
            <button
              v-if="$auth.user"
              class="button is-primary"
              @click.prevent="$auth.logout"
            >
              <strong>Log Out</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navItems: [
        {
          name: 'Home',
          link: '/',
        },
        {
          name: 'Books',
          link: '/books',
        },
        {
          name: 'About',
          link: '/about',
        },
      ],
      isBurgerNavActive: false,
      navbarMenuClass: 'navbar-menu',
      navBurgerClass: 'navbar-burger burger',
    }
  },
  methods: {
    toggleBurgerMenu() {
      if (this.isBurgerNavActive) {
        this.isBurgerNavActive = false
        this.navbarMenuClass = 'navbar-menu'
        this.navBurgerClass = 'navbar-burger burger'
      } else {
        this.isBurgerNavActive = true
        this.navbarMenuClass = 'navbar-menu is-active'
        this.navBurgerClass = 'navbar-burger burger is-active'
      }
    },
    toggleDonationModal() {
      return this.$store.dispatch('toggleDonationModal')
    },
  },
}
</script>

<style scoped>
.nav-item-container {
  padding: 0 1.25em;
}
.nav-item {
  height: 100%;
  width: 100%;
}
</style>
