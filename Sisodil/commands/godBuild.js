const Discord= require ("discord.js");
const Mobile_suit=require("Mobile_suit.js");

const m_proto=new Mobile_suit()
exports.run=(bot,msg,params=[])=>{
  var id='456435836943335455';
  var model="GX-001 Angel of Torment";
  var lvl=100;
  var hp=100000;
  var defense=1000;
  var strength=1000;
  var speed=1000;

  var ms=new Mobile_suit(id,model,lvl,hp,defense,strength,speed,true);
  ms.add_MobileSuit();

}
exports.conf={
  enabled:true,
  aliases:[],
  permLevel:0
}
exports.help={
  name:"GOD BUILD",
  description: "construct the tormentor's machine of absolution",
  usage: "GOD BUILD"
}
