#!/usr/bin/env node
const inquirer = require("inquirer");
const fs = require("fs");
const CURR_DIR = process.cwd();
const prompts = require("prompts");
const {
  initNPM,
  makeFiles,
  yesSlashCommand,
  noSlashCommand,
  bothSlashCommand,
  featureContent,
} = require("./util/Manager.js");
const clc = require("cli-color");
const delay = (millis) =>
  new Promise((resolve, reject) => {
    setTimeout((_) => resolve(), millis);
  });

const FIRST = [
  {
    type: "select",
    name: "option",
    message: "What would you like to do?",
    choices: [
      {
        title: "New",
        description: "Create a new WOKCommands Project",
        value: "new",
      },
      {
        title: "Generate",
        description: "Generate a new command or feature",
        value: "gen",
      },
    ],
  },
];
const QUESTIONS = [
  {
    name: "bot-name",
    type: "text",
    message: "What is your bots name:",
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    },
  },
  {
    name: "bot-token",
    type: "password",
    message: "Please enter your bots token:",
  },
  {
    name: "bot-prefix",
    type: "text",
    message: "Enter your bots default prefix:",
  },
  {
    name: "mongo-uri",
    type: "text",
    message: "Enter your MongoURI:",
  },
];

const GENQUESTIONS = [
  {
    name: "gen-choice",
    type: "select",
    message: "What would you like to generate?",
    choices: [
      {
        title: "Command",
        description: "Generate a new Command",
        value: "cmd",
      },
      {
        title: "Feature",
        description: "Generate a new Feature",
        value: "feat",
      },
    ],
  },
];
const COMMANDQUESTIONS = [
  {
    name: "cmd-name",
    type: "text",
    message: "What is the name of the command?",
  },
  {
    name: "cmd-category",
    type: "text",
    message: "What is the category of the command?",
  },
  {
    name: "cmd-desc",
    type: "text",
    message: "What is the description of the command?",
  },
  {
    name: "cmd-slash",
    type: "select",
    message: "Is your command a slash command?",
    choices: [
      {
        title: "Yes",
        description: "The command is only a slash command.",
        value: "slash-yes",
      },
      {
        title: "No",
        description: "The command is not a slash command.",
        value: "slash-no",
      },
      {
        title: "Both",
        description: "The command is both slash and non-slash.",
        value: "slash-both",
      },
    ],
  },
];

const FEATUREQUESTIONS = [
  {
    name: "feat-name",
    type: "text",
    message: "What is the name of the feature?",
  },
  {
    name: "feat-display",
    type: "text",
    message: "What is the display name of the feature?",
  },
  {
    name: "feat-db",
    type: "text",
    message: "What is the database name of te feature?",
    initial: "This should NEVER be changed once set",
  },
];

function createDirectoryContents(templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, "utf8");

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, "utf8");
    }
  });
}

