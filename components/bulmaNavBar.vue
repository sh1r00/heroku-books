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

      <div
        role="button"
        :class="navBurgerClass"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbar"
        @click.stop="toggleBurgerMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </div>
    </div>
    <div id="navbar" :class="navbarMenuClass">
      <br />
      <button
        class="button is-large is-danger"
        :class="(navBurgerItemClass.donate, navItemClass)"
        @click.prevent="toggleDonationModal"
      >
        Donate Here
      </button>
      <div
        v-for="(item, idx) in navItems"
        :key="idx"
        class="navbar-end"
        :class="navBurgerItemClass.links"
      >
        <button
          class="navbar-item button is-large is-outline"
          :class="(navBurgerItemClass.link, navItemClass)"
          @click.prevent="routeClicked(item.link)"
        >
          {{ item.name }}
        </button>
      </div>
      <hr class="navbar-divider" />
      <button
        v-if="$auth.user"
        class="button is-primary is-large"
        :class="(navBurgerItemClass.action, navItemClass)"
        @click.prevent="$auth.logout"
      >
        <strong>Log Out</strong>
      </button>
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
      navItemClass: 'nav-item',
      navBurgerItemClass: {
        donate: '',
        link: '',
        links: '',
        action: '',
      },
    }
  },
  methods: {
    toggleBurgerMenu() {
      if (this.isBurgerNavActive) {
        this.isBurgerNavActive = false
        this.navbarMenuClass = 'navbar-menu'
        this.navBurgerClass = 'navbar-burger burger'
        this.navBurgerItemClass = {
          donate: 'nav-item__donate',
          link: 'nav-item__link',
          links: 'nav-item__links',
          action: 'nav-item__action',
        }
        this.navItemClass = ''
      } else {
        this.isBurgerNavActive = true
        this.navbarMenuClass = 'navbar-menu is-active'
        this.navBurgerClass = 'navbar-burger burger is-active'
        this.navBurgerItemClass = {
          donate: '',
          link: '',
          links: '',
          action: '',
        }
        this.navItemClass = 'nav-item'
      }
    },
    toggleDonationModal() {
      this.$store.dispatch('toggleDonationModal')
    },
    routeClicked(link) {
      this.toggleBurgerMenu()
      return this.$router.push(link)
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
.nav-item__donate {
  height: 100%;
  width: 40%;
}
.nav-item__links {
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.nav-item__link {
  height: 100%;
  width: 33.3333%;
}
.nav-item__action {
  height: 100%;
  width: 20%;
}
</style>
