//Discord.js
const Discord = require ('discord.js');
const bot = new Discord.Client().setMaxListeners(200);

//Images
const memebdd = require("./images/meme.json")
const fuckbdd = require("./images/NSFW/fuck.json")
const hentaibdd = require("./images/NSFW/hentai.json")

//Lowdb
const low = require ("lowdb");
const FileSync = require ("lowdb/adapters/FileSync");
const { time } = require("console");
const { receiveMessageOnPort } = require("worker_threads");
const { userInfo } = require("os");
const { listeners } = require("process");
const { setTimeout } = require("timers");
const { fstat } = require('fs');

//Lowdb
const dbdb = new FileSync("db.json");
const db = low(dbdb);

db.defaults({Infos_membres : []}).write()

//Le prefix du bot
const prefix = "s!";

//Connexion du bot
bot.login(process.env.TOKEN)
bot.on("ready", async message => {

    let status = ["me faire coder","Mobile Legends","Genshin Impact","être le gémeau de l'ombre","chat avec Karina"]
    setInterval(function(){
        let stats = status[Math.floor(Math.random()*status.length)];
        bot.user.setActivity(stats, {type: "PLAYING"})
    }, 100000)

    console.log("Je suis prête !")
})

//commands
bot.on("message", async message => {
    
    let content = message.content.split(" ");
    let command = content[0];
    let args = content.slice(1);

    if(message.content.startsWith(prefix)) {
        try{
            let commandFile = require(`./commands/${command.split("  ")}.js`)
            commandFile.execute(bot, message, args);
        } catch (e){
            console.warn(`Erreur avec le handler ${e}`);
            return;
        }
    }
})
//!help clear
bot.on("message", message =>{
    if(message.content === prefix + "help clear"){
        let embed = new Discord.MessageEmbed()
        .setTitle("__Comment utiliser la commande clear ?__")
        .setColor("#22DD56")
        .setDescription(`${prefix} + clear + nombres de messages à supprimer`)
        .setImage("https://i.pinimg.com/originals/52/9e/91/529e9132bb46e12200acc199801d454e.jpg")
        .setFooter("AWAKEN", "https://i.pinimg.com/564x/36/d7/b9/36d7b9067fe47db3d23090abbe6c22aa.jpg")
        .setTimestamp()
        message.channel.send(embed)
    }
})

//!help say
bot.on("message", message =>{
    if(message.content === prefix + "help say"){
        let embed = new Discord.MessageEmbed()
        .setTitle("__Comment utiliser la commande say ?__")
        .setColor("#22DD56")
        .setDescription(`${prefix} + say + message`)
        .setImage("https://i.pinimg.com/originals/52/9e/91/529e9132bb46e12200acc199801d454e.jpg")
        .setFooter("AWAKEN", "https://i.pinimg.com/564x/36/d7/b9/36d7b9067fe47db3d23090abbe6c22aa.jpg")
        .setTimestamp()
        message.channel.send(embed)
    }
})

//!help ban
bot.on("message", message =>{
    if(message.content === prefix + "help ban"){
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Seul un administrateur peut utiliser cette commande")
        let embed = new Discord.MessageEmbed()
        .setTitle("__Comment utiliser la commande ban ?__")
        .setColor("#22DD56")
        .setDescription(`${prefix} + ban + utilisateur à ban + raison du ban`)
        .setImage("https://i.pinimg.com/originals/52/9e/91/529e9132bb46e12200acc199801d454e.jpg")
        .setFooter("AWAKEN", "https://i.pinimg.com/564x/36/d7/b9/36d7b9067fe47db3d23090abbe6c22aa.jpg")
        .setTimestamp()
        message.channel.send(embed)
    }
})

//!help mute
bot.on("message", message =>{
    if(message.content === prefix + "help mute"){
        if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("Seul un administrateur peut utiliser cette commande")
        let embed = new Discord.MessageEmbed()
        .setTitle("__Comment utiliser la commande mute ?__")
        .setColor("#22DD56")
        .setDescription(`${prefix} + mute + utilisateur à mute + durée (en chiffre) + raison`)
        .setImage("https://i.pinimg.com/originals/52/9e/91/529e9132bb46e12200acc199801d454e.jpg")
        .setFooter("AWAKEN", "https://i.pinimg.com/564x/36/d7/b9/36d7b9067fe47db3d23090abbe6c22aa.jpg")
        .setTimestamp()
        message.channel.send(embed)
    }
})

//!help kick
bot.on("message", message =>{
    if(message.content === prefix + "help kick"){
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Seul un administrateur peut utiliser cette commande")
        let embed = new Discord.MessageEmbed()
        .setTitle("__Comment utiliser la commande kick ?__")
        .setColor("#22DD56")
        .setDescription(`${prefix} + kick + utilisateur à kick + raison du kick`)
        .setImage("https://i.pinimg.com/originals/52/9e/91/529e9132bb46e12200acc199801d454e.jpg")
        .setFooter("MLBB-SN", "https://i.pinimg.com/564x/36/d7/b9/36d7b9067fe47db3d23090abbe6c22aa.jpg")
        .setTimestamp()
        message.channel.send(embed)
    }
})

//!help meme
bot.on("message", message =>{
    if(message.content === prefix + "help meme"){
        let embed = new Discord.MessageEmbed()
        .setTitle("__Comment utiliser la commande meme ?__")
        .setColor("#22DD56")
        .setDescription(`${prefix} + meme`)
        .setImage("https://i.pinimg.com/originals/52/9e/91/529e9132bb46e12200acc199801d454e.jpg")
        .setFooter("MLBB-SN", "https://i.pinimg.com/564x/36/d7/b9/36d7b9067fe47db3d23090abbe6c22aa.jpg")
        .setTimestamp()
        message.channel.send(embed)
    }
})

