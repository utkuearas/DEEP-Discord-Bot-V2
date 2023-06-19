
const { Collection } = require('discord.js');
const fs = require('fs');

module.exports = class{

    constructor(_client){
        this.client = _client;
        this.commands = new Collection();
        this.loadCommands();
    }

    loadCommands(){
        let fileNames = fs.readdirSync(__dirname + "/commands/");
        for(let fileName of fileNames){
            let filePath = __dirname + "/commands/" + fileName;
            let command = require(filePath);
            this.commands.set(fileName,command);
        }
    }

    isOwner(msg){
        return msg.author.id == "353986240191791106";
    }

    async ownerRunsCommand(msg){
        if(!this.isOwner(msg)) return;
        let commandPart = msg.content.split(/ +/)[0].substring(1);
        let fileName = commandPart + ".js";
        if(!this.commands.has(fileName)) return;

        this.commands.get(fileName)(this.client,msg);
    }

}