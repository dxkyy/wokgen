import prompts from "prompts";
import fs from "fs";
import clc from "cli-color";
import {
  cmdName,
  cmdCategory,
  cmdSlash,
  cmdDescription,
} from "./prompts/command";
import {
  yesSlashCommand,
  noSlashCommand,
  bothSlashCommand,
} from "./prompts/commands";

export async function command() {
  const CURR_DIR = process.cwd();
  const data = await prompts([cmdName, cmdSlash, cmdCategory, cmdDescription]);
  const wokgenPath = "./wokgen.config.json";
  const config = JSON.parse(fs.readFileSync(wokgenPath).toString());
  const cmdPath = `${config.paths.main}/${config.paths.commands}`;
  try {
    if (fs.existsSync(wokgenPath) && fs.existsSync(cmdPath)) {
      const cmdName = data["cmd-name"];
      const cmdCategory = data["cmd-category"];
      const cmdDescription = data["cmd-desc"];
      const cmdSlash = data["cmd-slash"];
      const categoryPath = `${CURR_DIR}/${cmdPath}/${cmdCategory.replace(
        " ",
        "-"
      )}`;
      if (cmdCategory === "") {
        if (fs.existsSync(`${cmdPath}/${cmdName}.ts`)) {
          return console.log("That command already exists.");
        } else {
          if (cmdSlash === "slash-yes") {
            fs.writeFileSync(
              `${CURR_DIR}/${cmdPath}/${cmdName}.ts`,
              yesSlashCommand(cmdDescription),
              "utf-8"
            );
          } else if (cmdSlash === "slash-no") {
            fs.writeFileSync(
              `${CURR_DIR}/${cmdPath}/${cmdName}.ts`,
              noSlashCommand(cmdDescription),
              "utf-8"
            );
          } else if (cmdSlash === "slash-both") {
            fs.writeFileSync(
              `${CURR_DIR}/${cmdPath}/${cmdName}.js`,
              bothSlashCommand(cmdDescription),
              "utf-8"
            );
          }
        }
      } else {
        //CATEGORY EXISTS
        if (!fs.existsSync(categoryPath)) {
          fs.mkdirSync(categoryPath);
        }
        if (fs.existsSync(`${categoryPath}/${cmdName}.ts`)) {
          return console.log("That command already exists.");
        } else {
          if (cmdSlash === "slash-yes") {
            fs.writeFileSync(
              `${categoryPath}/${cmdName}.ts`,
              yesSlashCommand(cmdDescription),
              "utf-8"
            );
          } else if (cmdSlash === "slash-no") {
            fs.writeFileSync(
              `${categoryPath}/${cmdName}.ts`,
              noSlashCommand(cmdDescription),
              "utf-8"
            );
          } else if (cmdSlash === "slash-both") {
            fs.writeFileSync(
              `${categoryPath}/${cmdName}.ts`,
              bothSlashCommand(cmdDescription),
              "utf-8"
            );
          }
        }
      }
    } else {
      console.log("This is not a WOKCommands project.");
    }
  } catch (err) {
    console.log(clc.red("Something went wrong."));
    console.log(clc.blackBright(err));
  }
}
