const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, AttachmentBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('has')
        .setDescription('Affiche la liste des utilisateurs avec un certain rôle')
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('Rôle à vérifier')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            const roleID = interaction.options.getRole('role').id;
            const guild = interaction.guild;

            if (!roleID) {
                return interaction.reply('Veuillez spécifier un rôle valide.', { ephemeral: true });
            }
            if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)){
                return await interaction.reply('Vous n\'avez pas les droits requis pour utiliser cette commande', { ephemeral: true });
            }

            // Fetch all members to ensure they are in the cache
            await guild.members.fetch();

            const role = guild.roles.cache.get(roleID);

            if (!role) {
                return interaction.reply('Le rôle spécifié n\'existe pas dans ce serveur.', { ephemeral: true });
            }

            const membersWithRole = role.members;
            console.log(membersWithRole);

            const embed = new EmbedBuilder()
                .setTitle(`${role.name}`)
                .setDescription(`Il y a ${membersWithRole.size} utilisateur(s) avec ce rôle`)
                .addFields(
                    { name: "Voici la liste", value: membersWithRole.map(m => m.user.username).join('\n') }
                )
                .setColor("#7000D0")
                .setTimestamp()
                .setFooter({ text : "MLBB-Africa-Official"});

                const hasAttachment = new AttachmentBuilder('assets/has.jpg', 'has.jpg');
                embed.setImage('attachment://has.jpg');

            await interaction.reply({ embeds: [embed], files: [hasAttachment] });
        } catch (error) {
            console.error(error);
            return interaction.reply('Une erreur s\'est produite lors de l\'exécution de la commande.', { ephemeral: true });
        }
    },
};
