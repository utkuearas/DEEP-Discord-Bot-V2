module.exports = class{
    constructor(_client){
        this.client = _client;
    }

    async checkSendMessages(msg,schedule){
        let channel = msg.channel;
        let deep = channel.guild.me;
        if(channel.permissionsFor(deep).has("SEND_MESSAGES") && channel.permissionsFor(deep).has("VIEW_CHANNEL")){
            return 0;
        }else if(schedule){
            return 2;
        }else{
            msg.member.user.send("I don't have permission for send messages").catch(error =>{
                console.log("PERMİSSİON ERROR");
            })
            return 1;
        }
    }
}