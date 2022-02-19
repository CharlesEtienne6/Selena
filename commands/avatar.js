const Discord = require ('discord.js');
const prefix = "s!";

module.exports.execute = ('message', async(bot, message, args) => {
    if(message.content === prefix + "avatar"){
        message.delete()
        let embed = new Discord.MessageEmbed()
        .setDescription(`Voici votre avatar : <@${message.author.id}>`)
        .setImage(message.author.displayAvatarURL({format: 'jpeg'}))
        message.channel.send(embed)
    }else if(message.content.startsWith(prefix + "avatar")){
        message.delete()
        let embed = new Discord.MessageEmbed()
        .setDescription(`Voici l'avatar de : ${message.mentions.users.first()}`)
        .setImage(message.mentions.users.first().displayAvatarURL({format: 'jpeg'}))
        message.channel.send(embed)
    }
})