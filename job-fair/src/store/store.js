import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify'
import {
  make,
} from 'vuex-pathify'

pathify.options.mapping = 'simple'


const getDefaultState = () => ({
  testSandData: 'a-nupha',
  flaglanguage: 'th',
  consentPolicyFlag: '',
  z:'homeRegister',
})
// initial state
const state = Object.assign(getDefaultState())

const mutations = make.mutations(state)
const resetMutation = {
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
}
Object.assign(mutations, resetMutation);

const actions = make.actions(state)
const getters = make.getters(state);
// use store
Vue.use(Vuex)

// create store
export default new Vuex.Store({

  // use the plugin
  plugins: [
    pathify.plugin,
  ],

  // store properties
  state,
  mutations,
  actions,
  getters,
})
