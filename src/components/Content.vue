<template>
  <div class="container">
    <h1 class = 'page-title'>License Database Records</h1>
    <div class="panel-group">
      <div class="panel panel-default">                
        <b-card v-b-toggle.collapse1 variant="primary" class = "filter-panel">Filter Options<i class="fa fa-angle-double-down filter-condition-arrow"></i></b-card >
        <b-collapse id="collapse1" class="filter-body">
          <div class = "row filter-row">
            <div class = "col-md-3 col-sm-6 col-xs-12 form-group">
                <label for="filterName">Name:</label>
                <input type="text" class="form-control" id="filterName">
              </div>
              <div class = "col-md-3 col-sm-6 col-xs-12 form-group">
                <label for="filterEmail">Email:</label>
                <input type="text" class="form-control" id="filterEmail">
              </div>
              <div class = "col-md-3 col-sm-6 col-xs-12 form-group">
                <label for="filterCompany">Company:</label>
                <input type="text" class="form-control" id="filterCompany">
              </div>
              <div class = "col-md-3 col-sm-6 col-xs-12 form-group">
                <label for="filterProduct">Product:</label>
                <b-form-select v-model="selectedProduct" :options="products" class="mb-3">
                </b-form-select>
              </div>
          </div>
          <div class="filter-footer"><button type="button" class="btn btn-primary btn-filter">Filter</button></div>
        </b-collapse>
      </div>      
    </div>
    <div class = "database-table">
      <table class="table table-striped table-hover">
        <thead>
          <tr style = "background: #b7b5b5;">
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Product</th>
          </tr>
        </thead>
        <tbody>        
          <tr v-for="n in endIndex - startIndex + 1" @click="vieweDetail(n - 1)">
            <!-- <td><router-link :to="{ name: 'Home', params: { id: 3 }}">John</router-link></td>             -->
            <td>{{records[n + startIndex - 1].name}}</td>            
            <td>{{records[n + startIndex - 1].email}}</td>
            <td>{{records[n + startIndex - 1].company}}</td>            
            <td>{{records[n + startIndex - 1].product}}</td>            
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
      selectedProduct: 'Bumblebee',
      totalRecords: 67,
      perPage: 10,
      totalPages: 1,
      currentPage: 0,
      startIndex: 0,
      endIndex: 0,
      products: [
        { value: 'Bumblebee', text: 'Bumblebee' },
        { value: 'Eggplant-alm', text: 'Eggplant-alm' },
        { value: 'Dragonfly', text: 'Dragonfly' },
        { value: 'Firefly', text: 'Firefly' },
        { value: 'Pangolin', text: 'Pangolin' }
      ],
      records: []
    }
  },
  created() {
    this.totalPages = Math.ceil(this.totalRecords / this.perPage);     
    this.currentPage = 1;
    for(let i = 0; i < this.totalRecords; i++) {
      let item = {"name":"name" + i, "email":"email" + i, "product":this.products[i % 4].text, "company": "company" + i};
      this.records.push(item);
    }
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
