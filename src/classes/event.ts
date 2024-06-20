import {
  ApplicationCommandPermissionsUpdateData,
  BaseInteraction,
  Client,
  ClientEvents,
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

export abstract class Event<T extends keyof ClientEvents = keyof ClientEvents> {
  once: boolean = false;

  constructor(public event: T) {}
  abstract handler(...args: ClientEvents[T]): void;
}

export abstract class ApplicationCommandPermissionsUpdateEvent extends Event<Events.ApplicationCommandPermissionsUpdate> {
  constructor() {
    super(Events.ApplicationCommandPermissionsUpdate);
  }
}

export abstract class AutoModerationActionExecutionEvent extends Event<Events.AutoModerationActionExecution> {
  constructor() {
    super(Events.AutoModerationActionExecution);
  }
}

export abstract class AutoModerationRuleCreateEvent extends Event<Events.AutoModerationRuleCreate> {
  constructor() {
    super(Events.AutoModerationRuleCreate);
  }
}

export abstract class AutoModerationRuleDeleteEvent extends Event<Events.AutoModerationRuleDelete> {
  constructor() {
    super(Events.AutoModerationRuleDelete);
  }
}

export abstract class AutoModerationRuleUpdateEvent extends Event<Events.AutoModerationRuleUpdate> {
  constructor() {
    super(Events.AutoModerationRuleUpdate);
  }
}

export abstract class ClientReadyEvent extends Event<Events.ClientReady> {
  constructor() {
    super(Events.ClientReady);
  }
}

export abstract class EntitlementCreateEvent extends Event<Events.EntitlementCreate> {
  constructor() {
    super(Events.EntitlementCreate);
  }
}

export abstract class EntitlementDeleteEvent extends Event<Events.EntitlementDelete> {
  constructor() {
    super(Events.EntitlementDelete);
  }
}

export abstract class EntitlementUpdateEvent extends Event<Events.EntitlementUpdate> {
  constructor() {
    super(Events.EntitlementUpdate);
  }
}

export abstract class GuildAuditLogEntryCreateEvent extends Event<Events.GuildAuditLogEntryCreate> {
  constructor() {
    super(Events.GuildAuditLogEntryCreate);
  }
}

export abstract class GuildAvailableEvent extends Event<Events.GuildAvailable> {
  constructor() {
    super(Events.GuildAvailable);
  }
}

export abstract class GuildCreateEvent extends Event<Events.GuildCreate> {
  constructor() {
    super(Events.GuildCreate);
  }
}

export abstract class GuildDeleteEvent extends Event<Events.GuildDelete> {
  constructor() {
    super(Events.GuildDelete);
  }
}

export abstract class GuildUpdateEvent extends Event<Events.GuildUpdate> {
  constructor() {
    super(Events.GuildUpdate);
  }
}

export abstract class GuildUnavailableEvent extends Event<Events.GuildUnavailable> {
  constructor() {
    super(Events.GuildUnavailable);
  }
}

export abstract class GuildMemberAddEvent extends Event<Events.GuildMemberAdd> {
  constructor() {
    super(Events.GuildMemberAdd);
  }
}

export abstract class GuildMemberRemoveEvent extends Event<Events.GuildMemberRemove> {
  constructor() {
    super(Events.GuildMemberRemove);
  }
}

export abstract class GuildMemberUpdateEvent extends Event<Events.GuildMemberUpdate> {
  constructor() {
    super(Events.GuildMemberUpdate);
  }
}

export abstract class GuildMemberAvailableEvent extends Event<Events.GuildMemberAvailable> {
  constructor() {
    super(Events.GuildMemberAvailable);
  }
}

export abstract class GuildMembersChunkEvent extends Event<Events.GuildMembersChunk> {
  constructor() {
    super(Events.GuildMembersChunk);
  }
}

export abstract class GuildIntegrationsUpdateEvent extends Event<Events.GuildIntegrationsUpdate> {
  constructor() {
    super(Events.GuildIntegrationsUpdate);
  }
}

export abstract class GuildRoleCreateEvent extends Event<Events.GuildRoleCreate> {
  constructor() {
    super(Events.GuildRoleCreate);
  }
}

export abstract class GuildRoleDeleteEvent extends Event<Events.GuildRoleDelete> {
  constructor() {
    super(Events.GuildRoleDelete);
  }
}

export abstract class InviteCreateEvent extends Event<Events.InviteCreate> {
  constructor() {
    super(Events.InviteCreate);
  }
}

export abstract class InviteDeleteEvent extends Event<Events.InviteDelete> {
  constructor() {
    super(Events.InviteDelete);
  }
}

export abstract class GuildRoleUpdateEvent extends Event<Events.GuildRoleUpdate> {
  constructor() {
    super(Events.GuildRoleUpdate);
  }
}

export abstract class GuildEmojiCreateEvent extends Event<Events.GuildEmojiCreate> {
  constructor() {
    super(Events.GuildEmojiCreate);
  }
}

export abstract class GuildEmojiDeleteEvent extends Event<Events.GuildEmojiDelete> {
  constructor() {
    super(Events.GuildEmojiDelete);
  }
}

export abstract class GuildEmojiUpdateEvent extends Event<Events.GuildEmojiUpdate> {
  constructor() {
    super(Events.GuildEmojiUpdate);
  }
}

export abstract class GuildBanAddEvent extends Event<Events.GuildBanAdd> {
  constructor() {
    super(Events.GuildBanAdd);
  }
}

export abstract class GuildBanRemoveEvent extends Event<Events.GuildBanRemove> {
  constructor() {
    super(Events.GuildBanRemove);
  }
}

export abstract class ChannelCreateEvent extends Event<Events.ChannelCreate> {
  constructor() {
    super(Events.ChannelCreate);
  }
}

export abstract class ChannelDeleteEvent extends Event<Events.ChannelDelete> {
  constructor() {
    super(Events.ChannelDelete);
  }
}

export abstract class ChannelUpdateEvent extends Event<Events.ChannelUpdate> {
  constructor() {
    super(Events.ChannelUpdate);
  }
}

export abstract class ChannelPinsUpdateEvent extends Event<Events.ChannelPinsUpdate> {
  constructor() {
    super(Events.ChannelPinsUpdate);
  }
}

export abstract class MessageCreateEvent extends Event<Events.MessageCreate> {
  constructor() {
    super(Events.MessageCreate);
  }
}

export abstract class MessageDeleteEvent extends Event<Events.MessageDelete> {
  constructor() {
    super(Events.MessageDelete);
  }
}

export abstract class MessageUpdateEvent extends Event<Events.MessageUpdate> {
  constructor() {
    super(Events.MessageUpdate);
  }
}

export abstract class MessageBulkDeleteEvent extends Event<Events.MessageBulkDelete> {
  constructor() {
    super(Events.MessageBulkDelete);
  }
}

export abstract class MessagePollVoteAddEvent extends Event<Events.MessagePollVoteAdd> {
  constructor() {
    super(Events.MessagePollVoteAdd);
  }
}

export abstract class MessagePollVoteRemoveEvent extends Event<Events.MessagePollVoteRemove> {
  constructor() {
    super(Events.MessagePollVoteRemove);
  }
}

export abstract class MessageReactionAddEvent extends Event<Events.MessageReactionAdd> {
  constructor() {
    super(Events.MessageReactionAdd);
  }
}

export abstract class MessageReactionRemoveEvent extends Event<Events.MessageReactionRemove> {
  constructor() {
    super(Events.MessageReactionRemove);
  }
}

export abstract class MessageReactionRemoveAllEvent extends Event<Events.MessageReactionRemoveAll> {
  constructor() {
    super(Events.MessageReactionRemoveAll);
  }
}

export abstract class MessageReactionRemoveEmojiEvent extends Event<Events.MessageReactionRemoveEmoji> {
  constructor() {
    super(Events.MessageReactionRemoveEmoji);
  }
}

export abstract class ThreadCreateEvent extends Event<Events.ThreadCreate> {
  constructor() {
    super(Events.ThreadCreate);
  }
}

export abstract class ThreadDeleteEvent extends Event<Events.ThreadDelete> {
  constructor() {
    super(Events.ThreadDelete);
  }
}

export abstract class ThreadUpdateEvent extends Event<Events.ThreadUpdate> {
  constructor() {
    super(Events.ThreadUpdate);
  }
}

export abstract class ThreadListSyncEvent extends Event<Events.ThreadListSync> {
  constructor() {
    super(Events.ThreadListSync);
  }
}

export abstract class ThreadMemberUpdateEvent extends Event<Events.ThreadMemberUpdate> {
  constructor() {
    super(Events.ThreadMemberUpdate);
  }
}

export abstract class ThreadMembersUpdateEvent extends Event<Events.ThreadMembersUpdate> {
  constructor() {
    super(Events.ThreadMembersUpdate);
  }
}

export abstract class UserUpdateEvent extends Event<Events.UserUpdate> {
  constructor() {
    super(Events.UserUpdate);
  }
}

export abstract class PresenceUpdateEvent extends Event<Events.PresenceUpdate> {
  constructor() {
    super(Events.PresenceUpdate);
  }
}

// export abstract class VoiceServerUpdateEvent extends Event<Events.VoiceServerUpdate> {
//   constructor() {
//     super(Events.VoiceServerUpdate);
//   }
// }

export abstract class VoiceStateUpdateEvent extends Event<Events.VoiceStateUpdate> {
  constructor() {
    super(Events.VoiceStateUpdate);
  }
}

export abstract class TypingStartEvent extends Event<Events.TypingStart> {
  constructor() {
    super(Events.TypingStart);
  }
}

export abstract class WebhooksUpdateEvent extends Event<Events.WebhooksUpdate> {
  constructor() {
    super(Events.WebhooksUpdate);
  }
}

export abstract class InteractionCreateEvent extends Event<Events.InteractionCreate> {
  constructor() {
    super(Events.InteractionCreate);
  }
}

export abstract class ErrorEvent extends Event<Events.Error> {
  constructor() {
    super(Events.Error);
  }
}

export abstract class WarnEvent extends Event<Events.Warn> {
  constructor() {
    super(Events.Warn);
  }
}

export abstract class DebugEvent extends Event<Events.Debug> {
  constructor() {
    super(Events.Debug);
  }
}

export abstract class CacheSweepEvent extends Event<Events.CacheSweep> {
  constructor() {
    super(Events.CacheSweep);
  }
}

export abstract class ShardDisconnectEvent extends Event<Events.ShardDisconnect> {
  constructor() {
    super(Events.ShardDisconnect);
  }
}

export abstract class ShardErrorEvent extends Event<Events.ShardError> {
  constructor() {
    super(Events.ShardError);
  }
}

export abstract class ShardReconnectingEvent extends Event<Events.ShardReconnecting> {
  constructor() {
    super(Events.ShardReconnecting);
  }
}

export abstract class ShardReadyEvent extends Event<Events.ShardReady> {
  constructor() {
    super(Events.ShardReady);
  }
}

export abstract class ShardResumeEvent extends Event<Events.ShardResume> {
  constructor() {
    super(Events.ShardResume);
  }
}

export abstract class InvalidatedEvent extends Event<Events.Invalidated> {
  constructor() {
    super(Events.Invalidated);
  }
}

// export abstract class RawEvent extends Event<Events.Raw> {
//   constructor() {
//     super(Events.Raw);
//   }
// }

export abstract class StageInstanceCreateEvent extends Event<Events.StageInstanceCreate> {
  constructor() {
    super(Events.StageInstanceCreate);
  }
}

export abstract class StageInstanceUpdateEvent extends Event<Events.StageInstanceUpdate> {
  constructor() {
    super(Events.StageInstanceUpdate);
  }
}

export abstract class StageInstanceDeleteEvent extends Event<Events.StageInstanceDelete> {
  constructor() {
    super(Events.StageInstanceDelete);
  }
}

export abstract class GuildStickerCreateEvent extends Event<Events.GuildStickerCreate> {
  constructor() {
    super(Events.GuildStickerCreate);
  }
}

export abstract class GuildStickerDeleteEvent extends Event<Events.GuildStickerDelete> {
  constructor() {
    super(Events.GuildStickerDelete);
  }
}

export abstract class GuildStickerUpdateEvent extends Event<Events.GuildStickerUpdate> {
  constructor() {
    super(Events.GuildStickerUpdate);
  }
}

export abstract class GuildScheduledEventCreateEvent extends Event<Events.GuildScheduledEventCreate> {
  constructor() {
    super(Events.GuildScheduledEventCreate);
  }
}

export abstract class GuildScheduledEventUpdateEvent extends Event<Events.GuildScheduledEventUpdate> {
  constructor() {
    super(Events.GuildScheduledEventUpdate);
  }
}

export abstract class GuildScheduledEventDeleteEvent extends Event<Events.GuildScheduledEventDelete> {
  constructor() {
    super(Events.GuildScheduledEventDelete);
  }
}

export abstract class GuildScheduledEventUserAddEvent extends Event<Events.GuildScheduledEventUserAdd> {
  constructor() {
    super(Events.GuildScheduledEventUserAdd);
  }
}

export abstract class GuildScheduledEventUserRemoveEvent extends Event<Events.GuildScheduledEventUserRemove> {
  constructor() {
    super(Events.GuildScheduledEventUserRemove);
  }
}
