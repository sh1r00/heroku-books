<template>
  <div class="donation-page">
    <div class="has-text-centered">Please Donate</div>
    <div class="content">Please donate to help suport our page.</div>
    <div class="buttons">
      <button
        class="button is-primary is-rounded is-light"
        @click.stop="selectPremadeAmount(5)"
      >
        $5
      </button>
      <button
        class="button is-primary is-rounded is-light"
        @click.stop="selectPremadeAmount(25)"
      >
        $25
      </button>
      <button
        class="button is-primary is-rounded is-light"
        @click.stop="selectPremadeAmount(50)"
      >
        $50
      </button>
      <button
        class="button is-primary is-rounded is-light"
        @click.stop="selectPremadeAmount(100)"
      >
        $100
      </button>
    </div>
    <div class="field">
      <p class="control">
        <input
          v-model="customAmount"
          class="input"
          type="integer"
          placeholder="Enter a custom amount"
        />
      </p>
    </div>
    <div class="buttons is-right">
      <button class="button is-danger" @click.stop="closeModalEvent()">
        Cancel
      </button>
      <button class="button is-success">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customAmount: null,
      premadeAmount: null,
      selectedAmount: '',
    }
  },
  methods: {
    /*
    selectPremadeAmount(amount) {
      if (this.premadeAmount === amount) {
        return
      }
      this.customAmount = null,
      this.premadeAmount = amount,
    },
    */
    goToPayment() {
      if (this.customAmount) {
        this.selectedAmount = this.customAmount
      } else {
        this.selectedAmount = this.premadeAmount
      }

      const newAmount = this.selectedAmount
      return this.$store.dispatch('togglePaymentModal', newAmount)
    },
    closeModalEvent() {
      return this.$store.dispatch('toggleDonationModal')
    },
  },
}
</script>
