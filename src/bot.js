const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("ytdl-core");

const config = require("./config.json");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.author.bot) return;

    if (msg.content.indexOf(config.prefix) !== 0) return;

    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (msg.content.startsWith('oi val')) {
        msg.reply('Saudações, senhor.');
    }

    if (command === 'play') {
        const voiceChannel = msg.member.voiceChannel;
        const link = args.join(" ");
        msg.delete().catch(O_o => {});
        if (!voiceChannel) return msg.reply(`Não achei um canal de voz para entrar, Senhor.`);
        if (link === null) return msg.reply(`Não achei uma música, Senhor.`);
        msg.channel.send(link + " tocará em instantes, Senhor.");
        voiceChannel.join()
            .then(connnection => {
                const stream = ytdl(link, {filter: 'audioonly'});
                const dispatcher = connnection.playStream(stream);
                dispatcher.on('end', () => voiceChannel.leave());
            });
    }
});

client.login(config.token);
