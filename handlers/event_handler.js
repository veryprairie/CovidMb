const fs = require('fs');
const process = require('process');


module.exports = (client, Discord) =>{
    console.log('event handler ready!');

    const load_dir = (dirs) => {
        const event_files = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.js'))
        console.log(event_files);

        for(const file of event_files){
           
            const event = require(`../events/${dirs}/${file}`);
           // const event = require(`./events/${dirs}/${file}`);
        
            const event_name = file.split('.')[0];
            console.log(event_name);
            client.on(event_name, event.bind(null, Discord, client));
        }
    }


    ['client', 'guild'].forEach(e => load_dir(e));

}