const { createAudioPlayer } = require('@discordjs/voice');
const { Collection } = require('discord.js');

module.exports = class extends Collection{

    constructor(_client){
        super();
        this.client = _client;
    }

    changeSourceId(guildId,id){
        let data = this.get(guildId);
        data.id = id;
        this.set(guildId,data);
    }

    changeSource(guildId,source){
        let data = this.get(guildId);
        data.source = source;
        this.set(guildId,data);
    }

    createPlayerWithSource(guildId,source,id){

        let player = createAudioPlayer();
        this.set(guildId , {id:id,player:player,source:source,state:"Playing"});
        return player;

    }

    checkSameSource(id,guildId){
        return this.get(guildId).id == id;
    }

    destroyPlayer(guildId){

        this.destroySource(guildId);
        let player = this.get(guildId).player;
        this.delete(guildId);
        player.stop(true);
    }

    fetchPlayer(guildId){
        return this.get(guildId).player;
    }

    destroySource(guildId){
        let data = this.get(guildId);
        data.source = undefined;
        this.set(guildId,data);
    }

    hasAplayer(guildId){

        return this.has(guildId);

    }
    changeState(guildId){
        let playerData = this.get(guildId);
        playerData.state = "Paused";
        this.set(guildId,playerData);

    }
    pausePlayer(guildId){
        
        let player = this.fetchPlayer(guildId);
        this.changeState(guildId);
        player.pause();
        

    }
    unpausePlayer(guildId){

        let player = this.fetchPlayer(guildId);
        player.unpause();
    }
}