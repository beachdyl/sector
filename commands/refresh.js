const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('refresh')
		.setDescription('Removes all stored nicknames and colors!'),
	async execute(interaction) {
		fs.unlinkSync('../files/Nicknames.txt')
		fs.appendFileSync('./files/Nicknames.txt',`\n`)
		
		await interaction.reply({ content: 'I have cleared all nicknames!', components: [] });
	},
};