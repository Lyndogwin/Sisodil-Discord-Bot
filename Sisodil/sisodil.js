///////////////////////////////////////////////////////////////////////
// ----This is the application script for the discord bot sisodil--- //
///////////////////////////////////////////////////////////////////////

const Discord= require ("discord.js");
const Mobile_suit=require("Mobile_suit.js");
const config=require("config.json")
const fs=require("fs");//  node.js file system module

const m_proto=new Mobile_suit()

/////////////////////////////////////////////
// the following is mysql connection code  //
// //////////////////////////////////////////
const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',//
  user: 'root',
  password: config.mysqlpass,//interchangable stored in config
  database: 'sisodil',//interchangable
  insecureAuth: true //Probably don't need
});

con.connect((err) => {//err is a boolean return. True if err is caught
  if (err) throw err;
  console.log('Connected!');

  //create table *make sure this statement wont allow a rewrite*
  var table="CREATE TABLE IF NOT EXISTS mobile_suits (ID VARCHAR(30),"+
                                    "Model VARCHAR(30),"+
                                    "Lvl INT(2),"+
                                    "Hp INT(4),"+
                                    "Defense INT(2),"+
                                    "Strength INT(2),"+
                                    "Speed INT(2),"+
                                    "Manned BOOL)";
  con.query(table, (err, result)=>{
    if (err) throw err;
    console.log("Table Created")
  })
 con.end()
});
process.on('uncaughtException', (err)=>{
    console.log(err);
});
//------------------------------------------------------

/*I beleieve this next statement simply creates an object instance of a discord client
like the one you woud use minus the GUI*/
var bot = new Discord.Client();
//the bot then logs in with the following statement including it's token
//token is stored in a config file for my eyes only
bot.login(config.botToken)

//////////////////////////////////////////////////////////
//    Added code bellow to handle modular commmands     //
//////////////////////////////////////////////////////////
//------------------------------------------------------
// Uses Discord.Collection() mostly for the helpers like `map()`, to be honest.
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
// Load the contents of the `/command/` folder and each file in it.
fs.readdir(`./commands/`, (err, files) => {//
  if(err) console.error(err);
  console.log(`Loading a total of ${files.length} commands.`);
  // Loops through each file in that folder
  files.forEach(f=> {
    // require the file itself in memory
    let props = require(`./commands/${f}`);
    console.log(`Loading Command: ${props.help.name}. :ok_hand:`);
    // add the command to the Commands Collection
    bot.commands.set(props.help.name, props);
    // Loops through each Alias in that command
    props.conf.aliases.forEach(alias => {
      // add the alias to the Aliases Collection
      bot.aliases.set(alias, props.help.name);
    });
  });
});
//------------------------------------------------------
////////////////////////////////////////////////////
// The following is a lisener event for modular   //
// commands                                       //
////////////////////////////////////////////////////
bot.on('message', message => {
  var msg=message.content.toUpperCase();
  var sender=message.author //not used
  var senderID=message.author.id //not used

  if (sender.id=='456435836943335455'){//bot id
    return;
  }

  console.log(msg);
  // Ignore message with no prefix for performance reasons
  if(!msg.startsWith(config.prefix)) return;//ok
  // Get the command by getting the first part of the message and removing  the prefix.
  var command = msg.slice(config.prefix.length);//ok
  console.log(command);
  // Get the params in an array of arguments to be used in the bot
  var params = msg.split(" ").slice(1);//not good
  params[params.length]=senderID//not used
  console.log(params[params.length-1])
  // get the user's permission level
  /* put code here to check for permission level*/
  let cmd;
  // Check if the command exists in Commands
  if (bot.commands.has(command)) {
    // Assign the command, if it exists in Commands
    cmd = bot.commands.get(command)
  // Check if the command exists in Aliases
  } else if (bot.aliases.has(command)) {
    // Assign the command, if it exists in Aliases
    cmd = bot.commands.get(bot.aliases.get(command));
  }

  if(cmd) {
    // Check user's perm level against the required level in the command
    /*if (permission < cmd.conf.permLevel) return;*/

    // Run the `exports.run()` function defined in each command.
    cmd.run(bot, message, params);
  }
});

//------------------------------------------------------

//the following is a lisener event for new message; from the discord.js library
bot.on('message', message=> {


  //variables
  var sender= message.author;   //message creator and sender
  var msg=message.content.toUpperCase();   //converts message to caps
  var prefix= '->';   //content needed before message to bot

  if (sender.id=='456435836943335455'){
    return;
  }
//------------------------------------------------
  /////////////////////////
  // tormentor detection //
  /////////////////////////

  /*--message.includes() will scan the Message
  for the string literal given as and arguemen and
  return true if it exists within the context of the message string */
  if (msg.includes('BITCH'+'@Sisodil, the tormentor')){
    message.channel.send("I will not excuse such foul language towards me. You're not fit to breath my air.");
  }
  else if (msg.includes('NUTS')) {
    message.channel.send('Who let '+sender+' in here?');
  }
  else if(msg.includes('FUCK YOU')){
    message.channel.send("....Vulgar human. Have you considered how childish you sound?", +sender);
  }
  else if (msg.includes('RIP')){
    message.channel.send('RIP');
  }
//------------------------------------------------------------------


})//end of bot.on lisener for new message
//-------------------------------------------------------

//this is a lisener event for incoming members. It wil greet them and assign roles
bot.on('guildMemberAdd', member=>{
  console.log('User '+member.user.username+' has joined the server!');
  message.channels.get(general).send('Welcome, '+member.user.username+'!');

  var role=member.guild.roles.find('name','@SadBoy');//this searches the server for roles by 'name',[role_name]

  member.addRole(role);
})//end of bot.on lisener for new member

//----------------------------functions
