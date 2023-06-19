const { joinVoiceChannel , getVoiceConnection } = require("@discordjs/voice");
const { controlVoiceConnections } = require('../voiceControl/controlVoiceConnections.js');

module.exports.command = function join(_client,msg,args,desc = false){
    if(desc){
        this.desc = "Join voice channel"; 
        return this;
    }

    let state = _client.voiceConnectionManager.checkConnectable(msg);
    if(!state) return 0;

    _client.send(msg,{embeds : [_client.embedsManager.get("joinSignal.js")]});

    let channel = msg.member.voice.channel;

    let connection = _client.voiceConnectionManager.connectChannel(channel);

    return connection;
}


