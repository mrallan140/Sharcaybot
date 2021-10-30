const { CLIENT_ID, GUILD_ID, token } = require('./conf.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


const { Client, Intents ,MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


const commands = [{
  name: 'annoncehost',
  description: "Genére une annonce d'host"
},
{
	name: 'test',
	description: "test enbft"
}]; 

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
	if(!(interaction.isButton || interaction.isCommand)) return;

	if (interaction.isCommand()) {

		if (interaction.commandName === 'test') { 
			interaction.reply('Please enter more input.').then(() => {
				//const filter = m => interaction.user.id === m.author.id;
				const filter = m => m.content.startsWith('!vote');
				console.log(interaction.user.id);
				interaction.channel.awaitMessages({ time: 60000, max: 1, errors: ['time'] })
					.then(messages => {
						console.log(messages.author.id);
						interaction.followUp(`You've entered: ${messages.first().content}`);
					})
					.catch(() => {
						interaction.followUp('You did not enter any input!');
					});
			});

		};


		if (interaction.commandName === 'annoncehost') {
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('in')
						.setLabel('Je participe')
						.setStyle('SUCCESS'),
				)
				.addComponents(
					new MessageButton()
						.setCustomId('out')
						.setLabel('Je ne participe plus')
						.setStyle('DANGER'),
				);
			const exampleEmbed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Private Game')
				//.setURL('https://discord.js.org/')
				.setAuthor('Sharcay Bot', 'https://nas.gallan.fr/s/eeHt8QsCbRK6c9n/preview')
				.setDescription('Inscription pour la Private Game')
				.setThumbnail('https://nas.gallan.fr/s/eeHt8QsCbRK6c9n/preview')
				.addFields(
					{ name: 'Regular field title', value: 'Some value here' },
					{ name: '\u200B', value: '\u200B' },
					{ name: 'Date', value: 'Some value here', inline: true },
					{ name: 'Heure', value: 'Some value here', inline: true },
				)
				//.addField('Inline field title', 'Some value here', true)
				//.setImage('https://nas.gallan.fr/s/pK3bBKRJyf9LKAZ/preview')
				.setTimestamp()
				.setFooter('Mrallan140 2021', 'https://nas.gallan.fr/s/eeHt8QsCbRK6c9n/preview');
			
			await interaction.reply({content:'Pong!', components: [row],embeds: [exampleEmbed] });
		
		}
    }
	if (interaction.isButton()) {
		
		await interaction.reply('Pong!');
	}


});

client.login(token);