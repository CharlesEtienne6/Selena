const Discord = require ('discord.js');
module.exports.execute = ('message', async(bot, message, args) => {
    if(message.content === prefix + "help avatar"){
        let embed = new Discord.MessageEmbed()
        .setTitle("__Comment utiliser la commande avatar ?__")
        .setColor("#22DD56")
        .setDescription(`${prefix} + avatar **ou** ${prefix} + avatar + @user`)
        .setImage("https://i.pinimg.com/originals/52/9e/91/529e9132bb46e12200acc199801d454e.jpg")
        .setFooter("AWAKEN", "https://i.pinimg.com/564x/36/d7/b9/36d7b9067fe47db3d23090abbe6c22aa.jpg")
        .setTimestamp()
        message.channel.send(embed)
    }
})