//!help fuck
bot.on("message", message =>{
    if(message.content === prefix + "help fuck"){
        let NSFW = bot.guilds.cache.get("818459519646564373").channels.cache.get("850711519561908304")
        let embed = new Discord.MessageEmbed()
        .setTitle("__Comment utiliser la commande fuck ?__")
        .setColor("#22DD56")
        .setDescription(`${prefix} + fuck + utilisateur à fuck\nPS: Le meme n'apparaitra que dans le salon <#` + NSFW + `>. Veuillez donc y utiliser la commande!`)
        .setImage("https://i.pinimg.com/originals/52/9e/91/529e9132bb46e12200acc199801d454e.jpg")
        .setFooter("MLBB-SN", "https://i.pinimg.com/564x/36/d7/b9/36d7b9067fe47db3d23090abbe6c22aa.jpg")
        .setTimestamp()
        message.channel.send(embed)
    }
})

//!help hentai
bot.on("message", message =>{
    if(message.content === prefix + "help hentai"){
        let hentai = bot.guilds.cache.get("818459519646564373").channels.cache.get("850711694136311828")
        let embed = new Discord.MessageEmbed()
        .setTitle("__Comment utiliser la commande hentai ?__")
        .setColor("#22DD56")
        .setDescription(`${prefix} + hentai\nPS: Le meme n'apparaitra que dans le salon <#` + hentai + `>`)
        .setImage("https://i.pinimg.com/originals/52/9e/91/529e9132bb46e12200acc199801d454e.jpg")
        .setFooter("MLBB-SN", "https://i.pinimg.com/564x/36/d7/b9/36d7b9067fe47db3d23090abbe6c22aa.jpg")
        .setTimestamp()
        message.channel.send(embed)
    }
})

