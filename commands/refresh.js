const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('refresh')
		.setDescription('Removes all stored nicknames and colors!'),
	async execute(interaction) {

		// Check executor. If not Dylan, do nothing.
		if (interaction.user.id !== 200316185445793792) {
			await interaction.reply({ content: 'You\'re not <@200316185445793792>! You can\'t do that.', components: [] });
		} else {
			fs.unlinkSync('../files/Nicknames.txt');
			fs.appendFileSync('./files/Nicknames.txt',`\n`);
			
			await interaction.reply({ content: 'I have cleared all nicknames!', components: [] });
		};
	},
};