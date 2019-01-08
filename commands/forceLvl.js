const Discord= require ("discord.js");
const Mobile_suit=require("Mobile_suit.js");

const m_proto=new Mobile_suit()
exports.run=(bot,msg,params=[])=>{
  m_proto.lvlUp(msg.author.id,(err,data)=>{
    var print;
    if (err) console.log(err);
    else{
      print = data
      msg.channel.send("```json\n"+print+"```");
    }
  })
}
exports.conf={
  enabled:true,
  aliases:["STRIVE FOR PERFECTION"],
  permLevel:0
}
exports.help={
  name:"FORCE LEVEL",
  description: "Assend toward godhood",
  usage: "FORCE LEVEL"
}