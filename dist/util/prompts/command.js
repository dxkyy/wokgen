"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmdDescription = exports.cmdCategory = exports.cmdSlash = exports.cmdName = void 0;
exports.cmdName = {
    name: "cmd-name",
    type: "text",
    message: "What is the name of the command?",
};
exports.cmdSlash = {
    name: "cmd-slash",
    type: "select",
    message: "Is your command a slash command?",
    choices: [
        {
            title: "Yes",
            description: "The command is only a slash command.",
            value: "slash-yes",
        },
        {
            title: "No",
            description: "The command is not a slash command.",
            value: "slash-no",
        },
        {
            title: "Both",
            description: "The command is both slash and non-slash.",
            value: "slash-both",
        },
    ],
};
exports.cmdCategory = {
    name: "cmd-category",
    type: "text",
    message: "What is the category of the command?",
};
exports.cmdDescription = {
    name: "cmd-desc",
    type: "text",
    message: "What is the description of the command?",
};
