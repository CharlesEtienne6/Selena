const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, AttachmentBuilder } = require('discord.js');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const dbdb = new FileSync('db.json');
const db = low(dbdb);

db.defaults({ Infos_membres: [] }).write();

const data = new SlashCommandBuilder()
    .setName('giveaway')
    .setDescription('Pour créer un giveaway')
    .addStringOption((option) =>
        option.setName('prix').setDescription('Le prix du giveaway').setRequired(true)
    )
    .addIntegerOption((option) =>
        option.setName('nombre').setDescription('Le nombre de participants au giveaway').setRequired(true)
    )
    .addIntegerOption((option) =>
        option.setName('niveau').setDescription('Le niveau minimal requis pour participer au giveaway').setRequired(true)
    )
    .addIntegerOption((option) =>
        option.setName('max').setDescription('Le niveau maximal autorisé à participer').setRequired(false)
    );

module.exports = {
    data,
    async execute(interaction) {
        try {
            // Vérifier les autorisations
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                return interaction.reply({
                    content: "Vous n'avez pas les autorisations nécessaires pour créer un giveaway.",
                    ephemeral: true,
                });
            }

            const prix = interaction.options.getString('prix');
            const niveauRequis = interaction.options.getInteger('niveau');
            const nombreParticipants = interaction.options.getInteger('nombre');
            const niveauMax = interaction.options.getInteger('max');

            // Charger les données à partir du fichier JSON
            db.read();

            // Sélectionner les utilisateurs éligibles en fonction du niveau et du niveau maximal
            const utilisateursEligibles = db
                .get('Infos_membres')
                .filter((membre) => {
                    if (niveauMax) {
                        return membre.niveau >= niveauRequis && membre.niveau <= niveauMax;
                    } else {
                        return membre.niveau >= niveauRequis;
                    }
                })
                .value();

            // Vérifier s'il y a suffisamment d'utilisateurs éligibles
            if (utilisateursEligibles.length < nombreParticipants) {
                return interaction.reply({
                    content: 'Il n\'y a pas assez d\'utilisateurs éligibles avec le niveau requis pour atteindre le nombre spécifié de participants.',
                    ephemeral: true,
                });
            }

            // Mélanger la liste des utilisateurs éligibles
            const utilisateursMelanges = utilisateursEligibles.sort(() => Math.random() - 0.5);

            // Sélectionner le nombre spécifié de gagnants
            const gagnants = utilisateursMelanges.slice(0, nombreParticipants);

            // Construire l'embed du giveaway avec les gagnants mentionnés
            const embedGiveaway = new EmbedBuilder()
                .setTitle('🎉 Giveaway 🎉')
                .setColor('#FFD700') // Couleur dorée
                .addFields(
                    { name: 'Prix', value: prix },
                    { name: 'Gagnant(s)', value: gagnants.map((gagnant) => `<@${gagnant.id}>`).join(', ') }
                )
                .setTimestamp();

                const giveawaysAttachment = new AttachmentBuilder('assets/giveaways.jpg', 'giveaways.jpg');
                embedGiveaway.setImage('attachment://giveaways.jpg');

            // Envoyer le message du giveaway avec l'embed
            interaction.reply({ embeds: [embedGiveaway], files: [giveawaysAttachment] });
        } catch (error) {
            console.error(error);
            return interaction.reply({
                content: "Une erreur s'est produite lors de la création du giveaway.",
                ephemeral: true,
            });
        }
    },
};