//!avatar
bot.on('message', message =>{
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

//!rules
bot.on("message", async message =>{
    if(message.content.startsWith(prefix + 'rules')){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Seul un administrateur peut utiliser cette commande")
        message.delete()
        let msg = message.content.slice(7)
        if(!msg) return message.reply("Entrez un message")

        let embed = new Discord.MessageEmbed()
        .setDescription(msg)
        let msgreaction = await message.channel.send(embed)

        await msgreaction.react("✅")
    }
})

//Réactions + rôles de rules
bot.on("raw", event => {
    if(event.t === "MESSAGE_REACTION_ADD"){
        if(event.d.message_id === "820382073428377650"){
            let guild = bot.guilds.cache.get(event.d.guild_id)
            let member = guild.members.cache.get(event.d.user_id)
            let channel = guild.channels.cache.get(event.d.channel_id)
            if(member.bot) return

            if(event.d.emoji.name === "✅"){
                member.roles.add('818599302007750668')
            }
        }
    }else if(event.t === "MESSAGE_REACTION_REMOVE"){
        if(event.d.message_id === "820382073428377650"){
            let guild = bot.guilds.cache.get(event.d.guild_id)
            let member = guild.members.cache.get(event.d.user_id)
            let channel = guild.channels.cache.get(event.d.channel_id)
            if(member.bot) return

            if(event.d.emoji.name === "✅"){
                member.roles.remove('818599302007750668')
            }
        }
    }
})

//!kick
bot.on("message", async message =>{
    if(message.content.startsWith(prefix + "kick")){
        if(message.member.hasPermission("KICK_MEMBERS")){
            let User = message.mentions.users.array()[0]
            let reason = message.content.split(" ").slice(1).join(" ").slice(23)
            if(!reason || !User) return message.reply("Vous avez omis la mention ou la raison du kick\nformat : **prefix kick @user :<raison>**")
            if(User.id == message.author.id) return message.reply("Vous ne pouvez pas vous auto-kick !")
            
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Seul un administrateur peut utiliser cette commande")
            message.delete()
            
            message.channel.send("<@" + message.author.id + "> vient de kick <@" + User.username + "> pour la raison : " + reason)

            message.guild.member(User).kick(reason)
        }
    }
})

//!ban
bot.on("message", async message =>{
    if(message.content.startsWith(prefix + "ban")){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Seul un administrateur peut utiliser cette commande !")
            let User = message.mentions.users.array()[0]
            let reason = message.content.split(" ").slice(1).join(" ").slice(23)
            if(!reason || !User) return message.reply("Vous avez omis la mention ou la raison du ban\nformat : **prefix ban @user <raison>**")
            if(User.id == message.author.id) return message.reply("Vous ne pouvez pas vous auto-ban !")

            if(User.member.hasPermission("ADMINISTRATOR")) return message.reply("Vous ne pouvez pas kick cette personne")
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Seul un administrateur peut utiliser cette commande")
            message.delete()

            message.channel.send("<@" + message.author.id + "> vient de bannir <@" + User.username + "> pour la raison : " + reason)
            message.guild.member(User).ban(reason)
    }
})

//!mute
bot.on("message", async message =>{
    if(message.content.startsWith(prefix + "mute")){
        if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("Vous n'avez pas le droit d'utiliser cette commande")
        let User = message.guild.member(message.mentions.users.first())
        let time = message.content.split(" ").slice(2)
        let reason = message.content.split(" ").slice(3)
        if(!time || !reason || !User) return message.reply("Vous n'avez pas respecté la commande:\nformat :prefix mute @user <durée> <raison>")
        let dUser = User.id
        if(dUser == message.author.id) return message.reply("Vous ne pouvez pas vous auto-mute")
        if(isNaN(time[0])) return message.reply("Veuillez entrée une valeur chiffrée pour la durée")
        if(time[0] < 1) return message.reply("Veuillez entrez une valeur supérieure à 1 pour la durée")
        if(!reason) return message.reply("Vous avez omis la raison")
        let muterole = "818603214886273077"
        if(User.roles.cache.has(muterole)) return message.reply("Ce membre est déjà mute")
        message.delete()

        message.channel.send("<@"+User + "> a été mute pour une durée de " + time[0] + " secondes par <@" + message.author + "> la raison :" + reason)

        User.roles.add(muterole)

        setTimeout(() => {
            User.roles.remove(muterole)
            message.channel.send("<@" + User + "> n'est plus mute")
        }, time[0] * 1000);
    }
})

//!clear
bot.on("message", async message =>{
    if(message.content.startsWith(prefix  + "clear")){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return ("Vous n'avez pas le droit requis pour l'utilisation de cette commande !")
        
        let dl = message.content.split(" ").slice(1)
        if(!dl || isNaN(dl) || dl > 100 || dl<1) return message.reply("Choisissez un nombre entre 1 et 100")
        let dlf = Number(dl)

        message.channel.bulkDelete(dlf, true).then((await message.channel.send(dlf + " messages ont été supprimés")).delete({timeout: 5000})).catch(console.error)
    }
})

//!say
bot.on("message", async message =>{
    if(message.content.startsWith(prefix + "say")){
        message.delete()
        let msg = message.content.slice(5)
        if(!msg) return message.reply("Veuillez entrer un message.")

        let embed = new Discord.MessageEmbed()
        .setDescription(msg)
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "y")){
        message.delete()
        let msg = message.content.slice(3)
        if(!msg) return message.reply("Veuillez entrer un message.")

        message.channel.send(msg)
    }
})

//!rang
bot.on("message", async message =>{
    if(message.content.startsWith(prefix + 'rang')){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Seul un administrateur peut utiliser cette commande")
        message.delete()
        let msg = message.content.slice(6)
        if(!msg) return message.reply("Entrez un message")

        let embed = new Discord.MessageEmbed()
        .setDescription(msg)
        let msgreaction = await message.channel.send(embed)

        const GloireMythique = bot.emojis.cache.find(emoji => emoji.name === "GloireMythique");
        const Mythique = bot.emojis.cache.find(emoji => emoji.name === "Mythique");
        const Legende = bot.emojis.cache.find(emoji => emoji.name === "Legende");
        const Epique = bot.emojis.cache.find(emoji => emoji.name === "Epique");
        const GrandMaitre = bot.emojis.cache.find(emoji => emoji.name === "GrandMaitre");
        const Maitre = bot.emojis.cache.find(emoji => emoji.name === "Maitre");
        const Elite = bot.emojis.cache.find(emoji => emoji.name === "Elite");
        const Guerrier = bot.emojis.cache.find(emoji => emoji.name === "Guerrier");
        
        await msgreaction.react(GloireMythique)
        await msgreaction.react(Mythique)
        await msgreaction.react(Legende)
        await msgreaction.react(Epique)
        await msgreaction.react(GrandMaitre)
        await msgreaction.react(Maitre)
        await msgreaction.react(Elite)
        await msgreaction.react(Guerrier)
    }
})

//Réactions + rôles de rang
bot.on("raw", event => {
    if(event.t === "MESSAGE_REACTION_ADD"){
        if(event.d.message_id === "819724828130934795"){
            let guild = bot.guilds.cache.get(event.d.guild_id)
            let member = guild.members.cache.get(event.d.user_id)
            let channel = guild.channels.cache.get(event.d.channel_id)
            if(member.bot) return

            if(event.d.emoji.name === "GloireMythique"){
                member.roles.add('819689235103219734')
            }else if(event.d.emoji.name === "Mythique"){
                member.roles.add('818602499514564650')
            }else if(event.d.emoji.name === "Legende"){
                member.roles.add('818602358887022642')
            }else if(event.d.emoji.name === "Epique"){
                member.roles.add('818601838592393216')
            }else if(event.d.emoji.name === "GrandMaitre"){
                member.roles.add('818601243546615828')
            }else if(event.d.emoji.name === "Maitre"){
                member.roles.add('818600687206268971')
            }else if(event.d.emoji.name === "Elite"){
                member.roles.add('818600687206268971')
            }else if(event.d.emoji.name === "Guerrier"){
                member.roles.add('818600687206268971')
            }
        }
    }else if(event.t === "MESSAGE_REACTION_REMOVE"){
        if(event.d.message_id === "819724828130934795"){
            let guild = bot.guilds.cache.get(event.d.guild_id)
            let member = guild.members.cache.get(event.d.user_id)
            let channel = guild.channels.cache.get(event.d.channel_id)
            if(member.bot) return

            if(event.d.emoji.name === "GloireMythique"){
                member.roles.remove('819689235103219734')
            }else if(event.d.emoji.name === "Mythique"){
                member.roles.remove('818602499514564650')
            }else if(event.d.emoji.name === "Legende"){
                member.roles.remove('818602358887022642')
            }else if(event.d.emoji.name === "Epique"){
                member.roles.remove('818601838592393216')
            }else if(event.d.emoji.name === "GrandMaitre"){
                member.roles.remove('818601243546615828')
            }else if(event.d.emoji.name === "Maitre"){
                member.roles.remove('818600687206268971')
            }else if(event.d.emoji.name === "Elite"){
                member.roles.remove('818600687206268971')
            }else if(event.d.emoji.name === "Guerrier"){
                member.roles.remove('818600687206268971')
            }
        }
    }
})

//!type
bot.on("message", async message =>{
    if(message.content.startsWith(prefix + 'type')){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Seul un administrateur peut utiliser cette commande")
        message.delete()
        let msg = message.content.slice(6)
        if(!msg) return message.reply("Entrez un message")

        let embed = new Discord.MessageEmbed()
        .setDescription(msg)
        let msgreaction = await message.channel.send(embed)

        const Tank = bot.emojis.cache.find(emoji => emoji.name === "Tank");
        const Fighter = bot.emojis.cache.find(emoji => emoji.name === "Fighter");
        const Mage = bot.emojis.cache.find(emoji => emoji.name === "Mage");
        const Assassin = bot.emojis.cache.find(emoji => emoji.name === "Assassin");
        const Support = bot.emojis.cache.find(emoji => emoji.name === "Support");
        const Marksman = bot.emojis.cache.find(emoji => emoji.name === "Marksman");
        
        await msgreaction.react(Tank)
        await msgreaction.react(Fighter)
        await msgreaction.react(Mage)
        await msgreaction.react(Assassin)
        await msgreaction.react(Support)
        await msgreaction.react(Marksman)
    }
})

//Réactions + rôles de type
bot.on("raw", event => {
    if(event.t === "MESSAGE_REACTION_ADD"){
        if(event.d.message_id === "845358907253063690"){
            let guild = bot.guilds.cache.get(event.d.guild_id)
            let member = guild.members.cache.get(event.d.user_id)
            let channel = guild.channels.cache.get(event.d.channel_id)
            if(member.bot) return

            if(event.d.emoji.name === "Tank"){
                member.roles.add('845354416290005052')
            }else if(event.d.emoji.name === "Fighter"){
                member.roles.add('845354589204906035')
            }else if(event.d.emoji.name === "Mage"){
                member.roles.add('845354660105551903')
            }else if(event.d.emoji.name === "Assassin"){
                member.roles.add('845354780176023583')
            }else if(event.d.emoji.name === "Support"){
                member.roles.add('845354714655752283')
            }else if(event.d.emoji.name === "Marksman"){
                member.roles.add('845354837155643432')
            }
        }
    }else if(event.t === "MESSAGE_REACTION_REMOVE"){
        if(event.d.message_id === "845358907253063690"){
            let guild = bot.guilds.cache.get(event.d.guild_id)
            let member = guild.members.cache.get(event.d.user_id)
            let channel = guild.channels.cache.get(event.d.channel_id)
            if(member.bot) return

            if(event.d.emoji.name === "Tank"){
                member.roles.remove('845354416290005052')
            }else if(event.d.emoji.name === "Fighter"){
                member.roles.remove('845354589204906035')
            }else if(event.d.emoji.name === "Mage"){
                member.roles.remove('845354660105551903')
            }else if(event.d.emoji.name === "Assassin"){
                member.roles.remove('845354780176023583')
            }else if(event.d.emoji.name === "Support"){
                member.roles.remove('845354714655752283')
            }else if(event.d.emoji.name === "Marksman"){
                member.roles.remove('845354837155643432')
            }
        }
    }
})

//Others
bot.on("message", async message =>{
    if(message.content.startsWith(prefix + 'others')){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Seul un administrateur peut utiliser cette commande")
        message.delete()
        let msg = message.content.slice(8)
        if(!msg) return message.reply("Entrez un message")

        let embed = new Discord.MessageEmbed()
        .setDescription(msg)
        let msgreaction = await message.channel.send(embed)

        const CODM = bot.emojis.cache.find(emoji => emoji.name === "CODM");
        const Brawlhalla = bot.emojis.cache.find(emoji => emoji.name === "Brawlhalla");

        await msgreaction.react(CODM)
        await msgreaction.react(Brawlhalla)
    }
})

//Réactions + rôles de Others
bot.on("raw", event => {
    if(event.t === "MESSAGE_REACTION_ADD"){
        if(event.d.message_id === "850701741119766538"){
            let guild = bot.guilds.cache.get(event.d.guild_id)
            let member = guild.members.cache.get(event.d.user_id)
            let channel = guild.channels.cache.get(event.d.channel_id)
            if(member.bot) return

            if(event.d.emoji.name === "CODM"){
                member.roles.add('850670451788480554')
            }else if(event.d.emoji.name === "Brawlhalla"){
                member.roles.add('850669982177034251')
            }
        }
    }else if(event.t === "MESSAGE_REACTION_REMOVE"){
        if(event.d.message_id === "850701741119766538"){
            let guild = bot.guilds.cache.get(event.d.guild_id)
            let member = guild.members.cache.get(event.d.user_id)
            let channel = guild.channels.cache.get(event.d.channel_id)
            if(member.bot) return

            if(event.d.emoji.name === "CODM"){
                member.roles.remove('850670451788480554')
            }else if(event.d.emoji.name === "Brawlhalla"){
                member.roles.remove('850669982177034251')
            }
        }
    }
})

//!Otaku
bot.on("message", async message =>{
    if(message.content.startsWith(prefix + 'otaku')){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Seul un administrateur peut utiliser cette commande")
        message.delete()
        let msg = message.content.slice(7)
        if(!msg) return message.reply("Entrez un message")

        let embed = new Discord.MessageEmbed()
        .setDescription(msg)
        let msgreaction = await message.channel.send(embed)

        await msgreaction.react("㊗️")
    }
})

//Réactions + rôles de Otaku
bot.on("raw", event => {
    if(event.t === "MESSAGE_REACTION_ADD"){
        if(event.d.message_id === "850707760643440640"){
            let guild = bot.guilds.cache.get(event.d.guild_id)
            let member = guild.members.cache.get(event.d.user_id)
            let channel = guild.channels.cache.get(event.d.channel_id)
            if(member.bot) return

            if(event.d.emoji.name === "㊗️"){
                member.roles.add('850670780185444372')
            }
        }
    }else if(event.t === "MESSAGE_REACTION_REMOVE"){
        if(event.d.message_id === "850707760643440640"){
            let guild = bot.guilds.cache.get(event.d.guild_id)
            let member = guild.members.cache.get(event.d.user_id)
            let channel = guild.channels.cache.get(event.d.channel_id)
            if(member.bot) return

            if(event.d.emoji.name === "㊗️"){
                member.roles.remove('850670780185444372')
            }
        }
    }
})

//Add et remove member
bot.on("guildMemberAdd", async member=> {
    let Bienvenu = bot.guilds.cache.get("818459519646564373").channels.cache.get("818605688824659988")

    Bienvenu.send(`${member} nous a rejoint`)
    let règles = member.guild.channels.cache.get("818607870408654849")
    let autorôles = member.guild.channels.cache.get("819643266776432679")
    let présentation = member.guild.channels.cache.get("842838529011744768")

    let embed = new Discord.MessageEmbed()
    .setTitle(`Bienvenu ${member.user.username} sur le serveur Mobile Legends Bang Bang SN :flag_sn::flag_sn:`)
    .setDescription(`J'espère que vous vous y plairez :partying_face: !\nVoici les choses à faire en priorité: :arrow_right_hook:\n:one: Allez dans le salon <#` + règles + `> et lisez les règles du serveur. Puis cochez la case en bas\n:two: Allez dans le salon <#` + autorôles + `> et choisissez vos rôles\n:three: Allez dans le salon <#` + présentation + `> et présentez-vous`)
    .setColor("#1F1BE4")
    .setImage("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/164eda0d-3e68-43b8-94b2-93fef358d9f6/ddhbtym-d8e947d0-fa45-4f0d-aef0-5ae8d230c99d.png/v1/fill/w_1192,h_670,q_70,strp/selena_double_identity_by_makinig_ddhbtym-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD03MjAiLCJwYXRoIjoiXC9mXC8xNjRlZGEwZC0zZTY4LTQzYjgtOTRiMi05M2ZlZjM1OGQ5ZjZcL2RkaGJ0eW0tZDhlOTQ3ZDAtZmE0NS00ZjBkLWFlZjAtNWFlOGQyMzBjOTlkLnBuZyIsIndpZHRoIjoiPD0xMjgwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.JCp8c7kIJUEQvmfSqPPuRj97eoetMPE_4vucuTy6JrA")
    .setFooter("Mobile Legends Bang Bang !\nNous somme désormais " + member.guild.memberCount + " sur le serveur", "https://i.pinimg.com/564x/36/d7/b9/36d7b9067fe47db3d23090abbe6c22aa.jpg")
    .setTimestamp()
    Bienvenu.send(embed)
})

bot.on("guildMemberRemove", async member => {
    let aurevoir = bot.guilds.cache.get("818459519646564373").channels.cache.get("818605721306398770")
    let embed = new Discord.MessageEmbed()
    .setColor("#E41B2E")
    .setTitle(`**${member.user.username}** nous a quitté :cry:\nNous espérons le/la revoir très bientôt\nA plus :yum: !`)
    .setFooter("Selena", "https://i.pinimg.com/564x/36/d7/b9/36d7b9067fe47db3d23090abbe6c22aa.jpg")
    .setTimestamp()

    aurevoir.send(embed)
})

/*//Restart and Shutdown
bot.on('message', message => {
    if (message.channel.type != 'text' || message.author.bot)
      return;
  
    let command = message.content.split(' ')[0].slice(1);
    let args = message.content.replace('.' + command, '').trim();
    let isBotOwner = message.author.id == '420273793852768286';
  
    switch (command) {
        
      case 'restart': {
        if (!isBotOwner)
          return;
          message.delete()

        setInterval(function(){
            message.channel.send('Restarting...').then(m => {
              bot.destroy()
              
              bot.login(config.token)
                message.channel.send("Restart end...")
            });
        }, 600000)
        break;
      }

      case 'shutdown': {
        if (!isBotOwner)
          return;
  
        message.channel.send('Shutting down...').then(m => {
            console.log("Je suis éteinte")
          bot.destroy();
        });
        break;
      }
    }
})*/

//Meme
bot.on("message", async message =>{
    if(message.content === prefix + "meme"){
        if(message.member.user.bot) return
        var counter = 0;
        memebdd.forEach(file => {
            counter++
        })
        random = Math.floor(Math.random() * counter)
        message.channel.send({ files: [`${memebdd[random]}`]})
    }
})

//NSFW
//Fuck
bot.on("message", async message =>{
    if(message.content.startsWith(prefix + "fuck")){
        let Fuck = bot.guilds.cache.get("818459519646564373").channels.cache.get("850711519561908304")
        if(message.member.user.bot) return
        let User = message.guild.member(message.mentions.users.first())
        var counter = 0;
        fuckbdd.forEach(file => {
            counter++
        })
        random = Math.floor(Math.random() * counter)
        Fuck.send("<@" + message.author.id + "> is fucking <@"+ User + ">",{ files: [`${fuckbdd[random]}`]})
    }
})
//Hentai
bot.on("message", async message =>{
    if(message.content.startsWith(prefix + "hentai")){
        let Hentai = bot.guilds.cache.get("818459519646564373").channels.cache.get("850711694136311828")
        if(message.member.user.bot) return
        var counter = 0;
        hentaibdd.forEach(file => {
            counter++
        })
        random = Math.floor(Math.random() * counter)
        Hentai.send({ files: [`${hentaibdd[random]}`]})
    }
})

//__________!has___________
//@GloireMythique
bot.on("message", async message => {
    let roleID = "819689235103219734";
    if (message.content.startsWith(prefix + `has <@&${roleID}`)) {
        message.delete()

        let membersWithRole = message.guild.roles.cache.get(roleID).members;
        console.log(`Il y a ${membersWithRole.size} utilisateur(s)avec ce rôle`)

        let embed = new Discord.MessageEmbed()
            .setTitle("@GloireMythique")
            .setDescription(`Il y a ${membersWithRole.size} utilisateur(s) avec ce rôle`)
            .addField("Voici la liste", message.guild.roles.cache.get(roleID).members.map(m => m.user.username).join(`\n`), true)
            .setColor("#7000D0")
            .setThumbnail("https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
            .setTimestamp()
            .setFooter("Mobile Legends Bang Bang SN", "https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
        message.channel.send(embed)
    }
})
//@Mythique
bot.on("message", async message => {
    let roleID = "818602499514564650";
    if (message.content.startsWith(prefix + `has <@&${roleID}`)) {
        message.delete()

        let membersWithRole = message.guild.roles.cache.get(roleID).members;
        console.log(`Il y a ${membersWithRole.size} utilisateur(s)avec ce rôle`)

        let embed = new Discord.MessageEmbed()
            .setTitle("@Mythique")
            .setDescription(`Il y a ${membersWithRole.size} utilisateur(s) avec ce rôle`)
            .addField("Voici la liste", message.guild.roles.cache.get(roleID).members.map(m => m.user.username).join(`\n`), true)
            .setColor("#ffba00")
            .setThumbnail("https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
            .setTimestamp()
            .setFooter("Mobile Legends Bang Bang SN", "https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
        message.channel.send(embed)
    }
})
//@Légende
bot.on("message", async message => {
    let roleID = "818602358887022642";
    if (message.content.startsWith(prefix + `has <@&${roleID}`)) {
        message.delete()

        let membersWithRole = message.guild.roles.cache.get(roleID).members;
        console.log(`Il y a ${membersWithRole.size} utilisateur(s)avec ce rôle`)

        let embed = new Discord.MessageEmbed()
            .setTitle("@Légende")
            .setDescription(`Il y a ${membersWithRole.size} utilisateur(s) avec ce rôle`)
            .addField("Voici la liste", message.guild.roles.cache.get(roleID).members.map(m => m.user.username).join(`\n`), true)
            .setColor("#fee401")
            .setThumbnail("https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
            .setTimestamp()
            .setFooter("Mobile Legends Bang Bang SN", "https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
        message.channel.send(embed)
    }
})
//@Epique
bot.on("message", async message => {
    let roleID = "818601838592393216";
    if (message.content.startsWith(prefix + `has <@&${roleID}`)) {
        message.delete()

        let membersWithRole = message.guild.roles.cache.get(roleID).members;
        console.log(`Il y a ${membersWithRole.size} utilisateur(s)avec ce rôle`)

        let embed = new Discord.MessageEmbed()
            .setTitle("@Epique")
            .setDescription(`Il y a ${membersWithRole.size} utilisateur(s) avec ce rôle`)
            .addField("Voici la liste", message.guild.roles.cache.get(roleID).members.map(m => m.user.username).join(`\n`), true)
            .setColor("#4eff00")
            .setThumbnail("https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
            .setTimestamp()
            .setFooter("Mobile Legends Bang Bang SN", "https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
        message.channel.send(embed)
    }
})
//@Grand maître
bot.on("message", async message => {
    let roleID = "818601243546615828";
    if (message.content.startsWith(prefix + `has <@&${roleID}`)) {
        message.delete()

        let membersWithRole = message.guild.roles.cache.get(roleID).members;
        console.log(`Il y a ${membersWithRole.size} utilisateur(s)avec ce rôle`)

        let embed = new Discord.MessageEmbed()
            .setTitle("@Grand maître")
            .setDescription(`Il y a ${membersWithRole.size} utilisateur(s) avec ce rôle`)
            .addField("Voici la liste", message.guild.roles.cache.get(roleID).members.map(m => m.user.username).join(`\n`), true)
            .setColor("#718e8c")
            .setThumbnail("https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
            .setTimestamp()
            .setFooter("Mobile Legends Bang Bang SN", "https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
        message.channel.send(embed)
    }
})
//@Maître, Elite, Guerrier
bot.on("message", async message => {
    let roleID = "818600687206268971";
    if (message.content.startsWith(prefix + `has <@&${roleID}`)) {
        message.delete()

        let membersWithRole = message.guild.roles.cache.get(roleID).members;
        console.log(`Il y a ${membersWithRole.size} utilisateur(s)avec ce rôle`)

        let embed = new Discord.MessageEmbed()
            .setTitle("@Maître, Elite, Guerrier")
            .setDescription(`Il y a ${membersWithRole.size} utilisateur(s) avec ce rôle`)
            .addField("Voici la liste", message.guild.roles.cache.get(roleID).members.map(m => m.user.username).join(`\n`), true)
            .setColor("#c87437")
            .setThumbnail("https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
            .setTimestamp()
            .setFooter("Mobile Legends Bang Bang SN", "https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
        message.channel.send(embed)
    }
})
//@Tank
bot.on("message", async message => {
    let roleID = "845354416290005052";
    if (message.content.startsWith(prefix + `has <@&${roleID}`)) {
        message.delete()

        let membersWithRole = message.guild.roles.cache.get(roleID).members;
        console.log(`Il y a ${membersWithRole.size} utilisateur(s)avec ce rôle`)

        let embed = new Discord.MessageEmbed()
            .setTitle("@Tank")
            .setDescription(`Il y a ${membersWithRole.size} utilisateur(s) avec ce rôle`)
            .addField("Voici la liste", message.guild.roles.cache.get(roleID).members.map(m => m.user.username).join(`\n`), true)
            .setColor("#c87437")
            .setThumbnail("https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
            .setTimestamp()
            .setFooter("Mobile Legends Bang Bang SN", "https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
        message.channel.send(embed)
    }
})
//@Fighter
bot.on("message", async message => {
    let roleID = "845354589204906035";
    if (message.content.startsWith(prefix + `has <@&${roleID}`)) {
        message.delete()

        let membersWithRole = message.guild.roles.cache.get(roleID).members;
        console.log(`Il y a ${membersWithRole.size} utilisateur(s)avec ce rôle`)

        let embed = new Discord.MessageEmbed()
            .setTitle("@Fighter")
            .setDescription(`Il y a ${membersWithRole.size} utilisateur(s) avec ce rôle`)
            .addField("Voici la liste", message.guild.roles.cache.get(roleID).members.map(m => m.user.username).join(`\n`), true)
            .setColor("#d10008")
            .setThumbnail("https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
            .setTimestamp()
            .setFooter("Mobile Legends Bang Bang SN", "https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
        message.channel.send(embed)
    }
})
//@Mage
bot.on("message", async message => {
    let roleID = "845354660105551903";
    if (message.content.startsWith(prefix + `has <@&${roleID}`)) {
        message.delete()

        let membersWithRole = message.guild.roles.cache.get(roleID).members;
        console.log(`Il y a ${membersWithRole.size} utilisateur(s)avec ce rôle`)

        let embed = new Discord.MessageEmbed()
            .setTitle("@Mage")
            .setDescription(`Il y a ${membersWithRole.size} utilisateur(s) avec ce rôle`)
            .addField("Voici la liste", message.guild.roles.cache.get(roleID).members.map(m => m.user.username).join(`\n`), true)
            .setColor("#2200ff")
            .setThumbnail("https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
            .setTimestamp()
            .setFooter("Mobile Legends Bang Bang SN", "https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
        message.channel.send(embed)
    }
})
//@Assassin
bot.on("message", async message => {
    let roleID = "845354780176023583";
    if (message.content.startsWith(prefix + `has <@&${roleID}`)) {
        message.delete()

        let membersWithRole = message.guild.roles.cache.get(roleID).members;
        console.log(`Il y a ${membersWithRole.size} utilisateur(s)avec ce rôle`)

        let embed = new Discord.MessageEmbed()
            .setTitle("@Assassin")
            .setDescription(`Il y a ${membersWithRole.size} utilisateur(s) avec ce rôle`)
            .addField("Voici la liste", message.guild.roles.cache.get(roleID).members.map(m => m.user.username).join(`\n`), true)
            .setColor("#7000D0")
            .setThumbnail("https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
            .setTimestamp()
            .setFooter("Mobile Legends Bang Bang SN", "https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
        message.channel.send(embed)
    }
})
//@Support
bot.on("message", async message => {
    let roleID = "845354714655752283";
    if (message.content.startsWith(prefix + `has <@&${roleID}`)) {
        message.delete()

        let membersWithRole = message.guild.roles.cache.get(roleID).members;
        console.log(`Il y a ${membersWithRole.size} utilisateur(s)avec ce rôle`)

        let embed = new Discord.MessageEmbed()
            .setTitle("@Support")
            .setDescription(`Il y a ${membersWithRole.size} utilisateur(s) avec ce rôle`)
            .addField("Voici la liste", message.guild.roles.cache.get(roleID).members.map(m => m.user.username).join(`\n`), true)
            .setColor("#1edce1")
            .setThumbnail("https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
            .setTimestamp()
            .setFooter("Mobile Legends Bang Bang SN", "https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
        message.channel.send(embed)
    }
})
//@Marksman
bot.on("message", async message => {
    let roleID = "845354837155643432";
    if (message.content.startsWith(prefix + `has <@&${roleID}`)) {
        message.delete()

        let membersWithRole = message.guild.roles.cache.get(roleID).members;
        console.log(`Il y a ${membersWithRole.size} utilisateur(s)avec ce rôle`)

        let embed = new Discord.MessageEmbed()
            .setTitle("@Marksman")
            .setDescription(`Il y a ${membersWithRole.size} utilisateur(s) avec ce rôle`)
            .addField("Voici la liste", message.guild.roles.cache.get(roleID).members.map(m => m.user.username).join(`\n`), true)
            .setColor("#fee401")
            .setThumbnail("https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
            .setTimestamp()
            .setFooter("Mobile Legends Bang Bang SN", "https://zolotoy-region.ru/wp-content/uploads/ml-696x327.jpg")
        message.channel.send(embed)
    }
})

//Builds
bot.on("message", async message =>{
    if(message.content === prefix + "build"){
        message.channel.send("La syntaxe est : prefix + nom du héros\nPrière de respecter la casse du nom du héros")
    }
    if(message.content.startsWith(prefix + "Aamon")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Akai")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Aldous")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/70/26/26/702626033a418c5846b0309ba39ebfbe.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Alice")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/7d/07/e5/7d07e548ac76460b6d806cbf22e88aa2.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Alpha")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/fd/f8/69/fdf86996a95d30f4a90a2674aba43f00.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Alucard")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/67/8a/4f/678a4f044c326e2d5128a92475207c11.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Angela")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Argus")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Atlas")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/63/69/25/6369258fd2485e4f8b9e9d87319050ce.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Aulus")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Aurora")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/03/c2/c9/03c2c9a42b1f7d3bd11b2d127741b337.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Badang")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Balmond")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/f9/a8/5a/f9a85a31c82a04687119391cf1169612.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Bane")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/ed/ab/06/edab06d9388d6d25faec87b50d723eae.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Barats")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Baxia")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/2a/7c/27/2a7c27f90204edc85c15a4a545454cd9.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Beatrix")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Belerick")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/7a/b5/96/7ab596d8439331883e85d0ea5406d13c.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Benedetta")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Brody")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Bruno")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Carmilla")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/a1/ed/ba/a1edba0cda4fa3440f985204ea31db57.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Cecilion")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/7f/e6/0b/7fe60bdb4abfd11a32387c5e06bbc86f.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Chang'e")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Chou")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Claude")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Clint")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/a0/1e/b5/a01eb5e10a086dff14283cc0295a7cc4.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Cyclops")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/54/19/d3/5419d3f4cea4a59e15f2ed8791095b09.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Diggie")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Dyrroth")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Esmeralda")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Estes")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Eudora")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/originals/33/7b/cd/337bcd28c2abebcc182905a2112f7519.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Fanny")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Faramis")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Floryn")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Franco")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/00/7c/97/007c9750825f913708bcd00ed8e7d830.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Freya")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Gatotkaca")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/ee/8c/8d/ee8c8d66801be4741eb3556edb700c30.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Gloo")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Gord")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Granger")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Grock")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Guinevere")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/62/9b/49/629b497118fc88d4773d1b7bdf863bd4.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Gusion")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/originals/ab/8c/2d/ab8c2dc8ae53a68d9c9f50e4f5b13fe2.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Hanabi")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/e7/25/45/e725451734f3d9a80ae320521e651012.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Hanzo")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/86/22/6f/86226f992f69727509f006ce26d9687d.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Harith")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Harley")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Hayabusa")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/b0/d1/ff/b0d1ff2550ddc643431c24d6c974da36.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Helcurt")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/43/25/41/4325415d5e7daef90ed1b2ea982b7d9b.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Hilda")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/1e/76/7c/1e767cb4755fee1c6e0abb0ab56c5f2e.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Hylos")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Irithel")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Jawhead")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Johnson")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Kadita")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Kagura")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/78/02/e1/7802e10dfd8992fec0754fbb348a5bd7.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Kaja")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/6c/9e/ad/6c9ead24245c402851fb780c0705cea4.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Karina")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/ef/50/f7/ef50f79ccdf2fae145569bb4fa6053f4.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Karrie")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/88/e4/8a/88e48aff772f51d0512f715c7b06b422.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Khaleed")){
        let embed = new Discord.MessageEmbed()
        .setTitle("Khaleed le Prince du désert")
        .setAuthor("Sombre Ghost, Ragnarök, Zap20k")
        .setDescription("Un bon build qui a fait ses preuves, négro bien sûr que je préfère celui de Ragn")
        .setImage("https://i.ytimg.com/vi/IkcY8m9AxMs/maxresdefault.jpg")
        message.channel.send("Want to be a pro Khaleed ? Follow this link:\nhttps://www.youtube.com/channel/UCU861WydzQ1wwiIERrbMETw")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Khufra")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/ea/2c/99/ea2c995b0d94801b195511e359dd0ad0.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Kimmy")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Lancelot")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Lapu-Lapu")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Layla")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/2f/25/a6/2f25a65377be20264394d9e7f8a954af.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Leomord")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Lesley")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Ling")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/1d/10/6e/1d106e60e183f10ad5bbbbbfa4cafb40.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Lolita")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Lunox")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Luo Yi")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/a4/d8/34/a4d83404180783df437a97f9cfcb4451.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Lylia")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Martis")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/96/4c/34/964c344622415156fe31983df44cf69c.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Masha")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/96/55/c1/9655c12935028cb780547af4d07c2be5.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Mathilda")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Minotaur")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Minsitthar")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Miya")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/54/76/e0/5476e026bae5aed39d32f181c9c64abe.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Moskov")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/20/79/a6/2079a6278df765a9e6a40019a9901f36.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Nana")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Natalia")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Natan")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Odette")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Paquito")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Pharsa")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/b6/10/66/b610666c8d2e29a965349365a4184e12.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Phoveus")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Phylax")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Popol and Kupa")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Rafaela")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Roger")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Ruby")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Saber")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Selena")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/6c/d8/82/6cd8824c4f650d516071c79759e5d429.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Silvanna")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Sun")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/9e/55/71/9e5571aeaa45db10231972edec7034ea.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Terizla")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/17/c6/bf/17c6bfaa7c22be80e5f0a37ea6a3d6a0.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Thamuz")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Tigreal")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Uranus")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/e5/e9/a8/e5e9a8cef87bdab6c622138b120e7c5c.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Vale")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/71/91/80/719180c9f4e6320d0cf847a4d187e945.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Valentina")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Valir")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Vexana")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Wanwan")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "X.Borg")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Yi Sun-Shin")){
        let embed = new Discord.MessageEmbed()
        .setImage("https://i.pinimg.com/564x/f2/7d/e7/f27de7ea42d362a4e60596e8f9c573bf.jpg")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Yu Zhong")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Yve")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Zhask")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
    if(message.content.startsWith(prefix + "Zilong")){
        let embed = new Discord.MessageEmbed()
        .setImage("")
        message.channel.send(embed)
    }
})