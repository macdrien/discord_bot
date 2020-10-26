# goodgame-discord-bot

The GoodGame discord bot is the bot which runs on the discord server GoodGame.  
This bot implement some commands which can provide game team management or random generation.

To be able to run commands, you need to have the role "commander".

## Commands

### createTeam

This command allows to automate team creation.  
It:

- Create a new role.
- Create a new channel.
- Set the new role to the given team mates.

The channel is created, and the role is given to the team only if the role is created.  
During the role attribution, if the role cannot be given to a team mate, send a log to the server commands channel and try the next user.

The command need at least 3 arguments:

- the name of the team.
- at least 2 team mates. (why create a team with only 1 guy?)

All arguments are between ".

Command example:

```bash
/createTeam "teamName" "user1" "user 2"
```
