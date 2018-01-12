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
                  label="Company:"
                  label-class="text-sm-right"
                  label-for="detailCompany">
                  <b-form-input id="detailCompany"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Issue Date:"
                  label-class="text-sm-right"
                  label-for="detailIssueDate">
                  <b-form-input id="detailIssueDate"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Expiry Date:"
                  label-class="text-sm-right"
                  label-for="detailExpireDate">
                  <b-form-input id="detailExpireDate"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="License Type:"
                  label-class="text-sm-right"
                  label-for="detailLicenseType">
                  <b-form-input id="detailLicenseType"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Product:"
                  label-class="text-sm-right"
                  label-for="detailProduct">
                  <b-form-input id="detailProduct"></b-form-input>
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
                  <b-form-input id="detailContactName"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Contact Email::"
                  label-class="text-sm-right"
                  label-for="detailContactEmail">
                  <b-form-input id="detailContactEmail"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="License URL:"
                  label-class="text-sm-right"
                  label-for="detailLicenseURL">
                  <b-form-input id="detailLicenseURL"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Freshsales URL:"
                  label-class="text-sm-right"
                  label-for="detailFreshsalesURL">
                  <b-form-input id="detailFreshsalesURL"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                 <b-form-group horizontal
                  label="Renew Status:"
                  label-class="text-sm-right"
                  label-for="detailRenew">
                  <b-form-input id="detailRenew"></b-form-input>
                </b-form-group>
              </div>
              <div class = "col-md-12">
                <b-form-group horizontal
                  label=""
                  label-class="text-sm-right"
                  label-for="">
                  <button type="button" class="btn btn-success btn-renew-license">Renew License</button>
                  <button type="button" class="btn btn-success btn-unrenew-license ">un-renew License</button>
                </b-form-group>
              </div class>
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
          <div class = "row sub-title">Purchase Orders</div>
          <div class = "row detail-panel">
            <div class = "col-md-12">12/1/17: In-4087.pdf</div>
            <div class = "col-md-12">12/1/17: In-4087.pdf</div>
            <button type="button" class="btn btn-success btn-small form-group">Add</button>
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
          <div class = "row sub-title">Purchase Orders</div>
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
                     v-model="payableContent"
                     placeholder="Enter something"
                     :rows="3"
                     :no-resize="true"
                     :max-rows="3">
          </b-form-textarea>          
        </div>
      </div>
      <div class = "col-md-12 col-detail">
        <div class = "row sub-title">Raw License4j Data</div>
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
        <button type="button" class="btn btn-success btn-small form-group">Edit</button>
        <button type="button" class="btn btn-success btn-small form-group">Save</button>
      </div>
    </div>
  </div>  
</template>
<script>

export default {
  name: 'ViewDetail',
  created() {
    // console.log(this.$route.params.id);
  },
  methods: {
    backToHome() {
      
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      payableContent: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
