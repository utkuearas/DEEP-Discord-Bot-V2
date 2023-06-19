const fs = require('fs');
const got = require('got');



const country = JSON.parse(fs.readFileSync('../audioResources/countryRadios.txt'));
const rythm = JSON.parse(fs.readFileSync('../audioResources/rythmRadios.txt'));

let id = 1;

async function piping(path,logo){
    return new Promise((resolve,reject)=>{
        got.stream(logo)
            .on('error',()=>{resolve();})
            .pipe(fs.createWriteStream(path))
            .on('finish',()=>{resolve();})
            
    })
}
const countryRadios = Object.keys(country).map(index =>{
    let radios = country[index];
    let i = 0;
    for(let radio of radios){
        radio.country = index;
        radio.id = id;
        if(i >= 3){
            radio.premium = "country";
        }else{
            radio.premium = "free";
        }
        i++;
        id++;
    }
    return radios;
})
const rythmRadios = Object.keys(rythm).map(index =>{
    let radios = rythm[index];
    let i = 0;
    for(let radio of radios){
        radio.rythm = index;
        radio.id = id;
        if(i >= 3){
            radio.premium = "rythm";
        }else{
            radio.premium = "free";
        }
        i++;
        id++;
    }
    return radios;
})

onlyOne = [];

for(let element of countryRadios){
    for(let radio of element){
        onlyOne.push(radio);
    }
}
for(let element of rythmRadios){
    for(let radio of element){
        onlyOne.push(radio);
    }
}
id = 1;

console.log(onlyOne);
(async ()=>{
    for(let radio of onlyOne){
        let logo = radio.logo;
        let path;
        if(radio.country != undefined){
            path = `./countryRadios/${id}.jpg`;
        }else{
            path = `./rythmRadios/${id}.jpg`;
        }
        await piping(path,logo);
        id++;
        console.log(id);
    }
})();

