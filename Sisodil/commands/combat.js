const Discord= require ("discord.js");
const Mobile_suit=require("Mobile_suit.js");
////////////////////////////////////////////
// work in progress.
////////////////////////////////////////////
const m_proto=new Mobile_suit()
exports.run=(bot,msg,params=[])=>{
  const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 30000 });
  console.log(collector);

  var player_1=msg.author.id;
  var player_2;
  var ok=true;

  msg.channel.send("Tag the pilot you want to challenge.")
  collector.on('collect', msg=>{
    if(ok){
      console.log(msg.content);
      //take the user id and slice away fluff reviewed in console log
      //format: <@userid>
      player_2=msg.content.slice(2,-1);

      m_proto.initiate_combat(player_1,player_2);
      ok=false;
    }
  });
}
exports.conf = {
  enabled: true, // not used yet
  aliases: [],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "COMBAT",
  description: "Initiate combat with another lamo",
  usage: "COMBAT"
};
