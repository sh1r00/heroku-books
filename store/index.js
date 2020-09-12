export const state = () => ({
  loginModalClass: 'modal',
  donationModalClass: 'modal',
  paymentModalClass: 'modal',
  isLoginModalActive: false,
  isDonationiModalActive: false,
  isPaymentModalActive: false,
  donationAmount: null,
})

export const getters = {
  loginModalClass(state) {
    return state.loginModalClass
  },
  donationModalClass(state) {
    return state.donationModalClass
  },
  paymentModalClass(state) {
    return state.paymentModalClass
  },
}

export const mutations = {
  TOGGLE_LOGIN_MODAL(state) {
    if (state.isLoginModalActive) {
      state.isLoginModalActive = false
      state.loginModalClass = 'modal'
    } else {
      state.isLoginModalActive = true
      state.loginModalClass = 'modal is-active'
    }
  },
  TOGGLE_DONATION_MODAL(state) {
    if (state.isdonationModalActive) {
      state.isdonationModalActive = false
      state.donationModalClass = 'modal'
    } else {
      state.isdonationModalActive = true
      state.donationModalClass = 'modal is-active'
    }
  },
  TOGGLE_PAYMENT_MODAL(state, payload) {
    const newDonationAmount = payload
    state.donationAmount = newDonationAmount
    if (state.ispaymentModalActive) {
      state.ispaymentModalActive = false
      state.paymentModalClass = 'modal'
    } else {
      state.ispaymentModalActive = true
      state.paymentModalClass = 'modal is-active'
    }
  },
}

export const actions = {
  toggleLoginModal(context) {
    return context.commit('TOGGLE_LOGIN_MODAL')
  },
  toggleDonationModal(context) {
    context.commit('TOOGLE_DONATION_MODAL')
  },
  togglePaymentModal(context, payload) {
    const donationAmount = payload
    context.commit('TOGGLE_PAYMENT_MODAL', donationAmount)
  },
}
