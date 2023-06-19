module.exports.command = (client,msg,args,desc = false) => {
    if(desc){
        this.desc = ""; 
        return this;
    }
    if(!client.resourceManager.serverLastStates.has(msg.guild.id)) return 0;
    let content = msg.content.substring(1);
    let number = parseInt(content);
    if(isNaN(number)){
        return 0;
    }else{
        if(client.resourceManager.serverLastStates.get(msg.guild.id) == "Countries"){
            let countryCount = client.resourceManager.get("Countries").length;
            if(number <= 0 || number > countryCount){
                return 0;
            }else{
                client.send(msg,{embeds: [client.embedsManager.get("countryRadios.js")(number,client)]});
                return 1;
            }
        }else{
            let genresCount = client.resourceManager.get("RythmTypes").length;
            if(number <= 0 || number > genresCount){
                return 0;
            }else{
                client.send(msg,{embeds: [client.embedsManager.get("rythmRadios.js")(number,client)]});
                return 1;
            }
        }
    }
}
    

