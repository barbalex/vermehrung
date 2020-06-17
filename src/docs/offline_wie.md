---
path: "/Dokumentation/offline-wie"
date: "2020-06-17"
title: "Offline: Wie es funktioniert"
sort1: 24
---

Schon lange würden wir in apflora.ch gerne offline arbeiten können. In vermehrung.ch wäre es ebenso nützlich. Weil die Umsetzung sehr anspruchsvoll und aufwändig ist, gab es bisher kein Konzept dafür. Nachfolgend das in Umsetzung befindliche Konzept für vermehrung.ch:<br/><br/>

### 1. Konflikt-fähige Datenstruktur

Das grösste Problem von Offline-Apps ist der Umgang mit Konflikten. Ist eine App offline, weiss die Benutzerin direkt nach der Speicherung eines Datensatzes (= "Operation") nicht, ob alles geklappt hat. Oder jemand anderes am selben Datensatz gearbeitet hat und damit einen Konflikt geschaffen hat. Auch wenn dieselbe Person an mehreren Geräten arbeitet, kann es Konflikte geben.<br/><br/>

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

Ähnliche Probleme stellen sich (weniger offensichtlich), wenn eine App von ihrem Server laufend alle Updates erhalten soll. Man also "live" sehen können soll, wie sich die Daten verändern. Und gleichzeitig selber Daten ändert.<br/><br/>

Meine erste anspruchsvolle App baute (vor mehr als 10 Jahren) auf der eher unbekannten Datenbank CouchDB auf. arteigenschaften.ch lief bis vor zwei Jahren auf CouchDB. CouchDB ist heute immer noch die einzige Datenbank, die genau um diese Anforderung herum aufgebaut wurde. Daher weiss ich recht gut, wie Synchronisation und Konflikt-Management funktionieren. Und wie anspruchsvoll sie sind.<br/><br/>

CouchDB und darum herum entstandene Werkzeuge erleben gerade ein revival. "offline" und "live updates" sind neuerdings gefragt.<br/><br/>

CouchDB selbst ist für apflora.ch und vermehrung.ch nicht geeignet. Ihre Methodik, Konflikte zu managen, kann allerdings auf andere Datenbanken und Apps übertragen werden. Die von uns verwendete Datenbank PostgreSQL ist dafür sehr gut geeignet.<br/><br/>

Vereinfacht gesagt funktioniert das so:
- Datensätze werden nie geändert. Jede Änderung wird in eine neue Version geschrieben
- Datensätze speichern eine Liste ihrer "Vorfahren" (= vorgängigen Versionen)
- Wird derselbe Datensatz parallel von mehreren (offline) Benutzern verändert, entsteht eine "Ast-Gabel" im "Ahnen-Baum". Der Stamm ist der Ur-Ahne dieses Datensatzes. So entsteht mit der Zeit für jeden Datensatz ein mehr oder weniger stark verästelter Ahnen-Baum

Nun gibt es schlaue Abfragen, welche immer wenn eine Version eintrifft:
- Konflikte finden (Ast-Gabeln)
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

Umsetzungstand: weitgehend umgesetzt.<br/><br/>

### 2. Warteschlange für Operationen

Die App verpackt alle Daten-Änderungen (Operationen) in "Päckli". Die Päckli werden online sofort verarbeitet bzw. der Datenbank übermittelt. Offline werden sie zwischen-gespeichert. Und verarbeitet, sobald die App wieder online ist.<br/><br/>

Dazu muss für die lokale Datenhaltung eine neue Architektur gewählt werden. Mit anderen Worten: Die App wird neu aufgebaut - wobei recht viel wiederverwendet werden kann.<br/><br/>

Umsetzungstand: umgesetzt.<br/><br/>

### 3. Daten gezielt voraus laden

Bevor die App offline ist, muss sie die für die Feld- bzw. Garten-Arbeit gewünschten Daten geladen haben:
- Die App lädt bei jedem Start alle Daten, welche der jeweilige Benutzer lesen darf
- Daten werden live aktualisiert

Umsetzungstand: umgesetzt.<br/><br/>

### 4. Authentifikation

Offline ist Authentifikation nicht möglich. Die App muss mit den vorhandenen Daten auch dann weiter funktionieren, wenn die Authentifikation während der Offline-Zeit ablaufen sollte. Sobald sie online ist, muss die Authentifikation erneuert werden.<br/><br/>

Umsetzungstand: umgesetzt.<br/><br/>

### 5. Suche

Suche muss neu aufgebaut werden, damit sie online funktioniert.<br/><br/>

Umsetzungstand: umgesetzt.<br/><br/>

### 6. Dateien

Dateien können offline nicht verwaltet werden. Sie werden daher ausgeblendet.<br/><br/>

Umsetzungstand: umgesetzt.<br/><br/>

### 7. Schrittweise Umsetzung

Es gibt viel Arbeit. Sehr viel. Beispiele:
- Die Anzahl Tabellen in der Datenbank wird verdoppelt (!)
- Die Datenbank muss lernen, mit Konflikten umzugehen
- Die lokale Datenhaltung der App muss von Grund auf neu aufgebaut werden (!)
- Das Management der Operationen (App), Konflikte und Daten (Datenbank) werden künftig mehr Ressourcen (Leistung und Speicher) beanspruchen
- Während die neue App aufgebaut wird, muss die bisherige weiter betrieben werden (sobald der Import erfolgt ist)

Weil apflora.ch viel komplexer ist, werde ich das zuerst in vermehrung.ch einführen. Je nach vorhandenen Kapazitäten kann es eine Weile dauern, bis es umgesetzt ist. Wenn möglich noch 2020.<br/><br/>

Wenn:
- es sich in vermehrung.ch bewährt,
- für apflora.ch gewünscht wird,
- der Aufwand gerechtfertigt und finanziert werden kann,

...können wir beginnen, es für apflora.ch umsetzen.