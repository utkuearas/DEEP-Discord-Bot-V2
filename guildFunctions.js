

module.exports = class guildFunctions{

    static async getVoiceChannels(_guild){
        let cache = _guild.channels.cache;
        cache = cache.filter(channel => channel.type == 'GUILD_VOICE');
        return cache;
    }
}