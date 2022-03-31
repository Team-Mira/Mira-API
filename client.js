require('dotenv').config()
const { Client, Intents } = require('discord.js')
const intents = new Intents(32767);
const client = new Client({ intents });

client.on('ready', () => {
  console.log(`Bot initiated!`);
});

client.login(process.env.BOT_TOKEN)

module.exports = client
