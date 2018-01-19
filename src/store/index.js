import Vue from 'vue'
import Vuex from 'vuex'
import jQuery from 'jquery'
import createMutationsSharer from 'vuex-shared-mutations'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import license from './modules/license'

Vue.use(Vuex)
Vue.prototype.$jQuery = jQuery
const debug = process.env.NODE_ENV !== 'production'

const state = {
  alert: {
    showAlert: false,
    alertClass: 'success',
    alertIconClass: 'icon fa fa-check',
    headerText: 'Alert!',
    content: 'Test content'
  },
  loading: 'none',  
  loadingText: 'Loading...',  
  selectedIndex: -1,
  filterCondition: null,
  sortCondition:{
    "field": "license_id",
    "order": "ASC"
  },
  records: []
}

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  modules: {
    license
  }
})