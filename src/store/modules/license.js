import {sendGet, sendPut, sendPost, sendDelete, sendPutJSON} from '../../config/api'
import clone from 'lodash/clone'
import filter from 'lodash/filter'
import orderBy from 'lodash/orderBy'

const state = {
  newRecords: {},
  backupRecords: {}
}

const actions = {
  importLicenseData ({commit}) {
    return new Promise((resolve, reject) => {
      sendGet('/importLicenseData', null, null)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchRecords ({commit}, payload) {    
    return new Promise((resolve, reject) => {      
      sendGet('/getRecords/' + JSON.stringify(payload.filterCondition) + "/" + JSON.stringify(payload.sortCondition), null)
        .then((response) => {
          commit('FETCH_NEW_RECORDS', response)
          let items = clone(state.newRecords)
          resolve(items)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updateRecord ({commit, dispatch, getters}, payload) {    
    return new Promise((resolve, reject) => {
      sendPutJSON('/updateRecord', payload)
        .then((response) => {          
          resolve(response)
          console.log(response);
        })
        .catch((error) => {          
          reject(error)
        })
    })
  },
  updateLicenseState ({commit, dispatch, getters}, payload) {    
    return new Promise((resolve, reject) => {
      sendPutJSON('/updateLicenseState', payload)
        .then((response) => {          
          resolve(response)
          console.log(response);
        })
        .catch((error) => {          
          reject(error)
        })
    })
  },
  deleteSQLData ({commit, dispatch, getters}, payload) {
    return new Promise((resolve, reject) => {
      sendDelete('/deleteSQLData', null)
        .then((response) => {
          resolve(response)
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