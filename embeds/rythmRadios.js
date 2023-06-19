const customEmbed = require('./customEmbed.js');

module.exports = (id,client) => {
    let embed = new customEmbed();
    let genre = client.resourceManager.getAllDatas("RythmTypes")[id-1].name;
    embed.setTitle(genre);
    let radios = client.resourceManager.getGenreRadiosInfo(genre);
    let description = "";
    for(let i = 1;i <= radios.length;i++){
        let radioName = radios[i-1].name;
        let id = radios[i-1].id;
        let line = `${id}) ${radioName}\n`;
        description += line;
    }
    embed.setDescription(description);
    return embed;
}