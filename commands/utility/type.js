const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('type')
        .setDescription('Pour définir le message des types'),

    async execute(interaction) {
        try {
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                return interaction.reply({ content: 'Seul un administrateur peut utiliser cette commande', ephemeral: true });
            }

            const embed = new EmbedBuilder()
                .setDescription(`Veuillez choisir votre rôle en fonction de ceux que vous avez choisi dans le jeu. Pas plus de trois rôles par personne s'il-vous-plaît ! Merci <:Chou:823906633075130408> <:Johnson:823906705816551464> <:Beatrix_2:823906546731057183> !\n
                <:Tank:845353379831480330> : Tank\n
                <:Fighter:845353379394748428> : Fighter\n
                <:Mage:845353321619390534> : Mage\n
                <:Assassin:845353321202974800> : Assassin\n
                <:Support:845353320716697650>  : Support\n
                <:Marksman:845353320347467776> : Marksman`);

            await interaction.deferReply();
            const msgReaction = await interaction.followUp({ embeds: [embed] });

            const emojis = ['<:Tank:845353379831480330>', '<:Fighter:845353379394748428>', '<:Mage:845353321619390534>', '<:Assassin:845353321202974800>', '<:Support:845353320716697650>', '<:Marksman:845353320347467776>'];
            
            for (const emoji of emojis) {
                await msgReaction.react(`${emoji}`);
            }                    
        } catch (error) {
            console.error(error);
        }
    },
};
