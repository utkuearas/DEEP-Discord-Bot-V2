

module.exports.command = (client,msg,args,desc = false)=>{
    if(desc){
        this.desc = "Use this if you like shuffled playlists";
        return;
    }

    let guildId = msg.guild.id

    if(!client.youtubePlayer.haveAQueue(guildId)) return;

    let queue = client.youtubePlayer.serverQueues.get(guildId);

    if(queue.length <= 2) return;

    shuffleFunc(queue);

    client.youtubePlayer.serverQueues.set(guildId,queue);

    let embed = client.embedsManager.get("shuffleEmbed.js");
    client.send(msg,{embeds: [embed]});


}

function shuffleFunc(array){

    let index = array.length - 1, randomIndex;

    while( index > 0 ){
        randomIndex = Math.floor(Math.random() * (index - 1)) + 1;
        [array[index],array[randomIndex]] = [array[randomIndex],array[index]];
        index--;
    }
}