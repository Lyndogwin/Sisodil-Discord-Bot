
exports.run=(bot,msg,params=[])=>{
  var random=Math.floor(Math.random()*6); //random number generator(0 to 5)

  if (random==0){
    msg.channel.send('To die alone.');
  }
  else if (random==1) {
    msg.channel.send('あなたはちんちんを食べたい');
  }
  else if (random==2){
    msg.channel.send('To be granted immortality and be permanently constipated.');
  }
  else if (random==3){
    msg.channel.send("Well, let's just say 'good luck'");
  }
  else if (random==4){
    msg.channel.send('To send nudes to highschool girls at the ripe age of 50.');
  }
  else if (random==5){
    msg.channel.send('To take a endless standardized test for eternity.');
  }
}//end of run
exports.conf={
  enabled:true,
  aliases:[],
  permLevel:0
}
exports.help={
  name:"MY FATE",
  description: "Discover your future through an arbitrary random number generator.",
  usage: "MY FATE"
}
