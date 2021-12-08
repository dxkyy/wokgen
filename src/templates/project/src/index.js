const DiscordJS = require("discord.js");
const WOKCommands = require("wokcommands");
const path = require("path");
const config = require("../wokgen.json");

const client = new DiscordJS.Client({
  intents: 32767,
});

client.on("ready", () => {
  new WOKCommands(client, {
    commandsDir: path.join(__dirname, "commands"),
    featuresDir: path.join(__dirname, "features"),
    disabledDefaultCommands: [
      "language",
      "requiredrole",
      "channelonly",
      "help",
      "command",
    ],
    mongoUri: config.mongoURI,
  }).setDefaultPrefix(config.prefix);
});

client.login(config.token);
