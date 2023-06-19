
module.exports = (client,msg) =>{
    let servers = client.serverCache;

    for(let serverId of servers){
        client.channels.fetch(serverId).then((channel) =>{
            channel.send("DEEP is rebooted").catch(err =>{
                console.log(err);
            })
        });
    }
    
}