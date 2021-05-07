require('dotenv').config();
const Discord = require('discord.js');

const profileModel = require("../../models/profileSchema");
const stealModel = require("../../models/stealSchema");



const cooldowns = new Map();


module.exports = async (Discord, client, message) => {

    const prefix = '-';

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
  

    const command = client.commands.get(cmd);


 
 
    console.log(command, message.author.id);

   
    if (!command) return message.channel.send("This command doesn't exist.")


    
      let profileData;
      try {
        profileData = await profileModel.findOne({ userID: message.author.id });
        if (!profileData) {
          let profile = await profileModel.create({
            userID: message.author.id,
            serverID: message.guild.id,
            coins: 1000,
            bank: 0,
          });
          profile.save();
        }
      } catch (err) {
        console.log(err);
      }
      


    //If cooldowns map doesn't have a command.name key then create one.
  const {Collection} = require('discord.js');
    if(command.cooldown) {
        if(!cooldowns.has(command.name)){
            cooldowns.set(command.name, new Collection());
        }
    
        const current_time = Date.now();
        const time_stamps = cooldowns.get(command.name);
        const cooldown_amount = (command.cooldown) * 1000;

        //If time_stamps has a key with the author's id then check the expiration time to send a message to a user.
        if(time_stamps.has(message.author.id)){
            const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;
        


            if(current_time < expiration_time){
                const time_left = (expiration_time - current_time) / 1000;

                return message.reply(` wait ${time_left.toFixed(1)} more seconds before using ${command.name}`);
            }
        }

        //If the author's id is not in time_stamps then add them with the current time.
        time_stamps.set(message.author.id, current_time);
        //Delete the user's id once the cooldown is over.
        setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
        


        try{
          command.execute(message, args, cmd, client, Discord, profileData);
        } catch (err) {
            message.reply("There was an error executing this command!");
            console.log(err);
        }
  
    } else { 
      try{
        command.execute(message, args, cmd, client, Discord, profileData);
      } catch (err) {
          message.reply("There was an error executing this command!");
          console.log(err);
    }






    



}
}
