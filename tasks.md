---
2026.10.14: 194.233.161.99 > 139.162.172.14
---

---

---

Still parked for tomorrow: the Playwright login/offline e2e scenario, the $.role claim-key syntax, and eventually retiring Hasura + src/hasuraMetadata/ once you're confident

---

---

One documented limitation: drag-and-dropping an empty file onto the dialog bypasses the file-input event and would still stall the widget's dialog — that's a bug inside the pinned uploadcare-widget@3.25.3 itself, and the clean fix is a widget upgrade, which I'd put on tomorrow's list rather than deploy day. Uploading empty files via drag-drop is about as degenerate as input gets.

---

Worth knowing for the pattern: today's three client-side bugs (embed name, p_since wrapper, cursor reset) were all in exactly the seams my test harness couldn't reach — the browser-boot and login paths that need a real Firebase session. The offline-boot fix and these two round out the local-first story; if you want, tomorrow we can add a Playwright offline scenario (context offline mode) to pin that path down permanently.

---

lets implement light/dark mode as we did for ae3 and ps: default is system setting, a icon enables overriding it

---

---

documentation: the active document should be highlighted in the list on the left

---

documentation: rename Events to Bedarf. Place it directly under Planen. And link from Planen to it ('Siehe auch...').

---

documentation: remove Schnittstellen

---

http://localhost:5176/Dokumentation/struktur/: use updated image

---

translate to german: http://localhost:5176/Dokumentation/datenschutz/

---
