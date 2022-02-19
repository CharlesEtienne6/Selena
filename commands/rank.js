const Discord = require ('discord.js');
module.exports.execute = ('message', async(bot, message, args) => {
    let lvl = userniveau[2];
            let exp = userxp[1];
            let lvlsup = userpniveau[3];

            let embed = new Discord.MessageEmbed()
            .setAuthor("RANKCARD")
            .setColor("#a81d16")
            .setDescription(`LVL: ${lvl}     XP: ${exp}     LVLSUP: ${lvlsup}`)
            .setImage(message.author.displayAvatarURL({ format: 'png', dynamic: true }))
            .setTimestamp()
            .setTitle(message.author.username)
            .setFooter("MLBB", "https://i.pinimg.com/564x/36/d7/b9/36d7b9067fe47db3d23090abbe6c22aa.jpg")
            message.channel.send(embed)
})