<template>
  <div class="payment-page">
    <h1 class="modal-title">Payment page</h1>
    <p class="payment-content has-text-centered">
      <span>
        You have selected a donation of <strong>${{ paymentTotal }}</strong>
      </span>
    </p>
    <div class="payment-info">
      <div class="has-text-centered payment-info--title">
        <h1>Please enter your payment details:</h1>
      </div>
      <br />
      <div ref="name" class="field">
        <h1 class="payment--text">Name</h1>
        <div class="payment-name">
          <p class="control control-custom-amount">
            <input
              v-model="fName"
              class="input"
              type="string"
              placeholder="First Name"
              @click.prevent="scrollToView('name')"
            />
          </p>
          <p class="control">
            <input
              v-model="lName"
              class="input"
              type="string"
              placeholder="Last Name"
              @click.prevent="scrollToView('name')"
            />
          </p>
        </div>
      </div>
      <div ref="email" class="field">
        <h1 class="payment--text">Email</h1>
        <p class="control">
          <input
            v-model="email"
            class="input"
            type="email"
            placeholder="name@example.com"
            @click.prevent="scrollToView('email')"
          />
        </p>
      </div>
      <br />
      <div ref="address" class="field">
        <h1 class="payment--text">Stree Adress</h1>
        <p class="control">
          <input
            v-model="address"
            class="input"
            type="string"
            placeholder="1234 Working Ave."
            @click.prevent="scrollToView('address')"
          />
        </p>
      </div>
      <br />
      <div ref="city" class="field">
        <h1 class="payment--text">City</h1>
        <p class="control">
          <input
            v-model="city"
            class="input"
            type="string"
            placeholder="Alexandria"
            @click.prevent="scrollToView('city')"
          />
        </p>
      </div>
      <br />
      <small class="has-text-centered payment-info--title">
        <h1>Test using this credit card:</h1>
        <span class="cc-number">4242 4242 4242 4242</span>, date: 04/24, CVC:
        242, and enter any 5 digits for the zip code
      </small>
      <div id="card-element" class="payment-info--element" />
    </div>
    <div ref="paymentButtons" class="buttons payment-buttons is-right">
      <button class="button is-danger" @click.prevent="closeModalEvent">
        Cancel
      </button>
      <button class="button is-success" @click.prevent="submitPayment">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
let stripe
let elements
let card
export default {
  data() {
    return {
      fName: '',
      lName: '',
      email: '',
      city: '',
      address: '',
    }
  },
  computed: {
    ...mapGetters(['donationInfo', 'donations']),
    paymentTotal() {
      if (!this.donationInfo.amount) {
        return '0.00'
      }
      return this.donationInfo.amount
    },
    fullName() {
      return this.fName + ' ' + this.lName
    },
  },
  mounted() {
    stripe = this.$stripe.import()
    elements = stripe.elements()
    card = elements.create('card', {})
    // Add an instance of the card Element into the 'card-element'
    card.mount('#card-element')
  },
  methods: {
    scrollToView(ref) {
      let scrollableView = ''
      if (ref === 'name') {
        scrollableView = this.$refs.name
      } else if (ref === 'email') {
        scrollableView = this.$refs.email
      } else if (ref === 'city') {
        scrollableView = this.$refs.city
      } else if (ref === 'address') {
        scrollableView = this.$refs.address
      }
      return scrollableView.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      })
    },
    closeModalEvent() {
      const defaultDonations = []
      const defaultDonationInfo = {
        title: '',
        count: 0,
        amount: 0,
      }
      this.$store.dispatch('setDonationItems', defaultDonations)
      this.$store.dispatch('setDonationInfo', defaultDonationInfo)
      this.$store.dispatch('togglePaymentModal')
    },
    submitPayment() {
      const amount = this.donationInfo.amount
      const items = Object.keys(this.donations).map((key, index) => {
        return {
          id: this.donations[key]._id,
          title: this.donations[key].title,
          count: this.donations[key].count,
        }
      })
      stripe.createToken(card).then((result) => {
        if (result.error) {
          // eslint-disable-next-line
          console.log(result.error)
        } else {
          const token = result.token
          this.$axios
            .post(
              '/api/donation',
              {
                token: token.id,
                email: this.email,
                name: this.fullName,
                address: this.address,
                city: this.city,
                amount,
                items,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            )
            .then((res) => {
              this.success = true
              this.$toast.success('Order placed successfully', {
                duration: 800,
              })
              this.closeModalEvent()
            })
            .catch(() => {
              this.$toast.error('Order could not be placed', {
                duration: 1000,
              })
            })
        }
      })
    },
  },
}
</script>
<style>
.payment-page {
  background-color: aliceblue;
}

.payment-content {
  background-color: white;
  height: 145px;
  line-height: 145px;
  text-align: center;
  margin-bottom: 1.25em;
}
.payment__span {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
  margin: 1.25em 0;
}
.payment-info {
  padding: 0 1.25em;
}
.payment-info--title {
  margin: 1.25em;
}
.payment-name {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.payment-info--element {
  margin: 2.25em;
}
.payment-buttons {
  margin: 1.25em;
}
</style>
