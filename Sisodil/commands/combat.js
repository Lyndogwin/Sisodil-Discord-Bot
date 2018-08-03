const Discord= require ("discord.js");
const Mobile_suit=require("Mobile_suit.js");
const config=require("config.json")
////////////////////////////////////////////
// work in progress.
////////////////////////////////////////////
const m_proto=new Mobile_suit()
exports.run=(bot,msg,params=[])=>{
  const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 30000 });
  console.log(collector);

  var player_1=msg.author.id;
  var player_2;
  var suits=[];
  var queue=[];
  var ok=true;
  var check=false;

  msg.channel.send("Tag the pilot you want to challenge.")
  collector.on('collect', msg=>{
    if(ok){
      console.log(msg.content);
      //take the user id and slice away fluff reviewed in console log
      //format: <@userid>
      player_2=msg.content.slice(2,-1);

      m_proto.initiate_combat(player_1,player_2,bot,(err,data)=>{
        if (err){
          console.log(err);
        }
        else{
          suits=data;
        }
        console.log(suits);
        ok=false;
        check=true;
      });

    }
    if(check) return;
  });

  bot.on('message', msg=>{
    // populate queue for combat based on speed
    if(msg.content.toUpperCase()==config.prefix+"FORM"){//haha

      if(suits[0].speed>suits[1].speed){
        queue[0]=player_1;
        queue[1]=player_2;
      }
      else{
        queue[0]=player_2;
        queue[1]=player_1;
      }
    }
    // check turn priority and allow user to attack
    if(msg.author.id==queue[1] && msg.content.toUpperCase()==config.prefix+"ATTACK"){
      console.log("Attacking!");
      queue.push(queue[0]);
      queue.shift();
      console.log(queue[1])
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

/*
damage=((suit_1.strength-suit_2.defense)*0.5)-(suit_2.speed*0.01);
damage=((suit_2.strength-suit_2.defense)*0.5)-(suit_1.speed*0.01);
*/
