let getAlertShowing = (state) => state.alert.showAlert
let getAlertClasses = state => state.alert.alertClass
let getAlertIconClasses = state => state.alert.alertIconClass
let getAlertHeaderText = state => state.alert.headerText
let getAlertContent = state => state.alert.content
let getLoadingFlag = state => state.loading
let getLoadingText = state => state.loadingText
let getSelectedIndex = state => state.selectedIndex
let getRecords = state => state.records
let getFilterCondition = state => state.filterCondition
let getSortCondition = state => state.sortCondition
export { getLoadingFlag }
export { getLoadingText }
export { getSelectedIndex }
export { getRecords }
export { getFilterCondition }
export { getSortCondition }
export { getAlertShowing }
export { getAlertClasses }
export { getAlertIconClasses }
export { getAlertHeaderText }
export { getAlertContent }