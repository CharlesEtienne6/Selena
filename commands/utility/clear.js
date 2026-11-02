const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Supprime un nombre spécifié de messages')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Nombre de messages à supprimer (entre 1 et 100)')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            const amount = interaction.options.getInteger('amount');
            const member = interaction.member;

            if (!member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
                return await interaction.reply('Vous n\'avez pas les droits requis pour utiliser cette commande', { ephemeral: true });
            }

            if (isNaN(amount) || amount < 1 || amount > 100) {
                return interaction.reply('Choisissez un nombre entre 1 et 100', { ephemeral: true });
            }

            await interaction.channel.bulkDelete(amount).catch(err => {
                return;
            });

            await interaction.reply(`${amount} message(s) supprimé(s).`);

            // Ajouter un délai de 5 secondes
            setTimeout(() => {
                interaction.deleteReply().catch(console.error);
            }, 5000);
        } catch (error) {
            console.error(error);
            return interaction.reply('Une erreur s\'est produite lors de l\'exécution de la commande.', { ephemeral: true });
        }
    },
};
