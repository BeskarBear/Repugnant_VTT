# Repugnant VTT Session Checkpoint

Date: 2026-02-06
Project: Foundry VTT system `repugnant` (v13+)

## User Goal To Resume
Complete all three in this order:
1. Structure alternate D6 rules from `Repugnant_Spoilage_and_Scraps` into real system data.
2. Convert OCR journals into compendium packs.
3. Clean/segment OCR into separate rule sections and GM content.

## Current Status

### Completed
- Base system scaffold created.
- OCR text extracted and copied into `data/ocr/`:
  - `data/ocr/Repugnant_Core_rules.txt`
  - `data/ocr/Repugnant_Spoilage_and_Scraps.txt`
  - `data/ocr/PutridPizza.txt`
  - `data/ocr/The_Heap.txt`
- Raw journal importer implemented in `scripts/importer.js`.
- Import entry point exposed on `game.repugnant.importRawJournals()` in `scripts/system.js`.
- Basic actor/item templates and CSS expanded.

### Partially Done / Inconsistent (needs fix first)
- `template.json` now defines actor/item types:
  - Actor: `dweller`, `npc`, `monster`
  - Item: `kin`, `mutation`, `ability`, `gear`
- But `scripts/system.js` still registers sheets for old types:
  - Actor: `character`, `npc`
  - Item: `ability`, `item`
- New files created but not wired:
  - `scripts/actor.js`
  - `scripts/item.js`
  - `scripts/actor-sheet.js`
  - `scripts/item-sheet.js`
- `scripts/actor-sheet.js` imports `./rolls.js` which does not exist yet.

## Known OCR Caveats
- Stylized/art-heavy pages are noisy; some headings and lines are garbled.
- `Repugnant_Spoilage_and_Scraps.txt` has enough readable D6 rules sections to implement core mechanics.
- `The_Heap.txt` OCR is very sparse (tiny file).

## Resume Checklist (in required order)

### 1) D6 system data + mechanics
1. Wire document classes and sheet classes in `scripts/system.js`:
   - Import/use `RepugnantActor`, `RepugnantItem`, `RepugnantActorSheet`, `RepugnantItemSheet`.
   - Register actor/item sheets against types in `template.json`.
2. Add missing `scripts/rolls.js`:
   - Implement D6 check flow using Magnitude as base dice pool.
   - Add optional Threat comparison and success/failure messaging.
   - Add Fluid/Splatter/Gag handling scaffold matching OCR text.
3. Add localized strings in `lang/en.json` for roll labels and UI text.
4. Add initial item/ability data model fields required by D6 variant.
5. Verify actor sheet button `D6 Check` functions end-to-end.

### 2) OCR journals -> compendium packs
1. Create compendium pack metadata in `system.json` (`packs` block).
2. Create `.db` pack files (journal + item as needed) under `packs/`.
3. Add import utility to transform raw OCR journals into compendium Journal Entries.
4. Keep raw OCR folder + entries as source references.

### 3) Clean + segment OCR content
1. Build parser/segmentation script for `data/ocr/*.txt`.
2. Split into sections:
   - Core player rules
   - D6 variant rules
   - Kinfolk
   - Mutations
   - Monsters
   - GM tools/tables
3. Save cleaned output under `data/processed/`.
4. Feed cleaned sections into compendium journals/items.

## Fast Start Commands For Tomorrow
- Check state: `git status --short`
- Open key files:
  - `scripts/system.js`
  - `template.json`
  - `scripts/actor-sheet.js`
  - `scripts/importer.js`
- Verify OCR content quickly:
  - `rg -n "D6|Threat|Skuz|Carcass|Splatter|Fluid|Gag" data/ocr/Repugnant_Spoilage_and_Scraps.txt`

## Important Files In Play
- `system.json`
- `template.json`
- `scripts/system.js`
- `scripts/importer.js`
- `scripts/actor.js`
- `scripts/item.js`
- `scripts/actor-sheet.js`
- `scripts/item-sheet.js`
- `templates/actor/character-sheet.hbs`
- `templates/item/item-sheet.hbs`
- `styles/system.css`
- `data/ocr/*.txt`
