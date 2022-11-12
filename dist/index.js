#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.program = void 0;
const init_1 = require("./commands/init");
const gen_1 = require("./commands/gen");
const commander_1 = require("commander");
exports.program = new commander_1.Command();
exports.program
    .name("wokgen")
    .description("")
    .version("")
    .exitOverride(() => process.exit(0));
exports.program
    .command("init")
    .description("Quickest way to scaffold a new WOKCommands project")
    .action(init_1.init);
exports.program
    .command("generate")
    .alias("gen")
    .description("Generate a new file for your WOKCommands project")
    .action(gen_1.gen);
exports.program.parse();
