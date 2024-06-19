import {
  ApplicationCommandPermissionsUpdateData,
  BaseInteraction,
  Client,
  CloseEvent,
  Collection,
  DMChannel,
  Events,
  Guild,
  GuildBan,
  GuildChannel,
  GuildEmoji,
  GuildMember,
  GuildMembersChunk,
  GuildScheduledEvent,
  Invite,
  Message,
  MessageReaction,
  NewsChannel,
  Presence,
  Role,
  Snowflake,
  StageInstance,
  Sticker,
  TextChannel,
  ThreadChannel,
  ThreadMember,
  Typing,
  User,
  VoiceState
} from "discord.js";

export abstract class Event {
  once: boolean = false;

  constructor(public event: Events) {}
  abstract execute(...args: any[]): void;
}

export abstract class ApplicationCommandPermissionsUpdateEvent extends Event {
  constructor() {
    super(Events.ApplicationCommandPermissionsUpdate);
  }
  abstract execute(data: ApplicationCommandPermissionsUpdateData): void;
}

export abstract class AutoModerationActionExecutionEvent extends Event {
  constructor() {
    super(Events.AutoModerationActionExecution);
  }
}

export abstract class AutoModerationRuleCreateEvent extends Event {
  constructor() {
    super(Events.AutoModerationRuleCreate);
  }
}

export abstract class AutoModerationRuleDeleteEvent extends Event {
  constructor() {
    super(Events.AutoModerationRuleDelete);
  }
}

export abstract class AutoModerationRuleUpdateEvent extends Event {
  constructor() {
    super(Events.AutoModerationRuleUpdate);
  }
}

export abstract class ClientReadyEvent extends Event {
  constructor() {
    super(Events.ClientReady);
  }
  abstract execute(client: Client): void;
}

export abstract class EntitlementCreateEvent extends Event {
  constructor() {
    super(Events.EntitlementCreate);
  }
}

export abstract class EntitlementDeleteEvent extends Event {
  constructor() {
    super(Events.EntitlementDelete);
  }
}

export abstract class EntitlementUpdateEvent extends Event {
  constructor() {
    super(Events.EntitlementUpdate);
  }
}

export abstract class GuildAuditLogEntryCreateEvent extends Event {
  constructor() {
    super(Events.GuildAuditLogEntryCreate);
  }
}

export abstract class GuildAvailableEvent extends Event {
  constructor() {
    super(Events.GuildAvailable);
  }
  abstract execute(guild: Guild): void;
}

export abstract class GuildCreateEvent extends Event {
  constructor() {
    super(Events.GuildCreate);
  }
  abstract execute(guild: Guild): void;
}

export abstract class GuildDeleteEvent extends Event {
  constructor() {
    super(Events.GuildDelete);
  }
  abstract execute(guild: Guild): void;
}

export abstract class GuildUpdateEvent extends Event {
  constructor() {
    super(Events.GuildUpdate);
  }
  abstract execute(oldGuild: Guild, newGuild: Guild): void;
}

export abstract class GuildUnavailableEvent extends Event {
  constructor() {
    super(Events.GuildUnavailable);
  }
  abstract execute(guild: Guild): void;
}

export abstract class GuildMemberAddEvent extends Event {
  constructor() {
    super(Events.GuildMemberAdd);
  }
  abstract execute(member: GuildMember): void;
}

export abstract class GuildMemberRemoveEvent extends Event {
  constructor() {
    super(Events.GuildMemberRemove);
  }
  abstract execute(member: GuildMember): void;
}

export abstract class GuildMemberUpdateEvent extends Event {
  constructor() {
    super(Events.GuildMemberUpdate);
  }
  abstract execute(oldMember: GuildMember, newMember: GuildMember): void;
}

export abstract class GuildMemberAvailableEvent extends Event {
  constructor() {
    super(Events.GuildMemberAvailable);
  }
  abstract execute(member: GuildMember): void;
}

export abstract class GuildMembersChunkEvent extends Event {
  constructor() {
    super(Events.GuildMembersChunk);
  }
  abstract execute(
    members: Collection<Snowflake, GuildMember>,
    guild: Guild,
    chunk: GuildMembersChunk
  ): void;
}

export abstract class GuildIntegrationsUpdateEvent extends Event {
  constructor() {
    super(Events.GuildIntegrationsUpdate);
  }
  abstract execute(guild: Guild): void;
}

export abstract class GuildRoleCreateEvent extends Event {
  constructor() {
    super(Events.GuildRoleCreate);
  }
  abstract execute(role: Role): void;
}

export abstract class GuildRoleDeleteEvent extends Event {
  constructor() {
    super(Events.GuildRoleDelete);
  }
  abstract execute(role: Role): void;
}

export abstract class InviteCreateEvent extends Event {
  constructor() {
    super(Events.InviteCreate);
  }
  abstract execute(invite: Invite): void;
}

export abstract class InviteDeleteEvent extends Event {
  constructor() {
    super(Events.InviteDelete);
  }
  abstract execute(invite: Invite): void;
}

export abstract class GuildRoleUpdateEvent extends Event {
  constructor() {
    super(Events.GuildRoleUpdate);
  }
  abstract execute(oldRole: Role, newRole: Role): void;
}

