import { PromptObject } from "prompts";

export const generate: PromptObject = {
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
      title: "Event",
      description: "Generate a new Event",
      value: "event",
    },
    {
      title: "Feature",
      description: "Generate a new Feature",
      value: "feat",
    },
  ],
};
