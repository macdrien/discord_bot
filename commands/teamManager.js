const Permissions = require('discord.js/src/util/Permissions');

const config = require('../config.json');

const Log = require('../logSystem');

// Tools
const TableTools = require('../tools/tableTools');

module.exports = {
    /**
     * Get the command received by the bot.
     * 
     * The command need at least 3 arguments. All arguments have to be between a pair of "
     * The first argument is the name of the team to create
     * The following arguments (at least 2 but there is no maximum) are the names or nickames of the members of the team.
     * 
     * The command do the following steps:
     * Check the arguments number validity
     * Create the role. 
     *      The name of the role is the name of the team
     * Create the channel.
     *      The name of the role is the name of the team.
     *      The channel is a voice channel.
     *      Only the team members can [connect, speak, use voice detection, stream, view channel].
     * Search in the guild members the team members.
     *      The team members receive the new role.
     * 
     * @param {Message} message the message received by the bot
     */
    createTeam(message) {
        const args = message.content.slice(config.commandPrefix).split('"');
        args.shift();

        for (var counter = 0; counter < args.length; counter++)
            if (args[counter] === ' ' || args[counter] === '')
                args.splice(counter, 1);

        Log.log(`Arguments : ${args}`);

        // Verify the arguments of the command
        if (args.length < 3) {
            Log.error(`The number of command argument is lower than 3, abort command.`);
            return;
        }

        // Create the role
        message.guild.roles.create({
            data: {
                name: args[0],
                mentionable: true
            }
        })
            .then(role => {

                Log.log(`The role ${role.name} is successfully created.`);

                args.splice(0, 1);

                // Create the channel with the acces right for "modo" (and uppers) and the role just created
                message.guild.channels.create(role.name, {
                    type: "voice",
                    parent: message.guild.channels.cache.filter(channel => channel.name === 'Salons vocaux').first(),
                    permissionOverwrites: [{
                        id: role.id,
                        allow: [
                            Permissions.CONNECT,
                            Permissions.SPEAK,
                            Permissions.STREAM,
                            Permissions.USE_VAD,
                            Permissions.VIEW_CHANNEL,
                        ],
                        type: 'role',
                    }],
                })
                    .then(channel => Log.log(`The channel ${channel.name} is successfully created`))
                    .catch(error => Log.error(`Error during the channel creation : ${error}`));

                // Add given members to the team
                message.guild.members.cache.filter(member => args.map(usernameToFind => {
                    if (member.nickname === usernameToFind || member.user.username === usernameToFind)
                        member.roles.add(role)
                            .then(() => Log.log(`Role ${role.name} added to the user ${member.user.name}`))
                            .catch(error => {
                                const errorMessage = `Error adding role ${role.name} to ${member.user.name}`;
                                Log.error(errorMessage);
                                message.channel.send(errorMessage);
                            });
                }));
            })
            .catch(error => Log.error(`Error during the role creation : ${error}`));
    },
    /**
     * Delete a team.
     * A team is defined by its name. A team is a role and a channel with the team name.
     * 
     * This method delete the channel with the given team name and
     * next it delete the associated role.
     * 
     * @param {*} message The message received by the bot
     */
    deleteTeam(message) {
        var args = message.content
            .slice(config.commandPrefix)
            .split('"');
        args.shift();

        args = TableTools.whiteSpaceSplicer(args);

        Log.log(`Arguments : ${args}`);

        if (args.length == 0) {
            Log.error(`The command has no argument.`);
            return;
        }

        // Search the channel and delete it
        message.guild.channels.cache.some(channel => {
            if (channel.name == args[0])
                channel.delete()
                    .then(channel => `The channel ${channel.name} is deleted`)
                    .catch(error => {
                        Log.error(`Error during the deletion of the channel ${channel.name}`)
                        Log.error(error);
                    });
        });

        // Search the role and delete it
        message.guild.roles.cache.some(role => {
            if (role.name == args[0])
                role.delete()
                    .then(role => `The role ${role.name} is deleted`)
                    .catch(error => {
                        Log.error(`Error during the deletion of the role ${role.name}`)
                        Log.error(error);
                    });
        });
    }
};