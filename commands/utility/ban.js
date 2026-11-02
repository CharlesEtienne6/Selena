const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Pour bannir un utilisateur du serveur')
        .addUserOption(option =>
            option.setName('banned')
                .setDescription('Utilisateur à bannir')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Raison du bannissement')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            const user = interaction.options.get('banned').user;
            const reason = interaction.options.getString('reason');

            if (!user || !reason) {
                return interaction.reply('Vous avez omis la mention ou la raison du bannissement', { ephemeral: true });
            }

            if (user.id === interaction.user.id) {
                return interaction.reply('Vous ne pouvez pas vous auto-bannir !', { ephemeral: true });
            }

            if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
                return interaction.reply('Vous n\'avez pas les droits requis pour utiliser cette commande', { ephemeral: true });
            }

            const member = interaction.guild.members.cache.get(user.id);

            if (!member) {
                return interaction.reply('Utilisateur introuvable dans le serveur.', { ephemeral: true });
            }

            await member.ban({ reason: reason, days: 7 });
            interaction.reply(`<@${interaction.user.id}> vient de bannir <@${user.id}> pour la raison : ${reason}`);
        } catch (error) {
            console.error(error);
            return interaction.reply('Une erreur s\'est produite lors de l\'exécution de la commande.', { ephemeral: true });
        }
    },
};
