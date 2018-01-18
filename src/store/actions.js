let setRecords = ({commit}, payload) => {
  commit('SET_RECORDS', payload)
}
let setLoadingFlag = ({commit}, payload) => {
  commit('SET_LOADING_FLAG', payload)
}
let setLoadingText = ({commit}, payload) => {
  commit('SET_LOADING_TEXT', payload)
}
let setSelectedIndex = ({commit}, payload) => {
  commit('SET_SELECTED_INDEX', payload)
}
let setFilterCondition = ({commit}, payload) => {
  commit('SET_FILTER_CONDITION', payload)
}
let setSortCondition = ({commit}, payload) => {
  commit('SET_SORT_CONDITION', payload)
}
export { setRecords }
export { setLoadingFlag }
export { setLoadingText }
export { setSelectedIndex }
export { setFilterCondition }
export { setSortCondition }