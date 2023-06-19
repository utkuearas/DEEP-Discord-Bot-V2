module.exports.command = (client,msg,args,desc = false) => {

    if(desc){
        this.desc = "It's mee"; 
        return this;
    }
    client.send(msg,{embeds: [client.embedsManager.get('helpEmbed.js')(client,msg)]});

}