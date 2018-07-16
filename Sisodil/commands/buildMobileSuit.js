const Discord= require ("discord.js");
const Mobile_suit=require("Mobile_suit.js");

const m_proto=new Mobile_suit()
exports.run=(bot,msg,params=[])=>{//param accepts an array of arguements from bot.on
  var id=msg.author.id;
  var model=null;
  var lvl=1;
  var hp=Math.floor(Math.random()*(100-90)+90);
  var defense=Math.floor(Math.random()*(11-5)+5);
  var strength=Math.floor(Math.random()*(11-5)+5);
  var speed=Math.floor(Math.random()*(11-5)+5);
  var ok=true;

  const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 30000 });
  console.log(collector);

  msg.channel.send("Please enter the model# of your mobile suit. It can be anything you want.");
  collector.on('collect', msg=>{
    if(ok){
      var model=msg.content.toUpperCase();
      console.log("model entered: "+model);
      var ms=new Mobile_suit(id,model,lvl,hp,defense,strength,speed,true);
      ms.add_MobileSuit();

      msg.channel.send("Your mobile suit has been added to your hanger "+
                          "with hp at "+hp+", defense at "+defense+", strength at "+strength+", "+
                          "and speed at "+speed+".");
      ok=false;
    }//if end
    return;
  }); //first collector end
}

exports.conf = {
  enabled: true, // not used yet
  aliases: ["BUILD"],
  permLevel: 0 // Permissions Required, higher is more power
};

exports.help = {
  name : "BUILD MOBILE SUIT",
  description: "Create your own mobile suit and add you hanger",
  usage: "BUILD MOBILE SUIT"
};
