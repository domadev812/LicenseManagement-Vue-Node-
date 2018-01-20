import {sendGet, sendPut, sendPost, sendDelete, sendPutJSON} from '../../config/api'
import clone from 'lodash/clone'
import filter from 'lodash/filter'
import orderBy from 'lodash/orderBy'

const state = {
  newRecords: {},
  backupRecords: {}
}

const actions = {
  importLicenseData ({commit, dispatch}) {
    return new Promise((resolve, reject) => {
      sendGet('/importLicenseData', null, null)
        .then((response) => {
          // dispatch('setAlertData', {showAlert: true, content: 'Import New License from License4J', alertClass: 'success'})       
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  uploadFile ({commit, dispatch, getters}, payload) {        
    return new Promise((resolve, reject) => {      
      sendPost('/uploadFile', payload, {'Content-Type':'multipart/form-data'})
        .then((response) => {          
          resolve(response)
        })
        .catch((error) => {          
          reject(error)
        })
    })
  },
  getUploadURL ({commit}, payload) {
    return new Promise((resolve, reject) => {
      sendGet('/getUploadURL/' + payload, null, null)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchRecords ({commit, dispatch}, payload) {    
    return new Promise((resolve, reject) => {      
      sendGet('/getRecords/' + JSON.stringify(payload.filterCondition) + "/" + JSON.stringify(payload.sortCondition), null)
        .then((response) => {          
          commit('FETCH_NEW_RECORDS', response)
          let items = clone(state.newRecords)
          resolve(items)
        })
        .catch((error) => {
          dispatch('setAlertData', {showAlert: true, content: 'Connection Error!', alertClass: 'danger'})
          reject(error)
        })
    })
  },
  updateRecord ({commit, dispatch, getters}, payload) {    
    return new Promise((resolve, reject) => {
      sendPutJSON('/updateRecord', payload)
        .then((response) => {   
          dispatch('setAlertData', {showAlert: true, content: 'Update Record', alertClass: 'success'})       
          resolve(response)
        })
        .catch((error) => {    
          dispatch('setAlertData', {showAlert: true, content: 'Connection Error!', alertClass: 'danger'})      
          reject(error)
        })
    })
  },
  updateLicenseState ({commit, dispatch, getters}, payload) {    
    return new Promise((resolve, reject) => {
      sendPutJSON('/updateLicenseState', payload)
        .then((response) => {  
          dispatch('setAlertData', {showAlert: true, content: 'Update License State', alertClass: 'success'})               
          resolve(response)
        })
        .catch((error) => {    
          dispatch('setAlertData', {showAlert: true, content: 'Connection Error!', alertClass: 'danger'})      
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
  },
  deleteS3Data ({commit, dispatch, getters}, payload) {
    return new Promise((resolve, reject) => {
      sendDelete('/deleteS3Data', null)
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