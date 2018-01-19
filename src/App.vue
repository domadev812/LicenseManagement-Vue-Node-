<template>
  <div id="app">    
    <Alert :dismissible="false" :type="alertClasses" v-show="alertShowing">
      <h4 slot="header"><i :class="alertIconClasses"></i> {{alertHeaderText}}</h4>
      <div slot="body" v-html="alertContent">
        {{alertContent}}
      </div>
    </Alert>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const Alert = () => import(/* webpackChunkName: "UI Elements" */ './components/Alerts.vue')
export default {
  name: 'app',
  computed: {
    ...mapGetters({
      alertShowing: 'getAlertShowing',
      alertClasses: 'getAlertClasses',
      alertIconClasses: 'getAlertIconClasses',
      alertHeaderText: 'getAlertHeaderText',
      alertContent: 'getAlertContent'
    })
  },
  components: {
    Alert
  }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 14px;
  line-height: 1.42857143;  
  background-color: #fff;  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
  color: #333;
  margin-top: 30px;
}
</style>
