<template>
  <div class="container-fluid">    
    <div class = 'page-title'> <img src = "https://www.agiletestware.com/images/agiletestware_logo.png"><i class = "fa fa-cog fa-3x setting" @click="gotoSetting()"></i></div>
    <div class="panel-group">
      <div class="panel panel-default">                
        <b-card v-b-toggle.collapse1 variant="primary" class = "filter-panel">Filter Options<i class="fa fa-angle-double-down filter-condition-arrow"></i></b-card >
        <b-collapse id="collapse1" class="filter-body">
          <div class = "row filter-row">
            <div class = "col-md-3 col-sm-4">
              <p>License Expiration Date Range </p>
              <div class = "row">
                <div class = "col-sm-8 col-md-6">
                  <!-- <b-form-input  :type="'date'" v-model="startExpireDate"></b-form-input>                             -->
                  <datepicker :format = "customFormatter" v-model = "startExpireDate"></datepicker>
                </div>                
                <div class = "col-sm-8 col-md-6">
                  <datepicker :format = "customFormatter" v-model = "endExpireDate"></datepicker>  
                </div>
              </div>
            </div> 
            <div class = "col-md-9 col-sm-8">
              <div class = "row">
                <div class = "col-md-3 col-sm-6 col-product">
                  <p>PRODUCT: </p>
                  <div>
                    <b-form-checkbox
                        v-model="bumblebee"
                        value="accepted"
                        unchecked-value="not_accepted">
                        Bumblebee
                    </b-form-checkbox>
                  </div>
                  <div>
                    <b-form-checkbox
                        v-model="eggplant"
                        value="accepted"
                        unchecked-value="not_accepted">
                        Eggplant
                    </b-form-checkbox>
                  </div>
                  <div>
                    <b-form-checkbox
                        v-model="dragonfly"
                        value="accepted"
                        unchecked-value="not_accepted">
                        Dragonfly
                    </b-form-checkbox>
                  </div>
                  <div>
                    <b-form-checkbox
                        v-model="firefly"
                        value="accepted"
                        unchecked-value="not_accepted">
                        Firefly
                    </b-form-checkbox>
                  </div>
                  <div>
                    <b-form-checkbox
                        v-model="pangolin"
                        value="accepted"
                        unchecked-value="not_accepted">
                        Pangolin
                    </b-form-checkbox>
                  </div>
                </div>
                <div class = "col-md-3 col-sm-6">
                  <p>LICENSE TYPE: </p>
                  <div>
                    <b-form-checkbox
                        v-model="evaluation"
                        value="accepted"
                        unchecked-value="not_accepted">
                        Evaluation
                    </b-form-checkbox>
                  </div>
                  <div>
                    <b-form-checkbox
                        v-model="basic"
                        value="accepted"
                        unchecked-value="not_accepted">
                        Basic
                    </b-form-checkbox>
                  </div>
                  <div>                  
                    <b-form-checkbox
                        v-model="enterprise"
                        class = "license-type"
                        value="accepted"
                        unchecked-value="not_accepted">
                        Enterprise
                    </b-form-checkbox>
                  </div>
                </div>
                <div class = "col-md-3 col-sm-6">
                  <p>LICENSE STATE: </p>
                  <div>
                    <b-form-checkbox
                      v-model="showArchived"
                      value="accepted"
                      unchecked-value="not_accepted">
                      Show Archived
                    </b-form-checkbox>
                  </div>
                  <p style = "margin-top:30px;">Deal Value: </p>
                  <div class = "row">
                    <div class = "col-md-5 col-sm-5">
                      <b-form-input id="minDealValue" type = "number"  v-model = "minDeal"></b-form-input>
                    </div>
                    <div class = "col-md-5 col-sm-5">
                      <b-form-input id="maxDealValue" type = "number"  v-model = "maxDeal"></b-form-input>                      
                    </div>
                  </div>
                </div>
                <div class = "col-md-3 col-sm-6">
                  <p>CUSTOMER STATUS: </p>
                   <div>                  
                    <b-form-checkbox
                        v-model="new_customer"
                        class = "license-type"
                        value="accepted"
                        unchecked-value="not_accepted">
                        New
                    </b-form-checkbox>
                  </div>
                  <div>                  
                    <b-form-checkbox
                        v-model="renewal_customer"
                        class = "license-type"
                        value="accepted"
                        unchecked-value="not_accepted">
                        Renewal
                    </b-form-checkbox>
                  </div>
                  <div>                  
                    <b-form-checkbox
                        v-model="lost_customer"
                        class = "license-type"
                        value="accepted"
                        unchecked-value="not_accepted">
                        Lost
                    </b-form-checkbox>
                  </div>
                </div>
              </div>
            </div>                      
          </div>
          <div class="filter-footer"><button type="button" class="btn btn-success btn-filter" @click="filterRecords()">Filter</button></div>
        </b-collapse>
      </div>      
    </div>
    <div class = "database-table">
      <div class = "filter-result-comment">Showing <span style = "color:blue;">{{(startIndex + 1)}} - {{(endIndex + 1)}}</span> of <span style = "color:red;font-weight:bold;">{{totalRecords}}</span> records</div>
      <table class="table table-striped table-hover">
        <thead>
          <tr style = "background: rgb(114, 202, 95);color: white;font-size: 16px;">
            <th style="width: 30px;"></th>
            <th @click="sortRecords('license_id')">ID <i class = "fa" v-bind:class = "[this.sortCondition.field == 'license_id' ? [this.sortCondition.order == 'ASC' ? 'fa-angle-down' : 'fa-angle-up'] : '']"></i></th>
            <th @click="sortRecords('userFullName')">Name <i class = "fa" v-bind:class = "[this.sortCondition.field == 'userFullName' ? [this.sortCondition.order == 'ASC' ? 'fa-angle-down' : 'fa-angle-up'] : '']"></i></th>
            <th @click="sortRecords('userEMail')">Email <i class = "fa" v-bind:class = "[this.sortCondition.field == 'userEMail' ? [this.sortCondition.order == 'ASC' ? 'fa-angle-down' : 'fa-angle-up'] : '']"></i></th>
            <th @click="sortRecords('userCompany')">Company <i class = "fa" v-bind:class = "[this.sortCondition.field == 'userCompany' ? [this.sortCondition.order == 'ASC' ? 'fa-angle-down' : 'fa-angle-up'] : '']"></i></th>
            <th @click="sortRecords('productName')">Product <i class = "fa" v-bind:class = "[this.sortCondition.field == 'productName' ? [this.sortCondition.order == 'ASC' ? 'fa-angle-down' : 'fa-angle-up'] : '']"></i></th>
            <th @click="sortRecords('dealValue')">Deal Value <i class = "fa" v-bind:class = "[this.sortCondition.field == 'dealValue' ? [this.sortCondition.order == 'ASC' ? 'fa-angle-down' : 'fa-angle-up'] : '']"></i></th>
            <th @click="sortRecords('issueDate')">Issue Date <i class = "fa" v-bind:class = "[this.sortCondition.field == 'issueDate' ? [this.sortCondition.order == 'ASC' ? 'fa-angle-down' : 'fa-angle-up'] : '']"></i></th>
            <th @click="sortRecords('expireDate')">Expire Date <i class = "fa" v-bind:class = "[this.sortCondition.field == 'expireDate' ? [this.sortCondition.order == 'ASC' ? 'fa-angle-down' : 'fa-angle-up'] : '']"></i></th>
            <th @click="sortRecords('updateDate')">Updated Date <i class = "fa" v-bind:class = "[this.sortCondition.field == 'updateDate' ? [this.sortCondition.order == 'ASC' ? 'fa-angle-down' : 'fa-angle-up'] : '']"></i></th>            
            <th style="width: 100px;"></th>
          </tr>
        </thead>
        <tbody v-if = "records.length > 0">                 
          <tr v-for="n in endIndex - startIndex + 1">
            <td class = "expire-state"><i class = "fa fa-circle" v-bind:class="[records[n + startIndex - 1].expireState == 0 ? 'expired' : [records[n + startIndex - 1].expireState == 1 ? 'expire-soon' : 'expire-after']]"></i></td>
            <td>{{records[n + startIndex - 1].license_id}}</td>            
            <td>{{capitalize(records[n + startIndex - 1].userFullName)}}</td>            
            <td>{{lowercase(records[n + startIndex - 1].userEMail)}}</td>
            <td>{{capitalize(records[n + startIndex - 1].userCompany)}}</td>            
            <td>{{capitalize(records[n + startIndex - 1].productName)}}</td>            
            <td>{{records[n + startIndex - 1].dealValue}}</td>
            <td>{{records[n + startIndex - 1].issueDate}}</td>            
            <td>{{records[n + startIndex - 1].expireDate}}</td>        
            <td>{{records[n + startIndex - 1].updateDate}}</td>        
            <td class = "edit-column">
              <i class = "fa fa-pencil edit" @click="vieweDetail(n + startIndex - 1)"></i>
              <i class = "fa" v-bind:class="[records[n + startIndex - 1].licenseState == 'active' ? 'fa-eye-slash active-state' : 'fa-eye archive']" @click="setArchive(n + startIndex - 1)"></i>
            </td>
          </tr>                     
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="11" style = "text-align:center;">
              No Records
            </td>
          </tr>
        </tbody>
      </table>
      <b-pagination size="md" :total-rows="totalRecords" v-model="currentPage" :per-page="perPage">
      </b-pagination>
      <b-form-select v-model = "perPage" :options="perPages">
      </b-form-select>
      
    </div>
    <LoadingModal></LoadingModal>
  </div>  
