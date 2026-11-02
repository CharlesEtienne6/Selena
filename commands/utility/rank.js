const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');

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

//Canvacord
const Canvacord = require('canvacord');

// Création de la commande slash
const data = new SlashCommandBuilder()
    .setName('rank')
    .setDescription('Affiche le rang et le niveau de l\'utilisateur')
    .addUserOption(option =>
        option.setName('utilisateur')
            .setDescription('L\'utilisateur dont vous voulez voir le rang')
            .setRequired(false));

module.exports = {
    data,
    async execute(interaction) {
        const dbdb = new FileSync("db.json");
        const db = low(dbdb);

        if (!db.has("Infos_membres").value()) {
            db.set("Infos_membres", []).write();
        }

        let msgauthorid = interaction.user.id;

        // Charger les données à partir du fichier JSON
        db.read();

        if (interaction.commandName === "rank" && interaction.options.getUser('utilisateur')) {
            const mentionnedUser = interaction.options.getUser('utilisateur');
            const mentionnedUserId = mentionnedUser.id;
        
            const mentionnedUserData = db.get("Infos_membres").find({ id: mentionnedUserId }).value();
        
            if (mentionnedUserData) {
                const userXP = mentionnedUserData.xp;
                const userLevel = mentionnedUserData.niveau;
                const userXPNeeded = mentionnedUserData.xp_p_niveau;

                const mentionnedUserRank = mentionnedUserData.rank; // Récupérer le rang de l'utilisateur mentionné

                const Canvacord = require('canvacord');
                const rankcard = new Canvacord.Rank()
                    .setAvatar(mentionnedUser.displayAvatarURL({ extension: 'png', dynamic: true }))
                    .setCurrentXP(userXP)
                    .setRequiredXP(userXPNeeded)
                    .setLevel(userLevel)
                    .setStatus('online')
                    .setRank(mentionnedUserRank, 'RANK', true) // Utiliser le rang de l'utilisateur mentionné
                    .setProgressBar("#a81d16", "COLOR")
                    .setOverlay("#000000")
                    .setUsername(mentionnedUser.username)
                    .setBackground("IMAGE", "assets/rank.jpg")
            
                    rankcard.build()
                    .then(data => {
                        const atta = new AttachmentBuilder(data, { name: 'rank.png' });
                        interaction.reply({ files: [atta] });
                        db.write();
                    })
                    .catch(err => {
                        console.error("Erreur lors de la construction de la carte de rang :", err);
                        interaction.reply("Erreur lors de la génération de la carte de rang.");
                    });
            } else {
                interaction.send("Utilisateur non trouvé dans la base de données.");
            }
            
        } else if (interaction.commandName === "rank") {
            let userxpdb = await db.get("Infos_membres").filter({ id: msgauthorid }).find("xp").value();
            let userxp = Object.values(userxpdb);
            let userniveaudb = await db.get("Infos_membres").filter({ id: msgauthorid }).find("niveau").value();
            let userniveau = Object.values(userniveaudb);
            let userpniveaudb = await db.get("Infos_membres").filter({ id: msgauthorid }).find("xp_p_niveau").value();
            let userpniveau = Object.values(userpniveaudb);
            let lvl = userniveau[2];
            let exp = userxp[1];
            let lvlsup = userpniveau[3];
            let id = msgauthorid;

            // Récupérer le rang de l'utilisateur actuel
            const userRankData =  await db.get("Infos_membres").find({ id: msgauthorid }).value();
            const userRank = userRankData.rank;

            const rankcard = new Canvacord.Rank()
                .setAvatar(interaction.user.displayAvatarURL({ extension: 'png', dynamic: true }))
                .setCurrentXP(exp)
                .setRequiredXP(lvlsup)
                .setStatus('online')
                .setLevel(lvl)
                .setRank(userRank, 'RANK', true)
                .setProgressBar("#a81d16", "COLOR")
                .setOverlay("#000000")
                .setUsername(interaction.user.username)
                .setBackground("IMAGE", "assets/rank.jpg")
            rankcard.build()
                .then(data => {
                    const atta = new AttachmentBuilder(data, { name: 'rank.png' });
                    interaction.reply({ files: [atta] });
                    db.write();
            })
        }
    }
};
