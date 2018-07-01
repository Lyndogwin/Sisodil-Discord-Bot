const Discord= require ("discord.js");

class SpeedyCollector {

  /////////////////////////////////////////////////
  // this class is dedicated to making collectors//
  // a slight bit faster                         //
  /////////////////////////////////////////////////

  constructor(){
    this.collector1v1 = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 100000 });
    console.log(collector)
  }

  collector1v1(){

    return collector1v1;
  }
}
module.exports=SpeedyCollector;
