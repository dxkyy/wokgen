const { execSync } = require("child_process");
const fs = require("fs");
function initNPM(filePath) {
  // execSync(`npm init -y`, { cwd: filePath });
  return installDependencies(filePath);
}
function installDependencies(filePath) {
  installDiscordJS(filePath);
  installWOK(filePath);
  installNodemon(filePath);
}

function installDiscordJS(filePath) {
  return execSync(`npm install discord.js@latest`, {
    cwd: filePath,
    stdio: "ignore",
  });
}

function installNodemon(filePath) {
  return execSync(`npm install -D nodemon`, {
    cwd: filePath,
    stdio: "ignore",
  });
}

function installWOK(filePath) {
  return execSync(`npm install wokcommands`, {
    cwd: filePath,
    stdio: "ignore",
  });
}

function noSlashCommand(cmdName, cmdCategory, cmdDescription) {
  return `module.exports = {\n  name: "${cmdName}",\n  category: "${cmdCategory}",\n  description: "${cmdDescription}",\n  slash: false,\n\n    callback: async ({ message, args, client }) => {\n\n        }\n};`;
}

function yesSlashCommand(cmdName, cmdCategory, cmdDescription) {
  return `module.exports = {\n  name: "${cmdName}",\n  category: "${cmdCategory}",\n  description: "${cmdDescription}",\n  slash: true,\n  options: [],\n\n  callback: async ({ message, interaction, args, client }) => {\n\n      },\n};`;
}

function bothSlashCommand(cmdName, cmdCategory, cmdDescription) {
  return `module.exports = {\n  name: "${cmdName}",\n  category: "${cmdCategory}",\n  description: "${cmdDescription}",\n  slash: "both",\n  options: [],\n\n  callback: async ({ message, interaction, args, client }) => {\n\n      },\n};`;
}

function featureContent(featDisplay, featDatabase) {
  return `module.exports = (client, instance) => {\n\n  };\n\n	module.exports.config = {\n  displayName: "${featDisplay}",\n\n  dbName: "${featDatabase}",\n};`;
}

function makeFiles(
  srcDir,
  cmdDir,
  fDir,
  pDir,
  pSrcDir,
  pCmdDir,
  pFDir,
  mainDir,
  cDir
) {
  fs.mkdirSync(pDir);
  fs.mkdirSync(pSrcDir);
  fs.mkdirSync(pCmdDir);
  fs.mkdirSync(pFDir);
  createDirectoryContents(mainDir, pDir);
  createDirectoryContents(srcDir, pSrcDir);
  createDirectoryContents(cmdDir, pSrcDir);
  createDirectoryContents(fDir, pFDir);
}

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

module.exports = {
  initNPM,
  makeFiles,
  yesSlashCommand,
  noSlashCommand,
  bothSlashCommand,
  featureContent,
};
