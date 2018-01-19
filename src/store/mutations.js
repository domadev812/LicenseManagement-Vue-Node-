export default {
  ALERT_HIDE (state) {
    state.alert.showAlert = false
  },
  ALERT_CHANGE (state, payload) {
    if (payload.hasOwnProperty('alertIconClass')) {
      state.alert.alertIconClass = payload.alertIconClass
    }
    if (payload.hasOwnProperty('alertClass')) {
      state.alert.alertClass = payload.alertClass
    }
    if (payload.hasOwnProperty('showAlert')) {
      state.alert.showAlert = payload.showAlert
    }
    if (payload.hasOwnProperty('content')) {
      state.alert.content = payload.content
    }
    if (payload.hasOwnProperty('headerText')) {
      state.alert.headerText = payload.headerText
    }
  },
  SET_RECORDS (state, records) {
    state.records = records
  },
  SET_LOADING_FLAG (state, flag) {
    state.loading = flag
  },
  SET_LOADING_TEXT (state, text) {
    state.loadingText = text
  },
  SET_SELECTED_INDEX (state, index) {
    state.selectedIndex = index
  },
  SET_FILTER_CONDITION (state, filterCondition) {
    state.filterCondition = filterCondition
  },
  SET_SORT_CONDITION (state, sortCondition) {
    state.sortCondition = sortCondition
  }
}