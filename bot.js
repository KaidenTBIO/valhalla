const fs = require('fs');
const Discord = require("discord.js");
const music = require('discord.js-music-v11');
const {token, prefix} = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands');
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const ytdl = require("ytdl-core");

function Random(x){
    return Math.floor((Math.random()*x)+1);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    let channel = client.channels.get('369161251093348373');
    channel.send("Inicializando...\nValhalla, Gen-24 unidade 3B, acoplada à nave Beyond-Orion. \nSaudações.");
    client.user.setGame("Pong.");
    //client.setStatus('online', 'Researching life.');
});

client.on('message', message => {
    if (message.author.bot)
        return;

    /*if (message.content.indexOf(config.prefix) !== 0) 
        return;*/

    console.log(message.author.username + ": " + message.content);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    if (message.content.startsWith('oi val')) {
        //message.channel.send(`Saudações, senhor ${message.author.username}.`);
        message.channel.send(`Saudações, senhor ${message.author.username}.`);
        //English users: "Greetings, mister (user)."
    }

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.args && !args.length){
        let reply = `Você não providenciou nenhum argumento, Senhor ${message.author.username}.`;
        if (command.usage){
            reply += `\nUso: \`${prefix}${command.name} ${command.usage}\``
        }
        return message.channel.send(reply);
    }

    try {
        command.execute(message, args);
    } catch (e) {
        console.log("ERROR:" + e);
        message.channel.send("Não foi possível executar o comando.");
    }
});

music(client, {
	prefix: prefix,
	global: false,
	maxQueueSize: 5,
	clearInvoker: true
});

client.login(token);