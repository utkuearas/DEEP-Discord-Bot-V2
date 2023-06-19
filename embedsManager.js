const { Collection } = require("discord.js");
const fs = require('fs');

const embedsDIR = fs.readdirSync('./embeds/').filter(object => object.endsWith('.js'));


module.exports = class embedsManager extends Collection{

    constructor(client){
        super();
        this.client = client;
        for(let fileName of embedsDIR){
            let embed = require('./embeds/'+fileName);
            this.set(fileName , embed);
        }
    }
}