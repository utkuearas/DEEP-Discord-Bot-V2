const { controlVoiceConnections } = require('../voiceControl/controlVoiceConnections.js');
const {StreamType} = require("@discordjs/voice");

module.exports.command = function(client,msg,args,desc = false){

    if(desc){
        this.desc = "Play radio or whatever it is"; 
        return this;
    }

    let type = checkSourceType(args);

    switch(type){
        case 0:
            client.send(msg,{embeds : [client.embedsManager.get('playMissing.js')]});
            break;
        case 1:
            
            let connection;
            let id = parseInt(args[0]);
            let state = client.voiceConnectionManager.checkPlayable(msg);
            if(!state) break;
            let bitrate = msg.member.voice.channel.bitrate;
            if(client.audioPlayer.hasAplayer(msg.guild.id)) { 
                if(client.audioPlayer.checkSameSource(id,msg.guild.id)){
                    client.send(msg,{embeds : [client.embedsManager.get('sameSourceId.js')(id,client)]})
                    break;
                }
                
                let player = client.audioPlayer.fetchPlayer(msg.guild.id);
                playRadio(id,client,msg,undefined,player,bitrate);
                break;
            }
            if(state == 1) connection = client.voiceConnectionManager.fetchVoiceConnection(msg.guild.id);
            if(state == 2) connection = client.voiceConnectionManager.connectChannel(msg.member.voice.channel);

            playRadio(id,client,msg,connection,undefined,bitrate);
            break;
        case 2:
            //client.send(msg,"Youtube functions are disabled, thanks for your patience");
            //return;
            client.youtubePlayer.playYoutubeMusic(msg);
            break;
        default:
            client.send(msg,{embeds : [client.embedsManager.get('errorSignal.js')]});
            break;
    }

}

function checkSourceType(args){


    if(args.length < 1){
        return 0;
    }else if(args.length == 1 && !!args[0] && !isNaN(+args[0].replace(/\s|\$/g, ''))){
        return 1;
    }else{
        return 2;
    }

}

function playRadio(id,client,msg,connection = undefined,player = undefined,bitrate){

    let radio = client.resourceManager.getInformation(id);
    if(!radio) {
        client.send(msg,{embeds: [client.embedsManager.get('radioIdOutOfRange.js')(id)]});
        return;
    }
    sendPlayRadioEmbed(radio,client,msg);

    let source = client.resourceManager.createSource(radio.url,bitrate);


    if(!player) {
        player = client.audioPlayer.createPlayerWithSource(msg.guild.id,source,id);
        connection.subscribe(player);
    }else{
        client.audioPlayer.changeSourceId(msg.guild.id,id);
    }
    
    player.play(source);
}

async function sendPlayRadioEmbed(radio,client,msg){

    let country = radio.country;
    let rythm = radio.rythm;


    if(country == null){
        country = false;
    }else{
        rythm = false;
    }

    let [embed,file] = client.embedsManager.get('playRadioEmbed.js')(radio.name, radio.logo, radio.id, country = country, rythm = rythm);

    client.send(msg,{embeds : [embed] , files : [file]});
}
