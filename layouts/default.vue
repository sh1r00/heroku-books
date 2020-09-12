<template>
  <div>
    <bulma-nav-bar />
    <Nuxt />
    <bulma-modal :modal="loginModalClass" @close-modal-event="toggleLoginModal">
      <login-page />
    </bulma-modal>
    <bulma-modal
      :modal="donationModalClass"
      @close-modal-event="toggleLoginModal"
    >
      <donation-page />
    </bulma-modal>
    <bulma-modal
      :modal="paymentModalClass"
      @close-modal-event="toggleLoginModal"
    >
      <payment-page />
    </bulma-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BulmaNavBar from '~/components/bulmaNavBar.vue'
import BulmaModal from '~/components/bulmaModal.vue'
import LoginPage from '~/components/loginPage.vue'
import DonationPage from '~/components/donationPage.vue'
import PaymentPage from '~/components/paymentPage.vue'

export default {
  components: {
    BulmaNavBar,
    BulmaModal,
    LoginPage,
    DonationPage,
    PaymentPage,
  },
  computed: {
    ...mapGetters([
      'loginModalClass',
      'donationModalClass',
      'paymentModalClass',
    ]),
  },
  methods: {
    toggleLoginModal() {
      this.$store.dispatch('toggleLoginModal')
    },
    toggleDonationModal() {
      this.$store.dispatch('toggleDonationModal')
    },
    togglePaymentModal() {
      this.$store.dispatch('togglePaymentModal')
    },
  },
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
