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
exports.gen = void 0;
const prompts_1 = __importDefault(require("prompts"));
const command_1 = require("../util/command");
const event_1 = require("../util/event");
const feature_1 = require("../util/feature");
const generate_1 = require("../util/prompts/generate");
function gen() {
    return __awaiter(this, void 0, void 0, function* () {
        const togen = yield (0, prompts_1.default)(generate_1.generate);
        if (togen["gen-choice"] === "cmd") {
            (0, command_1.command)();
        }
        else if (togen["gen-choice"] === "event") {
            (0, event_1.eventFunction)();
        }
        else if (togen["gen-choice"] === "feat") {
            (0, feature_1.featureFunction)();
        }
    });
}
exports.gen = gen;
