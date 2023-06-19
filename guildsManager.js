

module.exports = class guildsManager{
    constructor(_guildsManager){
        this.self = _guildsManager;
    }

    async getActiveGuilds(){
        return this.self.cache;
    }

    async getMembers(){
        let guilds = await this.getActiveGuilds().values();
        let members = 0
        for(let guild of guilds){
            members += guild.memberCount;
        }
        return members;
    }
}
