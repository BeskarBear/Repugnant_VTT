export class RepugnantActor extends Actor {
  prepareDerivedData() {
    super.prepareDerivedData();

    const system = this.system;
    if (!system?.carcass) return;

    const meat = system.carcass.meat || {};
    const feet = system.carcass.feet || {};

    if (meat.max === null || meat.max === undefined) meat.max = meat.value || 0;
    if (feet.max === null || feet.max === undefined) feet.max = feet.value || 0;

    if (meat.value > meat.max) meat.value = meat.max;
    if (feet.value > feet.max) feet.value = feet.max;
  }
}
