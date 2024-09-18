export class MiddlewareError extends Error {
  constructor(message: string, interaction: MiddlewareInteraction) {
    super(message);

    if (!interaction.isRepliable || !interaction.isRepliable()) return;

    interaction
      .reply({
        content: this.message,
        ephemeral: true
      })
      .catch();
  }
}
