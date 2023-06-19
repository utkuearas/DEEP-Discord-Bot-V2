module.exports.command = (client,msg,args,desc = false) => {

    if(desc){
        this.desc = "You can use this command if you get bored from this music";
        return this;
    }

    if(!client.audioPlayer.hasAplayer(msg.guild.id)) return;

    if(client.audioPlayer.get(msg.guild.id).id != "Youtube") return;

    console.log(2);

    client.youtubePlayer.removeFromQueue(msg.guild.id,msg,true);

}