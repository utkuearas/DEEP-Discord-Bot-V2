

module.exports.command = (client,msg,args,state = false)=>{
    if(state){
        this.desc = "Show countries"; 
        return this;
    }
    client.resourceManager.serverLastStates.set(msg.guild.id,"Countries");
    client.send(msg,{embeds : [client.embedsManager.get('countryInfoEmbed.js')(client)]});
}