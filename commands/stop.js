module.exports.command = (client,msg,args,desc = false) => {
    if(desc){
        this.desc = "Use this command in order to stop the music playing";
        return this;
    }
    if(!client.audioPlayer.hasAplayer(msg.guild.id)) return;
    client.audioPlayer.destroyPlayer(msg.guild.id);
    client.send(msg,{embeds : [client.embedsManager.get("stopPlayingEmbed.js")]})
}
