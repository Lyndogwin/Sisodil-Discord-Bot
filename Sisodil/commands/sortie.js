const Discord= require ("discord.js");
const Mobile_suit=require("Mobile_suit.js");

const m_proto=new Mobile_suit();
exports.run=(bot,msg,params=[])=>{
  const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 30000 });
  console.log(collector);

  var id=msg.author.id;
  var ok=true;

  //  print suits
  var print;
  m_proto.search_ALLMobileSuits(id,(err,data)=>{
    if(err){
      console.log(err);
    }
    else{
       print=data;
    }
    msg.channel.send("```json\n"+print+"```")
  });
  //----------------------------------------
  //  dialog
  msg.channel.send("Which suit would you like to pilot?\n Specify model.")
  collector.on('collect', msg=>{
    message=msg.content.toUpperCase();
    if (ok){
      var model=message;
      m_proto.pilot_suit(msg.author.id,model);
      ok=false;

      msg.channel.send("You are now piloting "+model);
    }
  })
}
exports.conf={
  enabled: true,
  aliases: [],
  permLevel: 0
};
exports.help={
  name: "SORTIE",
  description:"",
  usage: "SORTIE"
}
