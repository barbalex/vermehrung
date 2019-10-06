---
path: "/Dokumentation/Kulturen"
date: "2019-09-20"
title: "Kulturen"
sort: 5
---

### Ziele
- [Projekt-Ziel](/Dokumentation/Ziele) 1: Herkünfte sind bekannt und werden innerhalb von Kulturen nicht vermischt.<br/>
  Darum ist eine Kultur definiert als:
  - eine Art
  - aus einer Herkunft
  - in einem Garten<br/>
  Die Datenbank akzeptiert pro Garten nur eine aktive Kultur derselben Art und Herkunft.
- [Projekt-Ziel](/Dokumentation/Ziele) 2: Die genetische Vielfalt von Kulturen ist bekannt.<br/>
  Indem das Feld "von Anzahl Individuen" bei jeder An-Lieferung nachgeführt wird

### Aktiv vs. erloschen
Eine Kultur beginnt aktiv (das gleichnamige Feld enthält in neuen Kulturen immer den Wert "ja"), kann aber erlöschen (Feld "aktiv" auf "nein" setzen).<br/>
Danach wird eine neue Kultur erstellt, wenn im selben Garten aus derselben Herkunft wieder eine Kultur entsteht.<br/><br/>
In einem Garten kann es pro Herkunft einer Art immer nur eine aktive Kultur geben. Das wird in der Datenbank durchgesetzt.<br/><br/>

### Spezielle Formen
...von Kulturen sind:
- Erhaltungs-Kulturen
- Zwischenlager

### Genetische Vielfalt
Das Feld "von Anzahl Individuen" nennt oder schätzt die Anzahl Pflanzen, welche die Basis für die genetische Vielfalt der Kultur bildet. Es ist manuell nachzuführen, wenn An-Lieferungen erfolgen.