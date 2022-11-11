import { Message, Collection, Snowflake, MessageReaction } from "discord.js";
import WOK from "wokcommands";

export default (
  message: Message,
  reactions: Collection<string | Snowflake, MessageReaction>,
  instance: WOK
) => {};
