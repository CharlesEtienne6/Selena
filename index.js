// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { token } = require('./config.json');
const { ActivityType } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildModeration] });

client.commands = new Collection();

//Canvas
const { createCanvas, loadImage, registerFont } = require('canvas'); // Dépendances pour canvas

//Lowdb
const low = require ("lowdb");
const FileSync = require ("lowdb/adapters/FileSync");
const { time } = require("console");
const { receiveMessageOnPort } = require("worker_threads");
const { userInfo } = require("os");
const { listeners } = require("process");
const { setTimeout } = require("timers");
const { fstat } = require('fs');
const { channel } = require('node:diagnostics_channel');

//Lowdb
const dbdb = new FileSync("db.json");
const db = low(dbdb);

db.defaults({Infos_membres : []}).write()
//Connexion du bot
client.login(token)
client.once(Events.ClientReady, readyClient => {

    let status = ["me faire coder","Mobile Legends","être le gémeau de l'ombre","chat avec Karina"]
    setInterval(function(){
        let stats = status[Math.floor(Math.random()*status.length)];
        client.user.setActivity(stats, {type: ActivityType.Playing})
    }, 100000)

    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
})

//Handling
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

//Expérience
client.on("messageCreate", async message => {
    
    let totalExp = 0; // Variable pour stocker le total de l'expérience

    // Fonction pour recalculer le rang en fonction de l'expérience
    function calculateRanks() {
        const allUsers = db.get("Infos_membres").value();
        const sortedUsers = allUsers.sort((a, b) => {
            if (a.niveau !== b.niveau) {
                return b.niveau - a.niveau; // Trie par expérience décroissante
            } else {
                return b.xp - a.xp; // Si l'expérience est égale, trie par niveau décroissant
            }
        });

        sortedUsers.forEach((user, index) => {
            db.get("Infos_membres").find({ id: user.id }).assign({ rank: index + 1 }).write();
        });
    }
    let msgauthorid = message.member.user.id

    if (message.member.user.bot) return
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

        // Mettre à jour le total de l'expérience
        totalExp += chiffre[index];

        if (userxp[1] >= userpniveau[3]) {
            let lvlup = client.guilds.cache.get("818459519646564373").channels.cache.get("819643226629210152")
            db.get("Infos_membres").find({ id: msgauthorid }).assign({ id: msgauthorid, xp: userxp[1] = 1 }).write()
            db.get("Infos_membres").find({ id: msgauthorid }).assign({ id: msgauthorid, niveau: userniveau[2] += 1 }).write()
            db.get("Infos_membres").find({ id: msgauthorid }).assign({ id: msgauthorid, xp_p_niveau: userpniveau[3] += 150 }).write()
            lvlup.send(`GG ${message.author} vous venez de passer au niveau ${userniveau[2]}`)
        }

        // Calcul et mise à jour du rang
        calculateRanks();
    }
})

//Réactions + rôles de rules
client.on("raw", async (event) => {
    if (event.t === "MESSAGE_REACTION_ADD" || event.t === "MESSAGE_REACTION_REMOVE") {
        const guild = await client.guilds.fetch(event.d.guild_id);
        const member = await guild.members.fetch(event.d.user_id);
        const channel = await client.channels.fetch(event.d.channel_id);
        
        if (member.user.bot) return;

        if (event.d.message_id === "1196962307603959930") {
            const message = await channel.messages.fetch(event.d.message_id);
            
            if (event.d.emoji.name === "✅") {
                if (event.t === "MESSAGE_REACTION_ADD") {
                    await member.roles.add('818599302007750668');
                } else if (event.t === "MESSAGE_REACTION_REMOVE") {
                    await member.roles.remove('818599302007750668');
                }
            }
        }
    }
});

