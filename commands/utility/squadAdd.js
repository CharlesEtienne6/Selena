const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('squadadd')
        .setDescription('Ajoute un utilisateur à une squad.')
        .addUserOption(option =>
            option.setName('utilisateur')
                .setDescription('L\'utilisateur à ajouter à la squad')
                .setRequired(true)),        

    async execute(interaction) {
        const chefTSP = "502586280291336212";
        const chefSOA = "1011638143264493608";
        const chefPAIN = "420273793852768286";
        const chefTSK = "709187390253826109";
        const chefTLB = "364886374815498243";
        const chefX2L = "368912373358133250";
        const chefLK = "692667444044496898";
        const chef本 = "395978756113825792";
        const chefAKT = "820215241882730527";
        const chefOMG = "1205621806107598908";
        const chefOTAK = "1218925031791263794";

        const user = interaction.options.getMember('utilisateur');

        if (!user) {
            return interaction.reply({ content: 'Veuillez mentionner un utilisateur.', ephemeral: true });
        }

        const roles = {
            TSP: "1015714682587324598",
            TSK: "1015714339602313216",
            TLB: "1015714425216438282",
            PAIN: "1015708644542775427",
            SOA: "1015716643525107783",
            X2L: "1197967510948020295",
            LK: "1218320257824067735",
            本 : "1218329305935908984",
            AKT : "1218333724610138282",
            OMG : "1218972860383760404",
            OTAK : "1219277889632211084"
        };

        if (interaction.user.id === chefTSP) {
            await user.roles.add(roles.TSP);
            return interaction.reply({ content: `${user} a été ajouté comme membre de votre squad !` });
        } else if (interaction.user.id === chefTSK) {
            await user.roles.add(roles.TSK);
            return interaction.reply({ content: `${user} a été ajouté comme membre de votre squad !` });
        } else if (interaction.user.id === chefTLB) {
            await user.roles.add(roles.TLB);
            return interaction.reply({ content: `${user} a été ajouté comme membre de votre squad !` });
        } else if (interaction.user.id === chefPAIN) {
            await user.roles.add(roles.PAIN);
            return interaction.reply({ content: `${user} a été ajouté comme membre de votre squad !` });
        } else if (interaction.user.id === chefSOA) {
            await user.roles.add(roles.SOA);
            return interaction.reply({ content: `${user} a été ajouté comme membre de votre squad !` });
        } else if (interaction.user.id === chefX2L) {
            await user.roles.add(roles.X2L);
            return interaction.reply({ content: `${user} a été ajouté comme membre de votre squad !` });
        } else if (interaction.user.id === chefLK) {
            await user.roles.add(roles.LK);
            return interaction.reply({ content: `${user} a été ajouté comme membre de votre squad !` });
        } else if (interaction.user.id === chef本) {
            await user.roles.add(roles.本);
            return interaction.reply({ content: `${user} a été ajouté comme membre de votre squad !` });
        } else if (interaction.user.id === chefAKT) {
            await user.roles.add(roles.AKT);
            return interaction.reply({ content: `${user} a été ajouté comme membre de votre squad !` });
        } else if (interaction.user.id === chefOMG) {
            await user.roles.add(roles.OMG);
            return interaction.reply({ content: `${user} a été ajouté comme membre de votre squad !` });
        } else if (interaction.user.id === chefOTAK) {
            await user.roles.add(roles.OTAK);
            return interaction.reply({ content: `${user} a été ajouté comme membre de votre squad !` });
        } else {
            return interaction.reply({ content: "Vous n'êtes pas autorisé à utiliser cette commande !", ephemeral: true });
        }
    },
};
