---
---

---

---

---

---

tree building: optimizable in ps / apf2?

---

build lists using https://tanstack.com/virtual/latest / https://github.com/TanStack/virtual in apf2,ps and ae3

---

get Sammel-Lieferung/lieferschein to work again?

---

---

---

---

---

---

---

---

---

exceljs replacement that is up to date? @e965/xlsx?

---

e2e local-first flaky under parallel load (also pre-wa-sqlite): clicking a tree row right after offline reload can navigate without the object-name url suffix (`/Art`) - the row text renders before the node is fully typed (`nodeType === 'table'`), so `urlToActivate` in src/components/Tree/toggleNode.ts skips the suffix. Fixed symptom-wise with one local playwright retry; the node-typing race in the tree build is still there.
