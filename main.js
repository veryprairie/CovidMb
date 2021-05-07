const Discord = require('discord.js');
const request = require('request');

const mongoose = require("mongoose");
const command_handler = require('./handlers/command_handler');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const cooldowns = new Map();
require("dotenv").config();
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
const prefix = '-';
const event_handler = require(`./handlers/event_handler`);
const message = require('./events/guild/message');
// let role = message.guild.roles.cache.find(role => role.id === '814268579275866122');

// ['command_handler', 'event_handler'].forEach(handler =>{
//     require(`./handlers/${handler}`) //(client, Discord);
// })
event_handler(client);
command_handler(client);

let options = {json: true};
setInterval(function() { 
request(process.env.MBDATA, function(err, res, body) {
let json = JSON.parse(body);

let postDate = json.features[0].attributes.Last_Update;
let newCases = json.features[0].attributes.New_Cases;
let activeCases = json.features[0].attributes.Active_Cases;
// let icu = json.features[0].attributes.Active_ICU_Patients;
// let hospital = json.features[0].attributes.Active_Hospitalizations;
client.user.setUsername(`As of ${postDate}`)
console.log('Name Update: ' + client.user.username + ' at ' + new Date().getTime())

var roleName = `${postDate}: ${newCases} new cases`

// role.edit({name: roleName})








});}, 100000);


mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => {
    console.log("Connected to the database!");
})
.catch((err) => {
    console.log(err);
})











client.login(process.env.DISCORD_TOKEN);
