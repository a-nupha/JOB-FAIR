const state = {
  page: '',
}
const actions = {
  setDataLogin({ commit, state }, payload) {
    commit('SET_LOGIN', payload)
  },
}
const mutations = {
  // eslint-disable-next-line no-shadow
  SET_LOGIN(state, payload) {
    state.page = payload
  },
}

export default {
  state,
  actions,
  mutations,
}
