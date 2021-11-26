const { CLIENT_ID, GUILD_ID, token } = require('./conf.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const pnggen = require('./pnggen');
const mongohandler = require('./mongohandler');
mongohandler.init();
const { Client, Intents ,MessageActionRow, MessageButton, MessageEmbed, MessageAttachment} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


const commands = [{
  name: 'annoncehost',
  description: "Genére une annonce d'host"
},
{
	name: 'test',
	description: "test enft"
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

		if (interaction.commandName === 'Annonce') { 
			console.log(interaction);
			await interaction.reply("ok");

		};


		if (interaction.commandName === 'annoncehost') {
      var annonce = new mongohandler.Events(interaction.guildId,interaction.channelId,)

			interaction.reply(await annonce.discordmessage())
      .then(function(msg) {
        annonce.setmessageid(msg.id);
        annonce.save();
      })
      .catch(console.error);;
		
		}
    }


	
	if (interaction.isButton()) {
		var annonce = await new mongohandler.Events().getfromdb(interaction.message.id);
		await interaction.message.edit(await annonce.discordmessage());
	}


});

client.login(token);