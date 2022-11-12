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
exports.initNPM = exports.createEventFile = exports.delay = exports.createDirectoryContents = void 0;
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
function createDirectoryContents(templatePath, newProjectPath, currentDirecory) {
    const filesToCreate = fs_1.default.readdirSync(templatePath);
    filesToCreate.forEach((file) => {
        const origFilePath = `${templatePath}/${file}`;
        // get stats about the current file
        const stats = fs_1.default.statSync(origFilePath);
        if (stats.isFile()) {
            const contents = fs_1.default.readFileSync(origFilePath, "utf8");
            const writePath = `${currentDirecory}/${newProjectPath}/${file}`;
            fs_1.default.writeFileSync(writePath, contents, "utf8");
        }
    });
}
exports.createDirectoryContents = createDirectoryContents;
const delay = (millis) => new Promise((resolve) => {
    setTimeout((_) => resolve(null), millis);
});
exports.delay = delay;
function createEventFile(eventPath, newFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const eventFile = fs_1.default.readFileSync(eventPath);
        fs_1.default.writeFileSync(newFilePath, eventFile.toString());
    });
}
exports.createEventFile = createEventFile;
function initNPM(filePath) {
    // execSync(`npm init -y`, { cwd: filePath });
    return installDependencies(filePath);
}
exports.initNPM = initNPM;
function installDependencies(filePath) {
    installDiscordJS(filePath);
    installNodemon(filePath);
}
function installDiscordJS(filePath) {
    return (0, child_process_1.execSync)(`npm install discord.js wokcommands`, {
        cwd: filePath,
        stdio: "ignore",
    });
}
function installNodemon(filePath) {
    return (0, child_process_1.execSync)(`npm install -D nodemon`, {
        cwd: filePath,
        stdio: "ignore",
    });
}
