const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5678',
  database: 'sisodil',
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
