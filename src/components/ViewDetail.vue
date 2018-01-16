<template>
  <div class="container view-detail">
    <div class = "row">
      <div class = "col-md-12">
        <button type="button" class="btn btn-success btn-back-results" @click="backToHome()"><i class = "fa fa-angle-left"></i>&nbsp;&nbsp;Back to Search Results</button>
        <div class ="btn-group-move">
          <button type="button" class="btn btn-success btn-previous"  @click="gotoPrevious()"><i class = "fa fa-angle-left"></i>&nbsp;&nbsp;Previous Record</button>
          <button type="button" class="btn btn-success btn-next" @click="gotoNext()">Next Record&nbsp;&nbsp;<i class = "fa fa-angle-right"></i></button>
        </div>
      </div>
    </div>
    <div class = "row main-panel">      
       <div class = "col-md-12 col-detail">
        <div class = "row sub-title">License Details</div>
        <div class = "row detail-panel">
          <div class = "col-md-6 col-sm-6">
            <div class = "row">              
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Company:"
                  label-class="text-sm-right"
                  label-for="detailCompany">
                  <b-form-input id="detailCompany"  v-model = "selectedRecord.userCompany"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Issue Date:"
                  label-class="text-sm-right"
                  label-for="detailIssueDate">
                  <b-form-input id="detailIssueDate" :type="'date'" v-model = "selectedRecord.issueDate"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Expiry Date:"
                  label-class="text-sm-right"
                  label-for="detailExpireDate">
                  <b-form-input id="detailExpireDate" :type="'date'" v-model = "selectedRecord.expireDate"></b-form-input>
                </b-form-group>
              </div>              
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Product:"
                  label-class="text-sm-right"
                  label-for="detailProduct">
                  <b-form-select id = "detailProduct" v-model = "selectedRecord.productName" :options="products">
                  </b-form-select>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="License Type:"
                  label-class="text-sm-right"
                  label-for="detailLicenseType">
                  <b-form-select id = "detailLicenseType" v-model = "selectedRecord.licenseType" :options="licenseType">
                  </b-form-select>
                </b-form-group>
              </div>                            
            </div>
          </div>
          <div class = "col-md-6 col-sm-6">
            <div class = "row">
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Contact Name:"
                  label-class="text-sm-right"
                  label-for="detailContactName">
                  <b-form-input id="detailContactName" v-model = "selectedRecord.userFullName"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Contact Email:"
                  label-class="text-sm-right"
                  label-for="detailContactEmail">
                  <b-form-input id="detailContactEmail" v-model = "selectedRecord.userEMail"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="License URL:"
                  label-class="text-sm-right"
                  label-for="detailLicenseURL">
                  <b-form-input id="detailLicenseURL" v-model = "selectedRecord.licenseURL"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Freshsales URL:"
                  label-class="text-sm-right"
                  label-for="detailFreshsalesURL">
                  <b-form-input id="detailFreshsalesURL" v-model = "selectedRecord.freshsalesURL"></b-form-input>
                  </b-form-group>
              </div>
              <div class = "col-md-12 customer-status">
                 <b-form-group horizontal
                  label="Customer Status:"
                  label-class="text-sm-right"
                  label-for="detailCustomStatus">
                  <b-form-select id = "detailCustomStatus" v-model = "selectedRecord.customerStatus" :options="customStatus">
                  </b-form-select>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="State:"
                  label-class="text-sm-right"
                  label-for="detailLicenseState">
                  <b-form-select id = "detailLicenseState" v-model = "selectedRecord.licenseState" :options="licenseState">
                  </b-form-select>
                </b-form-group>                
              </div>
            </div>
          </div>
        </div>        
       </div> 
       <div class = "col-md-6 col-sm-6 col-xs-12 col-part-detail">
        <div class = "content-panel">
          <div class = "row sub-title">Accounts Payable + Decision Makers Info</div>
          <div class = "row detail-panel" style = "margin-bottom:10px;">          
            <b-form-textarea id="textarea1"
                      v-model = "selectedRecord.accountsPayable"
                      placeholder="Enter something"
                      :rows="3"
                      :no-resize="true"
                      :max-rows="3">
            </b-form-textarea>          
          </div>
        </div>
      </div>            
      <div class = "col-md-6 col-sm-6 col-xs-12 col-part-detail">
        <div class = "content-panel">
          <div class = "row sub-title">Invoices</div>
            <div class = "row detail-panel">
              <div class = "col-md-12">12/1/17: In-4087.pdf</div>
              <div class = "col-md-12">12/1/17: In-4087.pdf</div>
              <button type="button" class="btn btn-success btn-small form-group">Add</button>
            </div>
        </div>
      </div>    
      <div class = "col-md-12 col-detail">
        <div class = "row sub-title">Deal Notes</div>
        <div class = "row detail-panel">          
          <b-form-textarea id="textarea1" class = "form-group"
                     v-model = "selectedRecord.dealNotes"
                     placeholder="Enter something"
                     :rows="3"
                     :no-resize="true"
                     :max-rows="3">
          </b-form-textarea>          
        </div>
      </div>                  
      <div class = "col-md-12 col-detail">
        <div class = "row sub-title">Important Notes</div>
        <div class = "row detail-panel">          
          <b-form-textarea id="textarea1" class = "form-group"
                     v-model = "selectedRecord.importantNotes"
                     placeholder="Enter something"
                     :rows="3"
                     :no-resize="true"
                     :max-rows="3">
          </b-form-textarea>          
        </div>
      </div>
      <div class = "col-md-12" style = "text-align:right;">
        <button type="button" id="btnEdit" class="btn btn-success btn-small form-group" @click="setEditFields(true)">Edit</button>
        <button type="button" id="btnSave" class="btn btn-success btn-small form-group" @click="saveRecord()">Save</button>
      </div>
    </div>
  </div>  
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ViewDetail',
  created() {
    this.selectedIndex = -1;    
    this.records = this.$ls.get('records');        
    let self = this;
    $(document).ready(function(){      
      self.selectedIndex = self.$route.params.id - 1;    
      self.setEditFields(false);      
    });    
  },
  computed: {
  },
  watch: {
    selectedIndex: {      
      handler () {   
        if(this.selectedIndex < 0 || this.selectedIndex >= this.records.length) {          
          this.selectedRecord = {
            accountsPayable: '',
            customerStatus: '',
            issueDate: '2018-01-01',
            expireDate: '2018-01-01',      
            freshsalesURL: '',
            importantNotes: '',
            licenseType: '',
            licenseURL: '',
            license_id: '',
            productName: '',
            userCompany: '',
            userEMail: '',
            userFullName: '',
            userRegisteredTo: '',
          }          
          this.setEditFields(false);
          $("#btnEdit").attr("disabled", "");
          return;
        }        
        if(this.records.length > 0)        
          this.selectedRecord = this.records[this.selectedIndex];        
        
        if(this.selectedRecord.issueDate == null)
          this.selectedRecord.issueDate = "2018-01-02";
        if(this.selectedRecord.expireDate == null)
          this.selectedRecord.expireDate = "2018-01-02";        
         
        if(this.selectedIndex == 0) 
          $(".btn-previous").attr("disabled", "");
        else 
          $(".btn-previous").removeAttr("disabled");

        if(this.selectedIndex == this.records.length - 1) 
          $(".btn-next").attr("disabled", "");
        else 
          $(".btn-next").removeAttr("disabled");
      }
    }
  },
  data () {
    return {
      selectedRecord:{
        accountsPayable: '',
        customerStatus: '',
        expireDate: null,      
        freshsalesURL: '',
        importantNotes: '',
        issueDate: null,
        licenseState: '',
        licenseStatus: '',
        licenseType: '',
        licenseURL: '',
        license_id: '',
        productName: '',
        userCompany: '',
        userEMail: '',
        userFullName: '',
        userRegisteredTo: '',
      },      
      selectedIndex: -1,
      records: [],
      issueDate: '2017-12-12',
      expireDate: '2017-12-12',
      selectedCustomStatus: 'new',
      customStatus: [
        { value: 'new', text: 'New' },
        { value: 'renewal', text: 'Renewal' },
        { value: 'lost', text: 'Lost' }
      ],
      selectedType: 'Enterprise',      
      licenseType: [
        { value: '', text: 'N/A' },        
        { value: 'evaluation', text: 'Evaluation' },        
        { value: 'basic', text: 'Basic' },
        { value: 'enterprise', text: 'Enterprise' },        
        { value: 'eggplant', text: 'Eggplant' }
      ],
      licenseState: [
        { value: 'active', text: 'Active' },
        { value: 'archive', text: 'Archive' }
      ],
      selectedProduct: 'bumblebee',
      products: [
        { value: 'bumblebee', text: 'Bumblebee' },
        { value: 'eggplant-alm', text: 'Eggplant-alm' },
        { value: 'dragonfly', text: 'Dragonfly' },
        { value: 'firefly', text: 'Firefly' },
        { value: 'pangolin', text: 'Pangolin' }
      ],
      payableContent: ''
    }
  },
  methods: {
    backToHome() {
      this.$router.push({name: 'Content'});
    },
    saveRecord() {
      console.log(this.selectedRecord);
    },
    setEditFields(flag) {
      if(flag) {
        $("input").removeAttr("disabled");
        $("select").removeAttr("disabled");
        $("textarea").removeAttr("disabled");
        $(".col-detail button").removeAttr("disabled");
        $(".col-part-detail button").removeAttr("disabled");
        $("#btnSave").removeAttr("disabled");
        $("#btnEdit").attr("disabled", "");
      } else {
        $("input").attr("disabled", "");
        $("select").attr("disabled", "");
        $("textarea").attr("disabled", "");
        $(".col-detail button").attr("disabled", "");
        $(".col-part-detail button").attr("disabled", "");
        $("#btnEdit").removeAttr("disabled");
        $("#btnSave").attr("disabled", "");
      }      
    },
    gotoPrevious() {
      this.selectedIndex--;
      this.setEditFields(false);
    },
    gotoNext() {
      this.selectedIndex++;
      this.setEditFields(false);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
