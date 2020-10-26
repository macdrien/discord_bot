const config = require('./config.json');

const Discord = require('discord.js');
const bot = new Discord.Client();

const Log = require('./logSystem');

// Modules and commands file
const Random = require('./commands/randomCommands');
const TeamManager = require('./commands/teamManager');

bot.once('ready', () => {
    Log.log('Bot up');
    Log.addSeparator();
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
            Log.log('New ping command');
            Log.startGroup();

            message.channel.send('Pong!');

            Log.closeGroup();
            Log.log('End ping command');

            break;
        // Command create a team
        case 'createTeam':
            Log.log('New createTeam command');
            Log.startGroup();

            TeamManager.createTeam(message);

            Log.closeGroup();
            Log.log('End createTeam command');

            break;
        // Command delete a team
        case 'deleteTeam':
            Log.log('New deleteTeam command');
            Log.startGroup();

            TeamManager.deleteTeam(message);

            Log.closeGroup();
            Log.log('End deleteTeam command');

            break;
        // Flip a coin command (pf for 'Pile ou Face' in french)
        case 'pf':
            Log.log('New pf command');
            Log.startGroup();

            Random.pileFace(message);

            Log.closeGroup();
            Log.log('End pf command');

            break;
        // Command to roll dices
        case 'roll':
            Log.log('New roll command');
            Log.startGroup();

            Random.rollDice(message);

            Log.closeGroup();
            Log.log('End roll command');

            break;
        default:
            Log.log(`The command "${command}" does not exist`);
    }
});

bot.login(config.token);