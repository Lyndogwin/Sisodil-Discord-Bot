const mysql = require('mysql');
const config = require("config.json")
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: config.mysqlpass,
  database: config.mysqlbase,
  insecureAuth: true
});
con.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  var drop=("DROP TABLE mobile_suits");
  con.query(drop, (err, result)=>{
    if (err) throw err;
    console.log("mobile_suits dropped")
  });
});
process.on('uncaughtException', (err)=> {
    console.log(err);
});
