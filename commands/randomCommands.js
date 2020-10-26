const config = require('../config.json');

const Log = require('../logSystem');

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

        Log.log(`Random number generated : ${tirage}`);

        message.channel.send(tirage <= 0.5 ? 'Pile' : 'Face');

        Log.log(`Method send message : ${tirage <= 0.5 ? 'Pile' : 'Face'}`);
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

        Log.log(`Roll ${numberOfRolls} of ${diceSize} sides dice`);

        var diceResult = 0;
        var messageToReturn = '';

        if (numberOfRolls === 1) {
            diceResult = Math.floor(Math.random() * (diceSize * 10) % diceSize);
            messageToReturn = `Tirage ${diceResult}`;

            Log.log(`Message to return : "${messageToReturn}"`);

        } else {
            var result;

            for (var counter = 0; counter < numberOfRolls; counter++) {
                Log.log(`Draw : ${counter + 1}`);

                result = Math.floor(Math.random() * (diceSize * 10) % diceSize);
                messageToReturn += `Dice result : ${result}\n`;

                Log.log(`Message to return : ${messageToReturn}`);

                diceResult += result;

                Log.log(`Temporary dices result sum : ${diceResult}`);
            }

            messageToReturn = `${messageToReturn}\n Total : ${diceResult}`;
        }

        Log.log(`Message to send : ${messageToReturn}`);

        message.channel.send(messageToReturn);
    }
};