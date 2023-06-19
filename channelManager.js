const guildsManager = require("./guildsManager.js");
const voiceManager = require("./voiceManager.js");

module.exports = class channelManager {

    constructor(_channelManager,_voiceManager,_guildsManager){
        this.self = _channelManager;
        this.voiceManager = new voiceManager(_voiceManager);
        this.guildsManager = new guildsManager(_guildsManager);
    }
    
    async findActiveVoiceChannel(){
        let keys = Array.from(await this.voiceManager.fetchGuildIds());

        let guilds = this.guildsManager.self.cache.filter(guild => keys.includes(guild.id)).values();
        let voiceChannelsList = []
        for(let guild of guilds){
            let voiceChannels = Array.from(guild.channels.cache.filter(channel => channel.type == "GUILD_VOICE" && this.checkDEEPExistence(channel)).values());
            
            if(voiceChannels.length == 0) continue;

            voiceChannelsList.push(voiceChannels);
        }
        return voiceChannelsList;
    }

    async getUsersFromVoiceChannels(){
        let guildVoiceChannels = await this.findActiveVoiceChannel();

        if(guildVoiceChannels.length == 0){
            return [];
        }

        let membersList = [];
        for(let guildChannels of guildVoiceChannels){
            for(let channel of guildChannels){
                let members = channel.members.filter(member => member.user.bot == false);
                membersList.push(members);
            }
        }
        return membersList;
        
    }

    checkDEEPExistence(channel){
        let members = channel.members;
        members = members.filter(member => member.user.username == "DEEP DENEME" && member.user.discriminator == "9767");
        
        if(members.size == 0){
            return false;
        }
        return true;
    }
}