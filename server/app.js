const express    = require('express'),
      app        = express(),
      http       = require('http').Server(app),
      cors       = require('cors'),
      bodyParser = require("body-parser"),
      path       = require('path'),
      mime       = require('mime-types'),
      moment     = require('moment'), 
      mysql      = require('mysql'),
      formidable = require('formidable'),
      fs         = require('fs');
const AWS = require('aws-sdk');
let connectionRead, connectionWrite;
let res;
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors())
app.use(express.static(path.join(__dirname, '../dist')));
app.use("/", express.static(__dirname + "/"));

AWS.config.update({accessKeyId: 'AKIAJIOEWEUWILDXYKPQ', secretAccessKey: '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'});
AWS.config.update({region: 'us-west-2'});
const s3 = new AWS.S3();
connectionRead = mysql.createConnection({
  host     : 'agiletestware.cni62heuz5ld.us-west-2.rds.amazonaws.com',
  user     : 'readonly',
  password : '!yX<9J~e',
  database : 'license4jdb'
});

connectionWrite = mysql.createConnection({
  host     : 'licensetool.cukwihlqrtiq.us-east-1.rds.amazonaws.com',
  user     : 'agiletestware82',
  password : 'Goliath1!',
  database : 'licensetool'
});

connectionRead.connect(function(err) {
  if (err) {
    console.log("Connection Readable Database Error");
    return;
  }
  console.log("Connected Readonly Database!");  
});

connectionWrite.connect(function(err) {
  if (err) {
    console.log("Connection Writeable Database Error");
    return;
  }
  console.log("Connected Writeable Database!");  
});

// Desktop requests
app.get('/', function(req, res) {    
    res.sendFile(path.resolve(__dirname, '../dist/index.html')); 
});

app.get('/importLicenseData', function(req, res) {       
  this.res = res;
  getMaxID();      
});
app.options('/uploadFile', function(req, res) {        
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081');  
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS, HEAD');
  res.send();  
});
app.post('/uploadFile', function(req, res) {    
  this.res = res;
  let fileName = '', contentType = ''; 
  let licenseID = 0;
  let data = req.body;  
  var form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, '/uploads');    
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));    
    fileName = file.name;        
  });
  
  form.on('error', function(err) {   
    console.log(err); 
  });  
  form.on('end', function() { 
    console.log('End');
    contentType = mime.lookup(path.join(__dirname, '/uploads/' + fileName));
    console.log(contentType);
    uploadS3(fileName, licenseID, contentType);
  });   
  form.parse(req, function(err, fields, files) {
    if(fields.hasOwnProperty('license_id')) {
      licenseID = fields.license_id; 
      uploadS3(fileName, licenseID, contentType);         
    }
  });
});

app.get('/getRecords/:filterCondition/:sortCondition', function(req, res) { 
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081');  
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS, HEAD');     
  let filter = JSON.parse(req.params.filterCondition);  
  let sort = JSON.parse(req.params.sortCondition);    
  let sql = "SELECT * FROM licenses";
  if(filter != null) {
    sql += " where ";  
    if(filter.products.length > 0)
      sql += "productName in ('" + filter.products.join("','") + "') and ";  
    if(filter.licenseType.length > 0)
      sql += "licenseType in ('" + filter.licenseType.join("','") + "') and ";
    if(filter.customerStatus.length > 0)
      sql += "customerStatus in ('" + filter.customerStatus.join("','") + "') and ";
    if(!filter.archive)
      sql += "licenseState = 'active' and ";
    sql += "expireDate >= '" + filter.startExpireDate + "' and expireDate <= '" + filter.endExpireDate + "' and ";
    sql += "dealValue >= " + filter.minDeal + " and dealValue <= " + filter.maxDeal;
  }  
  sql += " ORDER BY " + sort.field + " " + sort.order;  
  connectionWrite.query(sql, function(err, result) {
    if(err) {      
      console.log("Error: " + this.sql);
      return;
    }
    const today = moment(new Date());
    result.forEach(function(item, index){
      const expireDate = moment(item.expireDate);
      item.accountsPayable = item.accountsPayable != null ? item.accountsPayable.toString('binary') : "";
      item.dealNotes = item.dealNotes != null ? item.dealNotes.toString('binary') : "";
      item.importantNotes = item.importantNotes != null ? item.importantNotes.toString('binary') : "";      
      item.issueDate = moment(item.issueDate).format("YYYY-MM-DD");
      item.expireDate = expireDate.format("YYYY-MM-DD");
      if(item.updateDate != null && item.updateDate != '')
        item.updateDate = moment(item.updateDate).format("YYYY-MM-DD");
      else 
        item.updateDate = '';
      var duration = moment.duration(expireDate.diff(today)).asDays();
      if(duration < 0)
        item.expireState = 0;
      else if(duration <= 30)
        item.expireState = 1;
      else item.expireState = 2;            
    });        
    res.send(result);
  });  
});

