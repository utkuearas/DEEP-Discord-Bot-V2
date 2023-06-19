const customEmbed = require('./customEmbed.js');

module.exports = (id)=>{
    let embed = new customEmbed()
        .setTitle("Unknown Radio ID")
        .setDescription(`I couldn't find the radio by given id:\nRequested ID: ${id}`);
    return embed;
}