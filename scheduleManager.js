
const {Collection, MessageEmbed} = require('discord.js');
const fs = require('fs');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const sequelize = new Sequelize({
    dialect : 'sqlite',
    storage: `${__dirname}/serversData/serversScheduleData.sqlite`,
    logging: false
});


const table = sequelize.define('schedulesData',{
    title: Sequelize.TEXT,
    description: Sequelize.TEXT,
    servers: Sequelize.TEXT
});

module.exports = class extends Collection{
    constructor(){
        super();
        this.db = sequelize;
        this.table = table;
    }
    async initializeDB(){
        await this.table.sync();
        let datas = await this.table.findAll();
        this.id = 1;
        let length = datas.length - 3;
        this.length = 0;
        for(let data of datas){
            let key = [data.title,data.description].join("SEPARATOR");
            if(data.id > this.id) this.id = data.id;
            if(length > 0){
                length -= 1;
                data.destroy();
                continue;
            }
            let value = data.servers.split(",");
            this.length += 1;
            this.set(key,value);
        }
        datas = await this.table.findAll();
        await this.table.sync();

    }

    initializeClient(_client){
        this.client = _client;
        return this;
    }

    addSchedule(title,description){
        if(this.length == 3){
            this.table.destroy({
                where:{
                    id: this.id - 2
                }
            });
            let key = this.keys().next();
            this.delete(key);
        }
        let key = [title,description].join("SEPARATOR");
        this.set(key,[]);
        this.table.create({title : title , description : description , servers: ""});
    }
    
    addServerToSchedule(guild,schedule){

        let guilds = this.get(schedule).join(",");
        let newGuilds = guilds + "," + guild;
        let splitText = schedule.split("SEPARATOR");
        let title = splitText[0];
        let description = splitText[1];
        this.table.update(
            {
                servers: newGuilds
            },
            {
                where : {
                    title: title,
                    description : description
                }
            }
        )

        this.set(schedule,newGuilds.split(","));

    }

    async checkServerSchedules(msg){
        let guildId,channel;
        try{
            guildId = msg.guild.id;
            channel = msg.channel;
        }catch{
            return;
        }
        let keys = this.keys();
        for(let key of keys){
            if(!(this.get(key).includes(guildId))){
                let state = await this.sendScheduleUpdate(msg,key);
                if(state == 2) break;
                let servers = this.get(key);
                servers.push(guildId);
                this.set(key,servers);
                this.addServerToSchedule(guildId,key);
            }
        }
    }

    async sendScheduleUpdate(msg,key){
        return new Promise((resolve,reject) =>{
            setTimeout(()=>{
                let text = key.split("SEPARATOR");
                let title = text[0];
                let description = text[1];
                let embed = new MessageEmbed()
                    .setColor("8B31F0")
                    .setTitle(title)
                    .setDescription(description);
                
                resolve(this.client.send(msg,{embeds: [embed]},true));
            },1000)
        })
    }
}