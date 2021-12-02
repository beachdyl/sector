const { SlashCommandBuilder } = require('@discordjs/builders');
const func = require('../functions.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('myname')
		.setDescription('Find out what your anonymous nickname is'),
	async execute(interaction) {
		await interaction.reply({ephemeral: true, content: `Your nickanme is **${func.getNickname(interaction.user.id)}**.\nIf you\'d like to change it, you can type \`/newname\`.`});
	},
};
