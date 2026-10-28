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

What makes this more challenging are the _rev tables that need to be migrated as well. And the fact that users need to reload from the server discarding all changes made offline locally on the next update of their app. this is a risk I'm willing to run as so far only one user is really working with this app in a meaningfull way and she works on a desktop pc that always is online

---

This project uses _rev tables to document edits and enable solving conflicts. Currently row edits happen on every field change/blur. It would be much more efficient to only edit rows on change/blur forms while not having the user have to click a save button. And still having the ui immediately update labels when label-fields are changed. This would also reduce the number of conflicts created by parallel offline editing and simplify solving them. Is this feasible, does it make sense?

---

---

---
