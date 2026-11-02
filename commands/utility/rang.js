const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rang')
        .setDescription('Pour définir le message des rangs'),

    async execute(interaction) {
        try {
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                return interaction.reply({ content: 'Seul un administrateur peut utiliser cette commande', ephemeral: true });
            }

            const embed = new EmbedBuilder()
                .setDescription(`Veuillez choisir votre rôle en fonction de votre rang le plus élevé de la saison:\n
                <:immortal:1192088247661244446> : Immortal\n
                <:glory:1192088243630510171> : Gloire Mythique\n
                <:honnor:1192088241160073296> : Honneur Mythique\n
                <:mythic:1192088237984985118> : Mythique\n
                <:legend:1192088250765021184> : Légende\n
                <:epic:1192088253612965979> : Épique\n
                <:gm:1192088257496887346> : Grand Maître\n
                <:master:1192088263423430726> : Maître\n
                <:elite:1192088261246599310> : Elite`);

            await interaction.deferReply();
            const msgReaction = await interaction.followUp({ embeds: [embed] });

            const emojis = ['<:immortal:1192088247661244446>', '<:glory:1192088243630510171>', '<:honnor:1192088241160073296>', '<:mythic:1192088237984985118>', '<:legend:1192088250765021184>', '<:epic:1192088253612965979>', '<:gm:1192088257496887346>', '<:master:1192088263423430726> ', '<:elite:1192088261246599310>'];
            
            for (const emoji of emojis) {
                await msgReaction.react(`${emoji}`);
            }             
        } catch (error) {
            console.error(error);
        }
    },
};
