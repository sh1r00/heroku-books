<template>
  <div>
    <h1>Payment page</h1>
    {{ donationAmount }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['donationAmount']),
  },
  /*
  mounted() {
    const elements = this.$stripe.import().elements()
    const card = elements.create('card', {})
    // Add an instance of the card Element into the 'card-element'
    card.mount('#card-element')
  },
  */
}
</script>
