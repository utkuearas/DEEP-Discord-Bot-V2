
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const {createAudioResource} = require('@discordjs/voice');
const { Collection } = require('discord.js');
const playerEvent = require("../player/playerEvents.js");
const playDL = require("play-dl");

module.exports = class youtubePlayer{

    constructor(_client){
        this.client = _client;
        this.serverQueues = new Collection();
    }

    haveAQueue(guildId){
        return this.serverQueues.has(guildId);
    }

    removeFromQueue(guildId,msg,skip = false){
        let queue = this.serverQueues.get(guildId);
        queue.shift();
        if(queue.length == 0) {
            this.client.audioPlayer.destroyPlayer(guildId);
            return this.serverQueues.delete(guildId);
        }
        if(skip){
            this.client.send(msg,"NEEEEEXT MUSIC PLEEEEASE");
        }
        this.PlayNext(msg);
    }

    clearQueue(guildId){
        this.serverQueues.delete(guildId);
    }

    PlayNext(msg){

        let guildId = msg.guild.id;
        let music = this.serverQueues.get(guildId)[0];
        let title = music.title;
        let duration = music.duration;
        let thumbnailUrl = music.thumbnailUrl;
        let source = music.source;
        this.sendMusicMessage(title,duration,thumbnailUrl,msg,true);
        let player = this.client.audioPlayer.fetchPlayer(msg.guild.id);
        return this.playSource(undefined,player,source,msg);

    }

    async concateToQueue(videos,guildId){
        if(!this.haveAQueue(guildId)) return this.serverQueues.set(guildId,videos);
        let queue = this.serverQueues.get(guildId);
        queue = queue.concat(videos);
        return 0;
    }

    async addToQueue(video,guildId){

        if(!this.haveAQueue(guildId)) return this.serverQueues.set(guildId,[video]);
        let queue = this.serverQueues.get(guildId);
        queue.push(video);
        this.serverQueues.set(guildId,queue);
        return 0;
    }

    async createSource(videoUrl){
        let stream;
        try {
            stream = playDL.stream(videoUrl,{quality: 2, discordPlayerCompatibility: true})
        } catch(e){
            return 0;
        }
        return stream;
    }

    async createYoutubeSource(req,guildId){
        let video = (await this.searchVideo(req))[0];
        if(video == undefined) return [0,0,0,0];
        let videoUrl = video.url;
        let title = video.title;
        let duration = video.durationRaw;
        let thumbnailUrl = video.thumbnails[0].url;
        let source = this.createSource(videoUrl,guildId);
        return [title,duration,source,thumbnailUrl];

    }

    async searchVideo(req){

        let video = playDL.search(req,{source : {youtube : "video"} , limit: 1});
        return video;

    }

    async sendMusicMessage(title,duration,thumbnailUrl,msg,fromQueue = false,playlist = false){

        let guildId = msg.guild.id;
        let state;
        if(fromQueue){
            state = false;
        }else{
            state = this.haveAQueue(guildId);
        }

        if(playlist){
            let embed = this.client.embedsManager.get("youtubePlaylistEmbed.js")(title,duration,thumbnailUrl,state);
        }

        let embed = this.client.embedsManager.get("youtubePlayMusicEmbed.js")(title,duration,thumbnailUrl,state);
        this.client.send(msg,{embeds: [embed]});

    }

    async pushVideos(videos,guildId){
        let list = [];
        for(let video of videos){
            object = {};
            object.title = video.title;
            object.url = video.url;
            object.thumbnailUrl = video.thumbnails[0].url;
            object.duration = video.durationRaw;
            list.push(object);
        }
        this.concateToQueue(list,guildId);
    }

    async playPlaylist(query,guildId){
        let playlistInfo = await playDL.playlist_info(query);
        let videos = await playlistInfo.all_videos();
        this.pushVideos(playlistInfo,guildId);
        let count = playlistInfo.total_videos;
        let playlistThumbnail = playlistInfo.thumbnail.url;

        let firstVideo = videos[0];
        return [firstVideo.title,firstVideo.durationRaw,firstVideo.url,firstVideo.thumbnails[0].url,playlistThumbnail,count]

    }

    async playYoutubeMusic(msg){

        let state = this.client.voiceConnectionManager.checkPlayable(msg);
        if(!state) return;
        let title,duration,source,thumbnailUrl;
        let query = msg.content.split(/ +/).slice(1).join(" ");

        let video,checkQueue;

        if(query.includes("youtube") && query.includes("playlist")) {
            [title,duration,source,thumbnailUrl,thumbnailUrl,count] = await this.playPlaylist(query,msg.guild.id);
            let playlist = {count: count, thumbnailUrl: thumbnailUrl};

        }else{
            [title,duration,source,thumbnailUrl] = await this.createYoutubeSource(query,msg.guild.id);
            this.sendMusicMessage(title,duration,thumbnailUrl,msg);
            video = {title : title , duration: duration, source: source, thumbnailUrl: thumbnailUrl};
            checkQueue = await this.addToQueue(video,msg.guild.id);
        }
        
        if(!checkQueue) return;

        if(this.client.audioPlayer.hasAplayer(msg.guild.id)) { 
            
            let player = this.client.audioPlayer.fetchPlayer(msg.guild.id);
            return this.playSource(undefined,player,source,msg);
        }
        let connection;
        if(state == 1) connection = this.client.voiceConnectionManager.fetchVoiceConnection(msg.guild.id);
        if(state == 2) connection = this.client.voiceConnectionManager.connectChannel(msg.member.voice.channel);

        this.playSource(connection,undefined,source,msg);

    }

    async playSource(connection,player,source,msg){


        let guildId = msg.guild.id;
        let stream;

        try{

            stream = await source;

        }catch(e){
            return 0;
        }

        source = createAudioResource(stream.stream,{
            inputType: stream.type
        });

        if(!player) {
            player = this.client.audioPlayer.createPlayerWithSource(guildId,source,"Youtube");
            connection.subscribe(player);
            playerEvent(this.client,player,msg);
        }else{
            if(this.client.audioPlayer.get(guildId).id != "Youtube") playerEvent(this.client,player,msg);

            this.client.audioPlayer.changeSourceId(guildId,"Youtube");
            this.client.audioPlayer.changeSource(guildId,source);
        }


        player.play(source);

    }
}

