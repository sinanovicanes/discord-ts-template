import {
  BaseInteraction,
  DMChannel,
  Events,
  GuildChannel,
  Interaction
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
}

export abstract class GuildCreateEvent extends Event {
  constructor() {
    super(Events.GuildCreate);
  }
}

export abstract class GuildDeleteEvent extends Event {
  constructor() {
    super(Events.GuildDelete);
  }
}

export abstract class GuildUpdateEvent extends Event {
  constructor() {
    super(Events.GuildUpdate);
  }
}

export abstract class GuildUnavailableEvent extends Event {
  constructor() {
    super(Events.GuildUnavailable);
  }
}

export abstract class GuildMemberAddEvent extends Event {
  constructor() {
    super(Events.GuildMemberAdd);
  }
}

export abstract class GuildMemberRemoveEvent extends Event {
  constructor() {
    super(Events.GuildMemberRemove);
  }
}

export abstract class GuildMemberUpdateEvent extends Event {
  constructor() {
    super(Events.GuildMemberUpdate);
  }
}

export abstract class GuildMemberAvailableEvent extends Event {
  constructor() {
    super(Events.GuildMemberAvailable);
  }
}

export abstract class GuildMembersChunkEvent extends Event {
  constructor() {
    super(Events.GuildMembersChunk);
  }
}

export abstract class GuildIntegrationsUpdateEvent extends Event {
  constructor() {
    super(Events.GuildIntegrationsUpdate);
  }
}

export abstract class GuildRoleCreateEvent extends Event {
  constructor() {
    super(Events.GuildRoleCreate);
  }
}

export abstract class GuildRoleDeleteEvent extends Event {
  constructor() {
    super(Events.GuildRoleDelete);
  }
}

export abstract class InviteCreateEvent extends Event {
  constructor() {
    super(Events.InviteCreate);
  }
}

export abstract class InviteDeleteEvent extends Event {
  constructor() {
    super(Events.InviteDelete);
  }
}

export abstract class GuildRoleUpdateEvent extends Event {
  constructor() {
    super(Events.GuildRoleUpdate);
  }
}

export abstract class GuildEmojiCreateEvent extends Event {
  constructor() {
    super(Events.GuildEmojiCreate);
  }
}

export abstract class GuildEmojiDeleteEvent extends Event {
  constructor() {
    super(Events.GuildEmojiDelete);
  }
}

export abstract class GuildEmojiUpdateEvent extends Event {
  constructor() {
    super(Events.GuildEmojiUpdate);
  }
}

export abstract class GuildBanAddEvent extends Event {
  constructor() {
    super(Events.GuildBanAdd);
  }
}

export abstract class GuildBanRemoveEvent extends Event {
  constructor() {
    super(Events.GuildBanRemove);
  }
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
}

export abstract class ChannelUpdateEvent extends Event {
  constructor() {
    super(Events.ChannelUpdate);
  }
}

export abstract class ChannelPinsUpdateEvent extends Event {
  constructor() {
    super(Events.ChannelPinsUpdate);
  }
}

export abstract class MessageCreateEvent extends Event {
  constructor() {
    super(Events.MessageCreate);
  }
}

export abstract class MessageDeleteEvent extends Event {
  constructor() {
    super(Events.MessageDelete);
  }
}

export abstract class MessageUpdateEvent extends Event {
  constructor() {
    super(Events.MessageUpdate);
  }
}

export abstract class MessageBulkDeleteEvent extends Event {
  constructor() {
    super(Events.MessageBulkDelete);
  }
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
}

export abstract class MessageReactionRemoveEvent extends Event {
  constructor() {
    super(Events.MessageReactionRemove);
  }
}

export abstract class MessageReactionRemoveAllEvent extends Event {
  constructor() {
    super(Events.MessageReactionRemoveAll);
  }
}

export abstract class MessageReactionRemoveEmojiEvent extends Event {
  constructor() {
    super(Events.MessageReactionRemoveEmoji);
  }
}

export abstract class ThreadCreateEvent extends Event {
  constructor() {
    super(Events.ThreadCreate);
  }
}

export abstract class ThreadDeleteEvent extends Event {
  constructor() {
    super(Events.ThreadDelete);
  }
}

export abstract class ThreadUpdateEvent extends Event {
  constructor() {
    super(Events.ThreadUpdate);
  }
}

export abstract class ThreadListSyncEvent extends Event {
  constructor() {
    super(Events.ThreadListSync);
  }
}

export abstract class ThreadMemberUpdateEvent extends Event {
  constructor() {
    super(Events.ThreadMemberUpdate);
  }
}

export abstract class ThreadMembersUpdateEvent extends Event {
  constructor() {
    super(Events.ThreadMembersUpdate);
  }
}

export abstract class UserUpdateEvent extends Event {
  constructor() {
    super(Events.UserUpdate);
  }
}

export abstract class PresenceUpdateEvent extends Event {
  constructor() {
    super(Events.PresenceUpdate);
  }
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
}

export abstract class TypingStartEvent extends Event {
  constructor() {
    super(Events.TypingStart);
  }
}

export abstract class WebhooksUpdateEvent extends Event {
  constructor() {
    super(Events.WebhooksUpdate);
  }
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
}

export abstract class WarnEvent extends Event {
  constructor() {
    super(Events.Warn);
  }
}

export abstract class DebugEvent extends Event {
  constructor() {
    super(Events.Debug);
  }
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
}

export abstract class ShardErrorEvent extends Event {
  constructor() {
    super(Events.ShardError);
  }
}

export abstract class ShardReconnectingEvent extends Event {
  constructor() {
    super(Events.ShardReconnecting);
  }
}

export abstract class ShardReadyEvent extends Event {
  constructor() {
    super(Events.ShardReady);
  }
}

export abstract class ShardResumeEvent extends Event {
  constructor() {
    super(Events.ShardResume);
  }
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
}

export abstract class StageInstanceUpdateEvent extends Event {
  constructor() {
    super(Events.StageInstanceUpdate);
  }
}

export abstract class StageInstanceDeleteEvent extends Event {
  constructor() {
    super(Events.StageInstanceDelete);
  }
}

export abstract class GuildStickerCreateEvent extends Event {
  constructor() {
    super(Events.GuildStickerCreate);
  }
}

export abstract class GuildStickerDeleteEvent extends Event {
  constructor() {
    super(Events.GuildStickerDelete);
  }
}

export abstract class GuildStickerUpdateEvent extends Event {
  constructor() {
    super(Events.GuildStickerUpdate);
  }
}

export abstract class GuildScheduledEventCreateEvent extends Event {
  constructor() {
    super(Events.GuildScheduledEventCreate);
  }
}

export abstract class GuildScheduledEventUpdateEvent extends Event {
  constructor() {
    super(Events.GuildScheduledEventUpdate);
  }
}

export abstract class GuildScheduledEventDeleteEvent extends Event {
  constructor() {
    super(Events.GuildScheduledEventDelete);
  }
}

export abstract class GuildScheduledEventUserAddEvent extends Event {
  constructor() {
    super(Events.GuildScheduledEventUserAdd);
  }
}

export abstract class GuildScheduledEventUserRemoveEvent extends Event {
  constructor() {
    super(Events.GuildScheduledEventUserRemove);
  }
}