export abstract class GuildEmojiCreateEvent extends Event {
  constructor() {
    super(Events.GuildEmojiCreate);
  }
  abstract execute(emoji: GuildEmoji): void;
}

export abstract class GuildEmojiDeleteEvent extends Event {
  constructor() {
    super(Events.GuildEmojiDelete);
  }
  abstract execute(emoji: GuildEmoji): void;
}

export abstract class GuildEmojiUpdateEvent extends Event {
  constructor() {
    super(Events.GuildEmojiUpdate);
  }
  abstract execute(oldEmoji: GuildEmoji, newEmoji: GuildEmoji): void;
}

export abstract class GuildBanAddEvent extends Event {
  constructor() {
    super(Events.GuildBanAdd);
  }
  abstract execute(ban: GuildBan): void;
}

export abstract class GuildBanRemoveEvent extends Event {
  constructor() {
    super(Events.GuildBanRemove);
  }
  abstract execute(ban: GuildBan): void;
}

export abstract class ChannelCreateEvent extends Event {
  constructor() {
    super(Events.ChannelCreate);
  }
  abstract execute(channel: DMChannel | GuildChannel): void;
}

export abstract class ChannelDeleteEvent extends Event {
  constructor() {
    super(Events.ChannelDelete);
  }
  abstract execute(channel: DMChannel | GuildChannel): void;
}

export abstract class ChannelUpdateEvent extends Event {
  constructor() {
    super(Events.ChannelUpdate);
  }
  abstract execute<T = DMChannel | GuildChannel>(oldChannel: T, newChannel: T): void;
}

export abstract class ChannelPinsUpdateEvent extends Event {
  constructor() {
    super(Events.ChannelPinsUpdate);
  }
  abstract execute(channel: DMChannel | GuildChannel): void;
}

export abstract class MessageCreateEvent extends Event {
  constructor() {
    super(Events.MessageCreate);
  }
  abstract execute(message: Message): void;
}

export abstract class MessageDeleteEvent extends Event {
  constructor() {
    super(Events.MessageDelete);
  }
  abstract execute(message: Message): void;
}

export abstract class MessageUpdateEvent extends Event {
  constructor() {
    super(Events.MessageUpdate);
  }
  abstract execute(oldMessage: Message, newMessage: Message): void;
}

export abstract class MessageBulkDeleteEvent extends Event {
  constructor() {
    super(Events.MessageBulkDelete);
  }
  abstract execute(messages: Collection<Snowflake, Message>): void;
}

export abstract class MessagePollVoteAddEvent extends Event {
  constructor() {
    super(Events.MessagePollVoteAdd);
  }
}

export abstract class MessagePollVoteRemoveEvent extends Event {
  constructor() {
    super(Events.MessagePollVoteRemove);
  }
}

export abstract class MessageReactionAddEvent extends Event {
  constructor() {
    super(Events.MessageReactionAdd);
  }
  abstract execute(reaction: MessageReaction, user: User): void;
}

export abstract class MessageReactionRemoveEvent extends Event {
  constructor() {
    super(Events.MessageReactionRemove);
  }
  abstract execute(reaction: MessageReaction, user: User): void;
}

export abstract class MessageReactionRemoveAllEvent extends Event {
  constructor() {
    super(Events.MessageReactionRemoveAll);
  }
  abstract execute(
    message: Message,
    reactions: Collection<string | Snowflake, MessageReaction>
  ): void;
}

export abstract class MessageReactionRemoveEmojiEvent extends Event {
  constructor() {
    super(Events.MessageReactionRemoveEmoji);
  }
  abstract execute(reaction: MessageReaction): void;
}

export abstract class ThreadCreateEvent extends Event {
  constructor() {
    super(Events.ThreadCreate);
  }
  abstract execute(thread: ThreadChannel): void;
}

export abstract class ThreadDeleteEvent extends Event {
  constructor() {
    super(Events.ThreadDelete);
  }
  abstract execute(thread: ThreadChannel): void;
}

export abstract class ThreadUpdateEvent extends Event {
  constructor() {
    super(Events.ThreadUpdate);
  }
  abstract execute(oldThread: ThreadChannel, newThread: ThreadChannel): void;
}

export abstract class ThreadListSyncEvent extends Event {
  constructor() {
    super(Events.ThreadListSync);
  }
  abstract execute(threads: Collection<Snowflake, ThreadChannel>): void;
}

export abstract class ThreadMemberUpdateEvent extends Event {
  constructor() {
    super(Events.ThreadMemberUpdate);
  }
  abstract execute(oldMember: ThreadMember, newMember: ThreadMember): void;
}

export abstract class ThreadMembersUpdateEvent extends Event {
  constructor() {
    super(Events.ThreadMembersUpdate);
  }
  abstract execute(
    addedMembers: Collection<Snowflake, ThreadMember>,
    removedMembers: Collection<Snowflake, ThreadMember>
  ): void;
}

export abstract class UserUpdateEvent extends Event {
  constructor() {
    super(Events.UserUpdate);
  }
  abstract execute(oldUser: User, newUser: User): void;
}

