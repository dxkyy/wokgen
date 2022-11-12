import {
  Collection,
  Snowflake,
  Message,
  GuildTextBasedChannel,
} from "discord.js";
import WOK from "wokcommands";

export default (
  messages: Collection<Snowflake, Message>,
  channel: GuildTextBasedChannel,
  instance: WOK
) => {};
