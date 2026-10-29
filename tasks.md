---
---

---

---

---

get Sammel-Lieferung/lieferschein to work again?

---

---

---

lets implement: Breadcrumbs (as called in the ps project) / Bookmarks (as called in the apf2 project) - marked yellow in the image. These will replace the nav buttons currently used in form headers. But lets do it having an option to use either breadcrumbs or nav buttons. Just in case users do not like this new way of doing things. We can later remove nav buttons and the option if breadcrumbs are accepted well. Lets implement breadcrumbs like in ps (as opposed to apf2): they are always visible

---

actually I now realized that breadcrumbs are only half the story. in order to navigate down we need something that replaces the icons in the form header. that is a list view that is rendered in place of the actual objects. the objects themselves will be rendered at /{object name}. Example: Aldrovanda vesiculosa will be rendered at http://localhost:5175/Vermehrung/Arten/018cfe6e-ab01-7b3d-8e8c-4b8256c4b81c/Art. At http://localhost:5175/Vermehrung/Arten/018cfe6e-ab01-7b3d-8e8c-4b8256c4b81c a list is rendered containing: the object ('Art) and all lower tables, thus: 'Herkünfte', 'Sammlungen', 'Kulturen'. In the same order as in the nav tree. This is exactly as it is done in apf2. breadcrumbsEnabled should toggle whether these lists are rendered. Of course, routing is now also dependant on whether breadcrumbsEnabled is true. Sorry, another large refactor

---

---

---

---
