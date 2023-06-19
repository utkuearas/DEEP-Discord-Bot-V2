const customEmbed = require('./customEmbed.js');

module.exports = (client) => {
    let embed = new customEmbed()
        .setTitle('Countries')
        .setDescription('Type the number of the country you want by using prefix\nExample: `?1`');

    let countries = client.resourceManager.get('Countries');

    let list = [];
    for(let country of countries){
        list.push({name: `${country.id})`,value:`${country.name}`,inline: true});
    }

    embed.addFields(list);
    return embed;
}


    