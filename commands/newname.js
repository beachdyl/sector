const { SlashCommandBuilder } = require('@discordjs/builders');
const func = require('../functions.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newname')
		.setDescription('Generate a new anonymous nickname'),
	async execute(interaction) {
		await interaction.reply({ephemeral: true, content: `Your old nickname has been retired. You are now known as **${func.newNickname(interaction.user.id)}**.`});
	},
};
