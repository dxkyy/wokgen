"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoUri = exports.prefix = exports.token = exports.featuresDir = exports.eventsDir = exports.commandsDir = exports.mainDir = exports.name = exports.lang = void 0;
exports.lang = {
    name: "lang",
    type: "select",
    message: "What language do you want to use in your project?",
    choices: [
        {
            title: "TypeScript",
            value: "ts",
            description: "TS - (Recommended)",
        },
        {
            title: "JavaScript",
            value: "js",
            description: "JS",
        },
    ],
};
exports.name = {
    name: "bot-name",
    type: "text",
    message: "What is the name of your bot?",
    validate: function (input) {
        if (/^([A-Za-z\-\_\d])+$/.test(input))
            return true;
        else
            return "Project name may only include letters, numbers, underscores and hashes.";
    },
};
exports.mainDir = {
    name: "dir-main",
    type: "text",
    message: "What is the main directory of your project?",
    initial: "src",
};
exports.commandsDir = {
    name: "dir-cmd",
    type: "text",
    message: "What is the main directory of your commands?",
    initial: "commands",
};
exports.eventsDir = {
    name: "dir-event",
    type: "text",
    message: "What is the main directory of your events?",
    initial: "events",
};
exports.featuresDir = {
    name: "dir-feat",
    type: "text",
    message: "What is the main directory of your features?",
    initial: "features",
};
exports.token = {
    name: "bot-token",
    type: "password",
    message: "Please enter your bots token:",
};
exports.prefix = {
    name: "bot-prefix",
    type: "text",
    message: "Please enter your bots default prefix:",
};
exports.mongoUri = {
    name: "mongo-uri",
    type: "text",
    message: "Please enter your MongoUri:",
};
