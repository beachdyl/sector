const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('greeting')
		.setDescription('May I introduce myself?'),
	async execute(interaction) {
		const exampleEmbed = new MessageEmbed()
			.setColor('#532d8e')
			.setTitle('Hey there, I\'m Sector!')
			.setDescription('I\'m here to let you talk freely with the people that are important to you.')
			.addField('Developer', 'This bot is being developed by <@200316185445793792>.', true)
			.addField('Problem?', 'Did I make a mistake? No worries, just tell <@200316185445793792>.', true)
			.addField('Open Source', 'You can find the source code at https://github.com/beachdyl/sector/', false)
			.addField('Privacy', 'In order to make this bot work, I have to store your username and the nickname I assign in the same place. Nobody except the bot developer can find out which real user has which nickname. The server owner can prohibit members from interacting with the bot without ever knowing who they are.', false)
			.addField('Safety', 'The bot developer can (sometimes) access information about which real person sent what message. If a serious safety concern arises, they could use this information to file reports as appropriate, but it would take a decent amount of work. Requesting a new nickanme will not hide this information.', false)
			.setThumbnail('https://i.ibb.co/jgNS3rV/2175853.png')
			.setTimestamp();
		await interaction.reply({ephemeral: false, embeds: [exampleEmbed] });
	},
};