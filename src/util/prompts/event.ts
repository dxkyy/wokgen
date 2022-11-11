import { PromptObject } from "prompts";
import { events } from "../events";

export const event: PromptObject = {
  name: "event-choice",
  type: "autocomplete",
  message: "What event would you like to generate?",
  choices: events,
};

export const eventFile: PromptObject = {
  name: "event-file",
  type: "text",
  message: "What should be the name of your file?",
  validate: function(input: string) {
    if (/[A-Za-z0-9_-]/.test(input)) return true;
    else
      return "File name may only include letters, numbers, dashes and underscores.";
  },
};
