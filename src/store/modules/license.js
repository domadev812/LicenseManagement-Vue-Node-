import {sendGet, sendPut, sendPost, sendDelete} from '../../config/api'
import clone from 'lodash/clone'
import filter from 'lodash/filter'
import orderBy from 'lodash/orderBy'

const state = {
  newRecords: {},
  backupRecords: {}
}

const actions = {
  fetchNewRecords ({commit}) {
    console.log('Fetch New Records');
    return new Promise((resolve, reject) => {
      sendGet('/getNewRecords', null, null)
        .then((response) => {
          commit('FETCH_NEW_RECORDS', response)
          let items = clone(state.newRecords)
          resolve(items)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

const getters = {
  getNewRecords: (state) => {
    let items = clone(state.originalRecords)    
    return items
  }
}

const mutations = {
  FETCH_NEW_RECORDS (state, payload) {
    state.newRecords = payload
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}