const customEmbed = require('./customEmbed.js');

module.exports = (title,duration,thumbnailUrl) =>{
    let embed = new customEmbed()
        .setTitle("Now playing")
        .setDescription(title + "\n" + duration)
        .setThumbnail(thumbnailUrl);

    return embed;
}