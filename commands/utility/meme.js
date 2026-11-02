const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Affiche un meme aléatoire'),
    async execute(interaction) {
        try {
            if (interaction.user.bot) return;

            // Différer la réponse
            await interaction.deferReply();

            // Charger le fichier meme.json
            const memeData = fs.readFileSync('./images/meme.json');
            const memebdd = JSON.parse(memeData);

            const counter = memebdd.length;
            const random = Math.floor(Math.random() * counter);

            // Répondre à l'interaction
            await interaction.editReply({ files: [memebdd[random]] });
        } catch (error) {
            console.error(error);
            return interaction.reply('Une erreur s\'est produite lors de l\'exécution de la commande.', { ephemeral: true });
        }
    },
};
