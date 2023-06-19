const fs = require( 'fs');

const myIntents = require( './intents.js');
const DEEP = require( './DEEP.js');
const customEmbed = require('./embeds/customEmbed.js');
const { Collection } = require('discord.js');
//const TOKEN = "Njg0NDg3NjI5MTM5NjA3NTcz.Xl60xw.ahu6BRAF0VxPBth-t1Wjyz9bkxg";
const TOKEN = "NjMyNjIzNTA0NjUwNTM0OTE0.GyVsP1.5BrIVr_W54O6OSpRmLHOoOp03nSdJz1wA5Fm7w";
const api = "AIzaSyAAED48Op9G-M1go-A2_8syeOCI80Fo1kE";

let count = 1;

(async ()=>{
    return new (await DEEP)(myIntents);
})().then((client)=>{
    
    client.on('messageCreate', async (msg) =>{
        
        if(!msg.author.bot){
            console.log(msg.content);
        }else{
            return;
        }

        await client.ownerSpecials.ownerRunsCommand(msg);

        let result = await client.commandsManager.isCommand(msg);
        await client.scheduleManager.checkServerSchedules(msg);

        if(result || result == undefined){
            return;
        }
        return;
    })
    client.on('ready', async () =>{

            client.user.setActivity('?help | Power FM',{type: 'LISTENING'});
    });

    client.login(TOKEN);
})



