const config = require('../config.json');

module.exports = {
    /**
     * Generate a number between 0 and 1.
     * If the number is lower or equels than 0.5, then send the message 'Pile'.
     * Else send the message 'Face'.
     * 
     * @param {*} message The received message from discord
     */
    pileFace(message) {
        const tirage = Math.random();

        message.channel.send(tirage <= 0.5 ? 'Pile' : 'Face');
    },
    /**
     * Generate random number to simulate dices roll.
     * 
     * @param {*} message The received message from discord
     */
    rollDice(message) {
        var args = message.content.slice(config.commandPrefix).split(' ');
        args.shift();

        args = args[0].split('d');

        const numberOfRolls = parseInt(args[0]);
        const diceSize = parseInt(args[1]);

        var diceResult = 0;
        var messageToReturn = '';

        if (numberOfRolls === 1) {
            diceResult = Math.floor(Math.random() * (diceSize * 10) % diceSize);
            messageToReturn = `Tirage ${diceResult}`;

        } else {
            var result;

            for (var counter = 0; counter < numberOfRolls; counter++) {
                result = Math.floor(Math.random() * (diceSize * 10) % diceSize);
                messageToReturn += `Dice result : ${result}\n`;
                diceResult += result;
            }

            messageToReturn = `${messageToReturn}\n Total : ${diceResult}`;
        }

        message.channel.send(messageToReturn);
    }
};