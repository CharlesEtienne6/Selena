const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Répète un message')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Message à répéter')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            const member = interaction.member;
            const messageContent = interaction.options.getString('message');

            if (!member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
                return await interaction.reply('Vous n\'avez pas les droits requis pour utiliser cette commande', { ephemeral: true });
            }

            if (!messageContent) {
                return interaction.reply('Veuillez entrer un message.', { ephemeral: true });
            }

            const embed = new EmbedBuilder()
                .setDescription(messageContent);

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            return interaction.reply('Une erreur s\'est produite lors de l\'exécution de la commande.', { ephemeral: true });
        }
    },
};
