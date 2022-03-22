require('dotenv').config()
const { Client, Intents } = require('discord.js')
const intents = new Intents(32767);
const client = new Client({ intents });

client.on('ready', () => {
  console.log(`Bot initiated!`);
});

client.login(process.env.DISCORD_TOKEN)

// const fetchUser = async () => {return await client.users.fetch('393621989983780876')}

// const fetchGuilds = async () => {return await client.guilds.fetch()}

// fetchUser()
// .then((data) => console.log(data))

// fetchGuilds()
// .then((data) => console.log(data))


module.exports = client
