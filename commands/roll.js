function Random(x){
    return Math.floor((Math.random()*x)+1);
}

module.exports = {
	name: 'roll',
	description: 'Roll dice in NdN format; supply an increment (+ or -) as second argument, if desired',
    args: true,
    usage: '<NdN dice> <increment>',
	execute(message, args){
		try {
            parsedDie = args[0].split('d');
        } catch(e) {
            return message.channel.send("Formato errado; Dado deve ser suprido como NdN.");
            console.log(e);
        }

        dieQnt = parsedDie[0];
        dieSize = parsedDie[1];
        if (dieQnt < 1 || dieQnt > 255) {
            return message.channel.send("Número inválido de dados.");
        }
        else if (dieSize < 0 || dieSize > 255) {
            return message.channel.send("Número inválido de lados.");
        }
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
}