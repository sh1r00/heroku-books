<template>
  <div>
    <bulma-nav-bar />
    <Nuxt />
    <button
      class="button is-round is-danger button-donate"
      @click.prevent="toggleDonationModal"
    >
      Donate Example 2
    </button>
    <bulma-modal :modal="loginModalClass" @close-modal-event="toggleLoginModal">
      <login-page />
    </bulma-modal>
    <bulma-modal
      :modal="donationModalClass"
      @close-modal-event="toggleDonationModal"
    >
      <donation-page />
    </bulma-modal>
    <bulma-modal
      v-if="activatePaymentModal === true"
      :modal="paymentModalClass"
      @close-modal-event="togglePaymentModal"
    >
      <payment-page />
    </bulma-modal>
    <bulma-modal
      v-if="editItem.editableItem.edit"
      :modal="editItem.fileUploadModalClass"
      @close-modal-event="toggleFileUploadModal"
    >
      <file-upload-page :editable-item="editItem.editableItem" />
    </bulma-modal>
    <bulma-modal
      v-else
      :modal="fileUploadModalClass"
      @close-modal-event="toggleFileUploadModal"
    >
      <file-upload-page :editable-item="editItem.editableItem" />
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
import FileUploadPage from '~/components/fileUploadPage.vue'

export default {
  components: {
    BulmaNavBar,
    BulmaModal,
    LoginPage,
    DonationPage,
    PaymentPage,
    FileUploadPage,
  },
  data() {
    return {
      activatePaymentModal: false,
    }
  },
  computed: {
    ...mapGetters([
      'loginModalClass',
      'donationModalClass',
      'paymentModalClass',
      'isPaymentModalActive',
      'fileUploadModalClass',
      'editItem',
    ]),
  },
  watch: {
    isPaymentModalActive(newValue, oldValue) {
      this.activatePaymentModal = newValue
      // eslint-disable-next-line
      console.log('is payment modal active ', newValue)
    },
  },
  methods: {
    toggleLoginModal() {
      return this.$store.dispatch('toggleLoginModal')
    },
    toggleDonationModal() {
      return this.$store.dispatch('toggleDonationModal')
    },
    togglePaymentModal() {
      return this.$store.dispatch('togglePaymentModal')
    },
    toggleFileUploadModal() {
      return this.$store.dispatch('toggleFileUploadModal')
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

.modal-title {
  font-size: 2.5em;
  width: 100%;
  height: 125px;
  line-height: 125px;
  text-align: center;
}

.button-donate {
  height: 75px;
  width: auto;
  position: fixed;
  right: 0;
  top: 60%;
}
</style>
