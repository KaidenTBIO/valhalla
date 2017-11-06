const {prefix} = require('../config.json');

module.exports = {
	name: 'help',
	description: 'Descrição de meus comandos.',
	usage: '[nome do comando]',
	execute(message, args){
		const {commands} = message.client;
		const data = [];

		if (!args.length){
			data.push('```');
			data.push("Valhalla, Gen-24 diretriz B, desenvolvido por Kaiden#5119.");
			data.push("Uso: v!(comando) [argumentos]");
			data.push("=============================");
			data.push("Comandos:\n  ")
			data.push(commands.map(command => command.name).join('\n  '));
			data.push("\n Use `v!help [nome do comando]` para informação específica em um comando.")
			data.push("=============================");
			data.push("Para contribuições, visite o repositório no Github:");
			data.push("```");
			data.push("https://github.com/KaidneTBIO/valhalla");
		} else {
			if (!commands.has(args[0])){
				return message.channel.send("Não conheço tal comando.");
			}

			const command = commands.get(args[0]);
			data.push('```');
			data.push('Nome: '+ command.name);
			if (command.description)
				data.push('Descrição: ' + command.description);

			if (command.usage)
				data.push('Uso: ' + command.usage);

			data.push('```');
		}

		return message.channel.send(data);
	}
}