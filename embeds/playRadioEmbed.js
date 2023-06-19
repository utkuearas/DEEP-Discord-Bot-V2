const customEmbed = require('./customEmbed.js');
const { MessageAttachment } = require('discord.js');
const got = require("got");
module.exports = (name,logo,id, country = false ,rythm = false) =>{
    let embed = new customEmbed();
    embed.setTitle(name);
    embed.setDescription("Connecting to radio");
    let file;
    if(country){

        file = new MessageAttachment(`./images/countryRadios/${id}.jpg`);

        embed.setThumbnail(`attachment://${id}.jpg`);

        embed.setAuthor({name: country});

    }else if(rythm){

        file = new MessageAttachment(`./images/rythmRadios/${id}.jpg`);

        embed.setThumbnail(`attachment://${id}.jpg`);

        embed.setAuthor({name: rythm});

    }

    return [embed,file];
}

