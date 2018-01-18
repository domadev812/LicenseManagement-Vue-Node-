export default {
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