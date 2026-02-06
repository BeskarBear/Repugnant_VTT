/* Repugnant system entry point */
import { importRawJournals } from "./importer.js";
Hooks.once("init", () => {
  console.log("Repugnant | Initializing system");

  game.repugnant = {
    name: "repugnant",
    version: game.system.version,
    importRawJournals
  };

  class RepugnantActorSheet extends ActorSheet {
    get template() {
      return "templates/actor/character-sheet.hbs";
    }
  }

  class RepugnantItemSheet extends ItemSheet {
    get template() {
      return "templates/item/item-sheet.hbs";
    }
  }

  // Basic sheet registrations
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("repugnant", RepugnantActorSheet, {
    types: ["character", "npc"],
    makeDefault: true,
    label: "Repugnant Actor Sheet"
  });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("repugnant", RepugnantItemSheet, {
    types: ["ability", "item"],
    makeDefault: true,
    label: "Repugnant Item Sheet"
  });
});
