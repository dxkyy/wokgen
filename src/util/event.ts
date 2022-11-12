import prompts from "prompts";
import fs from "fs";
import clc from "cli-color";
import path from "path";
import { event, eventFile } from "./prompts/event";
import { createEventFile } from "./functions";

export async function eventFunction() {
  const CURR_DIR = process.cwd();
  const data = await prompts([event, eventFile]);
  const wokgenPath = "./wokgen.config.json";
  const config = JSON.parse(fs.readFileSync(wokgenPath).toString());
  const evntPath = `${config.paths.main}/${config.paths.events}`;
  const discordEvent = data["event-choice"];
  const evntFile = data["event-file"];
  const eventPath = `${CURR_DIR}/${evntPath}/${discordEvent.replace(" ", "-")}`;
  try {
    if (fs.existsSync(wokgenPath) && fs.existsSync(eventPath)) {
      if (!fs.existsSync(path.join(eventPath, evntFile + ".ts"))) {
        createEventFile(
          path.join(__dirname, "..", "templates", "events", discordEvent) +
            ".ts",
          eventPath + `/${evntFile}.ts`
        );
      } else {
        console.log("This file already exits!");
      }
    } else if (!fs.existsSync(eventPath)) {
      fs.mkdirSync(eventPath);
      if (!fs.existsSync(path.join(eventPath, evntFile + ".ts"))) {
        createEventFile(
          path.join(__dirname, "..", "templates", "events", discordEvent) +
            ".ts",
          eventPath + `/${evntFile}.ts`
        );
      } else {
        console.log("This file already exits!");
      }
    } else {
      console.log("This is not a WOKCommands project.");
    }
  } catch (err) {
    console.log(clc.red("Something went wrong."));
    console.log(clc.blackBright(err));
  }
}
