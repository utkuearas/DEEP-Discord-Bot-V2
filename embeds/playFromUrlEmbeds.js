const customEmbed = require('./customEmbed.js');
module.exports = (url) => {

    let embed = new customEmbed()
        .setTitle("Play From Url")
        .setDescription(`Requested Url ${url}`);

    return embed;
}