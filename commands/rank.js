const Discord = require ('discord.js');
module.exports.execute = ('message', async(bot, message, args) => {
    let msgauthorid = message.member.user.id

    if (message.author.bot) return
    if (!db.get("Infos_membres").find({ id: msgauthorid }).value()) {
        db.get("Infos_membres").push({ id: msgauthorid, xp: 1, niveau: 1, xp_p_niveau: 100 }).write()
        console.log("ça marche")
    } else {
        let userxpdb = db.get("Infos_membres").filter({ id: msgauthorid }).find("xp").value()
        let userxp = Object.values(userxpdb)
        let userniveaudb = db.get("Infos_membres").filter({ id: msgauthorid }).find("niveau").value()
        let userniveau = Object.values(userniveaudb)
        let userpniveaudb = db.get("Infos_membres").filter({ id: msgauthorid }).find("xp_p_niveau").value()
        let userpniveau = Object.values(userpniveaudb)

        let chiffre = [3, 4, 5, 6, 7]
        let index = Math.floor(Math.random() * (chiffre.length - 1) + 1)

        db.get("Infos_membres").find({ id: msgauthorid }).assign({ id: msgauthorid, xp: userxp[1] += chiffre[index] }).write()

        if (userxp[1] >= userpniveau[3]) {
            let lvlup = bot.guilds.cache.get("818459519646564373").channels.cache.get("819643226629210152")
            db.get("Infos_membres").find({ id: msgauthorid }).assign({ id: msgauthorid, xp: userxp[1] = 1 }).write()
            db.get("Infos_membres").find({ id: msgauthorid }).assign({ id: msgauthorid, niveau: userniveau[2] += 1 }).write()
            db.get("Infos_membres").find({ id: msgauthorid }).assign({ id: msgauthorid, xp_p_niveau: userpniveau[3] += 150 }).write()
            lvlup.send(`GG ${message.author} vous venez de passer au niveau ${userniveau[2]}`)
        }

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
    }
})