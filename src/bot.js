const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("ytdl-core");
const config = require("./config.json");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    var channel = client.channels.get("369161251093348373");
    channel.send("Inicializando...\nValhalla, Gen-24 unidade 3B, acoplada à nave Beyond-Orion. \nSaudações.");
    client.game = "Pong";
    //client.setStatus('online', 'Researching life.');
});

client.on('message', message => {
    if (message.author.bot)
        return;

    if (message.content.indexOf(config.prefix) !== 0) 
        return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.content.startsWith('oi val')) {
        message.channel.send(`Saudações, senhor @${message.author.tag}.`);
        //English users: "Greetings, mister (user)."
    }

    if (command === 'play') {
        const voiceChannel = message.member.voiceChannel;
        const link = args.join(" ");
        message.delete().catch(O_o => {});
        if (!voiceChannel) 
            return message.reply(`Não achei um canal de voz para entrar, Senhor.`);
            //"I have not found a voice channel to log in, Mister."
        if (link === null) 
            return message.reply(`Não achei uma música, Senhor.`);
            //"I have not found any songs, Mister."
        message.channel.send(link + " tocará em instantes, Senhor.");
        //"{video} will play in a few moments, Mister."
        voiceChannel.join()
            .then(connnection => {
                const stream = ytdl(link, {filter: 'audioonly'});
                const dispatcher = connnection.playStream(stream);
                dispatcher.on('end', () => voiceChannel.leave());
            });
    if (command === 'avatar'){
    	message.channel.send(message.author.avatarURL);
    }
    }
});

client.login(config.token);