const Discord= require ("discord.js");
const mysql = require('mysql');

class Mobile_suit{

  constructor(id,model,hp,defense,strength,speed) {
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
    this.hp=hp
    this.defense=defense
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
      var row="INSERT INTO mobile_suits(id, model, hp, defense, strength, speed)VALUES('"+this.id+"',"+"'"+this.model+
                                                                         "',"+this.hp+","+this.defense+","+this.strength+","+this.speed+")"

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
  //string with similar selection resuts to those that would be     //
  //to the console.                                                 //
  ////////////////////////////////////////////////////////////////////
  //successfully called fucntion
  //but it is giving me an ugly Object to JSON string
  //in a format that is straining to read
  //see if statement taged @search_AllMobileSuits
  //in the primary bot file sisodil.js
  search_ALLMobileSuits(id,callback){
    var select="SELECT * FROM mobile_suits WHERE id='"+id+"'"
    this.con.query(select,(err, results)=>{
      if (err) callback(err,null);
      else callback(null, JSON.stringify(results)); console.log(results);
    })
  }
}
module.exports=Mobile_suit;

/*
function callback() {
    alert("I am in the callback!");
}

function work(func) {
    alert("I am calling the callback!");
    func();
}

work(callback);
*/
