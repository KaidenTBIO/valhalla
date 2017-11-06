module.exports = {
	name: 'prune',
	description: 'Usage: v!prune (amount)\nDelete (amount) of messages;',
    args: true,
	execute(message, args){
		const amount = parseInt(args[0]);
        if (isNaN(amount)){
            return message.channel.send("Número inválido de mensagens (não é um número).");
        }
        if (amount <= 1 || amount > 100){
            return message.channel.send("Número inválido de mensagens (deve ser menor que 100 e maior que 2).");
        }
        message.channel.bulkDelete(amount, true).catch(err => {
            console.log(err);
            return message.channel.send("Não foi possível deletar as mensagens.");
        });
	}
}