const customEmbed = require('./customEmbed.js');

module.exports = (id,client)=>{

    let radioName = client.resourceManager.getInformation(id).name;
    let embed = new customEmbed()
        .setDescription(`I'm already playing ${radioName} right now :smile:`);

    return embed;
}