app.options('/updateRecord', function(req, res) {        
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
  //res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS, HEAD');
  res.send();  
});

app.put('/updateRecord', function(req, res) { 
  let updateDate = moment(new Date()).format("YYYY-MM-DD");     
  let data = req.body;
  console.log(data);
  let sql = "update licenses set userCompany = '" + data.userCompany + "', ";
  sql += "licenseType = '" + data.licenseType + "', ";
  sql += "dealValue = '" + data.dealValue + "', ";
  sql += "userFullName = '" + data.userFullName + "', ";
  sql += "userEMail = '" + data.userEMail + "', ";
  sql += "licenseURL = '" + data.licenseURL + "', ";
  sql += "freshsalesURL = '" + data.freshsalesURL + "', ";
  sql += "customerStatus = '" + data.customerStatus + "', ";
  sql += "licenseState = '" + data.licenseState + "', ";
  sql += "accountsPayable = '" + data.accountsPayable + "', ";
  sql += "dealNotes = '" + data.dealNotes + "', ";
  sql += "updateDate = '" + updateDate + "', ";
  sql += "invoices = '" + data.invoices + "', ";
  sql += "importantNotes = '" + data.importantNotes + "' where license_id = " + data.license_id;  
  connectionWrite.query(sql, function (err, result) {
    if (err) {
      res.send({'error': true});
      return;
    }
    res.send({'error': false});
  });  
});

app.options('/updateLicenseState', function(req, res) {        
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081');  
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS, HEAD');
  res.send();  
});

app.put('/updateLicenseState', function(req, res) {  
  let updateDate = moment(new Date()).format("YYYY-MM-DD");
  let data = req.body;
  let sql = "update licenses set licenseState = '" + data.licenseState + "', updateDate = '" + updateDate + "' where license_id = " + data.license_id;
  connectionWrite.query(sql, function (err, result) {
    if (err) {
      console.log("Error: " + this.sql);
      res.send({'error': true});
      return;
    }
    res.send({'error': false});
  });
});

app.delete('/deleteSQLData', function(req, res) {    
  let sql = "TRUNCATE licenses";
  connectionWrite.query(sql, function (err, result) {
    if (err) {
      res.send({'error': true});
      return;
    }
    res.send({'error': false});
  });
});

app.delete('/deleteS3Data', function(req, res) { 
  this.res = res;   
  clearBucket(s3, 'license-tool');
  console.log("Delete All Items");
});

function uploadS3(fileName, licenseID, contentType) {  
  const myBucket = 'license-tool/' + licenseID;  
  const signedUrlExpireSeconds = 60 * 5
  let self = this;
  if(fileName == '' || licenseID == 0) return;
  const url = s3.getSignedUrl('getObject', {
      Bucket: myBucket,
      Key: fileName,
      Expires: signedUrlExpireSeconds
  })  
  console.log(fileName + "   " + licenseID);
  fs.readFile(path.join(__dirname, '/uploads/' + fileName), function (err, data) {
    if (err) { throw err; }
    
    var base64data = new Buffer(data, 'binary');          
    s3.putObject({
      Bucket: myBucket,
      Key: fileName,
      Body: base64data,
      ContentType: contentType,
      ACL: 'public-read'
    },function (resp) {
      self.res.send({"error":false, "file_name": fileName, "date": moment(new Date()).format("YYYY-MM-DD")});
    });
  
  });
}
function getMaxID() {
  connectionWrite.query("SELECT MAX(license_id) as licenseID from licenses", function(err, result) {
    if (err) throw err;      
    var maxID = 0; 
    if(result[0].licenseID != null)
      maxID = result[0].licenseID;
    getNewRecords(maxID, res);    
  });
}

