---
---

---

---

---

---

---

---

---

When this project began it needed uuid's to enable offline editing. but uuidv7 did not exist yet, so random uuid's were implemented. Meanwhile though uuidv7 exists and would make sense due to better ressource usage. can we design a migration path to

1. change to creating uuidv7 for all future inserts and
2. migrate all existing data to uuidv7 (as we did with apf2)?

What makes this more challenging are the _rev tables that need to be migrated as well (while missing relations). And the fact that users need to reload from the server discarding all changes made offline locally on the next update of their app. this is a risk I'm willing to run as so far only one user is really working with this app in a meaningfull way and she works on a desktop pc that always is online

---

---

in dark mode: text in dropdown fields is way too hard to read. Please make it as white as in the other fields

---

---
