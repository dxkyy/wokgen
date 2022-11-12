"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bothSlashCommand = exports.yesSlashCommand = exports.noSlashCommand = void 0;
function noSlashCommand(cmdDescription) {
    return `import { CommandObject, CommandType, CommandUsage } from "wokcommands";\n\nexport default {\n  description: "${cmdDescription}"\n  type: CommandType.LEGACY,\n\n  callback: async ({ message, args, client }: CommandUsage) => {\n    \n  },\n} as CommandObject;\n`;
}
exports.noSlashCommand = noSlashCommand;
function yesSlashCommand(cmdDescription) {
    return `import { CommandObject, CommandType, CommandUsage } from "wokcommands";\n\nexport default {\n  description: "${cmdDescription}",\n  type: CommandType.SLASH,\n\n  options: [],\n\n  callback: async ({ interaction, args, client }: CommandUsage) => {\n    \n  },\n} as CommandObject;\n`;
}
exports.yesSlashCommand = yesSlashCommand;
function bothSlashCommand(cmdDescription) {
    return `import { CommandObject, CommandType, CommandUsage } from "wokcommands";\n\nexport default {\n  description: "${cmdDescription}",\n  type: CommandType.BOTH,\n\n  options: [],\n\n  callback: async ({ message, interaction, args, client }: CommandUsage) => {\n    \n  },\n} as CommandObject;\n
`;
}
exports.bothSlashCommand = bothSlashCommand;
