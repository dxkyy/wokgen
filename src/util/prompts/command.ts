import { PromptObject } from "prompts";

export const cmdName: PromptObject = {
  name: "cmd-name",
  type: "text",
  message: "What is the name of the command?",
};
export const cmdSlash: PromptObject = {
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
};
export const cmdCategory: PromptObject = {
  name: "cmd-category",
  type: "text",
  message: "What is the category of the command?",
};
export const cmdDescription: PromptObject = {
  name: "cmd-desc",
  type: "text",
  message: "What is the description of the command?",
};
