const OCR_FILES = [
  {
    name: "Repugnant Core Rules (OCR)",
    path: "data/ocr/Repugnant_Core_rules.txt"
  },
  {
    name: "Repugnant: Spoilage and Scraps (OCR)",
    path: "data/ocr/Repugnant_Spoilage_and_Scraps.txt"
  },
  {
    name: "Putrid Pizza (OCR)",
    path: "data/ocr/PutridPizza.txt"
  },
  {
    name: "The Heap (OCR)",
    path: "data/ocr/The_Heap.txt"
  }
];

function escapeHTML(text) {
  if (foundry?.utils?.escapeHTML) return foundry.utils.escapeHTML(text);
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function importRawJournals() {
  if (!game.user?.isGM) {
    ui.notifications?.warn("Repugnant | Only a GM can import journals.");
    return;
  }

  const existingFolder = game.folders?.find(
    (f) => f.type === "JournalEntry" && f.name === "Repugnant OCR"
  );

  const folder =
    existingFolder ||
    (await Folder.create({
      name: "Repugnant OCR",
      type: "JournalEntry",
      color: "#8b2f2f"
    }));

  for (const file of OCR_FILES) {
    const existing = game.journal?.find((j) => j.name === file.name);
    if (existing) continue;

    let text;
    try {
      const response = await fetch(file.path);
      text = await response.text();
    } catch (err) {
      console.error(`Repugnant | Failed to fetch ${file.path}`, err);
      ui.notifications?.error(`Repugnant | Failed to fetch ${file.path}`);
      continue;
    }

    const content = `<pre>${escapeHTML(text)}</pre>`;

    await JournalEntry.create(
      {
        name: file.name,
        folder: folder.id,
        pages: [
          {
            name: "OCR Text",
            type: "text",
            text: {
              format: 1,
              content
            }
          }
        ]
      },
      { render: false }
    );
  }

  ui.notifications?.info("Repugnant | OCR journals imported.");
}
