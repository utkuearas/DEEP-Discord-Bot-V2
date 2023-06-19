const customEmbed = require('./customEmbed.js');

module.exports = (id,client) => {
    let embed = new customEmbed();
    let country = client.resourceManager.getAllDatas("Countries")[id-1].name;
    embed.setTitle(country);
    let radios = client.resourceManager.getCountryRadiosInfo(country);
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