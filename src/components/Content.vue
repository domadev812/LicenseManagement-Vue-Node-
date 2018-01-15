<template>
  <div class="container-fluid">    
    <h1 class = 'page-title'>License Database Records</h1>
    <div class="panel-group">
      <div class="panel panel-default">                
        <b-card v-b-toggle.collapse1 variant="primary" class = "filter-panel">Filter Options<i class="fa fa-angle-double-down filter-condition-arrow"></i></b-card >
        <b-collapse id="collapse1" class="filter-body">
          <div class = "row filter-row">
            <div class = "col-md-3 col-sm-4">
              <p>License Expiration Date Range </p>
              <div class = "row">
                <div class = "col-sm-6 col-md-6">
                  <b-form-input id="startExpireDate" :type="'date'" v-model="startExpireDate"></b-form-input>                            
                </div>                
                <div class = "col-sm-6 col-md-6">
                  <b-form-input id="endExpireDate" :type="'date'" v-model="endExpireDate"></b-form-input>              
                </div>
              </div>
            </div> 
            <div class = "col-md-7 col-sm-6">
              <div class = "row">
                <div class = "col-md-3 col-sm-6">
                  <b-form-checkbox
                      v-model="bumblebee"
                      value="accepted"
                      unchecked-value="not_accepted">
                      Bulblebee
                  </b-form-checkbox>
                  <b-form-checkbox
                      v-model="eggplant"
                      value="accepted"
                      unchecked-value="not_accepted">
                      Eggplant
                  </b-form-checkbox>
                  <b-form-checkbox
                      v-model="dragonfly"
                      value="accepted"
                      unchecked-value="not_accepted">
                      Dragonfly
                  </b-form-checkbox>
                  <b-form-checkbox
                      v-model="firefly"
                      value="accepted"
                      unchecked-value="not_accepted">
                      Firefly
                  </b-form-checkbox>
                  <b-form-checkbox
                      v-model="pangolin"
                      value="accepted"
                      unchecked-value="not_accepted">
                      Pangolin
                  </b-form-checkbox>
                </div>
                <div class = "col-md-3 col-sm-6">
                  <b-form-checkbox
                      v-model="paid"
                      value="accepted"
                      unchecked-value="not_accepted">
                      Paid
                  </b-form-checkbox>
                  <b-form-checkbox
                      v-model="evaluation"
                      value="accepted"
                      unchecked-value="not_accepted">
                      Evaluation
                  </b-form-checkbox>
                </div>
                <div class = "col-md-3 col-sm-6">
                  <b-form-checkbox
                      v-model="basic"
                      value="accepted"
                      class = "license-type"
                      unchecked-value="not_accepted">
                      Basic
                  </b-form-checkbox>
                  <b-form-checkbox
                      v-model="enterprise"
                      class = "license-type"
                      value="accepted"
                      unchecked-value="not_accepted">
                      Enterprise
                  </b-form-checkbox>
                </div>
                <div class = "col-md-3 col-sm-6">
                  <b-form-checkbox
                      v-model="showArchived"
                      value="accepted"
                      unchecked-value="not_accepted">
                      Show Archived
                  </b-form-checkbox>
                </div>
              </div>
            </div>
            <div class = "col-md-1 col-sm-2">
              <b-form-select id = "detailCustomStatus" v-model="selectedCustomStatus" :options="customStatus">
              </b-form-select>
            </div>                      
          </div>
          <div class="filter-footer"><button type="button" class="btn btn-success btn-filter">Filter</button></div>
        </b-collapse>
      </div>      
    </div>
    <div class = "database-table">
      <table class="table table-striped table-hover">
        <thead>
          <tr style = "background: rgb(114, 202, 95);color: white;font-size: 16px;">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Product</th>
            <th>Issue Date</th>
            <th>Expire Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody v-if = "records.length > 0">                 
          <tr v-for="n in endIndex - startIndex + 1" @click="vieweDetail(n - 1)">
            <td>{{records[n + startIndex - 1].license_id}}</td>            
            <td>{{records[n + startIndex - 1].userFullName}}</td>            
            <td>{{records[n + startIndex - 1].userEMail}}</td>
            <td>{{records[n + startIndex - 1].userCompany}}</td>            
            <td>{{records[n + startIndex - 1].productName}}</td>            
            <td>{{records[n + startIndex - 1].issueDate}}</td>            
            <td>{{records[n + startIndex - 1].expireDate}}</td> 
            <td>Email Sent</td>           
          </tr>                     
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="8">
              No Records
            </td>
          </tr>
        </tbody>
      </table>
      <b-pagination size="md" :total-rows="totalRecords" v-model="currentPage" :per-page="perPage">
      </b-pagination>
    </div>
    <LoadingModal></LoadingModal>
  </div>  
</template>
<script>
import { mapGetters } from 'vuex'
import { Card } from 'bootstrap-vue/es/components'
const LoadingModal = () => import(/* webpackChunkName: "Content" */ './Loading.vue')
export default {
  name: 'Content',
  computed: {
    ...mapGetters({
      loading: 'getLoadingFlag'
    })
  },
  components: {Card, LoadingModal},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      totalRecords: 67,
      perPage: 10,
      totalPages: 1,
      currentPage: 1,
      startIndex: 0,
      endIndex: 0,
      startExpireDate: '2018-01-01',
      endExpireDate: '2018-01-01',
      bumblebee: 'accepted',      
      eggplant: 'accepted',
      dragonfly: 'accepted',      
      firefly: 'accepted',      
      pangolin: 'accepted', 
      paid: 'accepted',
      evaluation: 'accepted',  
      basic: 'accepted',
      enterprise: 'accepted',
      showArchived: 'not_accepted',      
      selectedCustomStatus: '',
      customStatus: [
        { value: '', text: 'All' },
        { value: 'new', text: 'New' },
        { value: 'renewal', text: 'Renewal' },
        { value: 'lost', text: 'Lost' }
      ],               
      records: []
    }
  },
  created() {       
    this.fetchNewRecords();
  },
  watch: {
    currentPage: {
      handler () {
        this.startIndex = (this.currentPage - 1) * this.perPage;
        if(this.currentPage == this.totalPages) {
          this.endIndex = this.totalRecords - 1;
        } else {
          this.endIndex = this.currentPage * this.perPage - 1;
        }
      }
    }
  },
  methods: {
    vieweDetail(index) {
      this.$router.push({name: 'ViewDetail', params: { id: index }})
    },
    fetchNewRecords: function () {   
      let self = this;
      this.$store.dispatch('setLoadingFlag', 'flex');
      this.$store.dispatch('setLoadingText', 'Loading...');
      this.$store.dispatch('fetchNewRecords')
        .then((response) => {
          this.$store.dispatch('setLoadingFlag', false);  
          this.records = response;         
          this.totalRecords = this.records.length;
          this.totalPages = Math.ceil(this.totalRecords / this.perPage);               
          this.currentPage = 1;
          if(this.totalRecords > 10) this.endIndex = 9;                                  
          this.$store.dispatch('setLoadingFlag', 'none');
          this.$store.dispatch('setRecords', this.records);
          console.log(this.records);
        }).catch((error) => {
          console.log("Error");          
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
