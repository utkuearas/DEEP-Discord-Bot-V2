module.exports.command = (client,msg,args,desc = false) => {
    if(desc){
        this.desc = "If you have an audio stream link, you should try this command";
        return this;
    }

    let state = client.voiceConnectionManager.checkPlayable(msg);
    if(!state) return;
    let bitrate = msg.member.voice.channel.bitrate;
    if(client.audioPlayer.hasAplayer(msg.guild.id)) {
        
        let player = client.audioPlayer.fetchPlayer(msg.guild.id);
        playStream(client,args[0],msg,undefined,player,bitrate);
        return;
    }
    let connection;
    if(state == 1) connection = client.voiceConnectionManager.fetchVoiceConnection(msg.guild.id);
    if(state == 2) connection = client.voiceConnectionManager.connectChannel(msg.member.voice.channel);

    playStream(client,args[0],msg,connection,undefined,bitrate);
    return;
}

function playStream(client,url,msg,connection = undefined, player = undefined){

    let source = client.resourceManager.createSource(url);

    if(!player) {
        player = client.audioPlayer.createPlayerWithSource(msg.guild.id,source,"");
        connection.subscribe(player);
    }else{
        client.audioPlayer.changeSourceId(msg.guild.id,"");
    }

    player.play(source);

    client.send(msg,{embeds: [client.embedsManager.get("playFromUrlEmbeds.js")(url)]});
}