const { VoiceConnectionStatus, entersState } = require('@discordjs/voice');

module.exports.controlVoiceConnections = function(connection,client){

    connection.on(VoiceConnectionStatus.Disconnected,async (oldState,newState) =>{

        try {
            await Promise.race([
                entersState(connection, VoiceConnectionStatus.Signalling, 2000),
                entersState(connection, VoiceConnectionStatus.Connecting, 2000),
            ]);
        } catch (error) {
            let guildId = connection.joinConfig.guildId;
       
            if(client.audioPlayer.hasAplayer(guildId)){
                client.audioPlayer.destroyPlayer(guildId);
                client.youtubePlayer.serverQueues.delete(guildId);
            }
            client.voiceConnectionManager.delete(guildId);
            connection.destroy();
        }

    })

}