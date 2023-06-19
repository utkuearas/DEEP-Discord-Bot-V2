
const fs = require('fs');
const got = require('got');
let radioLinks2 = JSON.parse(fs.readFileSync(__dirname+"/audioResources/rythmRadios.txt"))
let radioLinks1 = JSON.parse(fs.readFileSync(__dirname+"/audioResources/countryRadios.txt"))
async function main1(){
    let keys = Object.keys(radioLinks1);
    let index = 1;
    let states = {};
    for(let key of keys){
        let radios = radioLinks1[key];
        for(let radio of radios){
            letState = await request(radio.url,index);
            states[index] = letState;
            console.log(index+" "+letState)
            index+= 1;
        }
    }
    keys = Object.keys(radioLinks2);
    for(let key of keys){
        let radios = radioLinks2[key];
        for(let radio of radios){
            letState = await request(radio.url,index);
            states[index] = letState;
            console.log(index+" "+letState)
            index+= 1;
        }
    }
    return states;

}

function main(){
    let data = main1();
    let keys = Object.keys(data);
    for(let key of keys){
        console.log(key + " " + data[key])
    }
    
}

function sleep(){
    return new Promise((resolve,reject) =>{
        setTimeout(()=>{
            resolve();
        },3000)
    })

}

async function request(url,index){
    let state = 1;
    let stream = got.stream(url)
    stream.on('error', ()=>{
        if(state){
            state = 0;
        }
    });
    await sleep();
    return state;
}
main()