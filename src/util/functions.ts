import fs from "fs";
import { execSync } from "child_process";

export function createDirectoryContents(
  templatePath: string,
  newProjectPath: string,
  currentDirecory: string
) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, "utf8");

      const writePath = `${currentDirecory}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, "utf8");
    }
  });
}

export const delay = (millis: number) =>
  new Promise((resolve) => {
    setTimeout((_) => resolve(null), millis);
  });

export async function createEventFile(eventPath: string, newFilePath: string) {
  const eventFile = fs.readFileSync(eventPath);
  fs.writeFileSync(newFilePath, eventFile.toString());
}

export function initNPM(filePath: string) {
  // execSync(`npm init -y`, { cwd: filePath });
  return installDependencies(filePath);
}
function installDependencies(filePath: string) {
  installDiscordJS(filePath);
  installNodemon(filePath);
}

function installDiscordJS(filePath: string) {
  return execSync(`npm install discord.js wokcommands`, {
    cwd: filePath,
    stdio: "ignore",
  });
}

function installNodemon(filePath: string) {
  return execSync(`npm install -D nodemon`, {
    cwd: filePath,
    stdio: "ignore",
  });
}
