const Discord= require ("discord.js");
const Mobile_suit=require("Mobile_suit.js");

const m_proto=new Mobile_suit()
exports.run=(bot,msg,params=[])=>{//param accepts an array of arguements from bot.on
  var id=msg.author.id
  var model=null;
  var lvl=1;
  var hp=100;
  var defense=10
  var strength=10;
  var speed=10;
  var ok=true;

  const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 30000 });
  console.log(collector)
  console.log(model)
  msg.channel.send("Please enter the model# of your mobile suit. It can be anything you want.");
  collector.on('collect', msg=>{
    if(ok){
      var model=msg.content.toUpperCase();
      console.log("model entered: "+model)
      var ms=new Mobile_suit(id,model,lvl,hp,defense,strength,speed)
      ms.add_MobileSuit();

      msg.channel.send("Your mobile suit has been added to your hanger "+
                          "with hp at 100, defense at 10, strength at 10, "+
                          "and speed at 10")
      ok=false
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
