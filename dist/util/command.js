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
exports.command = void 0;
const prompts_1 = __importDefault(require("prompts"));
const fs_1 = __importDefault(require("fs"));
const cli_color_1 = __importDefault(require("cli-color"));
const command_1 = require("./prompts/command");
const commands_1 = require("./prompts/commands");
function command() {
    return __awaiter(this, void 0, void 0, function* () {
        const CURR_DIR = process.cwd();
        const data = yield (0, prompts_1.default)([command_1.cmdName, command_1.cmdSlash, command_1.cmdCategory, command_1.cmdDescription]);
        const wokgenPath = "./wokgen.config.json";
        const config = JSON.parse(fs_1.default.readFileSync(wokgenPath).toString());
        const cmdPath = `${config.paths.main}/${config.paths.commands}`;
        try {
            if (fs_1.default.existsSync(wokgenPath) && fs_1.default.existsSync(cmdPath)) {
                const cmdName = data["cmd-name"];
                const cmdCategory = data["cmd-category"];
                const cmdDescription = data["cmd-desc"];
                const cmdSlash = data["cmd-slash"];
                const categoryPath = `${CURR_DIR}/${cmdPath}/${cmdCategory.replace(" ", "-")}`;
                if (cmdCategory === "") {
                    if (fs_1.default.existsSync(`${cmdPath}/${cmdName}.ts`)) {
                        return console.log("That command already exists.");
                    }
                    else {
                        if (cmdSlash === "slash-yes") {
                            fs_1.default.writeFileSync(`${CURR_DIR}/${cmdPath}/${cmdName}.ts`, (0, commands_1.yesSlashCommand)(cmdDescription), "utf-8");
                        }
                        else if (cmdSlash === "slash-no") {
                            fs_1.default.writeFileSync(`${CURR_DIR}/${cmdPath}/${cmdName}.ts`, (0, commands_1.noSlashCommand)(cmdDescription), "utf-8");
                        }
                        else if (cmdSlash === "slash-both") {
                            fs_1.default.writeFileSync(`${CURR_DIR}/${cmdPath}/${cmdName}.js`, (0, commands_1.bothSlashCommand)(cmdDescription), "utf-8");
                        }
                    }
                }
                else {
                    //CATEGORY EXISTS
                    if (!fs_1.default.existsSync(categoryPath)) {
                        fs_1.default.mkdirSync(categoryPath);
                    }
                    if (fs_1.default.existsSync(`${categoryPath}/${cmdName}.ts`)) {
                        return console.log("That command already exists.");
                    }
                    else {
                        if (cmdSlash === "slash-yes") {
                            fs_1.default.writeFileSync(`${categoryPath}/${cmdName}.ts`, (0, commands_1.yesSlashCommand)(cmdDescription), "utf-8");
                        }
                        else if (cmdSlash === "slash-no") {
                            fs_1.default.writeFileSync(`${categoryPath}/${cmdName}.ts`, (0, commands_1.noSlashCommand)(cmdDescription), "utf-8");
                        }
                        else if (cmdSlash === "slash-both") {
                            fs_1.default.writeFileSync(`${categoryPath}/${cmdName}.ts`, (0, commands_1.bothSlashCommand)(cmdDescription), "utf-8");
                        }
                    }
                }
            }
            else {
                console.log("This is not a WOKCommands project.");
            }
        }
        catch (err) {
            console.log(cli_color_1.default.red("Something went wrong."));
            console.log(cli_color_1.default.blackBright(err));
        }
    });
}
exports.command = command;
