import prompts, { PromptObject } from "prompts";
import clc from "cli-color";
import fs from "fs";
import path from "path";
import {
  name,
  mainDir,
  commandsDir,
  eventsDir,
  featuresDir,
  token,
  prefix,
  mongoUri,
} from "../util/prompts/init";
import { createDirectoryContents, delay, initNPM } from "../util/functions";

export async function init() {
  let data = await prompts([
    name,
    mainDir,
    commandsDir,
    eventsDir,
    featuresDir,
    token,
    prefix,
    mongoUri,
  ]);
  const packageJson = fs.readFileSync(
    path.join(__dirname, "..", "templates", "package.json")
  );
  const botName = data["bot-name"];
  const mainDirectory = data["dir-main"];
  const cmdDirecotry = data["dir-cmd"];
  const eventDirectory = data["dir-event"];
  const featDirectory = data["dir-feat"];
  const CURR_DIR = process.cwd();
  const templatePath = path.join(__dirname, "..", "templates", "project");
  const srcPath = path.join(__dirname, "..", "templates", "project", "src");
  const commandPath = path.join(
    __dirname,
    "..",
    "templates",
    "project",
    "src",
    "commands"
  );
  const eventPath = path.join(
    __dirname,
    "..",
    "templates",
    "project",
    "src",
    "events"
  );
  const featurePath = path.join(
    __dirname,
    "..",
    "templates",
    "project",
    "src",
    "features"
  );

  const config = {
    bot: {
      token: data["bot-token"],
      prefix: data["bot-prefix"],
    },
    paths: {
      main: mainDirectory,
      commands: cmdDirecotry,
      events: eventDirectory,
      features: featDirectory,
    },
    mongoUri: data["mongo-uri"],
  };
  const file = JSON.stringify(config, null, 2);
  console.log(clc.green("Generating Files..."));
  fs.mkdirSync(`${CURR_DIR}/${botName}`);
  fs.mkdirSync(`${CURR_DIR}/${botName}/${mainDirectory}`);
  fs.mkdirSync(`${CURR_DIR}/${botName}/${mainDirectory}/${cmdDirecotry}`);
  fs.mkdirSync(`${CURR_DIR}/${botName}/${mainDirectory}/${eventDirectory}`);
  fs.mkdirSync(`${CURR_DIR}/${botName}/${mainDirectory}/${featDirectory}`);
  createDirectoryContents(templatePath, botName, CURR_DIR);
  createDirectoryContents(srcPath, `${botName}/${mainDirectory}`, CURR_DIR);
  createDirectoryContents(
    commandPath,
    `${botName}/${mainDirectory}/${cmdDirecotry}`,
    CURR_DIR
  );
  createDirectoryContents(
    eventPath,
    `${botName}/${mainDir}/${eventDirectory}`,
    CURR_DIR
  );
  createDirectoryContents(
    featurePath,
    `${botName}/${mainDirectory}/${featDirectory}`,
    CURR_DIR
  );
  const index = fs.readFileSync(
    `${CURR_DIR}/${botName}/${mainDirectory}/index.ts`
  );
  fs.writeFileSync(
    `${CURR_DIR}/${botName}/${mainDirectory}/index.ts`,
    index
      .toString()
      .replace(`"commands"`, `"${cmdDirecotry}"`)
      .replace(`"events"`, `"${eventDirectory}"`)
      .replace(`"features"`, `"${featDirectory}"`)
  );

  fs.writeFileSync(`${CURR_DIR}/${botName}/wokgen.config.json`, file);
  fs.writeFileSync(
    `${CURR_DIR}/${botName}/package.json`,
    packageJson
      .toString()
      .replace("wokgen", botName)
      .replace("MAINPATH", mainDirectory)
  );
  fs.writeFileSync(
    `${CURR_DIR}/${botName}/.env`,
    `TOKEN=${data["bot-token"]}\nMONGO_URI=${data["mongo-uri"]}`
  );

  console.log("Installing dependencies...");
  initNPM(`${CURR_DIR}/${botName}`);
  console.info(clc.green("Done."));
  console.info(
    clc.blackBright(
      "Make sure to read the WOKCommands docs to get started https://docs.wornoffkeys.com/ ."
    )
  );
  delay(1000);
  console.info(
    clc.white(`You can now launch your bot using `) +
      clc.cyan("cd ") +
      clc.red(`${botName} `) +
      clc.white("and ") +
      clc.cyan("npm run dev")
  );
}
