

const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect : 'sqlite',
    storage: `${__dirname}/audioResources.sqlite`,
    logging: false
});


const audio = sequelize.define('Radios',{
    name: Sequelize.STRING,
    url: Sequelize.TEXT,
    logo: Sequelize.STRING,
    country: Sequelize.STRING,
    premium: Sequelize.STRING,
    rythm: Sequelize.STRING
});

const Countries = sequelize.define('Countries',{
    name: Sequelize.STRING

});

const RythmTypes = sequelize.define('RythmTypes' , {
    name: Sequelize.STRING
});


module.exports.database = sequelize;
/*
const fs = require('fs');

const country = JSON.parse(fs.readFileSync('./countryRadios.txt'));
const rythm = JSON.parse(fs.readFileSync('./rythmRadios.txt'));

let id = 1;
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

let onlyOne = [];
let onlyCountries = [];
let onlyRythmTypes = [];


let checkList = [];
let countryId = 1;
for(let element of countryRadios){
    for(let radio of element){
        onlyOne.push(radio);
        if(!checkList.includes(radio.country)){
            onlyCountries.push({name: radio.country , id : countryId})
            checkList.push(radio.country);
            countryId += 1;
        }
    }
}
let rythmTypeId = 1;
for(let element of rythmRadios){
    for(let radio of element){
        onlyOne.push(radio);
        if(!checkList.includes(radio.rythm)){
            onlyRythmTypes.push({name: radio.rythm , id : rythmTypeId});
            checkList.push(radio.rythm);
            rythmTypeId += 1;
        }
    }
}

(async () =>{
    await audio.sync({force: true});
    await Countries.sync({force: true});
    await RythmTypes.sync({force: true});
    audio.bulkCreate(onlyOne).then(()=>{
        console.log("Datas Saved");
    })
    Countries.bulkCreate(onlyCountries).then(()=>{
        console.log("Datas Saved");
    })
    RythmTypes.bulkCreate(onlyRythmTypes).then(()=>{
        console.log("Datas Saved");
    })

})();

*/