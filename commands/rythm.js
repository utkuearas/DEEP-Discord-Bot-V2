module.exports.command = (client,msg,args,state = false)=>{
    if(state){
        this.desc = "Show genres"; 
        return this;
    }
    client.resourceManager.serverLastStates.set(msg.guild.id,"Rythm");
    client.send(msg,{embeds : [client.embedsManager.get('rythmInfoEmbed.js')(client)]});
}