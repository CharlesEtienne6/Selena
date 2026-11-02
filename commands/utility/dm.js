const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dm')
        .setDescription('Envoyer un message privé à quelqu\'un')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Select a user')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Enter your message')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interaction.reply("Vous n'êtes pas autorisé à utiliser cette commande");
        }

        const DM = interaction.options.getString('message'); // Utilisation des options pour obtenir le message
        const destinataire = interaction.options.getMember('user'); // Utilisation des options pour obtenir l'utilisateur

        if (!destinataire) {
            return interaction.reply("L'utilisateur n'existe pas ou m'a bloqué");
        }

        try {
            await destinataire.send(DM);
            await interaction.reply(`Message envoyé à ${destinataire}`);
            console.log("Message envoyé");
        } catch (error) {
            console.error(error);
            return interaction.reply('Une erreur s\'est produite lors de l\'envoi du message.');
        }
    },
};
