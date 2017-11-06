const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("ytdl-core");

//const config = require("./config.json");
const {token, prefix} = require("./config.json");

function Random(x){
    return Math.floor((Math.random()*x)+1);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    let channel = client.channels.get('369161251093348373');
    channel.send("Inicializando...\nValhalla, Gen-24 unidade 3B, acoplada à nave Beyond-Orion. \nSaudações.");
    client.game = "Pong";
    //client.setStatus('online', 'Researching life.');
});

client.on('message', message => {
    if (message.author.bot)
        return;

    /*if (message.content.indexOf(config.prefix) !== 0) 
        return;*/

    console.log(message.author.username + ": " + message.content);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.content.startsWith('oi val')) {
        //message.channel.send(`Saudações, senhor ${message.author.username}.`);
        message.channel.send(`Saudações, senhor ${message.author.username}`);
        //English users: "Greetings, mister (user).""
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
    }
    if (command === 'avatar'){
        try {
            const tagg = message.mentions.users.first();
            message.channel.send(`${tagg.username}'s avatar: ${tagg.avatarURL}`);
        } catch(e) {
            message.channel.send(`${message.author.username}'s avatar: ${message.author.avatarURL}`);
        }
    }

    if (command === 'roll'){
        try {
            parsedDie = args[0].split('d');
        } catch(e) {
            return message.channel.send("Formato errado; Dado deve ser suprido como NdN.");
            console.log(e);
        }

        dieQnt = parsedDie[0];
        dieSize = parsedDie[1];
        console.log(parsedDie);
        total = 0;

        for (var i = 0; i < dieQnt; i++){
            let v = Random(dieSize);
            message.channel.send(`Dado ${i+1}: ${v};`);
            total += v;
        }

        if (args[1] == null){
            message.channel.send(`Total das rolagens: ${total}`)
        } else {
            message.channel.send(`Total das rolagens: ${total+parseInt(args[1])};`)
            .catch(err => {
                message.channel.send("Argumento de incremento inválido");
                console.log(err);
            });
        }
    }

    if (command === 'say'){
        return message.channel.send(args[0]);
    }

    if (command === 'delete') {
        const amount = 
        if (isNaN(amount)){
            return message.channel.send("Número inválido de mensagens (não recebi um número).");
        }
        if (amount <= 1 || amount > 100){
            return message.channel.send("Número inválido de mensagens (deve ser menor que 100 e maior que 2).");
        }
        message.channel.bulkDelete(amount, true).catch(err => {
            console.log(err);
            return message.channel.send("Não foi possível deletar as mensagens.");
        });
    }
});

client.login(token);