import prompts from "prompts";
import { command } from "../util/command";
import { eventFunction } from "../util/event";
import { featureFunction } from "../util/feature";

import { generate } from "../util/prompts/generate";

export async function gen() {
  const togen = await prompts(generate);
  if (togen["gen-choice"] === "cmd") {
    command();
  } else if (togen["gen-choice"] === "event") {
    eventFunction();
  } else if (togen["gen-choice"] === "feat") {
    featureFunction();
  }
}
