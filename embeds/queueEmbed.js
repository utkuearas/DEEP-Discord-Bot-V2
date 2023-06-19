const customEmbed = require('./customEmbed.js');

module.exports = (queue,page) =>{

    let embed = new customEmbed()
        .setTitle("Music queue");

    let description = "";
    let index = (page - 1) * 10;
    
    for(let music of queue){
        if(index == 0) description += `**Now playing:** ${music.title} **${music.duration}**\n`;
        else description += `**${index})** ${music.title} **${music.duration}**\n`;
        index++;
    }
    embed.setDescription(description);
    embed.setFooter({text: `Page : ${page}`});
    return embed;
}