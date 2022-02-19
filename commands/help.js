const Discord = require ('discord.js');
const prefix = "s!";

module.exports.execute = ('message', async(bot, message, args) => {
    let embed = new Discord.MessageEmbed()
    .setTitle("__La liste des commandes du bot__")
    .setColor("#22DD56")
    .setDescription(`Son prefix est :** ${prefix} **\n**__Les commandes publiques sont :__ avatar, ping, say, has, rank, meme**\n**__Les commandes pour le staff sont :__ kick, mute, ban, clear**\n**__Les commandes NSFW (-18) sont :__** hentai, fuck\nAjout sous peu de commandes pour mieux connaître les héros\n**Pour toute information sur une commande faire : **__${prefix} + help + nom de la commande__`)
    .setImage("https://i.pinimg.com/originals/86/31/e9/8631e9aea3f6e6467e193422bacc2112.jpg")
    .setFooter("MLBB-SN", "https://i.pinimg.com/564x/36/d7/b9/36d7b9067fe47db3d23090abbe6c22aa.jpg")
    .setTimestamp()
    message.channel.send(embed)
})