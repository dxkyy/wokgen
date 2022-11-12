"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
exports.generate = {
    name: "gen-choice",
    type: "select",
    message: "What would you like to generate?",
    choices: [
        {
            title: "Command",
            description: "Generate a new Command",
            value: "cmd",
        },
        {
            title: "Event",
            description: "Generate a new Event",
            value: "event",
        },
        {
            title: "Feature",
            description: "Generate a new Feature",
            value: "feat",
        },
    ],
};
