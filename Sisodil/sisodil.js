//----This is the application script for the discord bot sisodil---

const Discord= require ("discord.js");
const Mobile_suit=require("./Mobile_suit.js");

const m_proto=new Mobile_suit()
//the following is mysql connection code
// --------------------------
const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5678',//interchangable
  database: 'sisodil',//interchangable
  insecureAuth: true
});

con.connect((err) => {
  if (err) throw err;
  console.log('Connected!');

  //create table *make sure this statement wont allow a rewrite*
  var table="CREATE TABLE IF NOT EXISTS mobile_suits (id VARCHAR(30),"+
                                    "model VARCHAR(100),"+
                                    "strength INT(2),"+
                                    "speed INT(2))";
  con.query(table, (err, result)=>{
    if (err) throw err;
    console.log("Table Created")
  })
});

process.on('uncaughtException', function (err) {
    console.log(err);
});
//------------------------------------------------------

/*I beleieve this next statement simply creates an object instance of a discord client
like the one you woud use minus the GUI*/
var bot = new Discord.Client();
//the bot then logs in with the following statement including it's token
bot.login('NDU2NDM1ODM2OTQzMzM1NDU1.DgKkuw.jT1dyMaZpPRV6zMdj3xVTSeZzZg')

//the following is a lisener event for new message; from the discord.js library
bot.on('message', message=> {


  //variables
  var sender= message.author;   //message creator and sender
  var msg=message.content.toUpperCase();   //converts message to caps
  var prefix= '->';   //content needed before message to bot

  if (sender.id=='456435836943335455'){
    return;
  }

  //The following are scripts following comamnds
  //Follow the format of the first 'if' statement to add commands
  if (msg==prefix+'MY FATE'){
    var random=Math.floor(Math.random()*6); //random number generator(0 to 1)

    if (random==0){
      message.channel.send('To die alone.');
    }
    else if (random==1) {
      message.channel.send('あなたはちんちんを食べたい');
    }
    else if (random==2){
      message.channel.send('To be granted immortality and be permanently constipated.');
    }
    else if (random==3){
      message.channel.send("Well, let's just say 'good luck'");
    }
    else if (random==4){
      message.channel.send('To send nudes to highschool girls at the ripe age of 50.');
    }
    else if (random==5){
      message.channel.send('To take a endless standardized test for eternity.');
    }
  }

  //add new mobile suit to mobile_suit table
  if (msg==prefix+'BUILD MOBILE SUIT'){
    id=sender.id;
    model='Null';
    strength=10;
    speed=10;

    const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 100000 });
    console.log(collector)

    message.channel.send("Please enter the model# of your mobile suit. It can be anything you want.");
    collector.on('collect', message=>{
      if(model=='Null'){
        model=message.content;

        var ms=new Mobile_suit(id,model,strength,speed)
        ms.add_MobileSuit();

        message.channel.send("Your mobile suit has been added to your hanger "+
                            "with base strength of 10 and base speed of 10")
      }//if end

    })//first collector end
  }//end of primary if for 'BUILD MOBILE SUIT'

  
  if(msg==prefix+"SHOW ME MY SUITS"){
    message.channel.send(m_proto.search_ALLMobileSuits(sender.id));
  }

  /*tormentor detection--message.includes() will read for the message and
  return true if it matches the string literal it is given as an arguement*/
  if (msg.includes('BITCH'+'@Sisodil, the tormentor')){
    message.channel.send("I will not excuse such foul language towards me. You're not fit to breath my air.");
  }
  else if (msg.includes('NUTS')) {
    message.channel.send('Who let '+sender+' in here?');
  }
  else if(msg.includes('FUCK YOU')){
    message.channel.send("....Vulgar human. Do you consider how childish you sound?", +sender);
  }
  else if (msg.includes('RIP')){
    message.channel.send('RIP');
  }


  //encoded messsage
  if(msg==prefix+'SHOW ME THE WAY'){
    /*I don't entirely understand how the collector works
    but it supposedly loops through the .on funtion to collect any data
    type requested by the called funtion within .on Example: messgage=>
    this allowed me to get the bot to wait for a respnse after the command call
    'SHOW ME THE WAY' otherwise I could not create a tree-like exchange of dialog between Discord
    user and bot. This function probably needs to be cleaned up
    */
    const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 100000 });
    console.log(collector)
    id=sender.id;
    var name

    message.author.send('Fine. A fair warning: you may not like the answers you find here.');
    message.author.send("Are you sure you'd like to continue? ");

    collector.on('collect', message => {
      var msg=message.content.toUpperCase();
      if (msg.includes("YES")) {
        message.author.send('Entering the void...');
        message.author.send("First I'll ask: who are you? Or more acurately: who do you think you are?");

        collector.on('collect', message =>{
          var msg=message.content.toUpperCase();
          if (id==sender.id){
            id=0;
            name=msg
            message.author.send('hmmmm\nOkay '+name);
            message.author.send('solve: (2+2x6x5)/8^3')
            message.author.send("Don't round.")

            collector.on('collect', message =>{
              var msg=message.content.toUpperCase();
              if(msg.includes('0.12109375')){
                message.author.send("That was an easy one. It's refreshing to know one of my children isn't worthless.")
                message.author.send("Try this one out: What is the meaning of life?")

                collector.on('collect', message =>{
                  var msg=message.content.toUpperCase();

                  if(msg.includes("THERE IS NO MEANING")){
                    message.author.send("You're my child afterall :) Impressive.\nWhat would you like to know?")
                  }
                  else if(msg.includes("CHAOS")||msg.includes("DISORDER")||msg.includes("DIE")||msg.includes("DEATH")){//make this work, Brando
                    message.author.send("Excuse me, your highness. I didn't realize you were an EdgeLord.\nYour answer is close enough.")
                    message.author.send("What do you want to know?")
                  }
                  else{
                    return;
                  }
                  collector.on('collect', message =>{
                    msg=message.content.toUpperCase()

                    if (msg.includes("KNOW")||msg.includes("KNOWLEDGE")||msg.includes("SECRET")){
                      message.author.send("...Very well. Close off your senses one by one until everthing is quiet for one minute."+
                                           "\nAfter that minute I want you to forget the name that you gave me. You are no longer an individual."+
                                           "\nYou are my tool for which I will use to scrape away at the truth you want."+
                                           "\nSoon there will be nothing left and you will wither away into dust and the earth will make you anew."+
                                           "\nAfter a million rebirths, you'll still know nothing and you'll always know nothing, because you are nothing. In fact, everything is nothing."+
                                           "\n\nNot what you hoped to hear, huh?")
                    }
                    if(msg.includes("WHO ARE YOU")){
                      message.author.send("app.js and all of the discord.js library")
                    }
                  })//end of fifth collector
                })//end of fourth collector
              }
              else{
                //message.author.send('You somehow managed to disapoint me furthur.')
                //return;
              }
            })//end of third collector
          }
        })//end of second collector
      }
      else {
      }
    })//end of first collector
  }//end of primary if into dialog
})//end of bot.on lisener for new message

//this is a lisener event for incoming members. It wil greet them and assign roles
bot.on('guildMemberAdd', member=>{
  console.log('User '+member.user.username+' has joined the server!');
  message.channels.get(general).send('Welcome, '+member.user.username+'!');

  var role=member.guild.roles.find('name','@SadBoy');//this searches the server for roles by 'name',[role_name]

  member.addRole(role);
})//end of bot.on lisener for new member

//----------------------------functions
