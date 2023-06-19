
const fs = require('fs');
const { createAudioResource, StreamType } = require('@discordjs/voice');
const { Collection } = require('discord.js');
const Sequelize = require('sequelize');
const {database} = require('./sequelizeSetup');
const prism = require("prism-media");

module.exports.radioAudioResourceManager = class radioAudioResourceManager extends Collection{

    async initializeDatabase(){
        let db = database;
        this.serverLastStates = new Collection();
        for(let model of Object.keys(db.models)){
            this.set(model,await db.models[model].findAll({raw : true}));
        }
        return this;
    }

    initializeClient(_client){
        this.client = _client;
        return this;
    }

    prismMediaFunc(url,bitrate){
        console.log(bitrate)
        return new prism.FFmpeg({
            args: [
                '-analyzeduration', '0',
                '-loglevel', '0',
                '-i', url,
                '-acodec', 'libopus',
                '-f', 'opus',
                '-ar', "48000",
                '-b:a', bitrate,
                '-ac', '2',
            ],
        });
    }

    createSource(url,bitrate){
        let stream = this.prismMediaFunc(url,bitrate);
        return createAudioResource(stream);
    }

    getCountryRadiosInfo(country){
        let data = this.get("Radios").filter(radio => radio.country == country);
        return data;
    }

    getGenreRadiosInfo(genre){
        let data = this.get("Radios").filter(radio => radio.rythm == genre);
        return data;
    }

    getInformation(id){
        let data = this.get("Radios").filter(radio => radio.id == id)
        if(data.length == 0) return 0;
        return data[0];
    }

    getAllDatas(table){

        let datas;
        switch(table){
            case "Radios":
                datas = this.get('Radios');
                break;
            case "Countries":
                datas = this.get('Countries');
                break;
            case "RythmTypes":
                datas = this.get('RythmTypes');
                break;
            default:
                datas = [];
                break;
        }
        return datas;
    }
}

