export const state = () => ({
  loginModalClass: 'modal',
  donationModalClass: 'modal',
  paymentModalClass: 'modal',
  fileUploadModalClass: 'modal',
  isLoginModalActive: false,
  isDonationiModalActive: false,
  isPaymentModalActive: false,
  isFileUploadModalActive: false,
  idFileEditModalActive: false,
  donations: [],
  donationInfo: {
    title: '',
    count: 0,
    amount: 0,
  },
  editItem: {
    edit: false,
    item: {},
  },
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
  fileUploadModalClass(state) {
    return state.fileUploadModalClass
  },
  donations(state) {
    return state.donations
  },
  donationInfo(state) {
    return state.donationInfo
  },
  editItem(state) {
    return {
      editableItem: state.editItem,
      fileUploadModalClass: state.fileUploadModalClass,
    }
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
  TOGGLE_PAYMENT_MODAL(state) {
    if (state.ispaymentModalActive) {
      state.ispaymentModalActive = false
      state.paymentModalClass = 'modal'
    } else {
      state.ispaymentModalActive = true
      state.paymentModalClass = 'modal is-active'
    }
  },
  TOGGLE_FILE_UPLOAD_MODAL(state) {
    if (state.isFileUploadModalActive) {
      state.isFileUploadModalActive = false
      state.fileUploadModalClass = 'modal'
    } else {
      state.isFileUploadModalActive = true
      state.fileUploadModalClass = 'modal is-active'
    }
  },
  TOGGLE_FILE_EDIT_MODAL(state, payload) {
    const newItem = {
      edit: true,
      item: payload,
    }
    if (state.isFileEditModalActive) {
      state.isFileEditModalActive = false
      state.fileUploadModalClass = 'modal'
      state.editItem = {
        edit: false,
        item: {},
      }
    } else {
      state.isFileEditModalActive = true
      state.fileUploadModalClass = 'modal is-active'
      state.editItem = newItem
    }
  },
  CLEAR_EDITABLE_ITEM(state) {
    state.editItem = {
      edit: false,
      item: {},
    }
  },
  SET_DONATION_ITEMS(state, payload) {
    const donationItems = payload
    state.donations = []
    state.donations.push(donationItems)
  },
  SET_DONATION_INFO(state, payload) {
    const donationInfo = payload
    state.donationInfo = donationInfo
  },
}

export const actions = {
  toggleLoginModal(context) {
    return context.commit('TOGGLE_LOGIN_MODAL')
  },
  toggleDonationModal(context) {
    return context.commit('TOGGLE_DONATION_MODAL')
  },
  togglePaymentModal(context) {
    return context.commit('TOGGLE_PAYMENT_MODAL')
  },
  toggleFileUploadModal(context) {
    return context.commit('TOGGLE_FILE_UPLOAD_MODAL')
  },
  toggleFileEditModal(context, payload) {
    const item = payload
    return context.commit('TOGGLE_FILE_EDIT_MODAL', item)
  },
  clearEditableItem(context) {
    return context.commit('CLEAR_EDITABLE_ITEM')
  },
  setDonationItems(context, payload) {
    const donationItems = payload
    return context.commit('SET_DONATION_ITEMS', donationItems)
  },
  setDonationInfo(context, payload) {
    const donationInfo = payload
    return context.commit('SET_DONATION_INFO', donationInfo)
  },
}
