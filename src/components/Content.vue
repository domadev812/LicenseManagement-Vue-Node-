<template>
  <div class="container-fluid">
    <h1 class = 'page-title'>License Database Records</h1>
    <div class="panel-group">
      <div class="panel panel-default">                
        <b-card v-b-toggle.collapse1 variant="primary" class = "filter-panel">Filter Options<i class="fa fa-angle-double-down filter-condition-arrow"></i></b-card >
        <b-collapse id="collapse1" class="filter-body">
          <div class = "row filter-row">
            <div class = "col-md-4 col-sm-6">
                <b-form-group horizontal
                label="Type:"
                label-class="text-sm-right"
                label-for="detailLicenseType">
                <b-form-select id = "detailLicenseType" v-model="selectedType" :options="licenseType" class="mb-3">
                </b-form-select>
              </b-form-group>
            </div>
            <div class = "col-md-4 col-sm-6">
              <b-form-group horizontal
                label="Expiry Date:"
                label-class="text-sm-right"
                label-for="detailExpireDate">
                <b-form-input id="detailExpireDate" :type="'date'" v-model="expireDate"></b-form-input>
              </b-form-group>
            </div>
            <div class = "col-md-4 col-sm-6">
              <b-form-group horizontal
                label="State:"
                label-class="text-sm-right"
                label-for="detailLicenseState">
                  <b-form-checkbox id="detailLicenseState"
                      v-model="licenseState"
                      value="accepted"
                      unchecked-value="not_accepted">
                      Archive
                  </b-form-checkbox>
              </b-form-group>
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
        <tbody>        
          <tr v-for="n in endIndex - startIndex + 1" @click="vieweDetail(n - 1)">
            <td>License ID</td>            
            <td>{{records[n + startIndex - 1].name}}</td>            
            <td>{{records[n + startIndex - 1].email}}</td>
            <td>{{records[n + startIndex - 1].company}}</td>            
            <td>{{records[n + startIndex - 1].product}}</td>            
            <td>{{records[n + startIndex - 1].issueDate}}</td>            
            <td>{{records[n + startIndex - 1].expireDate}}</td> 
            <td>Email Sent</td>           
          </tr>          
           
        </tbody>
      </table>
      <b-pagination size="md" :total-rows="totalRecords" v-model="currentPage" :per-page="perPage">
      </b-pagination>
    </div>
  </div>  
</template>
<script>
import { mapGetters } from 'vuex'
import { Card } from 'bootstrap-vue/es/components'

export default {
  name: 'Content',
  computed: {
    ...mapGetters({
      loading: 'getLoadingFlag'
    })
  },
  components: {Card},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      totalRecords: 67,
      perPage: 10,
      totalPages: 1,
      currentPage: 0,
      startIndex: 0,
      endIndex: 0,
      selectedProduct: 'Bumblebee',
      products: [
        { value: 'Bumblebee', text: 'Bumblebee' },
        { value: 'Eggplant-alm', text: 'Eggplant-alm' },
        { value: 'Dragonfly', text: 'Dragonfly' },
        { value: 'Firefly', text: 'Firefly' },
        { value: 'Pangolin', text: 'Pangolin' }
      ],
      selectedType: 'Enterprise',
      licenseType: [
        { value: 'Enterprise', text: 'Enterprise' },
        { value: 'Basic', text: 'Basic' }
      ],
      expireDate: '2017-12-12',
      licenseState: 'not_accepted',
      records: []
    }
  },
  created() {
    this.totalPages = Math.ceil(this.totalRecords / this.perPage);     
    this.currentPage = 1;
    for(let i = 0; i < this.totalRecords; i++) {
      let item = {"name":"name" + i, "email":"email" + i, "product":this.products[i % 4].text, "company": "company" + i, "issueDate": "2017-12-09", "expireDate": "2018-09-09"};
      this.records.push(item);
    }
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
      this.$store.dispatch('fetchNewRecords')
        .then((response) => {
          this.$store.dispatch('setLoading', false);
          console.log(response);
        }).catch((error) => {
          console.log("Error");          
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
