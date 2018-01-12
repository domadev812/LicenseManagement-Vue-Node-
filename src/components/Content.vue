<template>
  <div class="container">
    <h1 class = 'page-title'>License Database Records</h1>
    <div class="panel-group">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse" href="#collapse1" class = "filter-condition">Filter panel</a>
            <i data-toggle="collapse" href="#collapse1" class="fa fa-angle-double-down filter-condition-arrow"></i>
          </h4>
        </div>
        <div id="collapse1" class="panel-collapse collapse">
          <div class="panel-body">
            <div class = "row">
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
                <v-select class="vue-select2" name="select2" :on-change="consoleCallback"
                        :options="options" :value.sync="result2"
                        :searchable="true" language="en-US">
                </v-select>
              </div>
            </div>
          </div>
          <div class="panel-footer">Panel Footer</div>
        </div>
      </div>
    </div>
    <div class = "database-table">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Product</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John</td>            
            <td>john@example.com</td>
            <td>Google</td>            
            <td>Bumblebee</td>            
          </tr>          
           <tr>
            <td>John</td>            
            <td>john@example.com</td>
            <td>Google</td>            
            <td>Bumblebee</td>            
          </tr> 
           <tr>
            <td>John</td>            
            <td>john@example.com</td>
            <td>Google</td>            
            <td>Bumblebee</td>            
          </tr> 
           <tr>
            <td>John</td>            
            <td>john@example.com</td>
            <td>Google</td>            
            <td>Bumblebee</td>            
          </tr> 
           <tr>
            <td>John</td>            
            <td>john@example.com</td>
            <td>Google</td>            
            <td>Bumblebee</td>            
          </tr> 
        </tbody>
      </table>
    </div>
  </div>  
</template>
<script>
import { mapGetters } from 'vuex'
import vSelect from 'vue-select'
export default {
  name: 'Content',
  computed: {
    ...mapGetters({
      loading: 'getLoadingFlag'
    })
  },
  components: { 
    vSelect 
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',      
      options: ['Bumblebee','Eggplant-alm','Dragonfly', 'Firefly', 'Pangolin'],
      result2: "Bumblebee",
      selected: null
    }
  },
  methods: {
    consoleCallback(val) {
      this.result2 = val;
      console.log(this.result2);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
