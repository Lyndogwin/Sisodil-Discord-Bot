const Discord= require ("discord.js");
const mysql = require('mysql');

class Mobile_suit{

  constructor(id,model,strength,speed) {
    //general constructor with database connection
    this.con= mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '5678',//interchangable
      database: 'sisodil',//interchangable
      insecureAuth: true
    });

    this.id=id
    this.model=model
    this.strength =strength
    this.speed=speed
  }

  ////////////////////////////////////////
  //the following function is dedicated //
  //to adding mobile suit specs to the  //
  //mobile_suits database               //
  ////////////////////////////////////////
  add_MobileSuit(){
    this.con.connect((err)=>{
      var row="INSERT INTO mobile_suits(id, model, strength, speed)VALUES('"+this.id+"',"+"'"+this.model+
                                                                         "',"+this.strength+","+this.speed+")"

      this.con.query(row, (err, result)=>{
        if (err) throw err;
        console.log("row inserted")
      })
    })
  }

  ///////////////////////////////////////
  //the following function is untested //
  //but should work                    //
  ///////////////////////////////////////
  change_Model(id,model_1,model_2){
    this.con.connect((err)=>{
      var row="INSERT INTO mobile_suits(model)VALUES('"+model_2+"') WHERE model='"+model_1+"'"

      this.con.query(row, (err, result)=>{
        if (err) throw err;
        console.log("\nmodel changed for id: "+id+
        "\n                            Model: "+model_1)
      })
    })
  }

  ////////////////////////////////////////////////////////////////////
  //the follwing function needs to be repaired so that it returns a //
  //string with the selection resuts that would be printed to the   //
  //console.                                                        //
  ////////////////////////////////////////////////////////////////////
  //current error: UnhandledPromiseRejectionWarning: Unhandled promise rejection.
  //This error originated either by throwing inside of an async function without a catch block,
  //or by rejecting a promise which was not handled with .catch().
  search_ALLMobileSuits(id){
    this.con.connect((err)=>{
      var select="SELECT * FROM mobile_suits WHERE id='"+id+"'"
      this.con.query(select, (err, rows, fields)=>{
        console.log(rows)
        return rows;
      })
    })
  }
}
module.exports=Mobile_suit;