//Réactions + rôles de rang
client.on("raw", async (event) => {
    if (event.t === "MESSAGE_REACTION_ADD" || event.t === "MESSAGE_REACTION_REMOVE") {
        const guild = await client.guilds.fetch(event.d.guild_id);
        const member = await guild.members.fetch(event.d.user_id);
        const channel = await client.channels.fetch(event.d.channel_id);

        if (member.user.bot) return;

        const messageID = "1196963798595154002";

        if (event.d.message_id === messageID) {
            const message = await channel.messages.fetch(messageID);
            const emojiName = event.d.emoji.name;

            switch (emojiName) {
                case "immortal":
                    handleRoleChange(member, event.t, '1192094884442689637');
                    break;
                case "glory":
                    handleRoleChange(member, event.t, '819689235103219734');
                    break;
                case "honnor":
                    handleRoleChange(member, event.t, '1192095313310257272');
                    break;
                case "mythic":
                    handleRoleChange(member, event.t, '818602499514564650');
                    break;
                case "legend":
                    handleRoleChange(member, event.t, '818602358887022642');
                    break;
                case "epic":
                    handleRoleChange(member, event.t, '818601838592393216');
                    break;
                case "gm":
                    handleRoleChange(member, event.t, '818601243546615828');
                    break;
                case "master":
                    handleRoleChange(member, event.t, '818600687206268971');
                    break;
                case "elite":
                    handleRoleChange(member, event.t, '818600687206268971');
                    break;
                default:
                    console.log(`Unhandled emoji: ${emojiName}`);
            }
        }
    }
});

function handleRoleChange(member, action, roleId) {
    if (action === 'MESSAGE_REACTION_ADD') {
        member.roles.add(roleId);
    } else if (action === 'MESSAGE_REACTION_REMOVE') {
        member.roles.remove(roleId);
    }
}

//Réactions + rôles de type
client.on("raw", async (event) => {
    if (event.t === "MESSAGE_REACTION_ADD" || event.t === "MESSAGE_REACTION_REMOVE") {
        const guild = await client.guilds.fetch(event.d.guild_id);
        const member = await guild.members.fetch(event.d.user_id);
        const channel = await client.channels.fetch(event.d.channel_id);

        if (member.user.bot) return;

        const messageID = "1196963834167037952";

        if (event.d.message_id === messageID) {
            const message = await channel.messages.fetch(messageID);
            const emojiName = event.d.emoji.name;

            switch (emojiName) {
                case "Tank":
                    handleRoleChange(member, event.t, '845354416290005052');
                    break;
                case "Fighter":
                    handleRoleChange(member, event.t, '845354589204906035');
                    break;
                case "Mage":
                    handleRoleChange(member, event.t, '845354660105551903');
                    break;
                case "Assassin":
                    handleRoleChange(member, event.t, '845354780176023583');
                    break;
                case "Support":
                    handleRoleChange(member, event.t, '845354714655752283');
                    break;
                case "Marksman":
                    handleRoleChange(member, event.t, '845354837155643432');
                    break;
                default:
                    console.log(`Unhandled emoji: ${emojiName}`);
            }
        }
    }
});

function handleRoleChange(member, action, roleId) {
    if (action === 'MESSAGE_REACTION_ADD') {
        member.roles.add(roleId);
    } else if (action === 'MESSAGE_REACTION_REMOVE') {
        member.roles.remove(roleId);
    }
}

//Réactions + rôles de Otaku
client.on("raw", async (event) => {
    if (event.t === "MESSAGE_REACTION_ADD" || event.t === "MESSAGE_REACTION_REMOVE") {
        const guild = await client.guilds.fetch(event.d.guild_id);
        const member = await guild.members.fetch(event.d.user_id);
        const channel = await client.channels.fetch(event.d.channel_id);

        if (member.user.bot) return;

        const messageID = "1196963862621200404";

        if (event.d.message_id === messageID) {
            const message = await channel.messages.fetch(messageID);
            const emojiName = event.d.emoji.name;

            switch (emojiName) {
                case "㊗️":
                    handleRoleChange(member, event.t, '850670780185444372');
                    break;
                default:
                    console.log(`Unhandled emoji: ${emojiName}`);
            }
        }
    }
});

