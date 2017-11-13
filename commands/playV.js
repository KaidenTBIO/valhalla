const ytdl = require("ytdl-core");

module.exports = {
	name: 'playV',
	description: 'Usage: v!playV (youtube link)\nPlay a youtube video.',
    args: true,
	execute(message, args){
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
}