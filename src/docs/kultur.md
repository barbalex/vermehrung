---
slug: 'kulturen'
date: '2021-01-20'
title: 'Kulturen'
sort1: 7
---

### Ziele

- [Projekt-Ziel](/ziele) 1: Herkünfte sind bekannt und werden innerhalb von Kulturen nicht vermischt.<br/>
  Darum ist eine Kultur definiert als:
  - eine Art
  - aus einer Herkunft
  - in einem Garten<br/>
    Die Datenbank akzeptiert pro Garten nur eine aktive Kultur derselben Art und Herkunft. Plus ein Zwischenlager, siehe weiter unten
- [Projekt-Ziel](/ziele) 2: Die genetische Vielfalt von Kulturen ist bekannt.<br/>
  Indem das Feld "von Anzahl Individuen" bei jeder An-Lieferung nachgeführt wird

### Aktiv vs. erloschen

Eine Kultur beginnt aktiv (das gleichnamige Feld enthält in neuen Kulturen immer den Wert "ja"), kann aber erlöschen (Feld "aktiv" auf "nein" setzen).<br/>
Danach wird eine neue Kultur erstellt, wenn im selben Garten aus derselben Herkunft wieder eine Kultur entsteht.<br/><br/>
In einem Garten kann es pro Herkunft einer Art immer nur eine aktive Kultur geben. Das wird in der Datenbank durchgesetzt (plus ein für ein Zwischenlager, siehe unten).<br/><br/>

### Spezielle Formen

...von Kulturen sind:

- Erhaltungs-Kulturen
- Zwischenlager

### Zwischenlager

Der normale Ablauf einer Auspflanzung ist:

- Die Gärten liefern an die *G*arten*a*nlage *W*angen (GAW)
- Artverantwortliche holen die Pflanzen dort ab
- Für die GAW ist das meist keine normale Kultur, sondern ein kurzfristiges **Zwischenlager**
- Es kann vorkommen, dass die GAW mit einem Teil des Zwischenlagers eine neue Kultur gründet. Das wird in vermehrung.ch abgebildet, indem eine Lieferung vom Zwischenlager an diese Kultur erfasst wird

Weil in der GAW daher von allen Arten zeitweise Zwischenlager existieren müssen, wurde vermehrung.ch folgendermassen angepasst:

- Dieselbe "Art aus Herkunft" muss nun in einem Garten zwei mal vorkommen können:
  - (maximal) Ein Mal als normale Kultur
  - (maximal) Ein Mal als Zwischenlager
  - (Darüber hinaus kann es beliebig viele inaktive Kulturen geben)
- Wird eine Sammlung erstellt bzw. geändert, prüft vermehrung.ch: Gibt es diese Kombination von Art und Herkunft schon als Zwischenlager im GAW? Wenn nicht, wird sie automatisch erstellt

### Genetische Vielfalt

Das Feld "von Anzahl Individuen" nennt oder schätzt die Anzahl Pflanzen, welche die Basis für die genetische Vielfalt der Kultur bildet. Es ist manuell nachzuführen, wenn An-Lieferungen erfolgen.<br/><br/>

### Formular

Im Feld "Art" können nur Arten gewählt werden:

- Von denen es gesammelte Herkünfte gibt, für die im betreffenden Garten noch keine Kultur existiert
- Wenn die Herkunft schon gewählt wurde: Die in dieser Herkunft gesammelt wurden

Im Feld "Herkunft" können nur Herkünfte gewählt werden:

- Von denen es gesammelte Arten gibt, für die im betreffenden Garten noch keine Kultur existiert
- Wenn die Art schon gewählt wurde: In denen diese Art gesammelt wurde