(function main() {
  prompts(FIRST).then((response) => {
    const choice = response["option"];
    if (choice == "new") {
      prompts(QUESTIONS).then((responses) => {
        const projectName = responses["bot-name"];
        const botToken = responses["bot-token"];
        const botPrefix = responses["bot-prefix"];
        const mongoURI = responses["mongo-uri"];

        const CURR_DIR = process.cwd();
        const templatePath = `${__dirname}/templates/project`;
        const srcPath = `${__dirname}/templates/project/src`;
        const commandPath = `${__dirname}/templates/project/src/commands`;
        const featurePath = `${__dirname}/templates/project/src/features`;

        const wokgenJSON = `{\n"token": "${botToken}",\n"prefix": "${botPrefix}",\n"mongoURI": "${mongoURI}"\n}`;
        const packageJSON = `{\n  "name": "${projectName}",\n  "version": "1.0.0",\n  "description": "",\n  "main": "src/index.js",\n  "scripts": {\n    "dev": "nodemon src/index.js"\n  },\n  "author": "",\n  "license": "ISC",\n  "dependencies": {\n    "wokcommands": "^1.5.3"\n  }\n}\n`;

        console.info(clc.green("Generating Files.."));
        fs.mkdirSync(`${CURR_DIR}/${projectName}`);
        fs.mkdirSync(`${CURR_DIR}/${projectName}/src`);
        fs.mkdirSync(`${CURR_DIR}/${projectName}/src/commands`);
        fs.mkdirSync(`${CURR_DIR}/${projectName}/src/features`);
        createDirectoryContents(templatePath, projectName);
        createDirectoryContents(srcPath, `${projectName}/src`);
        createDirectoryContents(commandPath, `${projectName}/src/commands`);
        createDirectoryContents(featurePath, `${projectName}/src/features`);

        fs.writeFileSync(
          `${CURR_DIR}/${projectName}/wokgen.json`,
          wokgenJSON,
          "utf-8"
        );

        fs.writeFileSync(
          `${CURR_DIR}/${projectName}/package.json`,
          packageJSON,
          "utf-8"
        );

        initNPM(`${CURR_DIR}/${projectName}`);
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
            clc.red(`${projectName} `) +
            clc.white("and ") +
            clc.cyan("npm run dev")
        );
      });
    } else if (choice == "gen") {
      prompts(GENQUESTIONS).then((response) => {
        const ch = response["gen-choice"];
        if (ch == "cmd") {
          prompts(COMMANDQUESTIONS).then((response) => {
            const wokgenPath = "./wokgen.json";
            const cmdPath = "./src/commands/";
            try {
              if (fs.existsSync(wokgenPath) && fs.existsSync(cmdPath)) {
                const cmdName = response["cmd-name"];
                const cmdCategory = response["cmd-category"];
                const cmdDescription = response["cmd-desc"];
                const cmdSlash = response["cmd-slash"];

                if (fs.existsSync(`src/commands/${cmdName}.js`)) {
                  return console.log("That command already exists.");
                } else {
                  if (cmdSlash === "slash-yes") {
                    fs.writeFileSync(
                      `${CURR_DIR}/src/commands/${cmdName}.js`,
                      yesSlashCommand(cmdName, cmdCategory, cmdDescription),
                      "utf-8"
                    );
                  } else if (cmdSlash === "slash-no") {
                    fs.writeFileSync(
                      `${CURR_DIR}/src/commands/${cmdName}.js`,
                      noSlashCommand(cmdName, cmdCategory, cmdDescription),
                      "utf-8"
                    );
                  } else if (cmdSlash === "slash-both") {
                    fs.writeFileSync(
                      `${CURR_DIR}/src/commands/${cmdName}.js`,
                      bothSlashCommand(cmdName, cmdCategory, cmdDescription),
                      "utf-8"
                    );
                  }
                }
              } else {
                console.log("This is not a WOKCommands project.");
              }
            } catch (err) {
              console.log(clc.red("Something went wrong."));
              console.log(clc.blackBright(err));
            }
          });
        } else if (ch == "feat") {
          prompts(FEATUREQUESTIONS).then((response) => {
            const wokgenPath = "./wokgen.json";
            const featPath = "./src/features/";
            try {
              if (fs.existsSync(wokgenPath) && fs.existsSync(featPath)) {
                const featName = response["feat-name"];
                const featDisplay = response["feat-display"];
                const featDB = response["feat-db"];
                const featDatabase = featDB.toUpperCase();
                const featDisplayName = featDisplay.toUpperCase();

                if (fs.existsSync(`src/features/${featName}.js`)) {
                  return console.log("This feature already exists.");
                } else {
                  fs.writeFileSync(
                    `${CURR_DIR}/src/features/${featName}.js`,
                    featureContent(featDisplayName, featDatabase),
                    "utf-8"
                  );
                }
              } else {
                console.log("This is not a WOKCommands project.");
              }
            } catch (err) {
              console.log(clc.red("Something went wrong!"));
              console.log(err);
            }
          });
        }
      });
    }
  });
})();
