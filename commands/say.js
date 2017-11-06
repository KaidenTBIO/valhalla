module.exports = {
	name: 'say',
	description: 'Usage: v!say (sentence)\nMake Valhalla say something!',
	args: true,
	execute(message, args){
		return message.channel.send(`${args.join(" ")}`);
	}
}