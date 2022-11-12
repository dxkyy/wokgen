import { Client, IntentsBitField, Partials } from "discord.js";
import WOK from "wokcommands";
import path from "path";
require("dotenv/config");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.on("ready", () => {
  new WOK({
    client,
    commandsDir: path.join(__dirname, "commands"),
    events: {
      dir: path.join(__dirname, "events"),
    },
    featuresDir: path.join(__dirname, "features"),
    mongoUri: process.env.MONGO_URI,
  });
});

client.login(process.env.TOKEN);
