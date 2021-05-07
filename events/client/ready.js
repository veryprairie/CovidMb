const request = require('request');
const discord = require("discord.js");


module.exports = async (Discord, client, message) =>{
    console.log('BotBot is Ready!');
    
    let index = 0;
    request(process.env.MBDATA, function(err, res, body) {
        let json = JSON.parse(body);
        
        const postDate = json.features[0].attributes.Last_Update;
        let newCases = json.features[0].attributes.New_Cases;
        let activeCases = json.features[0].attributes.Active_Cases;
        // let icu = json.features[0].attributes.Active_ICU_Patients;
        // let hospital = json.features[0].attributes.Active_Hospitalizations;
        });
    setInterval(function() {
        request(process.env.MBDATA, function(err, res, body) {
            let json = JSON.parse(body);
            
            const postDate = json.features[0].attributes.Last_Update;
            let newCases = json.features[0].attributes.New_Cases;
            let activeCases = json.features[0].attributes.Active_Cases;
            // let icu = json.features[0].attributes.Active_ICU_Patients;
            // let hospital = json.features[0].attributes.Active_Hospitalizations;
         
            const arrayOfStatus = [
                // `Updated: ${postDate}`,
                `New Cases: ${newCases}`,
                `Active Cases: ${activeCases}`,
                // `ICU: ${icu}`,
                // `Hospitalizations: ${hospital}`
            ]
         
            if(index === arrayOfStatus.length) index = 0;
            const status = arrayOfStatus[index];
            console.log(status);
            client.user.setActivity(status, {type: 'WATCHING'});
            index++;
            });
          

           
    }, 10000);

    
    

        
      



}


