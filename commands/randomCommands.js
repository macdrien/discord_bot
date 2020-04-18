const config = require('../config.json');

module.exports = {
    pileFace(message) {
        const tirage = Math.random();

        message.channel.send(tirage <= 0.5 ? 'Pile' : 'Face');
    }
};