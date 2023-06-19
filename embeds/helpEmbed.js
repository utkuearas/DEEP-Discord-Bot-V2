const customEmbed = require('./customEmbed.js');
const fs = require('fs');
const prefixData = JSON.parse(fs.readFileSync('./prefix.txt',{encoding : 'utf-8', flag: 'r'}));
const DEFAULT_PREFIX = "?";
module.exports = (client,msg) =>{
    let commands = client.commandsManager;
    let keys = commands.keys();
    let args = "";
    let embed = new customEmbed()
        .setTitle("My Commands");
    let desc = "";
    let prefix = prefixData[msg.guild.id];
    if(prefix == undefined){
        prefix = DEFAULT_PREFIX;
    }
    
    for(let key of keys){
        try{
            let funcD = commands.get(key)(client,msg,args,true).desc;
            if(funcD == "") continue;
            desc += `**${prefix}${key.substring(0,key.length-3)}** ${funcD}\n`;
        }catch(err){
        }
    }
    embed.setDescription(desc);
    return embed;

}