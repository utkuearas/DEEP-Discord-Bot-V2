
module.exports = (client,player,msg)=>{
    let guildId = msg.guild.id;
    player.addListener("stateChange",(oldState,newState) =>{

        if(!client.audioPlayer.hasAplayer(guildId)) {
            return client.youtubePlayer.clearQueue(guildId);
        }

        if(oldState.status == "playing" && newState.status == "idle"){
            return client.youtubePlayer.removeFromQueue(guildId,msg);
        }
    });

}