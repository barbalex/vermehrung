---
typ: 'benutzerDoku'
path: "/Dokumentation/Benutzer/Sammel-Lieferungen"
date: "2019-09-20"
title: "Sammel-Lieferungen"
sort: 9
---

### 1	Ziel
- Lieferscheine mit mehreren Einzelpositionen ermöglichen
- Mehrfache Lieferungen effizienter erfassen

### 2	Benutzer-Erlebnis
- :heavy_check_mark: Benutzer wählt "Neue Sammel-Lieferung" (im Ast im Baum)
- :heavy_check_mark: Vorlage öffnet sich (rechts vom Baum). Vorlage ist genau das Lieferungs-Formular. Sammel-Lieferungs-Label im Baum zeigt erst ID an.
- :heavy_check_mark: Benutzer füllt in der Vorlage alles aus, was in allen (Teil-)Lieferungen gleich ist
- :heavy_check_mark: Sammel-Lieferungs-Label im Baum zeigt nun Daten aus der Vorlage (Datum, von, Person)
- :heavy_check_mark: Benutzer fügt Lieferungen hinzu. Dabei werden die Daten aus der Vorlage übernommen
- :heavy_check_mark: Vorlage bleibt sichtbar, rechts der Lieferung. :heavy_check_mark: Benutzer kann das abwählen
- :heavy_check_mark: Lieferungen zeigen nur Felder, die in der Vorlage noch nicht ausgefüllt sind
- :heavy_check_mark: Benutzer kann wählen, alle Felder anzuzeigen
- :heavy_check_mark: Bei allen (Teil-)Lieferungen von Sammel-Lieferungen wird die Sammel-Lieferung angezeigt. :heavy_check_mark: Der Benutzer kann dieses Verhalten steuern
- :heavy_check_mark: Benutzer kann Daten der Vorlage nachträglich in einzelne Lieferung übernehmen
- :heavy_check_mark: Benutzer kann Daten der Vorlage nachträglich in alle Lieferungen übernehmen
- Eventuell: Benutzer kann wählen, bei Änderungen der Sammel-Lieferung immer automatisch alle Lieferungen zu aktualisieren
- Benutzer kann Sammel-Lieferung drucken
- Eventuell: Benutzer kann auch Einzel-Positionen drucken (in allen Lieferungs-Formularen)

### 3 Strukturelle Umsetzung
- :heavy_check_mark: Neue Tabelle "sammel_lieferung". Mit Feldern "id" und allen wesentlichen Feldern aus der Tabelle "lieferung"
- :heavy_check_mark: Neues Feld in Tabelle "lieferung": "sammel_lieferung_id"
