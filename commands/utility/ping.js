const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Affiche votre ping'),

	async execute(interaction) {
		const embed = new EmbedBuilder()
			.addFields(
				{ name: '**Votre ping est de  :**', value: `${Date.now() - interaction.createdTimestamp} ms` },
				{ name: '**Ma latence est de :**', value: `${Math.floor(interaction.client.ws.ping)} ms` },
			);

		await interaction.reply({ embeds: [embed] });
	},
};