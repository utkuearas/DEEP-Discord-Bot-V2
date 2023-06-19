module.exports.command = (client,msg,args,desc = false)=>{
    if(desc){
        this.desc = "Use this command to continue the party"; 
        return this;
    }
    let hasPlayer = client.audioPlayer.hasAplayer(msg.guild.id);
    if(!hasPlayer){
        return;
    }
    client.audioPlayer.unpausePlayer(msg.guild.id);
    client.send(msg,{embeds : [client.embedsManager.get('resumeEmbed.js')]});
}