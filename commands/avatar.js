module.exports = {
	name: 'avatar',
	description: 'Usage: v!avatar [tag]\nGet the avatar of yourself (no arguments given) or a tagged user.',
	execute(message, args){
		try {
            const tagg = message.mentions.users.first();
            message.channel.send(`${tagg.username}'s avatar: ${tagg.avatarURL}`);
        } catch(e) {
            message.channel.send(`${message.author.username}'s avatar: ${message.author.avatarURL}`);
        }
	}
}