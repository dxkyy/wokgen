"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIRST = void 0;
exports.FIRST = {
    type: "select",
    name: "option",
    message: "What would you like to do?",
    choices: [
        {
            title: "New",
            description: "Create a new WOKCommands Project",
            value: "new",
        },
        {
            title: "Generate",
            description: "Generate a new command or feature",
            value: "gen",
        },
    ],
};
