const Discord= require ("discord.js");
const Mobile_suit=require("Mobile_suit.js");

const m_proto=new Mobile_suit()

exports.run=(bot,msg,params=[])=>{
  var print;
  var obj;
  m_proto.search_ALLMobileSuits(msg.author.id,(err,data)=>{
    if(err){
      console.log(err)
    }
    else{
       print=data;
    }
    msg.channel.send("```json\n"+print+"```")
  });
}
exports.conf = {
  enabled: true,
  aliases: ["SHOW SUITS"],
  permLevel: 0
};

exports.help = {
  name: "SHOW ME MY SUITS",
  discription: "Displays mobile suit owned by the user issuing the command",
  usage: "SHOW ME MY SUITS"
};
