
module.exports.command = (client,msg,args,desc = false)=>{
    if(desc){
        this.desc = "Use this command in order to see the music queue";
        return this;
    }
    console.log(1);
    if(!client.youtubePlayer.haveAQueue(msg.guild.id)) return;

    let queue = client.youtubePlayer.serverQueues.get(msg.guild.id);
    let chunks = [];
    let index = 0;
    while(index < queue.length){
        let chunk = queue.slice(index,index+10);
        chunks.push(chunk);
        index += 10;
    }
    let embed = client.embedsManager.get("queueEmbed.js")(chunks[0],1);
    client.send(msg,{embeds: [embed]}).then(sentMsg =>{
        sentMsg.react('⬅️')
        sentMsg.react('➡️');
        configureCollector(sentMsg,chunks,client);
    })
}

function configureCollector(sentMsg,chunks,client){

    let collector = sentMsg.createReactionCollector({time: 86400000});
    let page = 1;
    let deep = sentMsg.member.user;
    collector.on('collect', (reaction,user) =>{

        
        if(user.bot) return;
        if(reaction._emoji.name == '➡️'){
            reaction.users.remove(user).catch(err =>{
                console.log(err);
                user.send("I don't have manage messages permission\nI need this permission to be able to work properly")
            });
            if(page == chunks.length) return;
            page += 1;
            if(page == 2) sentMsg.react('⬅️');
            let embed = client.embedsManager.get("queueEmbed.js")(chunks[page - 1],page); 
            sentMsg.edit({embeds:[embed]});

        }else if(reaction._emoji.name == '⬅️'){
            reaction.users.remove(user).catch(err =>{
                console.log(err);
                user.send("I don't have manage messages permission\nI need this permission to be able to work properly")
            })
            if(page == 1) return;
            page -= 1;
            if(page == chunks.length - 1) sentMsg.react('➡️');
            let embed = client.embedsManager.get("queueEmbed.js")(chunks[page - 1],page); 
            sentMsg.edit({embeds:[embed]});
            
        }
    })
    
}