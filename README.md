Will add additional documentation soon. Sorry!

00000000000000000000000000000000000000000000000000
0  The code you see in this repo is the heart    0
0  of my first discord bot and my first attempt  0
0  at Js, node.js, and discord.js                0
0  Very much so a work-in-progress               0
00000000000000000000000000000000000000000000000000

Main application file is sisodil.js 

Primary commands are in the commands folder and 
Mobile_suit class is within node modules. 

You will need to install node.js and the mysql package for node. 

In addition, you will need mysql on whatever machine you'll be 
running the bot and you'll need to create a database for the 
bot to interact with using the mysql terminal.

"npm install mysql" in your node directory header(folder the node modules are located)

In my node modules I've created a JSON configuration file to store
the credentials I need to run this bot, including it's token.

```json
{
  "botToken": "<token here>",
  "ownerid" : "<put your discord id in here>",
  "prefix": "->",
  "mysqlbase":"<databse name here>",
  "mysqlpass": "<database password in here>"
}
```

Primary commands that are dedicated to the mobile suit combat rpg 
run by this bot.

Commands
____________________________________________________________________
|                                                                  |
| ->build: allows you to build a mobile suit with random stats     |
| ->sortie: allows you to pick which mobile suit you want to pilot |
| ->combat: allows you to initiate combat with another user        |
|__________________________________________________________________|