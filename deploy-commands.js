import {SlashCommandBuilder} from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

const commands = [
	new SlashCommandBuilder().setName('bayan').setDescription('Esra benimle evlenir misin'),
	new SlashCommandBuilder().setName('benimle').setDescription('Esra benimle evlenir misin'),
	new SlashCommandBuilder().setName('evlenir').setDescription('Esra benimle evlenir misin'),
    new SlashCommandBuilder().setName('misin').setDescription('Esra benimle evlenir misin'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken("NjMyNjIzNTA0NjUwNTM0OTE0.GyVsP1.5BrIVr_W54O6OSpRmLHOoOp03nSdJz1wA5Fm7w");

rest.put(Routes.applicationGuildCommands("632623504650534914", "970703932852682852"), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);