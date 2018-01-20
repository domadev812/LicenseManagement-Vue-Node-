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
                  label="License ID:"
                  label-class="text-sm-right"
                  label-for="detailLicenseID">
                  <b-form-input id="detailLicenseID" disabled v-model = "selectedRecord.license_id"></b-form-input>
                </b-form-group>
              </div>       
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Company:"
                  label-class="text-sm-right"
                  label-for="detailCompany">
                  <b-form-input id="detailCompany" class="editable"  v-model = "selectedRecord.userCompany"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Issue Date:"
                  label-class="text-sm-right"
                  label-for="detailIssueDate">
                  <datepicker :format = "customFormatter" class="detail-date" v-model = "selectedRecord.issueDate"></datepicker>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Expiry Date:"
                  label-class="text-sm-right"
                  label-for="detailExpireDate">
                  <datepicker :format = "customFormatter" class="detail-date" v-model = "selectedRecord.expireDate"></datepicker>
                </b-form-group>
              </div>              
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Product:"
                  label-class="text-sm-right"
                  label-for="detailProduct">
                  <b-form-select id = "detailProduct" disabled v-model = "selectedRecord.productName" :options="products">
                  </b-form-select>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="License Type:"
                  label-class="text-sm-right"
                  label-for="detailLicenseType">
                  <b-form-select id = "detailLicenseType" class="editable" v-model = "selectedRecord.licenseType" :options="licenseType">
                  </b-form-select>
                </b-form-group>
              </div> 
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Deal Value:"
                  label-class="text-sm-right"
                  label-for="detailDealValue">
                  <b-form-input type = "number" class="editable" id="detailDealValue"  v-model = "selectedRecord.dealValue"></b-form-input>
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
                  <b-form-input id="detailContactName" class="editable" v-model = "selectedRecord.userFullName"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Contact Email:"
                  label-class="text-sm-right"
                  label-for="detailContactEmail">
                  <b-form-input id="detailContactEmail" class="editable" v-model = "selectedRecord.userEMail"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="License URL:"
                  label-class="text-sm-right"
                  label-for="detailLicenseURL">
                  <b-form-input id="detailLicenseURL" class="editable" v-model = "selectedRecord.licenseURL"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Freshsales URL:"
                  label-class="text-sm-right"
                  label-for="detailFreshsalesURL">
                  <b-form-input id="detailFreshsalesURL" class="editable" v-model = "selectedRecord.freshsalesURL"></b-form-input>
                  </b-form-group>
              </div>
              <div class = "col-md-12 customer-status">
                 <b-form-group horizontal
                  label="Customer Status:"
                  label-class="text-sm-right"
                  label-for="detailCustomStatus">
                  <b-form-select id = "detailCustomStatus" class="editable" v-model = "selectedRecord.customerStatus" :options="customStatus">
                  </b-form-select>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="State:"
                  label-class="text-sm-right"
                  label-for="detailLicenseState">
                  <b-form-select id = "detailLicenseState" class="editable" v-model = "selectedRecord.licenseState" :options="licenseState">
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
            <b-form-textarea id="textarea1" class="editable"
                      v-model = "selectedRecord.accountsPayable"
                      placeholder="Enter something"
                      :rows="5"
                      :no-resize="true"
                      :max-rows="5">
            </b-form-textarea>          
          </div>
        </div>
      </div>            
      <div class = "col-md-6 col-sm-6 col-xs-12 col-part-detail">
        <div class = "content-panel">
          <div class = "row sub-title">Invoices</div>
            <div class = "row detail-panel">
              <div class = "col-md-12 invoice-content">
                <div class = "invoice-detail" v-for="(item, index) in this.invoiceList"><a href = "#" @click = "invoiceURL(item.file_name)">{{item.date}}: {{item.file_name}}</a><i class = "fa fa-remove remove-invoice" @click="deleteInvoice(index)" v-if = "invoiceDeleteFlag"></i></div>              
              </div>              
              <div class = "col-md-12" style = "bottom: 10px;position: absolute;">
                <b-form-file id="upload_file" v-model="file" class = "file-chooser editable" style = "width: 60% !important; float:left;"></b-form-file>
                <button type="button" class="btn btn-success btn-small form-group editable invoice-add-button" @click="uploadInvoices()">Add</button>              
              </div>
            </div>
        </div>
      </div>    
      <div class = "col-md-12 col-detail">
        <div class = "row sub-title">Deal Notes</div>
        <div class = "row detail-panel">          
          <b-form-textarea id="textarea1" class = "form-group editable"
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
          <b-form-textarea id="textarea1" class = "form-group editable"
                     v-model = "selectedRecord.importantNotes"
                     placeholder="Enter something"
                     :rows="3"
                     :no-resize="true"
                     :max-rows="3">
          </b-form-textarea>          
        </div>
      </div>
      <div class = "col-md-12" style = "text-align:right;">
        <button type="button" id="btnEdit" class="btn btn-success btn-small form-group editable" @click="setEditFields(true)">Edit</button>
        <button type="button" id="btnSave" class="btn btn-success btn-small form-group editable" @click="saveRecord()">Save</button>
      </div>
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
  name: 'ViewDetail',
  created() {
    this.selectedIndex = -1;    
    this.records = this.$ls.get('records');        
    let self = this;
    $(document).ready(function(){      
      self.selectedIndex = self.$route.params.id - 1;
      $(".detail-date input").attr("disabled", "");  
      self.setEditFields(false);      
    });    
  },
  computed: {
  },
  components: {
    LoadingModal,
    Datepicker
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
            invoices: '[]'
          } 
          this.invoiceList = [];         
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
         
        this.selectedIndex == 0 ? $(".btn-previous").attr("disabled", "") : $(".btn-previous").removeAttr("disabled");
        this.selectedIndex == this.records.length - 1 ? $(".btn-next").attr("disabled", "") : $(".btn-next").removeAttr("disabled");    
        console.log(this.selectedRecord);
        if(this.selectedRecord.invoices == null || this.selectedRecord.invoices == "") this.invoiceList = [];        
        else this.invoiceList = JSON.parse(this.selectedRecord.invoices);

        this.selectedRecord.in
        let keys = Object.keys(this.selectedRecord);   
        let self = this;   
        keys.forEach(function(key){
          if(self.selectedRecord[key] == null)
            self.selectedRecord[key] = "";
        });
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
        invoices: '[]'
      },        
      file: null,
      invoiceList: {},
      invoiceDeleteFlag: false,
      selectedIndex: -1,
      records: [],
      issueDate: '2017-12-12',
      expireDate: '2017-12-12',
      selectedCustomStatus: 'new',
      customStatus: [
        { value: '', text: 'N/A' },
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
    uploadInvoices() {     
      // $('#upload_file').click(); 
      if(this.file == null) return;
      this.$store.dispatch('setLoadingFlag', 'flex');
      this.$store.dispatch('setLoadingText', 'Updating...');                              
      this.$store.dispatch('uploadFile', {"file": this.file, "license_id": this.selectedRecord.license_id})
        .then((response) => {          
          this.$store.dispatch('setLoadingFlag', 'none');
          let invoice = {"date": response.date, "file_name": response.file_name};         
          this.invoiceList.push(invoice);  
          console.log(this.invoiceList);        
        }).catch((error) => {    
          this.$store.dispatch('setLoadingFlag', 'none');
          console.log('Error'); 
          console.log(error);   
        }
      ) 
    },
    deleteInvoice(index) {
      this.invoiceList.splice(index, 1);
    },
    invoiceURL(fileName) {
      window.open("https://s3.amazonaws.com/license-tool/" + this.selectedRecord.license_id + "/" + fileName);
    },
    saveRecord() {
      this.setEditFields(false);
      this.selectedRecord.invoices = JSON.stringify(this.invoiceList);
      this.$store.dispatch('setLoadingFlag', 'flex');
      this.$store.dispatch('setLoadingText', 'Updating...');
      console.log(this.selectedRecord);
      this.$store.dispatch('updateRecord', this.selectedRecord)
        .then((response) => {          
          this.$store.dispatch('setLoadingFlag', 'none');
          console.log('Success');      
        }).catch((error) => {    
          this.$store.dispatch('setLoadingFlag', 'none');
          console.log('Error');    
        }
      )     
    },
    setEditFields(flag) {
      this.invoiceDeleteFlag = flag;
      if(flag) {
        $(".editable").removeAttr("disabled");        
        $(".file-chooser input").removeAttr("disabled");        
        $(".file-chooser span").removeAttr("disabled");        
        $("#btnSave").removeAttr("disabled");
        $("#btnEdit").attr("disabled", "");
      } else {
        $(".editable").attr("disabled", "");                
        $(".file-chooser input").attr("disabled", "");        
        $(".file-chooser span").attr("disabled", "");         
        $("#btnSave").attr("disabled", "");
        $("#btnEdit").removeAttr("disabled");
      }      
    },
    gotoPrevious() {
      this.file = null;
      this.selectedIndex--;
      this.setEditFields(false);
    },
    gotoNext() {
      this.file = null;
      this.selectedIndex++;
      this.setEditFields(false);
    },  
    customFormatter(date) {
      return moment(date).format('MM-DD-YYYY');
    }  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
