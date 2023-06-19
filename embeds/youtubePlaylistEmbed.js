const customEmbed = require('./customEmbed.js');
module.exports = (count,url) => {
    let embed = new customEmbed()
        .setTitle(`${count} music added to queue`)
        .setThumbnail(url);

    return embed;
}