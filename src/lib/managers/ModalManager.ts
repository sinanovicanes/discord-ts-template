import Modals from "@/components/modals";
import { ModalSubmitInteraction } from "discord.js";
import { Modal } from "../classes";
import { FailedToHandleModal, ModalNotFound } from "../errors";

export class ModalManager {
  static modals: Map<Modal["id"], Modal> = new Map(
    Modals.map(modal => [modal.id, modal])
  );

  static getModal(name: Modal["id"]) {
    return this.modals.get(name);
  }

  static getModalBuilder(name: Modal["id"]) {
    return this.modals.get(name)?.builder;
  }

  static hasModal(name: Modal["id"]) {
    return this.modals.has(name);
  }

  static async onModalSubmitInteraction(interaction: ModalSubmitInteraction) {
    const modal = this.getModal(interaction.customId as Modal["id"]);

    if (!modal) throw new ModalNotFound(interaction);

    try {
      await modal.execute(interaction);
    } catch (error) {
      throw new FailedToHandleModal(interaction);
    }
  }
}
