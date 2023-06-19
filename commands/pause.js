
module.exports.command = (client,msg,args,desc = false) => {
    if(desc){
        this.desc = "Use this command if you want to listen music later";
        return this;
    }
    let hasPlayer = client.audioPlayer.hasAplayer(msg.guild.id);
    if(!hasPlayer){
        return;
    }
    client.audioPlayer.pausePlayer(msg.guild.id);
    client.send(msg,{embeds : [client.embedsManager.get("pauseEmbed.js")]})
}