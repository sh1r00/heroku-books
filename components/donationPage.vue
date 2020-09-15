<template>
  <div class="donation-page">
    <div class="modal-title is-primary has-text-centered">
      <span class="donation__span">Please Donate</span>
    </div>
    <div class="donation-content has-text-centered">
      <span class="donation__span">
        Please donate to help suport our page.
      </span>
    </div>
    <div class="button-container has-text-centered">
      <h1 class="donation--text">Select one of the following</h1>
      <div class="buttons button-top-row">
        <button
          class="button is-primary is-outlined button-individual"
          @click.stop="selectPremadeAmount(5)"
        >
          $5
        </button>
        <button
          class="button is-primary is-outlined button-individual"
          @click.stop="selectPremadeAmount(25)"
        >
          $25
        </button>
      </div>
      <div class="buttons button-bottom-row">
        <button
          class="button is-primary is-outlined button-individual"
          @click.stop="selectPremadeAmount(50)"
        >
          $50
        </button>
        <button
          class="button is-primary is-outlined button-individual"
          @click.stop="selectPremadeAmount(100)"
        >
          $100
        </button>
      </div>
    </div>
    <div class="field field-custom-amount">
      <h1 class="donation--text">Or</h1>
      <p class="control control-custom-amount">
        <input
          v-model="customAmount"
          class="input input-custom-amount"
          type="integer"
          placeholder="Enter a custom amount"
        />
      </p>
    </div>
    <div ref="donationButtons" class="buttons card-buttons is-right">
      <button class="button is-danger" @click.stop="closeModalEvent">
        Cancel
      </button>
      <button class="button is-success" @click.stop="goToPayment">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customAmount: null,
      premadeAmount: null,
      donations: [],
    }
  },
  computed: {
    donationInfo: {
      get() {
        return this.$store.getters.donationInfo
      },
      set(newValue) {
        const donationInfo = {
          title: this.donationInfo.title,
          count: this.donationInfo.count,
          amount: newValue,
        }
        this.$store.dispatch('setDonationInfo', donationInfo)
      },
    },
  },
  methods: {
    reset() {
      this.customAmount = null
      this.premadeAmount = null
    },
    selectPremadeAmount(amount) {
      const donationButtons = this.$refs.donationButtons
      this.customAmount = null
      this.premadeAmount = amount + '.00'
      // eslint-disable-next-line
      console.log(amount)
      donationButtons.scrollIntoView({ block: 'end', behavior: 'smooth' })
    },
    goToPayment() {
      const newDonationInfo = {
        title: 'donation',
        count: 1,
        amount: 0,
      }
      if (this.customAmount) {
        newDonationInfo.amount = this.customAmount
        this.$store.dispatch('setDonationInfo', newDonationInfo)
      } else {
        newDonationInfo.amount = this.premadeAmount
        this.$store.dispatch('setDonationInfo', newDonationInfo)
      }
      this.reset()
      const newDonations = this.donations.push(newDonationInfo)
      this.$store.dispatch('setDonationItems', newDonationInfo)
      return this.$store.dispatch('togglePaymentModal', newDonations)
    },
    closeModalEvent() {
      this.reset()
      const defaultDonations = []
      const defaultDonationInfo = {
        title: '',
        count: 0,
        amount: 0,
      }
      this.$store.dispatch('setDonationInfo', defaultDonationInfo)
      this.$store.dispatch('setDonationItems', defaultDonations)
      return this.$store.dispatch('toggleDonationModal')
    },
  },
}
</script>

<style scoped>
.donation-page {
  background-color: aliceblue;
}
.donation-content {
  background-color: white;
  height: 145px;
  line-height: 145px;
  text-align: center;
  margin-bottom: 1.25em;
}
.donation__span {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}
.button-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25em;
}
.button-top-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.button-bottom-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.button-individual {
  height: 45px;
  width: 75px;
}
.field-custom-amount {
  text-align: center;
}
.control-custom-amount {
  justify-content: center;
}
.input-custom-amount {
  width: 200px;
}
.card-buttons {
  margin: 1.25em;
}
.donation--text {
  padding: 1.25em 0;
}
</style>
