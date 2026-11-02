const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Voir toutes les commandes du bot'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle("__La liste des commandes du bot__")
            .setColor("#22DD56")
            .setDescription(`Certaines commandes peuvent être restreintes en fonction de vos droits.`)
            .addFields(
                { name : '**/avatar**', value: "Affiche l\'avatar", inline : true},
                { name : "**/ban**", value : "Banni l'utilisateur mentionné", inline : true},
                { name : "**/clear**", value : "Efface le nombre de messages renseigné", inline : true},
                { name : "**/dm**", value : "Envoie un message privé à l'utilisateur mentionné", inline : true},
                { name : "**/chat**", value : "Permet de discuter avec le bot", inline : true},
                { name : "**/has**", value : "Liste tous les utilisateurs possédant le rôle mentionné", inline : true},
                { name : "**/kick**", value : "Renvoie l'utilisateur mentionné du serveur", inline : true},
                { name : "**/meme**", value : "Envoie un meme au hasard", inline : true},
                { name : "**/mute**", value : "Empêche l'utilisateur mentionné de parler sur le serveur", inline : true},
                { name : "**/otaku**", value : "Sert à définir le message pour le rôle otaku", inline : true},
                { name : "**/ping**", value : "Donne votre ping", inline : true},
                { name : "**/rang**", value : "Sert à définir le message pour les rôles de rangs", inline : true},
                { name : "**/rank**", value : "Affiche votre rang sur le serveur", inline : true},
                { name : "**/rules**", value : "Sert à définir le message des règles", inline : true},
                { name : "**/say**", value : "Envoie un message à votre place", inline : true},
                { name : "**/squadadd**", value : "Permet aux chefs de squad de donner le rôle de leur squad à  un utilisateur", inline : true},
                { name : "**/squaddremove**", value : "Permet aux chefs de squad de retirer le rôle de leur squad à un utilisateur", inline : true},
                { name : "**/type**", value : "Permet de définir le message pour les types", inline : true},
            )
            .setTimestamp();

        const helpAttachment = new AttachmentBuilder('assets/help.png', 'help.png');

        embed.setImage('attachment://help.png');
        embed.setFooter({ text : 'MLBB-Africa-Official'})

        await interaction.reply({ embeds: [embed], files: [helpAttachment] });
    },
};
