export function noSlashCommand(cmdDescription: string) {
  return `import { CommandObject, CommandType, CommandUsage } from "wokcommands";\n\nexport default {\n  description: "${cmdDescription}"\n  type: CommandType.LEGACY,\n\n  callback: async ({ message, args, client }: CommandUsage) => {\n    \n  },\n} as CommandObject;\n`;
}
export function yesSlashCommand(cmdDescription: string) {
  return `import { CommandObject, CommandType, CommandUsage } from "wokcommands";\n\nexport default {\n  description: "${cmdDescription}",\n  type: CommandType.SLASH,\n\n  options: [],\n\n  callback: async ({ interaction, args, client }: CommandUsage) => {\n    \n  },\n} as CommandObject;\n`;
}
export function bothSlashCommand(cmdDescription: string) {
  return `import { CommandObject, CommandType, CommandUsage } from "wokcommands";\n\nexport default {\n  description: "${cmdDescription}",\n  type: CommandType.BOTH,\n\n  options: [],\n\n  callback: async ({ message, interaction, args, client }: CommandUsage) => {\n    \n  },\n} as CommandObject;\n
`;
}
