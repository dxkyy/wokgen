import prompts from "prompts";
import fs from "fs";
import { feature } from "./prompts/feature";

export async function featureFunction() {
  const CURR_DIR = process.cwd();
  const data = await prompts([feature]);
  const wokgenPath = "./wokgen.config.json";
  const config = JSON.parse(fs.readFileSync(wokgenPath).toString());
  const featurePath = `${CURR_DIR}/${config.paths.main}/${config.paths.features}`;
  if (fs.existsSync(wokgenPath)) {
    if (!fs.existsSync(`${featurePath}/${data["feat-name"]}.ts`)) {
      const featureString = `import { Client } from "discord.js";\nimport WOK from "wokcommands";\n\nexport default (instance: WOK, client: Client) => {\n  console.log("Hello World!");\n};\n`;
      fs.writeFileSync(`${featurePath}/${data["feat-name"]}.ts`, featureString);
    } else {
      console.log("This file already exists!");
    }
  } else {
    console.log("This is not a WOKCommands project.");
  }
}
