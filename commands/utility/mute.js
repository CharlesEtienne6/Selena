const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute un utilisateur pour une durée spécifiée')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Utilisateur à mute')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('duration')
                .setDescription('Durée du mute en secondes')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Raison du mute')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            const user = interaction.options.get('user').user;
            const duration = parseInt(interaction.options.getString('duration'));
            const reason = interaction.options.getString('reason');

            if (!interaction.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
                return interaction.reply('Vous n\'avez pas les droits requis pour utiliser cette commande', { ephemeral: true });
            }

            if (isNaN(duration) || duration < 1) {
                return interaction.reply('Veuillez entrer une valeur chiffrée supérieure à 0 pour la durée', { ephemeral: true });
            }

            const member = interaction.guild.members.cache.get(user.id);

            if (!member) {
                return interaction.reply('Utilisateur introuvable dans le serveur.', { ephemeral: true });
            }

            const muteRoleID = "818603214886273077";
            if (member.roles.cache.has(muteRoleID)) {
                return interaction.reply('Ce membre est déjà mute', { ephemeral: true });
            }

            await member.roles.add(muteRoleID);
            interaction.reply(`<@${user.id}> a été mute pour une durée de ${duration} secondes par <@${interaction.user.id}> la raison : ${reason}`);

            setTimeout(() => {
                member.roles.remove(muteRoleID);
                interaction.followUp(`<@${user.id}> n'est plus mute`);
            }, duration * 1000);
        } catch (error) {
            console.error(error);
            return interaction.reply('Une erreur s\'est produite lors de l\'exécution de la commande.', { ephemeral: true });
        }
    },
};
