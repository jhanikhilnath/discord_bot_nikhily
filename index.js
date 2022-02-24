require('dotenv').config();

const { Client, Intents } = require('discord.js');
const commands = require('./commands');

const allIntents = new Intents(32767);
const client = new Client({ intents: allIntents });
const PREFIX = '$';

client.on('ready', () => {
  console.log('The Bot is Ready');
});

client.on('messageCreate', message => {
  if (message.author.bot) return;
  console.log('Message Has Been Sent that reads:-', message.content);
  if (message.content.toLocaleLowerCase() === 'hello') {
    message.channel.send('hello');
  }
  if (message.content === 'ping') {
    const seconds = ((Date.now() - message.createdTimestamp) / 1000).toFixed(2);
    message.channel.send(`Pong! in *${seconds}s*`);
  }

  if (message.content.startsWith(PREFIX)) {
    const input = message.content.slice(1);
    const [command, ...args] = input.split(' ');
    console.log(command, args);
    if (command === 'kick') commands.kick(message, args);
    if (command === 'ban') commands.ban(message, args);
    if (command === 'prefix') commands.prefix(message, PREFIX);
  }
});

client.login(process.env.DISCORD_API_TOKEN);
