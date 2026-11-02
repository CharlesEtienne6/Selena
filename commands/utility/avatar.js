const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Affiche l\'avatar')
        .addUserOption(option =>
            option.setName('utilisateur')
                .setDescription('L\'utilisateur dont vous voulez voir l\'avatar')
                .setRequired(false)),

	async execute(interaction) {
        if (interaction.commandName === "avatar" && interaction.options.getUser('utilisateur')) {
            const embed = new EmbedBuilder()
            .setDescription(`Voici l'avatar de : ${interaction.options.getUser('utilisateur')}`)
            .setImage(interaction.options.getUser('utilisateur').displayAvatarURL({extension: 'jpeg', size: 4096, dynamic: true}))

            await interaction.reply({ embeds: [embed] })
        } else if (interaction.commandName === "avatar") {
            const embed = new EmbedBuilder()
            .setDescription(`Voici votre avatar : <@${interaction.user.id}>`)
            .setImage(interaction.user.displayAvatarURL({extension: 'jpeg', size: 4096, dynamic: true}))

            await interaction.reply({ embeds: [embed] })
        }
		
	},
};