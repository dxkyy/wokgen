import { PromptObject } from "prompts";

export const lang: PromptObject = {
  name: "lang",
  type: "select",
  message: "What language do you want to use in your project?",
  choices: [
    {
      title: "TypeScript",
      value: "ts",
      description: "TS - (Recommended)",
    },
    {
      title: "JavaScript",
      value: "js",
      description: "JS",
    },
  ],
};

export const name: PromptObject = {
  name: "bot-name",
  type: "text",
  message: "What is the name of your bot?",
  validate: function(input: string) {
    if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
    else
      return "Project name may only include letters, numbers, underscores and hashes.";
  },
};

export const mainDir: PromptObject = {
  name: "dir-main",
  type: "text",
  message: "What is the main directory of your project?",
  initial: "src",
};
export const commandsDir: PromptObject = {
  name: "dir-cmd",
  type: "text",
  message: "What is the main directory of your commands?",
  initial: "commands",
};
export const eventsDir: PromptObject = {
  name: "dir-event",
  type: "text",
  message: "What is the main directory of your events?",
  initial: "events",
};
export const featuresDir: PromptObject = {
  name: "dir-feat",
  type: "text",
  message: "What is the main directory of your features?",
  initial: "features",
};

export const token: PromptObject = {
  name: "bot-token",
  type: "password",
  message: "Please enter your bots token:",
};

export const prefix: PromptObject = {
  name: "bot-prefix",
  type: "text",
  message: "Please enter your bots default prefix:",
};

export const mongoUri: PromptObject = {
  name: "mongo-uri",
  type: "text",
  message: "Please enter your MongoUri:",
};
