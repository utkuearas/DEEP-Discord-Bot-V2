

module.exports.command = (client,msg,args,desc = false) =>{
    if(desc){
        this.desc = "Type bug and describe the bug if you encounter with a bug";
        return this;
    }


    if(args.length == 0) return;

    let bug = args.join(" ");
    client.channels.fetch("994272434742099979").then(channel=>{
        channel.send(bug);
    });
}