module.exports.command = (client,msg,args,desc = false) => {
    if(desc){
        this.desc = "You can use this if the music is enough";
        return this;
    }
    let checkDisconnectable = client.voiceConnectionManager.checkDisconnectable(msg);
    if(!checkDisconnectable) return 0;
    try{
        let guildId = msg.guild.id;
        (async () =>{
            if(client.audioPlayer.hasAplayer(guildId)){
                client.audioPlayer.destroyPlayer(guildId);
            }
            
        })().then(()=>{
            client.send(msg,{embeds : [client.embedsManager.get("disconnectEmbed.js")]});
            setTimeout(()=>{
                client.voiceConnectionManager.disconnectChannel(msg.member.voice.channel);
            },500);
        });
    }catch(error){
        console.log(error);
        return 0;
    }
}