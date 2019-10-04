---
typ: 'benutzerDoku'
path: "/Dokumentation/Benutzer/Sammel-Lieferungen"
date: "2019-10-04"
title: "Sammel-Lieferungen"
sort: 9
---

### 1	Ziele
- Lieferscheine mit mehreren Einzelpositionen ermöglichen
- Gleichzeitige Lieferung aus vielen Kulturen effizienter erfassen

### 2 Grund-Idee
- Lieferungen können mit Hilfe einer Vorlage ausgefüllt werden
- Alles, was in der Vorlage erfasst wird, muss nicht mehr in den einzelnen Lieferungen erfasst werden
- Diese Vorlage wird "Sammel-Lieferung" genannt

### 3	Benutzer-Erlebnis
- :heavy_check_mark: Benutzer wählt "Neue Sammel-Lieferung" (im Struktur-Baum)
- :heavy_check_mark: Eine Sammel-Lieferung öffnet sich. Sie entspricht genau dem Lieferungs-Formular. Das Label im Baum zeigt erst die ID der Sammel-Lieferung an
- :heavy_check_mark: Benutzer füllt alles aus, was in allen (Teil-)Lieferungen gleich ist
- :heavy_check_mark: Das Label im Baum zeigt nun Daten aus der Sammel-Lieferung, sofern vorhanden (Datum, von, wer)
- :heavy_check_mark: Benutzer erstellt neue Lieferungen. Dabei werden die Daten aus der Sammel-Lieferung übernommen
- :heavy_check_mark: Lieferungen zeigen nur Felder, die in der Sammel-Lieferung noch nicht ausgefüllt sind
- :heavy_check_mark: Benutzer kann wählen, alle Felder anzuzeigen (und kann somit in Einzelfällen abweichende Werte erfassen)
- :heavy_check_mark: Bei allen (Teil-)Lieferungen von Sammel-Lieferungen wird die Sammel-Lieferung angezeigt. :heavy_check_mark: Benutzer kann dieses Verhalten ausschalten
- :heavy_check_mark: Änderungen der Sammel-Lieferung werden automatisch in alle zugehörigen Lieferungen kopiert. Benutzer kann stattdessen wählen: 
  - :heavy_check_mark: Daten der Sammel-Lieferung können manuell in einzelne Lieferung kopiert werden
  - :heavy_check_mark: Daten der Sammel-Lieferung können manuell in alle Lieferungen kopiert werden
- Benutzer kann Sammel-Lieferung drucken
- Eventuell: Benutzer kann auch Einzel-Positionen drucken (in allen Lieferungs-Formularen)

### 4 Strukturelle Umsetzung
- :heavy_check_mark: Neue Tabelle "sammel_lieferung". Mit Feldern "id" und allen wesentlichen Feldern aus der Tabelle "lieferung"
- :heavy_check_mark: Neues Feld in Tabelle "lieferung": "sammel_lieferung_id"
