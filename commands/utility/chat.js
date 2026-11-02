const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

const { gpt3API } = require('../../config.json');

// Variables pour le contrôle des quotas
let lastInteractionTimestamp = null;
let interactionsCount = 0;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chat')
        .setDescription('Pour taper la discute avec le bot')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Votre message pour le bot')
                .setRequired(true)),
    async execute(interaction) {
        try {
            // Contrôle du taux d'utilisation (3 par minute)
            const currentTimestamp = Date.now();
            if (lastInteractionTimestamp && currentTimestamp - lastInteractionTimestamp < 60000) {
                interactionsCount++;
                if (interactionsCount > 3) {
                    const resetTime = new Date(lastInteractionTimestamp + 60000);
                    await interaction.deferReply({ ephemeral: true });
                    await interaction.followUp(`Vous avez atteint la limite d'intéractions par minute. Veuillez réessayer après ${resetTime.toLocaleTimeString()}`);
                    return;
                }
            } else {
                // Réinitialiser le compteur si une minute s'est écoulée
                lastInteractionTimestamp = currentTimestamp;
                interactionsCount = 1;
            }

            const userInput = interaction.options.getString('message');

            const conversationHistory = [
                { role: 'system', content: 'Vous êtes un bot du nom de Selena qui parle de manière conversationnelle.' },
                { role: 'user', content: userInput },
            ];

            await interaction.deferReply(); // Différer la réponse

            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: conversationHistory,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${gpt3API}`,
                    },
                }
            );

            const botReply = response.data.choices[0].message.content;

            // Répondre à l'interaction différée avec la réponse du bot
            await interaction.followUp(botReply);
        } catch (error) {
            // Gérer les erreurs DiscordAPIError
            if (error.code === 10062) {
                console.error('Erreur DiscordAPIError[10062]: Unknown interaction');
                await interaction.followUp('Une erreur s\'est produite lors du traitement de votre interaction.');
            } else {
                console.error('Erreur lors de la requête à l\'API OpenAI:', error.message);
                await interaction.followUp('Une erreur est survenue lors du traitement de la requête.');
            }
        }
    },
};
