"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const prompts_1 = __importDefault(require("prompts"));
const cli_color_1 = __importDefault(require("cli-color"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const init_1 = require("../util/prompts/init");
const functions_1 = require("../util/functions");
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield (0, prompts_1.default)([
            init_1.name,
            init_1.mainDir,
            init_1.commandsDir,
            init_1.eventsDir,
            init_1.featuresDir,
            init_1.token,
            init_1.prefix,
            init_1.mongoUri,
        ]);
        const packageJson = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "templates", "package.json"));
        const botName = data["bot-name"];
        const mainDirectory = data["dir-main"];
        const cmdDirecotry = data["dir-cmd"];
        const eventDirectory = data["dir-event"];
        const featDirectory = data["dir-feat"];
        const CURR_DIR = process.cwd();
        const templatePath = path_1.default.join(__dirname, "..", "templates", "project");
        const srcPath = path_1.default.join(__dirname, "..", "templates", "project", "src");
        const commandPath = path_1.default.join(__dirname, "..", "templates", "project", "src", "commands");
        const eventPath = path_1.default.join(__dirname, "..", "templates", "project", "src", "events");
        const featurePath = path_1.default.join(__dirname, "..", "templates", "project", "src", "features");
        const config = {
            bot: {
                token: data["bot-token"],
                prefix: data["bot-prefix"],
            },
            paths: {
                main: mainDirectory,
                commands: cmdDirecotry,
                events: eventDirectory,
                features: featDirectory,
            },
            mongoUri: data["mongo-uri"],
        };
        const file = JSON.stringify(config, null, 2);
        console.log(cli_color_1.default.green("Generating Files..."));
        fs_1.default.mkdirSync(`${CURR_DIR}/${botName}`);
        fs_1.default.mkdirSync(`${CURR_DIR}/${botName}/${mainDirectory}`);
        fs_1.default.mkdirSync(`${CURR_DIR}/${botName}/${mainDirectory}/${cmdDirecotry}`);
        fs_1.default.mkdirSync(`${CURR_DIR}/${botName}/${mainDirectory}/${eventDirectory}`);
        fs_1.default.mkdirSync(`${CURR_DIR}/${botName}/${mainDirectory}/${featDirectory}`);
        (0, functions_1.createDirectoryContents)(templatePath, botName, CURR_DIR);
        (0, functions_1.createDirectoryContents)(srcPath, `${botName}/${mainDirectory}`, CURR_DIR);
        (0, functions_1.createDirectoryContents)(commandPath, `${botName}/${mainDirectory}/${cmdDirecotry}`, CURR_DIR);
        (0, functions_1.createDirectoryContents)(eventPath, `${botName}/${init_1.mainDir}/${eventDirectory}`, CURR_DIR);
        (0, functions_1.createDirectoryContents)(featurePath, `${botName}/${mainDirectory}/${featDirectory}`, CURR_DIR);
        const index = fs_1.default.readFileSync(`${CURR_DIR}/${botName}/${mainDirectory}/index.ts`);
        fs_1.default.writeFileSync(`${CURR_DIR}/${botName}/${mainDirectory}/index.ts`, index
            .toString()
            .replace(`"commands"`, `"${cmdDirecotry}"`)
            .replace(`"events"`, `"${eventDirectory}"`)
            .replace(`"features"`, `"${featDirectory}"`));
        fs_1.default.writeFileSync(`${CURR_DIR}/${botName}/wokgen.config.json`, file);
        fs_1.default.writeFileSync(`${CURR_DIR}/${botName}/package.json`, packageJson
            .toString()
            .replace("wokgen", botName)
            .replace("MAINPATH", mainDirectory));
        fs_1.default.writeFileSync(`${CURR_DIR}/${botName}/.env`, `TOKEN=${data["bot-token"]}\nMONGO_URI=${data["mongo-uri"]}`);
        console.log("Installing dependencies...");
        (0, functions_1.initNPM)(`${CURR_DIR}/${botName}`);
        console.info(cli_color_1.default.green("Done."));
        console.info(cli_color_1.default.blackBright("Make sure to read the WOKCommands docs to get started https://docs.wornoffkeys.com/ ."));
        (0, functions_1.delay)(1000);
        console.info(cli_color_1.default.white(`You can now launch your bot using `) +
            cli_color_1.default.cyan("cd ") +
            cli_color_1.default.red(`${botName} `) +
            cli_color_1.default.white("and ") +
            cli_color_1.default.cyan("npm run dev"));
    });
}
exports.init = init;
