var express    = require('express'),
    app        = express(),
    http       = require('http').Server(app),
    bodyParser = require("body-parser"),
    path = require('path'),
    mysql      = require('mysql');

var connectionRead, connectionWrite;
var res;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')));
app.use("/", express.static(__dirname + "/"));

// Desktop requests
app.get('/', function(req, res) {    
    res.sendFile(path.resolve(__dirname, '../dist/index.html')); 
});

app.get('/getNewRecords', function(req, res) {    
  this.res = res;
  getMaxID();      
});

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
  if (err) throw err;
  console.log("Connected Readonly Database!");  
});

connectionWrite.connect(function(err) {
  if (err) throw err;
  console.log("Connected Writeable Database!");  
});

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
  connectionRead.query("SELECT L.licenseID as license_id, L.userFullName, L.userEMail, L.userCompany, L.userRegisteredTo, P.productName FROM licenses as L JOIN products as P on P.productid = L.productid where L.licenseID > " + maxID + " order by L.licenseID", function(err, result) {
    if (err) throw err; 
    var newRecords = [];
    result.forEach(function(item){
      var record = new Array();
      var keys = Object.keys(item);
      keys.forEach(function(key){
        record.push(item[key]);
      });      
      newRecords.push(record);
    })  
    if(newRecords.length == 0) {
      fetchRecords();
      return;
    }
    // self.res.send(result);
    var sql = "INSERT INTO licenses (license_id, userFullName, userEMail, userCompany, userRegisteredTo, productName) VALUES ?";
    connectionWrite.query(sql, [newRecords], function (err, result) {      
      if (err) {
        console.log(this.sql);
        return;
      }
      console.log("Number of records inserted: " + result.affectedRows);
      fetchRecords();
    });
  }); 
}

function fetchRecords() {
  var self = this; 
  connectionWrite.query("SELECT * FROM licenses", function(err, result) {
    if (err) {
      console.log(this.sql);
      return;
    }      
    self.res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
    self.res.header('Access-Control-Allow-Credentials', true);
    self.res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS, HEAD');
    self.res.send(result);
  });
}

http.listen(8080, function(){
	console.log("Connected & Listen to port 8080");
});
