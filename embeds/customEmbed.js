const { MessageEmbed } = require("discord.js");

module.exports = class customEmbed extends MessageEmbed{

    constructor(){
        super();
        this.color = "8B31F0";
    }
}