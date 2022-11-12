"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventFile = exports.event = void 0;
const events_1 = require("../events");
exports.event = {
    name: "event-choice",
    type: "autocomplete",
    message: "What event would you like to generate?",
    choices: events_1.events,
};
exports.eventFile = {
    name: "event-file",
    type: "text",
    message: "What should be the name of your file?",
    validate: function (input) {
        if (/[A-Za-z0-9_-]/.test(input))
            return true;
        else
            return "File name may only include letters, numbers, dashes and underscores.";
    },
};
