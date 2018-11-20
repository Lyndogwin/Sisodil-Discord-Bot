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
  var damage;
  var suits=[];
  var queue=[];
  var hp_total=[];
  var index=0;
  var ok=true;
  var check=false;
  var combat=true;

  msg.channel.send("Tag the pilot you want to challenge.")
  collector.on('error', console.error);
  collector.on('collect', msg=>{
    if(ok){// this if prevents repeat of previous code
      console.log(msg.content);
      try{
        //take the user id and slice away fluff reviewed in console log
        //format: <@userid>
        player_2=msg.content.slice(2,-1);
        //run player IDs through the iniatet combat function
        m_proto.initiate_combat(player_1,player_2,bot,(err,data)=>{
          if (err){
            console.log(err);
          }
          else{
            suits = data;
          }
          msg.channel.send("\nModel: "+suits[0].Model+
                           "\nLVL:   "+suits[0].Lvl+
                           "\n              vs"+
                           "\nModel: "+suits[1].Model+
                           "\nLVL:   "+suits[1].Lvl+"\n\n");
          msg.channel.send("\n\nUse the command '->form' to enter attacking phase.");
          console.log(suits);
          ok=false;// this flag prevents repeat of previous code
          check=true;
        });
      }
      catch(e){
        console.log(e);
      }
    }//end if
    if(check) return;
  });

  if(combat){
    bot.on('error', console.error);
    bot.on('message', msg=>{
      // populate queue for combat based on speed
      if(check &&  msg.content.toUpperCase()===config.prefix+"FORM"){//haha
        msg.channel.send("Use '->attack' command to damage your opponent.");

        if(suits[0].Speed<suits[1].Speed){
          suits.push(suits[0]);
          suits.shift();
        }
        //queue players so their turns can be alternated
        queue[0]=suits[0].ID;//player_1
        queue[1]=suits[1].ID;//Player_2
        // create an hp total
        hp_total[0]=suits[0].Hp;//player_1
        hp_total[1]=suits[1].Hp;//Player_2

        check=false;//boolean flag to prevent forced reformation

        console.log("Queue 0 "+queue[0]);
        console.log("Queue 1 "+queue[1]);
        console.log(suits);
      }
      // if the bot is queue index 0 it auto-issue attack command
      if(queue[index]==='456435836943335455'){
        msg.channel.send("->attack");
      }
      // check turn priority and allow user to attack
      // tested and working
      if(msg.author.id===queue[index] && msg.content.toUpperCase()===config.prefix+"ATTACK"){
        msg.channel.send("Attacking!");
        //calculate damage
        //damage=((suits[index].Strength*atk_scale)-suits[index+1].Defense)-(suits[index+1].Speed*spd_scale);
        damage=combat_damage(suits[index],suits[index+1]);
        if(damage<0){
          damage=1;
        }
        //resolve damage
        suits[index+1].Hp=suits[index+1].Hp-damage;
        //alert damaged player
        msg.channel.send(damage+" Damage dealt to <@"+queue[index+1]+">"+
                          "\nYour hp is now at "+suits[index+1].Hp+"/"+hp_total[index+1]+"\n");

        console.log("Damage dealt: "+damage);
        console.log("New hp: "+suits[index+1].Hp);

        if(suits[index+1].Hp<0){
          msg.channel.send("<@"+queue[index+1]+"> has lost all functionality in suit."+
                            "\nEjecting!");
          queue=[]; delete queue;
          suits=[]; delete suits;
          hp_total=[]; delete hp_total;

          combat=false;
          return;
        }// end of death check
        else{
          hp_total.push(hp_total[index]);
          hp_total.shift();

          queue.push(queue[index]);
          queue.shift();

          suits.push(suits[index]);
          suits.shift();
        }
        console.log(suits);
        console.log(queue);
      }// end of attack command if

    });// end of bot.on
  }// end of if
  // subroutines
  function combat_damage(atk,def){
    var atk_scale=5;
    var spd_scale=0.1;
    var def_scale=1.5;
    var crit_hit=Math.floor(Math.random()*(21));

    var damage=((atk.Strength*atk_scale)-(def.Defense*def_scale))-(def.Speed*spd_scale);

    if(crit_hit===0){
      damage=damage*1.5;
      msg.channel.send("You landed a critical hit! ");
    }
    return damage;
  }//end of combat_damage

}//end of run
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
