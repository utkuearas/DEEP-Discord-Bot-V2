

module.exports.command = (client,msg,args,desc = false) =>{
    if(desc){
        this.desc = "If you like that song, you can use this command";
        return this;
    }

    if(!client.youtubePlayer.haveAQueue(msg.guild.id)) return;

    let nowPlaying = client.youtubePlayer.serverQueues.get(msg.guild.id)[0];

    let embed = client.embedsManager.get("nowPlayingEmbed.js")(nowPlaying.title,nowPlaying.duration,nowPlaying.thumbnailUrl);

    client.send(msg,{embeds: [embed]});
    
}