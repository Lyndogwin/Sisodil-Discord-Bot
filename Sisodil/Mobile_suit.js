const Discord= require ("discord.js");
const mysql = require('mysql');

class Mobile_suit{
  constructor(id,model,strength,speed){

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
  search_ALLMobileSuits(id){
    this.con.connect((err)=>{
      var select="SELECT * FROM mobile_suits WHERE id='"+id+"'"
      this.con.query(select, (err, result)=>{
        console.log("Data selected")
      })
    })
  }
}

module.exports=Mobile_suit;
