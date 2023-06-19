const { Client, Collection } = require('discord.js');
const guildsManager = require( "./guildsManager.js");
const channelManager = require( "./channelManager.js");
const guildFunctions = require( "./guildFunctions.js");
const voiceManager = require( "./voiceManager.js");
const commandsManager = require( "./commandsManager.js");
const voiceConnectionManager = require( "./voiceConnectionManager.js");
const embedsManager = require( "./embedsManager.js");
const {radioAudioResourceManager} = require('./audioResources/controlRadioAudioResources');
const audioPlayer = require('./player/playerControler');
const youtubePlayer = require('./youtubeFeatures/youtubePlayer');
const permissionManager = require('./permissionManager.js');
const scheduleManager = require('./scheduleManager');
const ownerSpecial = require('./ownerSpecial/ownerManager.js');

module.exports = (async ()=>{
    let radioDatabaseManager = new radioAudioResourceManager();
    let schedule = new scheduleManager();
    await schedule.initializeDB();
    return [await radioDatabaseManager.initializeDatabase() , schedule] ;
})().then(datas=>{

    let radioDatabaseManager = datas[0];
    let scheduleDatabase = datas[1];
    return class DEEP extends Client{

        constructor(_intents){
            super(_intents);
            
            this.resourceManager = radioDatabaseManager.initializeClient(this);
            this.guildsManager = new guildsManager(this.guilds);
            this.voiceManager = new voiceManager(this.voice);
            this.channelManager = new channelManager(this.channels,this.voice,this.guilds);
            this.voiceConnectionManager = new voiceConnectionManager(this);
            this.commandsManager = new commandsManager(this);
            this.embedsManager = new embedsManager(this);
            this.audioPlayer = new audioPlayer(this);
            this.youtubePlayer = new youtubePlayer(this);
            this.permissionManager = new permissionManager(this);
            this.scheduleManager = scheduleDatabase.initializeClient(this);
            this.ownerSpecials = new ownerSpecial(this);
            this.serverCache = [];

        }
        
        async getDeepVoiceDatas(){
    
            let voiceMembers = await this.channelManager.getUsersFromVoiceChannels();
            
        }

        async send(msg,content,schedule = false){
            
            let checkPermission = await this.permissionManager.checkSendMessages(msg,schedule);
            if(checkPermission == 2) return 2;
            if(checkPermission) return;

            if(!this.serverCache.includes(msg.channel.id)) this.serverCache.push(msg.channel.id);

            let message = msg.channel.send(content).catch(err =>{
                this.dms[1].send(err);
            })

            return message;

        }
    
    }
})
