---
typ: 'benutzerDoku'
path: "/Dokumentation/Benutzer/Zeitachse-Kultur"
date: "2019-09-20"
title: "Zeit-Achse für Kulturen"
sort: 4
---

### Ziel
Ziel 2 der [Projekt-Ziele](/Dokumentation/Benutzer/Ziele/): Übersichten über Pflanzen und auspflanz-bereite Pflanzen.<br/>
Als Grundlage, um Kulturen und Auspflanzungen zu planen.<br/><br/>

### Was
Dargestellt werden primär die Mengen der für die Planung wesentlichen Einheiten:

- Anzahl Pflanzen
- Anzahl auspflanzungs-bereite Pflanzen
- Anzahl Mutter-Pflanzen

...aus Zählungen und Lieferungen, durchgeführt und geplant.<br/><br/>

Sekundär (in den Fenstern, die sich öffnen, wenn man über einem Zeitpunkt schwebt) werden weitere Informationen dargestellt, sofern vorhanden:

- Gramm Samen
- Andere Mengen
- Von Anzahl Individuen
- Beschreibung auspflanzbereite Pflanzen
- Bemerkungen

Von den primären Informationen erhält man also auf den ersten Blick eine Übersicht.<br/>
Von den sekundären, indem man auf der Zeit-Achse über den Zeitpunkten schwebt.<br/><br/>

### Wie

#### Linien für Anzahlen
Als Grundlage werden verwendet:

- Anzahlen aus durchgeführten Zählungen
- Anzahlen aus geplanten Zählungen. Aber nur, wenn sie nach der letzten durchgeführten Zählung geplant sind
- Anzahlen aus durchgeführten Lieferungen:<br/>
  Referenz sind die Anzahlen aus letzten zuvor durchgeführten Zählung.<br/>
  Erfolgte die Lieferung vor der ersten Zählung, wird als Referenz für alle Einheiten die Anzahl 0 verwendet.<br/>
  Zur Referenz wird summiert, was in der Zwischenzeit geliefert wurde.
- Anzahlen aus geplanten Lieferungen, die nach der letzten durchgeführten Zählung geplant sind

Linien, die geplante Anzahlen darstellen, verwenden dieselbe Farbe wie die Linie für die entsprechende Einheit bei durchgeführten Zählungen. Aber etwas aufgehellt.<br/><br/>

#### Punkte für ignorierte Zählungen
- Geplante Zählungen, nach denen eine Zählung durchgeführt wurde, werden nicht als Teil der Linien berücksichtigt.<br/>
  Stattdessen werden sie in separaten Punkten dargestellt

#### Säulen für Lieferungen
- An-Lieferungen werden als Säulen mit positiven Werten dargestellt,
- Aus-Lieferungen mit negativen Werten
- Lieferungen, die nach der letzten durchgeführten Zählung geplant sind, werden etwas aufgehellt dargestellt.<br/>
  Vor diesem Zeitpunkt geplante werden in abweichenden Farben dargestellt
