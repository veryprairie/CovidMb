const {MessageEmbed} = require('discord.js');

const profileModel = require("../models/profileSchema");
const mongoose = require("mongoose");
const fetch = require ("node-fetch");
const fs = require('fs');
const request = require('request');

module.exports = {
    name: "covidmb",
    cooldown: 20,
    description: "Daily Covid-19 Data",
    async execute(message, args, cmd, client, Discord, profileData) {
        
        let mbcovid_url = 'https://services.arcgis.com/mMUesHYPkXjaFGfS/arcgis/rest/services/mb_covid_cases_summary_statistics/FeatureServer/0/query?where=1%3D1&outFields=Last_Update,New_Cases,Active_Cases,Area,Area_Name,Rate,RHA,Active_ICU_Patients,Active_Hospitalizations,ObjectId&outSR=4326&f=json';
        

        let options = {json: true};
        
        

        const response = await fetch(mbcovid_url);
        const data = await response.json();
        let finalData = [];
  



        
        request.get(mbcovid_url, options, (error, res, body) => {
            if (error) {
                return  console.log(error)
            };
        
            if (!error && res.statusCode == 200) {
                // do something with JSON, using the 'body' variable
                let bodyString = JSON.stringify(body.features);
                let dataString = JSON.parse(bodyString);
           
                for(entry of dataString) {
                    finalData.push({ID: entry.attributes["ObjectId"], Area: entry.attributes["Area_Name"], NewCases: entry.attributes["New_Cases"], ActiveCases: entry.attributes["Active_Cases"]})
                }
               console.table(finalData);
               let embed = new MessageEmbed()
                 .setColor('#304281')
                 .setTitle(`New MB Covid-19 Cases`)
   
      
                 for(entry of finalData) {
                    if (entry["NewCases"] != null) {
    
        
                     embed.addField("------------------------------------------------", 
                    `**${entry["Area"]}** - - New Cases: ${entry["NewCases"]} - Active Cases: ${entry["ActiveCases"]}`)
                    }
                 }
      
   
      message.channel.send(embed);
            };
        });


     

        //     data = JSON.parse(data);
        //     // const { New_Cases, Active_Cases } = data;
        //     // document.getElementById('New').textContent = New_Cases;
        //     // document.getElementById('Active').textContent = Active_Cases;

      


        //     const NewCases = data.New_Cases
        //     const ActiveCases = data.Active_Cases
        //     console.log(dataParse);















 

    
    
    

    //   const Users = await searchCursor.toArray();



//       //CREATES A NEW ARRAY OF OBJECTS WITH TOTALS AND USERNAMES
//     let total = [];
//     let resultTotal = [];
//     let marketTotal = 0;

//     for (entry of data) {
//     // //   const coinBank = entry["coins"] + entry["bank"];

      
//     // //   marketTotal = marketTotal + coinBank;

//     //   const userObject = await client.users.fetch(entry.userID);
//     //   const userName = userObject.username;
      
//       total.push({LastUpdate: entry["Last_Update"], NewCases: entry["New_Cases"], TotalActiveCases: entry["Active_Cases"], total: coinBank});

//     }
//     //   // if (result.hasOwnProperty(entry)) {
//     //     // var innerObj = {};
//     //     // innerObj[entry] = result[entry];
       
//     //   // }

//     console.table(total);

  



    


//     //   console.table(total);

//     //   let i = 0
//     //   //EMBED and SEND DATA
//     //   let embed = new MessageEmbed()
//     //   .setColor('#304281')
//     //   .setTitle(`Market Summary  ($${marketTotal})`)
   
      
//     //   for(entry of total) {
//     //     // console.log(entry);
//     //   i++
        
//     //     embed.addField("------------------------------------------------", 
//     //     `**${i}. ${entry["userID"]} - - $${entry["total"]}** - - - Wallet: $${entry["coins"]} - Bank: $${entry["bank"]}`)

//     //   }
   
//     //   message.channel.send(embed);
      
//   //  console.log("RESULT LENGTH IS:"+ result[1][Object.entries(2));


      
//   //  for(let i = 0; i < result.length; i++){
//   //       for(let j = 0; j < result[i].length; j++){
//   //         console.log(result[i][j]);
//   //       }     
//   //     }

  

//   //     const newEmbed = new MessageEmbed()
//   //     .setColor('#304281')
//   //     .setTitle('Market Summary')
//   //     .addField(`person`, "Money" )
//   //     .addField("Another Name", "More Money");
  //     message.channel.send(newEmbed);
     
    },
  };