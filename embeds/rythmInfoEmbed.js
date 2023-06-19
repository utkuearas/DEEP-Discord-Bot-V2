const customEmbed = require('./customEmbed.js');

module.exports = (client) => {
    let embed = new customEmbed()
        .setTitle('Genres')
        .setDescription('Type the number of the genre you want by using prefix\nExample: `?1`');

    let rythmTypes = client.resourceManager.get('RythmTypes');

    let list = [];
    for(let genre of rythmTypes){
        list.push({name: `${genre.id})`,value:`${genre.name}`,inline: true});
    }

    embed.addFields(list);
    return embed;
}

