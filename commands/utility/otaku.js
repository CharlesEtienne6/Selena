const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('otaku')
        .setDescription('Pour définir le message pour le rôle otaku'),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: 'Seul un administrateur peut utiliser cette commande', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setDescription(`Veuillez cocher le rôle ci-après si vous voulez avoir accès aux salons qui leurs sont réservés:\n
            ㊗️ : Otaku`);

        await interaction.deferReply();
        const msgReaction = await interaction.followUp({ embeds: [embed] });

        await msgReaction.react('㊗️');
    },
};
