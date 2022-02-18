module.exports = {
    execute: (bot, message, args) => {
        if(message.content === prefix + "ping"){
            let msg = await message.channel.send("Ping en cours...")
    
            let embed = new Discord.MessageEmbed()
            .addField("Votre ping est de  :", Math.floor(msg.createdAt - message.createdAt))
            .addField("Ma latence est de ", bot.ws.ping)
            message.delete()
            message.channel.send(embed)
        }
    }
}