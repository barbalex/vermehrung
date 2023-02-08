Zuverlässige Offline-Fähigkeit ist schwer. Nachfolgend das für vermehrung.ch umgesetzte Konzept:<br/><br/>

### 1. Konflikt-fähige Datenstruktur

Das grösste Problem von Offline-Apps ist der Umgang mit Konflikten. Ist eine App offline, weiss die Benutzerin direkt nach der Speicherung eines Datensatzes (= "Operation") nicht, ob alles geklappt hat. Oder jemand anderes am selben Datensatz gearbeitet hat und damit einen Konflikt geschaffen hat. Oder ob jemand nächste Woche bereits geänderte Daten synchronisiert und dabei einen bestehenden Konflikt sichtbar macht. Auch wenn dieselbe Person an mehreren Geräten arbeitet, kann es Konflikte geben.<br/><br/>

Es muss also eine Methode geben:

- Alle Änderungen an Datensätzen jederzeit zurück zu verfolgen
- Konflikte automatisiert festzustellen
- Konflikte automatisiert zu lösen
- Der Benutzerin alle (automatisiert gelösten) Konflikte aufzulisten...
- ...und ihr die Möglichkeit zu geben, daraus die richtige Version zu wählen oder neu zu kombinieren
- Obiges auch für Löschungen zu ermöglichen
- Sowie der Benutzerin alle gescheiterten Operationen aufzulisten
- Diese Methode darf nicht von der Reihenfolge der Operationen abhängig sein

Apps _können_ zwar ohne diese Fähigkeiten offline-fähig gebaut werden. Benutzer können dann aber nie sicher sein, ob sie einmal erfasste Daten nicht wieder undokumentiert verlieren. Ausserdem kann die Reihenfolge der Operationen durcheinander geraten. Mit unberechenbaren Folgen.<br/><br/>

Meine erste anspruchsvolle App baute (vor mehr als 10 Jahren) auf der eher unbekannten Datenbank CouchDB auf. arteigenschaften.ch lief bis vor zwei Jahren auf CouchDB. CouchDB ist heute immer noch die einzige Datenbank, die genau um diese Anforderung herum aufgebaut wurde. Daher weiss ich recht gut, wie Synchronisation und Konflikt-Management funktionieren. Und wie anspruchsvoll sie sind.<br/><br/>

CouchDB und darum herum entstandene Werkzeuge erleben gerade ein revival. "offline" und "live updates" sind neuerdings gefragt.<br/><br/>

CouchDB selbst ist (als no-sql-Datenbank) für apflora.ch und vermehrung.ch nicht geeignet. Ihre Methodik, Konflikte zu managen, kann allerdings auf andere Datenbanken und Apps übertragen werden ([mehr dazu hier](https://hasura.io/blog/couchdb-style-conflict-resolution-rxdb-hasura/#conflict-resolution-impl)). Die für vermehrung.ch verwendete Datenbank PostgreSQL ist dafür sehr gut geeignet.<br/><br/>

Vereinfacht gesagt funktioniert das so:

- Datensätze werden nie geändert. Jede Änderung wird in eine neue Version geschrieben
- Datensätze speichern eine Liste ihrer "Vorfahren" (= frühere Versionen)
- Wird derselbe Datensatz parallel von mehreren Benutzern verändert, entsteht eine "Ast-Gabel" im (von oben nach unten wachsenden) "Ahnen-Baum". Der Stamm ist der Ur-Ahne dieses Datensatzes, Gabelungen markieren Konflikte

Nun gibt es schlaue Abfragen, welche immer wenn eine Version eintrifft:

- Konflikte finden
- Automatisch einen "Sieger" wählen
- Eine Liste aller "Sieger" bauen, mit Hinweis auf allfällige Konflikte

**Das Konzept ist**:

- Die Datenbank führt jede Tabelle doppelt:
  - Eine Tabelle mit allen "Versionen"
  - Eine Tabelle mit den "Siegern"
- Wird eine Version geschrieben, berechnet und aktualisiert die Datenbank den Sieger
- Löscht die Benutzerin einen Datensatz
  - Wird eine neue Version geschrieben, welche die Löschung dokumentiert
  - Wird ein Sieger erstellt, der als gelöscht gekennzeichnet ist
- Findet die Datenbank Konflikte, listet sie sie beim Sieger auf
- Die App muss sich somit nicht selber um Versionen kümmern. Sie liest Sieger und schreibt Versionen
- Die App fragt nach jeder erfolgreichen Operation bei der Datenbank nach dem neuen Sieger. Und lässt sich generell über alle Änderungen laufend informieren ("live")
- Entstehen Konflikte, zeigt die App sie der Benutzerin. Und gibt ihr die Möglichkeit:
  - Den richtigen Sieger zu bestimmen
  - Informationen aller Konflikte zu vereinigen

### 2. Warteschlange für Operationen

Die App verpackt alle Daten-Änderungen (Operationen) in "Päckli". Die Päckli werden online sofort verarbeitet bzw. der Datenbank übermittelt. Offline werden sie zwischen-gespeichert. Und verarbeitet, sobald die App wieder online ist.<br/><br/>

### 3. Daten voraus laden

Bevor die App offline ist, muss sie die für die Feld- bzw. Garten-Arbeit gewünschten Daten geladen haben:

- Die App lädt beim ersten Start alle Daten, welche der jeweilige Benutzer lesen darf
- Daten werden dauernd live aktualisiert

### 4. Authentifikation

Offline ist Authentifikation nicht möglich. Die App funktioniert mit den vorhandenen Daten auch dann weiter, wenn die Authentifikation während der Offline-Zeit ablaufen sollte. Sobald sie online ist, wird die Authentifikation erneuert.<br/><br/>

### 5. Suche, Auswertungen

Suche, Zeit-Achsen und Exporte funktionieren auch offline.<br/><br/>

### 6. Dateien

Dateien können offline nicht verwaltet werden, da keine Verbindung zum Speicherdienst besteht. Sie werden daher ausgeblendet.<br/><br/>

### 7. Schrittweise Umsetzung

Es gab viel Arbeit. Sehr viel. Beispiele:

- Die Anzahl Tabellen in der Datenbank wurde verdoppelt (!)
- Die Datenbank musste lernen, mit Konflikten umzugehen
- Die lokale Datenhaltung der App musste von Grund auf neu aufgebaut werden (!)
- Das Management der Operationen (App), Konflikte und Daten (Datenbank) und die Daten-Schnittstelle beanspruchen nun mehr Ressourcen (Leistung und Speicher)
- Während die neue App aufgebaut wurde, musste die bisherige weiter betrieben werden

Bilanz: Die Implementation war ca. 14 Wochen Aufwand. Ein zweites Mal würde das wohl halb so lange dauern.<br/><br/>
