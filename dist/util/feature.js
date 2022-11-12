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
exports.featureFunction = void 0;
const prompts_1 = __importDefault(require("prompts"));
const fs_1 = __importDefault(require("fs"));
const feature_1 = require("./prompts/feature");
function featureFunction() {
    return __awaiter(this, void 0, void 0, function* () {
        const CURR_DIR = process.cwd();
        const data = yield (0, prompts_1.default)([feature_1.feature]);
        const wokgenPath = "./wokgen.config.json";
        const config = JSON.parse(fs_1.default.readFileSync(wokgenPath).toString());
        const featurePath = `${CURR_DIR}/${config.paths.main}/${config.paths.features}`;
        if (fs_1.default.existsSync(wokgenPath)) {
            if (!fs_1.default.existsSync(`${featurePath}/${data["feat-name"]}.ts`)) {
                const featureString = `import { Client } from "discord.js";\nimport WOK from "wokcommands";\n\nexport default (instance: WOK, client: Client) => {\n  console.log("Hello World!");\n};\n`;
                fs_1.default.writeFileSync(`${featurePath}/${data["feat-name"]}.ts`, featureString);
            }
            else {
                console.log("This file already exists!");
            }
        }
        else {
            console.log("This is not a WOKCommands project.");
        }
    });
}
exports.featureFunction = featureFunction;
