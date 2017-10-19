const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("ytdl-core");
const config = require("./config.json");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (message.author.bot) 
        return;

    if (message.content.indexOf(config.prefix) !== 0) 
        return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.content.startsWith('oi val')) {
        message.reply('Saudações, senhor.');
    }

    if (command === 'play') {
        const voiceChannel = message.member.voiceChannel;
        const link = args.join(" ");
        message.delete().catch(O_o => {});
        if (!voiceChannel) 
            return message.reply(`Não achei um canal de voz para entrar, Senhor.`);
        if (link === null) 
            return message.reply(`Não achei uma música, Senhor.`);
        message.channel.send(link + " tocará em instantes, Senhor.");
        voiceChannel.join()
            .then(connnection => {
                const stream = ytdl(link, {filter: 'audioonly'});
                const dispatcher = connnection.playStream(stream);
                dispatcher.on('end', () => voiceChannel.leave());
            });
    }
});

client.login(config.token);