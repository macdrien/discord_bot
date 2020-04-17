const Permissions = require('discord.js/src/util/Permissions');

const config = require('../config.json');

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

        // Verify the arguments of the command
        if (args.length < 3) {
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
                });

                // Add given members to the team
                message.guild.members.cache.filter(member => args.map(usernameToFind => {
                    if (member.nickname === usernameToFind || member.user.username === usernameToFind)
                        member.roles.add(role)
                            .catch(error => message.channel.send(`Error adding role ${role.name} to ${member.user.username}`));
                }));
            });
    }
};