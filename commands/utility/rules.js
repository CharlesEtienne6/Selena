const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Pour définir le message des règles'),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: 'Seul un administrateur peut utiliser cette commande', ephemeral: true });
        }

        const embed = new EmbedBuilder()
        .setDescription(`__**Règlement**__\n
        __Voici le règlement des salons Textuels__\n
        En cas de problème, mentionnez madou, Urek ou Chetci !\n
        Le respect des autres est super important, aucune forme de méchanceté gratuite, de racisme,sexisme, homophobie, discrimination ou autre ne sera acceptée, chaque personne mérite le respect.\n
        ------\n
        ❌ Le spam est totalement interdit.\n
        ❌ Les liens faisant la promotion d'un autre serveur sont interdit.\n
        ❌ Les abus de mentions sont prohibés.\n
        ❌ La divulgation de sa vie privée est à ses risques et périls.\n
        ❌ Toutes insultes, menaces ou formes de harcèlement se verront sanctionnées.\n
        ------\n
        Merci de respecter les salons textuels pour le bon fonctionnement du serveur et n'envoyez des messages que dans le salon approprié.\n
        ---\n
        __Règlement pour les salons Vocaux__\n
        ---\n
        ❌ Ne pas criez dans les oreilles des autres, car les bruits agaçants, forts et répétitifs sont désagréables pour tout le monde.\n
        ❌ Si votre micro est couvert prière de le changer ou de le couper pour pas déranger les autres.\n
        ❌ Ne vous amusez pas à quitter et revenir sans arrêt dans un vocal.\n
        ❌ Pour ce qui est de la musique ne skipper pas la musique sans demander l'autorisation et respecter le salon approprié !\n
        ------\n
        Merci de respecter ce règlement sous peine de sanctions.\n
        **__L'équipe vous remercie !__**`)
            .setImage("https://cdn.discordapp.com/attachments/818607659170136094/1196940975931662457/wallpaperflare.com_wallpaper.jpg?ex=65b97526&is=65a70026&hm=f611a8f4bed99aa517dda8cd0cec661693d58e40d7d2dd643492eff2915d5b48&");

        await interaction.deferReply();
        const msgReaction = await interaction.followUp({ embeds: [embed] });

        await msgReaction.react('✅');
    },
};
