const config = require('./config.json');

const Discord = require('discord.js');
const bot = new Discord.Client();

// Modules and commands file
const Random = require('./commands/randomCommands');
const TeamManager = require('./commands/teamManager');

bot.once('ready', () => {
    console.log('Bot up!');
});

bot.on('message', message => {
    // Test all wrong cases
    if (!message.content.startsWith(config.commandPrefix) || // The messages which aren't a command
        message.author.bot || // The messages from the bot (even if it's a commmand)
        message.channel.name !== config.commandChannel || // The messages which aren't in the command channel
        !message.member.roles.cache.some(role => role.name === config.roleWhichCanRunCommands)) // The author does not have the permission to send commands
        return;

    const command = message.content.slice(config.commandPrefix).split(' ').shift().substr(1);

    switch (command) {
        // Test command
        case 'ping':
            message.channel.send('Pong!');
            break;
        // Command create a team
        case 'createTeam':
            TeamManager.createTeam(message);
            break;
        case 'pf':
            Random.pileFace(message);
            break;
        case 'roll':
            Random.rollDice(message);
            break;
    }
});

bot.login(config.token);