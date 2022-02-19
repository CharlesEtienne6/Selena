const Discord = require ('discord.js');
const prefix = "s!";

module.exports.execute = ('message', async(bot, message, args) => {
        let embed = new Discord.MessageEmbed()
            .setTitle("__Comment utiliser la commande has ?__")
            .setColor("#22DD56")
            .setDescription(`Donne la liste de tous les utilisateurs possédant le rôle mentionné\n${prefix} + has + @rôle`)
            .setImage("https://i.pinimg.com/originals/52/9e/91/529e9132bb46e12200acc199801d454e.jpg")
            .setFooter("MLBB-SN", "https://i.pinimg.com/564x/36/d7/b9/36d7b9067fe47db3d23090abbe6c22aa.jpg")
            .setTimestamp()
        message.channel.send(embed)
})