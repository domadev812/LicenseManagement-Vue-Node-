<template>
  <div id="loading-modal" class="w3-modal" v-bind:style="{display: loading}">
    <div class="w3-modal-content" style="background-color: transparent; padding-bottom:200px;">
      <div class="w3-container">
        <div class="loader"></div> <div class = "loading-text">{{loadingText}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'LoadingModal',
    created () {
    },
    computed: {
      ...mapGetters({
        loading: 'getLoadingFlag',
        loadingText: 'getLoadingText'
      })
    }
  }
</script>