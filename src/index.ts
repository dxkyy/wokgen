import { init } from "./commands/init";
import { gen } from "./commands/gen";
import { Command } from "commander";
export const program = new Command();

program
  .name("wokgen")
  .description("")
  .version("")
  .exitOverride(() => process.exit(0));

program
  .command("init")
  .description("Quickest way to scaffold a new WOKCommands project")
  .action(init);

program
  .command("generate")
  .alias("gen")
  .description("Generate a new file for your WOKCommands project")
  .action(gen);

program.parse();
