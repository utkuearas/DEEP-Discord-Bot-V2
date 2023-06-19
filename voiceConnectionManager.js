const { getVoiceConnection , joinVoiceChannel , VoiceConnectionStatus , entersState } = require('@discordjs/voice');
const { Collection } = require('discord.js');
const { controlVoiceConnections } = require('./voiceControl/controlVoiceConnections.js');
module.exports = class voiceConnectionManager extends Collection{


    constructor(_client){
        super();
        this.client = _client;
    }

    hasAconnection(channel){
        return this.has(channel.guild.id);
    }

    disconnectChannel(channel){
        if(!this.hasAconnection(channel)) return;
        let connection = this.get(channel.guild.id);
        this.delete(channel.guild.id);
        connection.destroy();
    }

    connectChannel(channel){
        let connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator
        });

        controlVoiceConnections(connection,this.client);
        this.set(channel.guild.id,connection);
        return connection;
    }

    fetchVoiceConnection(guildId){

        return getVoiceConnection(guildId);
    }

    checkMemberOnVoice(msg){
        if(msg.member.voice.channel == undefined){
            return false;
        }
        return msg.member.voice.channel;
    }

    checkConnectable(msg){
        let clientConnection = this.fetchVoiceConnection(msg.guild.id);
        let memberChannel = this.checkMemberOnVoice(msg);
        if(clientConnection){
            if(memberChannel.id == clientConnection.joinConfig.channelId){
                this.client.send(msg,{embeds : [this.client.embedsManager.get('alreadyInRoomSignal.js')]});
                return 0;
            }else{
                this.client.send(msg,{embeds : [this.client.embedsManager.get('anotherRoomSignal.js')]});
                return 0;
            }
        }
        if(!memberChannel){
            this.client.send(msg,{embeds : [this.client.embedsManager.get('noOnVoiceChannel.js')]});
            return 0;
        }
        return 1;
    }

    checkDisconnectable(msg){
        let clientConnection = this.fetchVoiceConnection(msg.guild.id);
        let memberChannel = this.checkMemberOnVoice(msg);
        if(!memberChannel){
            this.client.send(msg,{embeds : [this.client.embedsManager.get('noOnVoiceChannel.js')]});
            return 0;
        }
        if(clientConnection){
            if(memberChannel.id == clientConnection.joinConfig.channelId){
                return 1;
            }else{
                this.client.send(msg,{embeds : [this.client.embedsManager.get('anotherRoomSignal.js')]});
                return 0;
            }
        }
        return 1;
    }

    checkPlayable(msg){
        let memberChannel = this.checkMemberOnVoice(msg);
        if(!memberChannel){
            this.client.send(msg,{embeds : [this.client.embedsManager.get('noOnVoiceChannel.js')]});
            return 0;
        }
        let clientConnection = this.fetchVoiceConnection(msg.guild.id);
        if(clientConnection){
            if(!(clientConnection.joinConfig.channelId == memberChannel.id)){
                this.client.send(msg,{embeds : [this.client.embedsManager.get('anotherRoomSignal.js')]});
                return 0;
            }
            return 1;
        }
        return 2;
    }

}