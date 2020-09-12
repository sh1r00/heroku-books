<template>
  <div class="donation-page">
    <div class="donation-title is-primary has-text-centered">
      <span class="donation__span">Please Donate</span>
    </div>
    <div class="donation-content has-text-centered">
      <span class="donation__span">
        Please donate to help suport our page.
      </span>
    </div>
    <div class="button-container">
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
      <p class="control control-custom-amount">
        <input
          v-model="customAmount"
          class="input input-custom-amount"
          type="integer"
          placeholder="Enter a custom amount"
        />
      </p>
    </div>
    <div class="buttons card-buttons is-right">
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
      selectedAmount: '',
    }
  },
  methods: {
    selectPremadeAmount(amount) {
      this.customAmount = null
      this.premadeAmount = amount
      // eslint-disable-next-line
      console.log(amount)
    },
    goToPayment() {
      if (this.customAmount) {
        this.selectedAmount = this.customAmount
      } else {
        this.selectedAmount = this.premadeAmount
      }

      const newAmount = this.selectedAmount
      this.$store.dispatch('togglePaymentModal', newAmount)
    },
    closeModalEvent() {
      this.$store.dispatch('toggleDonationModal')
    },
  },
}
</script>

<style scoped>
.donation-page {
  background-color: aliceblue;
}
.donation-title {
  font-size: 2.5em;
  width: 100%;
  height: 125px;
  line-height: 125px;
  text-align: center;
}
.donation__span {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}
.donation-content {
  background-color: white;
  height: 145px;
  line-height: 145px;
  text-align: center;
  margin-bottom: 1.25em;
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
</style>
