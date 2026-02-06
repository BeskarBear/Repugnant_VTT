import { promptD6Check } from "./rolls.js";

export class RepugnantActorSheet extends ActorSheet {
  get template() {
    return "templates/actor/character-sheet.hbs";
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find("[data-action='d6-roll']").on("click", (event) => this._onD6Roll(event));
  }

  async _onD6Roll(event) {
    event.preventDefault();
    await promptD6Check(this.actor);
  }
}
