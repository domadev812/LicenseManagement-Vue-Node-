<template>
  <div class="container view-detail">
    <div class = "row">
      <div class = "col-md-12">
        <button type="button" class="btn btn-success btn-back-results" @click="backToHome()"><i class = "fa fa-angle-left"></i>&nbsp;&nbsp;Back to Search Results</button>
        <div class ="btn-group-move">
          <button type="button" class="btn btn-success"><i class = "fa fa-angle-left"></i>&nbsp;&nbsp;Previous Record</button>
          <button type="button" class="btn btn-success">Next Record&nbsp;&nbsp;<i class = "fa fa-angle-right"></i></button>
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
                  <b-form-input id="detailLicenseID" value = "License ID"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Company:"
                  label-class="text-sm-right"
                  label-for="detailCompany">
                  <b-form-input id="detailCompany"  value = "Google"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Issue Date:"
                  label-class="text-sm-right"
                  label-for="detailIssueDate">
                  <b-form-input id="detailIssueDate" :type="'date'" v-model="issueDate"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Expiry Date:"
                  label-class="text-sm-right"
                  label-for="detailExpireDate">
                  <b-form-input id="detailExpireDate"  :type="'date'" v-model="expireDate"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="License Type:"
                  label-class="text-sm-right"
                  label-for="detailLicenseType">
                  <b-form-select id = "detailLicenseType"  v-model="selectedType" :options="licenseType">
                  </b-form-select>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Product:"
                  label-class="text-sm-right"
                  label-for="detailProduct">
                  <b-form-select id = "detailProduct" v-model="selectedProduct" :options="products">
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
                  <b-form-input id="detailContactName" value = "Bill Smith"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Contact Email:"
                  label-class="text-sm-right"
                  label-for="detailContactEmail">
                  <b-form-input id="detailContactEmail" value = "bsmith@foo.com"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="License URL:"
                  label-class="text-sm-right"
                  label-for="detailLicenseURL">
                  <b-form-input id="detailLicenseURL" value = "https://aws.com/s3/23423.14j"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Freshsales URL:"
                  label-class="text-sm-right"
                  label-for="detailFreshsalesURL">
                  <b-form-input id="detailFreshsalesURL" value = "https://freshsales.com/deals/23423.14j"></b-form-input>
                  </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Customer Status:"
                  label-class="text-sm-right"
                  label-for="detailCustomStatus">
                  <b-form-select id = "detailCustomStatus" v-model="selectedCustomStatus" :options="customStatus">
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
                      v-model="payableContent"
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
          <div class = "row sub-title">License Status</div>
          <div class = "row detail-panel">          
            <div class = "col-md-12">
              <b-form-group horizontal
                label="Status:"
                label-class="text-sm-right"
                label-for="detailLicenseStatus">
                  <b-form-select id = "detailLicenseStatus" v-model="selectedLicenseStatus" :options="licenseStatus" class="mb-3">
                  </b-form-select>
              </b-form-group>
            </div>
            <div class = "col-md-12">
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
        </div>
      </div> 
      <div class = "col-md-12 col-detail">
        <div class = "row">
          <div class = "col-md-4 col-sm-4 col-xs-12">
            <div class = "content-panel">
              <div class = "row sub-title">Invoices</div>
              <div class = "row detail-panel">
                <div class = "col-md-12">12/1/17: In-4087.pdf</div>
                <div class = "col-md-12">12/1/17: In-4087.pdf</div>
                <button type="button" class="btn btn-success btn-small form-group">Add</button>
              </div>
            </div>
          </div>
          <div class = "col-md-4 col-sm-4 col-xs-12">
            <div class = "content-panel">
              <div class = "row sub-title">Quotes</div>
              <div class = "row detail-panel">
                <div class = "col-md-12">12/1/17: In-4087.pdf</div>
                <div class = "col-md-12">12/1/17: In-4087.pdf</div>
                <button type="button" class="btn btn-success btn-small form-group">Add</button>
              </div>
            </div>
          </div>
          <div class = "col-md-4 col-sm-4 col-xs-12">
            <div class = "content-panel">
              <div class = "row sub-title">Purchase Orders</div>
              <div class = "row detail-panel">
                <div class = "col-md-12">12/1/17: In-4087.pdf</div>
                <div class = "col-md-12">12/1/17: In-4087.pdf</div>
                <button type="button" class="btn btn-success btn-small form-group">Add</button>
              </div>
            </div>
          </div>
        </div>        
      </div>                
      <div class = "col-md-12 col-detail">
        <div class = "row sub-title">Important Notes</div>
        <div class = "row detail-panel">          
          <b-form-textarea id="textarea1" class = "form-group"
                     v-model="payableContent"
                     placeholder="Enter something"
                     :rows="3"
                     :no-resize="true"
                     :max-rows="3">
          </b-form-textarea>          
        </div>
      </div>
      <div class = "col-md-12" style = "text-align:right;">
        <button type="button" id="btnEdit" class="btn btn-success btn-small form-group" @click="setEditFields(true)">Edit</button>
        <button type="button" id="btnSave" class="btn btn-success btn-small form-group">Save</button>
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
    this.selectedIndex = this.$route.params.id;
    console.log(this.selectedIndex);
    let self = this;
    $(document).ready(function(){
      self.setEditFields(false);
    });    
  },
  computed: {
    ...mapGetters({
      records: 'getRecords'
    })
  },
  watch: {
    selectedIndex: {      
      handler () {   
        if(this.records.length > 0)
        {
          this.selectedRecord = this.records[this.selectedIndex];
        }
      }
    },
    records: {
      handler () {
        if(this.records.length > 0 && selectedIndex != -1) {
          this.selectedRecord = this.records[this.selectedIndex];
        }
      }
    }
  },
  data () {
    return {
      selectedRecord:{},
      selectedIndex: -1,
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
        { value: 'Enterprise', text: 'Enterprise' },
        { value: 'Basic', text: 'Basic' }
      ],
      selectedLicenseStatus: 'TODO',
      licenseStatus: [
        { value: 'TODO', text: 'TODO' },
        { value: 'Email Sent', text: 'Email Sent' },
        { value: 'Multiple Emails', text: 'Multiple Emails' }
      ],
      selectedProduct: 'Bumblebee',
      products: [
        { value: 'Bumblebee', text: 'Bumblebee' },
        { value: 'Eggplant-alm', text: 'Eggplant-alm' },
        { value: 'Dragonfly', text: 'Dragonfly' },
        { value: 'Firefly', text: 'Firefly' },
        { value: 'Pangolin', text: 'Pangolin' }
      ],
      renewStatus: 'Renewed',
      licenseState: 'not_accepted',
      payableContent: ''
    }
  },
  methods: {
    backToHome() {
      this.$router.go(-1);
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
        $("#btnSave").attr("disabled", "");
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
