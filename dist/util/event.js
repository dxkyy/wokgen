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
exports.eventFunction = void 0;
const prompts_1 = __importDefault(require("prompts"));
const fs_1 = __importDefault(require("fs"));
const cli_color_1 = __importDefault(require("cli-color"));
const path_1 = __importDefault(require("path"));
const event_1 = require("./prompts/event");
const functions_1 = require("./functions");
function eventFunction() {
    return __awaiter(this, void 0, void 0, function* () {
        const CURR_DIR = process.cwd();
        const data = yield (0, prompts_1.default)([event_1.event, event_1.eventFile]);
        const wokgenPath = "./wokgen.config.json";
        const config = JSON.parse(fs_1.default.readFileSync(wokgenPath).toString());
        const evntPath = `${config.paths.main}/${config.paths.events}`;
        const discordEvent = data["event-choice"];
        const evntFile = data["event-file"];
        const eventPath = `${CURR_DIR}/${evntPath}/${discordEvent.replace(" ", "-")}`;
        try {
            if (fs_1.default.existsSync(wokgenPath) && fs_1.default.existsSync(eventPath)) {
                if (!fs_1.default.existsSync(path_1.default.join(eventPath, evntFile + ".ts"))) {
                    (0, functions_1.createEventFile)(path_1.default.join(__dirname, "..", "templates", "events", discordEvent) +
                        ".ts", eventPath + `/${evntFile}.ts`);
                }
                else {
                    console.log("This file already exits!");
                }
            }
            else if (!fs_1.default.existsSync(eventPath)) {
                fs_1.default.mkdirSync(eventPath);
                if (!fs_1.default.existsSync(path_1.default.join(eventPath, evntFile + ".ts"))) {
                    (0, functions_1.createEventFile)(path_1.default.join(__dirname, "..", "templates", "events", discordEvent) +
                        ".ts", eventPath + `/${evntFile}.ts`);
                }
                else {
                    console.log("This file already exits!");
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
exports.eventFunction = eventFunction;
