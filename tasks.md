---
---

---

---

---

---

---

---

---

---

---

---

---

---

---

---

get Sammel-Lieferung/lieferschein to work again?

---

done: replaced exceljs with write-excel-file (2026-11-03). @e965/xlsx was ruled out: SheetJS community edition can not write freeze panes or cell styling (pro only). write-excel-file is maintained, lazy chunk went from 929 KB to 71 KB, autofilter restored via custom feature in src/utils/autoFilterFeature.ts

---

done: exports show progress (2026-11-03). global progress card (ExportProgress in Layout) fed by exportProgressAtom: per-Kultur counting for Garten-Daten export, per-row counting for TzSums/Lieferungen/Bedarfsplanung, section progress for single-Kultur export, "Excel-Datei wird erstellt" while writing. also fixed ancient bug in buildSheetsForDaten: the loop over kulturen iterated once ([myKulturIds].entries()), so only the first Kultur of a Garten was exported; now all Kulturen are built concurrently and appended in order

---

exports progress 'aktueller Stand Kulturen...': hard to see and takes 6 seconds to appear (of 16 until the save as window opens). is the export running in a worker? Or is there something running before?