export abstract class PresenceUpdateEvent extends Event {
  constructor() {
    super(Events.PresenceUpdate);
  }
  abstract execute(oldPresence: Presence, newPresence: Presence): void;
}

export abstract class VoiceServerUpdateEvent extends Event {
  constructor() {
    super(Events.VoiceServerUpdate);
  }
}

export abstract class VoiceStateUpdateEvent extends Event {
  constructor() {
    super(Events.VoiceStateUpdate);
  }
  abstract execute(oldState: VoiceState, newState: VoiceState): void;
}

export abstract class TypingStartEvent extends Event {
  constructor() {
    super(Events.TypingStart);
  }
  abstract execute(typing: Typing): void;
}

export abstract class WebhooksUpdateEvent extends Event {
  constructor() {
    super(Events.WebhooksUpdate);
  }
  abstract execute(channel: TextChannel | NewsChannel): void;
}

export abstract class InteractionCreateEvent extends Event {
  constructor() {
    super(Events.InteractionCreate);
  }
  abstract execute(interaction: BaseInteraction): void;
}

export abstract class ErrorEvent extends Event {
  constructor() {
    super(Events.Error);
  }
  abstract execute(error: Error): void;
}

export abstract class WarnEvent extends Event {
  constructor() {
    super(Events.Warn);
  }
  abstract execute(info: string): void;
}

export abstract class DebugEvent extends Event {
  constructor() {
    super(Events.Debug);
  }
  abstract execute(info: string): void;
}

export abstract class CacheSweepEvent extends Event {
  constructor() {
    super(Events.CacheSweep);
  }
}

export abstract class ShardDisconnectEvent extends Event {
  constructor() {
    super(Events.ShardDisconnect);
  }
  abstract execute(event: CloseEvent, shardId: number): void;
}

export abstract class ShardErrorEvent extends Event {
  constructor() {
    super(Events.ShardError);
  }
  abstract execute(error: Error, shardId: number): void;
}

export abstract class ShardReconnectingEvent extends Event {
  constructor() {
    super(Events.ShardReconnecting);
  }
  abstract execute(shardId: number): void;
}

export abstract class ShardReadyEvent extends Event {
  constructor() {
    super(Events.ShardReady);
  }
  abstract execute(shardId: number, unavailableGuilds?: Set<Snowflake>): void;
}

export abstract class ShardResumeEvent extends Event {
  constructor() {
    super(Events.ShardResume);
  }
  abstract execute(shardId: number, replayedEvents: number): void;
}

export abstract class InvalidatedEvent extends Event {
  constructor() {
    super(Events.Invalidated);
  }
}

export abstract class RawEvent extends Event {
  constructor() {
    super(Events.Raw);
  }
}

export abstract class StageInstanceCreateEvent extends Event {
  constructor() {
    super(Events.StageInstanceCreate);
  }
  abstract execute(stageInstance: StageInstance): void;
}

export abstract class StageInstanceUpdateEvent extends Event {
  constructor() {
    super(Events.StageInstanceUpdate);
  }
  abstract execute(
    oldStageInstance: StageInstance | undefined,
    newStageInstance: StageInstance
  ): void;
}

export abstract class StageInstanceDeleteEvent extends Event {
  constructor() {
    super(Events.StageInstanceDelete);
  }
  abstract execute(stageInstance: StageInstance): void;
}

export abstract class GuildStickerCreateEvent extends Event {
  constructor() {
    super(Events.GuildStickerCreate);
  }
  abstract execute(sticker: Sticker): void;
}

export abstract class GuildStickerDeleteEvent extends Event {
  constructor() {
    super(Events.GuildStickerDelete);
  }
  abstract execute(sticker: Sticker): void;
}

export abstract class GuildStickerUpdateEvent extends Event {
  constructor() {
    super(Events.GuildStickerUpdate);
  }
  abstract execute(oldSticker: Sticker, newSticker: Sticker): void;
}

export abstract class GuildScheduledEventCreateEvent extends Event {
  constructor() {
    super(Events.GuildScheduledEventCreate);
  }
  abstract execute(scheduledEvent: GuildScheduledEvent): void;
}

export abstract class GuildScheduledEventUpdateEvent extends Event {
  constructor() {
    super(Events.GuildScheduledEventUpdate);
  }
  abstract execute(
    oldScheduledEvent: GuildScheduledEvent,
    newScheduledEvent: GuildScheduledEvent
  ): void;
}

export abstract class GuildScheduledEventDeleteEvent extends Event {
  constructor() {
    super(Events.GuildScheduledEventDelete);
  }
  abstract execute(scheduledEvent: GuildScheduledEvent): void;
}

export abstract class GuildScheduledEventUserAddEvent extends Event {
  constructor() {
    super(Events.GuildScheduledEventUserAdd);
  }
  abstract execute(scheduledEvent: GuildScheduledEvent, user: User): void;
}

export abstract class GuildScheduledEventUserRemoveEvent extends Event {
  constructor() {
    super(Events.GuildScheduledEventUserRemove);
  }
  abstract execute(scheduledEvent: GuildScheduledEvent, user: User): void;
}
