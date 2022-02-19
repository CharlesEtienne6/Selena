const Discord = require ('discord.js');
module.exports.execute = ('message', async(bot, message, args) => {
    if (message.content === prefix + "help has") {
        let embed = new Discord.MessageEmbed()
            .setTitle("__Comment utiliser la commande has ?__")
            .setColor("#22DD56")
            .setDescription(`Donne la liste de tous les utilisateurs possédant le rôle mentionné\n${prefix} + has + @rôle`)
            .setImage("https://i.pinimg.com/originals/86/31/e9/8631e9aea3f6e6467e193422bacc2112.jpg")
            .setFooter("MLBB-SN", "https://i.pinimg.com/564x/36/d7/b9/36d7b9067fe47db3d23090abbe6c22aa.jpg")
            .setTimestamp()
        message.channel.send(embed)
    }
})