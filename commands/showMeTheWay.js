const Discord= require ("discord.js");
/////////////////////////////////////
// The following is an             //
// encoded message                 //
//                                 //
// this whole thing is a mess      //
// and needs to be cleaned up a    //
// a bit                           //
/////////////////////////////////////

exports.run=(bot,msg,params=[])=>{
  /*I don't entirely understand how the collector works
  but it supposedly loops through the .on funtion to collect any data
  type requested by the called funtion within .on Example: messgage=>
  this allowed me to get the bot to wait for a respnse after the command call
  'SHOW ME THE WAY' otherwise I could not create a tree-like exchange of dialog between Discord
  user and bot. This function probably needs to be cleaned up
  */
  const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 1200000 });
  console.log(collector)

  msg.author.send('Fine. A fair warning: you may not like the answers you find here.');
  msg.author.send("Are you sure you'd like to continue? ");

  collector.on('collect', message => {
    var final=true;
    var f1=false; var f2=false; var f3=false; var f4=false;
    var msg=message.content.toUpperCase();
    id=message.author.id;


      if (msg.includes("YES")&&final) {

        message.author.send('Entering the void...');
        message.author.send("First I'll ask: who are you? Or more accurately: who do you think you are?");
        f1=true;
        //stick a time out here
      }
      //---------------following messages are not collected for some reason

      if(f1&&message.author.id==id){
        message.author.send('hmmmm\nOkay '+message.author);
        message.author.send('solve: (2+2x6x5)/8^3')
        message.author.send("Don't round.")
        f1= false;
        f2= true;
      }

      if(msg.includes('0.12109375')&&f2){
        message.author.send("That was an easy one. It's refreshing to know one of my children isn't worthless.")
        message.author.send("Try this one out: What is the meaning of life?")
        f2=false;
        f3=true;
      }


      if(msg.includes("THERE IS NO MEANING")&&f3){
        message.author.send("You're my child afterall :) Impressive.\nWhat would you like to know?")
        f3=false;
        f4=true;
      }
      else if(msg.includes("CHAOS")||msg.includes("DISORDER")||msg.includes("DIE")||msg.includes("DEATH")&&f3){
        message.author.send("Excuse me, your highness. I didn't realize you were an EdgeLord.\nYour answer is close enough.")
        message.author.send("What do you want to know?")
        f3=false;
        f4=true;
      }
      else if(f3){
        message.author.send("Sad. Really. Goodbye!")

      }

      else if(msg.includes("KNOW")||msg.includes("KNOWLEDGE")||msg.includes("SECRET")&&f4){
        message.author.send("...Very well. Close off your senses one by one until everything is quiet for one minute."+
                             "\nAfter that minute I want you to forget the name that you gave me. You are no longer an individual."+
                             "\nYou are my tool for which I will use to scrape away at the truth you want."+
                             "\nSoon there will be nothing left and you will wither away into dust and the earth will make you anew."+
                             "\nAfter a million rebirths, you'll still know nothing and you'll always know nothing, because you are nothing. In fact, everything is nothing."+
                             "\n\nNot what you hoped to hear, huh?");
        final=false;

      }
      else if(msg.includes("WHO ARE YOU")){
        message.author.send("sisodil.js and all of the discord.js library")
        final=false
      }
  })//end of first collector
}

exports.conf={
  enabled: true,
  aliases: ["YO"],
  permLevel: 0
}

exports.help={
  name: "SHOW ME THE WAY",
  description: "Learn some very secretive secrets",
  usage: "SHOW ME THE WAY"
}
