
const customEmbed = require('./customEmbed.js');

module.exports = (title,duration,thumbnailUrl,isQueue = false) =>{
    let embedTitle;
    if(isQueue){
        embedTitle = "Added to queue";
    }else{
        embedTitle = "Now playing";
    }
    let embed = new customEmbed()
        .setTitle(embedTitle)
        .setDescription(title+ "\n" + duration)
        .setThumbnail(thumbnailUrl);
    return embed;
}