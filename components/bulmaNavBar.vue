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
        class="navbar-burger burger"
        :class="navBurgerClass"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbar-burger"
        @click.stop="toggleBurgerMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </div>
    </div>
    <div id="navbar-burger" class="navbar-menu" :class="navbarMenuClass">
      <br />
      <button
        class="button is-large is-danger nav-item"
        :class="navBurgerItemClass.donate"
        @click.prevent="toggleDonationModal"
      >
        Donate Example 1
      </button>
      <div class="navbar-end" :class="navBurgerItemClass.links">
        <button
          v-for="(item, idx) in navItems"
          :key="idx"
          class="navbar-item button is-large nav-item"
          :class="navBurgerItemClass.link"
          @click.prevent="routeClicked(item.link)"
        >
          {{ item.name }}
        </button>
      </div>
      <hr class="navbar-divider" />
      <button
        v-show="$auth.user"
        class="button is-primary is-large nav-item"
        :class="navBurgerItemClass.action"
        tag="button"
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
      navbarMenuClass: '',
      navBurgerClass: '',
      navBurgerItemClass: {
        donate: 'nav-item-donate',
        link: 'nav-item-link',
        links: 'nav-item-links',
        action: 'nav-item-action',
      },
    }
  },
  methods: {
    toggleBurgerMenu() {
      if (this.isBurgerNavActive) {
        this.isBurgerNavActive = false
        this.navbarMenuClass = ''
        this.navBurgerClass = ''
        this.navBurgerItemClass = {
          donate: 'nav-item-donate',
          link: 'nav-item-link',
          links: 'nav-item-links',
          action: 'nav-item-action',
        }
      } else {
        this.isBurgerNavActive = true
        this.navbarMenuClass = 'is-active'
        this.navBurgerClass = 'is-active'
        this.navBurgerItemClass = {
          donate: 'nav-item-donate__mobile',
          link: 'nav-item-link__mobile',
          links: 'nav-item-links__mobile',
          action: 'nav-item-action__mobile',
        }
      }
    },
    toggleDonationModal() {
      return this.$store.dispatch('toggleDonationModal')
    },
    routeClicked(link) {
      if (this.isBurgerNavActive) {
        this.toggleBurgerMenu()
      }
      return this.$router.push(link)
    },
  },
}
</script>

<style scoped>
.nav-item-container {
  width: 100vw;
  padding: 0 1.25em;
}
.nav-item-donate {
  height: 100%;
  width: 25%;
  margin: 0 7.5%;
}
.nav-item-donate__mobile {
  height: 100%;
  width: 100%;
}
.nav-item-links {
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.nav-item-links__mobile {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.nav-item-link {
  height: 100%;
  width: 33.3333%;
}
.nav-item-link__mobile {
  height: 100%;
  width: 100%;
}
.nav-item-action {
  height: 100%;
  width: 20%;
}
.nav-item-action__mobile {
  height: 100%;
  width: 100%;
}
</style>
