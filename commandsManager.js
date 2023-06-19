
const { Collection } = require('discord.js');
const fs = require('fs');
const {command} = require("./commands/specialCases");
const specialCase = command;
const commandsDIR = fs.readdirSync('./commands/');

const prefixData = JSON.parse(fs.readFileSync('./prefix.txt',{encoding : 'utf-8', flag: 'r'}));

const DEFAULT_PREFIX = '?';

module.exports = class commandsManager extends Collection{

    constructor(_client){
        super();
        this.client = _client;
        
        for(let fileName of commandsDIR){

            let { command } = require('./commands/'+fileName);

            this.set(fileName,command);
        }
        
    }

    isCommand(msg){
    
        if(msg.author.bot == true) return 0;
        if(msg.guild == null) return 0;

        let prefix;

        if(prefixData[msg.guild.id] == undefined) prefix = DEFAULT_PREFIX;
        else prefix = prefixData[msg.guild.id];

        let content = msg.content.toLowerCase();

        if(!content.startsWith(prefix)) return 0;

        let split = content.split(/ +/);

        let args = [];
        if(split.length > 1) args = split.slice(1);
        
        let command = split[0].substring(1);

        return this.checkResult(command,msg,args);

        
    }

    checkResult(_command,msg,args){

        _command += '.js';

        if(!this.has(_command)){

            if(specialCase(this.client,msg)) return;

            this.client.send(msg,{embeds : [this.client.embedsManager.get('noCommandSignal.js')]});
            return 1;
        }



        return this.execute(_command,msg,args);

    }

    async execute(_command,msg,args){

        let result = await this.get(_command)(this.client,msg,args);
        
        return result;

    }
}