function handleRoleChange(member, action, roleId) {
    if (action === 'MESSAGE_REACTION_ADD') {
        member.roles.add(roleId);
    } else if (action === 'MESSAGE_REACTION_REMOVE') {
        member.roles.remove(roleId);
    }
}

//Add et remove member
registerFont('./polices/WhiskeyGirlsCondensedItalic-gxJp3.otf', { family: 'MaPolice' });

client.on("guildMemberAdd", async member => {
    let Bienvenu = client.guilds.cache.get("818459519646564373").channels.cache.get("818605688824659988");
    let règles = member.guild.channels.cache.get("818607870408654849")
    let autorôles = member.guild.channels.cache.get("819643266776432679")
    let présentation = member.guild.channels.cache.get("842838529011744768")

    const canvas = createCanvas(800, 400); // Création du canvas
    const ctx = canvas.getContext('2d');

    // Chargement de l'arrière-plan
    const background = await loadImage("assets/welcome.jpg");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Définition du rayon du cadre circulaire de l'avatar avec la bordure
    const borderThickness = 10; // Épaisseur de la bordure
    const radius = 100 + borderThickness; // Rayon incluant la bordure

    // Dessin du cadre circulaire autour de l'avatar
    ctx.save();
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 150, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    // Récupération de l'avatar et dessin avec bordure
    const avatar = await loadImage(member.user.displayAvatarURL({ extension: 'png', dynamic: true }));
    ctx.drawImage(avatar, canvas.width / 2 - radius, 45, radius * 2, radius * 2);

    // Dessiner la bordure autour de l'avatar
    ctx.strokeStyle = '#FFFFFF'; // Couleur de la bordure
    ctx.lineWidth = borderThickness;
    ctx.stroke();

    ctx.restore();

    // Texte de bienvenue centré sous l'avatar
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '30px MaPolice'; // Utilisation de la police chargée
    ctx.textAlign = 'center';

    // Ajout de l'ombre portée
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Couleur de l'ombre (noir semi-transparent)
    ctx.shadowBlur = 5; // Intensité du flou de l'ombre
    ctx.shadowOffsetX = 2; // Décalage horizontal de l'ombre
    ctx.shadowOffsetY = 2; // Décalage vertical de l'ombre

    ctx.fillText(`Bienvenue, ${member.user.username} !`, canvas.width / 2, 300);

    // Récupération du nombre de membres du serveur
    const memberCount = member.guild.memberCount;

    // Affichage du nombre de membres sur le canevas
    ctx.font = '24px MaPolice'; // Taille de la police pour le nombre de membres
    ctx.fillText(`Nous sommes désormais : ${memberCount} sur le serveur`, canvas.width / 2, 350);
    // Envoie l'image générée
    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name :'welcome-image.png' });
    Bienvenu.send({ files: [attachment] });

    let embed = new EmbedBuilder()
    .setColor("#1F1BE4")
    .setTitle(`${member.user.username} nous a rejoint`)
    .setDescription(`Voici les choses à faire en priorité: :arrow_right_hook:` +
    `\n:one: Allez dans le salon ${règles} et lisez les règles du serveur. Puis cochez la case en bas` +
    `\n:two: Allez dans le salon ${autorôles} et choisissez vos rôles` +
    `\n:three: Allez dans le salon ${présentation} et présentez-vous`)
    .setTimestamp();

Bienvenu.send({embeds: [embed]});

});

client.on("guildMemberRemove", async member => {
    let aurevoir = client.guilds.cache.get("818459519646564373").channels.cache.get("818605721306398770")
    let embed = new EmbedBuilder()
    .setColor("#E41B2E")
    .setTitle(`**${member.user.username}** nous a quitté :cry:\nNous espérons le/la revoir très bientôt\nA plus :yum: !`)
    .setFooter({text : "Selena"})
    .setTimestamp()

    aurevoir.send({ embeds: [embed] });
})