</template>
<script>
import { mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'

import moment from 'moment'
const LoadingModal = () => import(/* webpackChunkName: "Content" */ './Loading.vue')
export default {
  name: 'Content',
  computed: {
    ...mapGetters({
      loading: 'getLoadingFlag',
      filterCondition: 'getFilterCondition',
      sortCondition: 'getSortCondition'
    })
  },
  components: {
    LoadingModal,
    Datepicker
  },
  data () {
    return {
      totalRecords: 67,
      perPage: 50,
      totalPages: 1,
      currentPage: 1,
      startIndex: 0,      
      endIndex: 0,
      startExpireDate: '2018-01-01',
      endExpireDate: '2018-01-01',
      bumblebee: 'not_accepted',      
      eggplant: 'not_accepted',
      dragonfly: 'not_accepted',      
      firefly: 'not_accepted',      
      pangolin: 'not_accepted', 
      paid: 'not_accepted',
      evaluation: 'not_accepted',  
      basic: 'not_accepted',
      enterprise: 'not_accepted',
      showArchived: 'accepted',      
      new_customer: 'not_accepted',
      renewal_customer: 'not_accepted',
      lost_customer: 'not_accepted',
      minDeal:0,
      maxDeal:20000,               
      records: [],
      perPages: [
        { value: 10, text: '10' },
        { value: 20, text: '20' },
        { value: 30, text: '30' },
        { value: 50, text: '50' },
      ]
    }
  },
  created() {       
    let today = new Date();    
    this.startExpireDate = moment(today).format("YYYY-MM-DD");   
    var endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 30);         
    this.endExpireDate = moment(endDate).format("YYYY-MM-DD");   
    this.initFilterComponents();
    this.fetchRecords(this.filterCondition, this.sortCondition);    
  },
  watch: {
    currentPage: {
      handler () {
        this.intiShowRecords();
      }
    },
    perPage: {
      handler () {        
        if(this.currentPage > 1)
          this.currentPage = 1;
        else 
          this.intiShowRecords();
      }
    }
  },
  methods: {
    vieweDetail(index) {
      this.$router.push({name: 'ViewDetail', params: { id: index + 1}})
    },
    gotoSetting() {
      this.$router.push({name: 'Setting'})
    },
    setArchive(index){       
      let self = this;
      let selectedRecord = this.records[index];  
      if(selectedRecord.licenseState == 'active') selectedRecord.licenseState = 'archive';        
      else selectedRecord.licenseState = 'active';
      
      this.$store.dispatch('setLoadingFlag', 'flex');
      this.$store.dispatch('setLoadingText', 'Updating...');
      this.$store.dispatch('updateLicenseState', {"licenseState": selectedRecord.licenseState, "license_id": selectedRecord.license_id})
        .then((response) => {          
          self.$store.dispatch('setLoadingFlag', 'none');
          self.$ls.set('records', this.records);          
        }).catch((error) => {    
          this.$store.dispatch('setLoadingFlag', 'none');
          console.log('Error');
          if(selectedRecord.licenseState == 'active') selectedRecord.licenseState = 'archive';        
          else selectedRecord.licenseState = 'active';    
        }
      )      
    },
    intiShowRecords() {
      this.totalPages = Math.ceil(this.totalRecords / this.perPage); 
      this.startIndex = (this.currentPage - 1) * this.perPage;
      if(this.currentPage == this.totalPages) {
        this.endIndex = this.totalRecords - 1;
      } else {
        this.endIndex = this.currentPage * this.perPage - 1;
      }
    },
    initFilterComponents() {
      if(this.filterCondition == null) return;
       this.bumblebee = this.filterCondition.products.indexOf("bumblebee") > -1 ? "accepted" : "not_accepted";
       this.eggplant = this.filterCondition.products.indexOf("eggplant") > -1 ? "accepted" : "not_accepted";
       this.dragonfly = this.filterCondition.products.indexOf("dragonfly") > -1 ? "accepted" : "not_accepted";
       this.firefly = this.filterCondition.products.indexOf("firefly") > -1 ? "accepted" : "not_accepted";
       this.pangolin = this.filterCondition.products.indexOf("pangolin") > -1 ? "accepted" : "not_accepted";

       this.evaluation = this.filterCondition.licenseType.indexOf("evaluation") > -1 ? "accepted" : "not_accepted";
       this.basic = this.filterCondition.licenseType.indexOf("basic") > -1 ? "accepted" : "not_accepted";
       this.enterprise = this.filterCondition.licenseType.indexOf("enterprise") > -1 ? "accepted" : "not_accepted";

       this.new_customer = this.filterCondition.customerStatus.indexOf("new") > -1 ? "accepted" : "not_accepted";
       this.renewal_customer = this.filterCondition.customerStatus.indexOf("renewal") > -1 ? "accepted" : "not_accepted";
       this.lost_customer = this.filterCondition.customerStatus.indexOf("lost") > -1 ? "accepted" : "not_accepted";
       
       this.showArchived = this.filterCondition.archive ? "accepted" : "not_accepted";
       this.minDeal = this.filterCondition.minDeal;
       this.maxDeal = this.filterCondition.maxDeal;
       this.startExpireDate = this.filterCondition.startExpireDate;
       this.endExpireDate = this.filterCondition.endExpireDate;
    },
    filterRecords: function() {
      let products = new Array();
      let licenseType = new Array();
      let customerStatus = new Array();
      let archive = true;
      let filterJSON = {};

      this.bumblebee == "accepted" ? products.push('bumblebee') : "";      
      this.eggplant == "accepted" ? products.push('eggplant') : "";
      this.dragonfly == "accepted" ? products.push('dragonfly') : "";
      this.firefly == "accepted" ? products.push('firefly') : "";
      this.pangolin == "accepted" ? products.push('pangolin') : "";

      this.evaluation == "accepted" ? licenseType.push('evaluation') : "";      
      this.basic == "accepted" ? licenseType.push('basic') : "";  
      this.enterprise == "accepted" ? licenseType.push('enterprise') : "";  

      this.new_customer == "accepted" ? customerStatus.push('new') : "";  
      this.renewal_customer == "accepted" ? customerStatus.push('renewal') : "";  
      this.lost_customer == "accepted" ? customerStatus.push('lost') : "";  

      archive = this.showArchived == "accepted" ? true : false;
      filterJSON.products = products;
      filterJSON.licenseType = licenseType;
      filterJSON.customerStatus = customerStatus;
      filterJSON.archive = archive;
      if(this.minDeal != '')
        filterJSON.minDeal = this.minDeal;
      else
        filterJSON.minDeal = 0;
      
      if(this.maxDeal != '')
        filterJSON.maxDeal = this.maxDeal;
      else
        filterJSON.maxDeal = 0;
      
      filterJSON.startExpireDate = this.startExpireDate;
      filterJSON.endExpireDate = this.endExpireDate;

      this.$store.dispatch('setFilterCondition', filterJSON)
      this.fetchRecords(filterJSON, this.sortCondition);
    },
    sortRecords: function(fieldName) {
      let sortCondition = {};
      sortCondition.field = fieldName;
      if(this.sortCondition.field == fieldName) {        
        sortCondition.order = this.sortCondition.order == 'ASC' ? 'DESC' : 'ASC';
      } else {        
        sortCondition.order = 'ASC';
      }
      this.$store.dispatch('setSortCondition', sortCondition);
      this.fetchRecords(this.filterCondition, sortCondition);
    },
    fetchRecords: function (filter, sort) {   
      let self = this;
      this.$store.dispatch('setLoadingFlag', 'flex');
      this.$store.dispatch('setLoadingText', 'Loading...');
      let payload = {"filterCondition": filter, "sortCondition": sort};
      this.$store.dispatch('fetchRecords', payload)
        .then((response) => {          
          this.$store.dispatch('setLoadingFlag', false);  
          this.records = response;         
          this.totalRecords = this.records.length;
          this.totalPages = Math.ceil(this.totalRecords / this.perPage);               
          this.currentPage = 1;
          if(this.totalRecords > this.perPage) this.endIndex = this.perPage - 1;                                  
          this.$store.dispatch('setLoadingFlag', 'none');
          self.$ls.set('records', this.records);
          this.startIndex = (this.currentPage - 1) * this.perPage;
          if(this.currentPage == this.totalPages) {
            this.endIndex = this.totalRecords - 1;
          } else {
            this.endIndex = this.currentPage * this.perPage - 1;
          }
          this.$store.dispatch('setRecords', this.records);          
        }).catch((error) => {    
          this.$store.dispatch('setLoadingFlag', 'none');
          console.log('Error');    
        }
      )
    },
    capitalize: function(str) {
      if(str == null || str == '') return '';
      let arrName = str.split(" ");
      str = "";
      for(let i = 0; i < arrName.length; i++)
        str += arrName[i].charAt(0).toUpperCase() + arrName[i].slice(1) + " "; 
      return str;
    },
    lowercase: function(str) {
      if(str != null)
        return str.toLowerCase();
      else  
        return "";
    },
    customFormatter(date) {
      return moment(date).format('YYYY-MM-DD');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
