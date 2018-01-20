<template>
  <div class="container">
    <div class = 'page-title'> <img src = "https://www.agiletestware.com/images/agiletestware_logo.png"><i class = "fa fa-angle-double-left fa-3x setting" @click="gotoBack()"></i></div>
    <div class = "row">
      <button type="button" class="btn btn-danger btn-setting" @click="deleteSQLData()">Delete All SQL Data</button>
    </div>
    <div class = "row">
      <button type="button" class="btn btn-danger btn-setting" @click="deleteS3Data()">Delete All S3 Data</button>
    </div>
    <div class = "row">
      <button type="button" class="btn btn-success btn-setting" @click="importNewData()">Import Data from License4J</button>
    </div>
    <LoadingModal></LoadingModal>
  </div>
</template>
<script>
  const LoadingModal = () => import(/* webpackChunkName: "Content" */ './Loading.vue')
  export default {
    name: 'Setting',
    components: {
      LoadingModal
    },
    methods: {
      gotoBack() {
        this.$router.push({name: 'Content'});
      },
      deleteSQLData() {
        let self = this
        this.$swal({
          title: 'Are you sure?',
          text: 'You want to do delete all data?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it!'
        }).then(function () {
          this.$store.dispatch('setLoadingFlag', 'flex');
          this.$store.dispatch('setLoadingText', 'Updating...');
          this.$store.dispatch('deleteSQLData')
            .then((response) => {
              this.$store.dispatch('setLoadingFlag', 'none');
              this.$swal(
                'Deleted!',
                response.message,
                'success'
              ).then(function () {                
              })
            })
            .catch((error) => {
              this.$store.dispatch('setLoadingFlag', 'none');
              this.$swal(
                'Error!',
                error.message,
                'error'
              )
            })
        }.bind(this), function (dismiss) {
          if (dismiss === 'cancel') {
            this.$swal(
              'Cancelled',
              'Cancelled',
              'error'
            )
          }
        }.bind(this))      
      },
      deleteS3Data() {
        let self = this
        this.$swal({
          title: 'Are you sure?',
          text: 'You want to do delete all files from S3?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it!'
        }).then(function () {
          this.$store.dispatch('setLoadingFlag', 'flex');
          this.$store.dispatch('setLoadingText', 'Updating...');
          this.$store.dispatch('deleteS3Data')
            .then((response) => {
              this.$store.dispatch('setLoadingFlag', 'none');
              this.$swal(
                'Deleted!',
                response.message,
                'success'
              ).then(function () {                
              })
            })
            .catch((error) => {
              this.$store.dispatch('setLoadingFlag', 'none');
              this.$swal(
                'Error!',
                error.message,
                'error'
              )
            })
        }.bind(this), function (dismiss) {
          if (dismiss === 'cancel') {
            this.$swal(
              'Cancelled',
              'Cancelled',
              'error'
            )
          }
        }.bind(this))  
      },
      importNewData() {
        let self = this        ;
        this.$store.dispatch('setLoadingFlag', 'flex');
        this.$store.dispatch('setLoadingText', 'Importing...');
        this.$store.dispatch('importLicenseData')
          .then((response) => {   
            self.$store.dispatch('setLoadingFlag', 'none');
            this.$swal(
                'Completed!',                
                response.numbers + ' record(s) are imported.',
                'success'
              ).then(function () {                
            })                      
          }).catch((error) => {    
            this.$store.dispatch('setLoadingFlag', 'none');
            console.log('Error'); 
          }
        )
      }
    },
    data () {
      return {
      }
    }
  }
</script>