function getNewRecords(maxID) {
  var self = this;    
  connectionRead.query("SELECT L.licenseID as license_id, L.userFullName, L.userEMail, L.userCompany, L.userRegisteredTo, L.validityPeriod, P.productName FROM licenses as L JOIN products as P on P.productid = L.productid where L.licenseID > " + maxID + " order by L.licenseID", function(err, result) {
    if (err) throw err; 
    var newRecords = [];
    result.forEach(function(item){
      var record = new Array();
      if(item.productName == "eggplant-alm" || item.productName == "eggplant") {
        item.licenseType = "eggplant";
        item.productName = "eggplant";
        if(item.userFullName == null || item.userFullName == '')
          item.userFullName = 'Eggplant';
        if(item.userEMail == null || item.userEMail == '')
          item.userEMail = 'no-reply@eggplant.com';
        if(item.userCompany == null || item.userCompany == '')
          item.userCompany = 'Testplant';
      } else if(item.userRegisteredTo == "evaluation" || item.userRegisteredTo == "Evaluation")
       item.licenseType = "evaluation";
      else if(item.userRegisteredTo == "paid" || item.userRegisteredTo == "Paid")
        item.licenseType = "basic";
      else if(item.userRegisteredTo == "enterprise" || item.userRegisteredTo == "Enterprise")
        item.licenseType = "enterprise";
      else item.licenseType = "";
      let issueDate = new Date(item.license_id);            
      issueDate = moment(issueDate).format("YYYY-MM-DD");
      
      let expireDate = new Date(issueDate);
      expireDate.setDate(expireDate.getDate() + item.validityPeriod);
      expireDate = moment(expireDate).format("YYYY-MM-DD");
      item.issueDate = issueDate;
      item.expireDate = expireDate;

      var keys = Object.keys(item);      
      keys.forEach(function(key){
        record.push(item[key]);
      });                  
      newRecords.push(record);
    })
    
    if(newRecords.length == 0) {      
      self.res.send({'error': false, 'numbers': 0});
      console.log('New Records');
      return;
    }    
    var sql = "INSERT INTO licenses (license_id, userFullName, userEMail, userCompany, userRegisteredTo, validityPeriod, productName, licenseType, issueDate, expireDate) VALUES ?";
    connectionWrite.query(sql, [newRecords], function (err, result) {      
      if (err) {
        self.res.send({'error': true});
        return;
      }
      self.res.send({'error': false, 'numbers': result.affectedRows});
      console.log("Number of records inserted: " + result.affectedRows);      
    });
  }); 
}

function fetchRecords() {
  var self = this; 
  connectionWrite.query("SELECT * FROM licenses", function(err, result) {
    if (err) {
      console.log("Error: " + this.sql);
      return;
    }  
    
    result.forEach(function(item, index){
      item.accountsPayable = item.accountsPayable != null ? item.accountsPayable.toString('binary') : "";
      item.dealNotes = item.dealNotes != null ? item.dealNotes.toString('binary') : "";
      item.importantNotes = item.importantNotes != null ? item.importantNotes.toString('binary') : "";      
    });    
    self.res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
    self.res.header('Access-Control-Allow-Credentials', true);
    self.res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS, HEAD');
    
  });
}

function deleteObject (client, deleteParams) {
  client.deleteObject(deleteParams, function (err, data) {
      if (err) {
          console.log("delete err " + deleteParams.Key);
          self.res.send({'error': true});
      } else {
          console.log("deleted " + deleteParams.Key);
      }
  });
}
function deleteBucket (client, bucket) {
  client.deleteBucket({Bucket: bucket}, function (err, data) {
      if (err) {
          console.log("error deleting bucket " + err);
          self.res.send({'error': true});          
      } else {
          console.log("delete the bucket " + data);
      }
  });
}
function clearBucket (client, bucket) {
  var self = this;
  client.listObjects({Bucket: bucket}, function (err, data) {
      if (err) {
          console.log("error listing bucket objects "+err);
          self.res.send({'error': true});
          return;
      }
      var items = data.Contents;
      for (var i = 0; i < items.length; i += 1) {
          var deleteParams = {Bucket: bucket, Key: items[i].Key};
          deleteObject(client, deleteParams);
      }
  });
  let sql = "UPDATE licenses set invoices = " + null;
  connectionWrite.query(sql, function (err, result) {
    if (err) {
      console.log(this.sql);
      self.res.send({'error': true});
      return;
    }
    self.res.send({'error': false});
  });
}

http.listen(8080, function(){
	console.log("Connected & Listen to port 8080");
});
