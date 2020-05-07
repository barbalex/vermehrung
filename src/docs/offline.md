---
path: "/Dokumentation/offline"
date: "2020-05-06"
title: "Offline arbeiten"
sort1: 23
---

Seit langer Zeit würden wir in apflora.ch gerne offline arbeiten können. In vermehrung.ch wäre es noch nützlicher. Weil die Umsetzung aber sehr anspruchsvoll und aufwändig ist, gab es bisher kein Konzept dafür. Nachfolgend ein Entwurf für ein solches Konzept:<br/><br/>

### 1. Konflikt-fähige Datenstruktur

Das grösste Problem bei Offline-Apps ist der Umgang mit Konflikten. Ist eine App offline, weiss die Benutzerin direkt nach der Speicherung eines Datensatzes (= "Operation") nicht, ob alles geklappt hat. Oder jemand anderes am selben Datensatz gearbeitet hat (das kann auch dieselbe Person auf einem anderen Gerät gewesen sein) und damit einen Konflikt geschaffen hat.<br/><br/>

Es muss also zwingend eine Methode geben:
- Alle Änderungen an Datensätzen jederzeit zurück zu verfolgen
- Konflikte automatisiert festzustellen
- Konflikte automatisiert zu lösen
- Der Benutzerin alle (automatisiert gelösten) Konflikte aufzulisten...
- ...und ihr die Möglichkeit zu geben, daraus die richtige Version zu wählen oder neu zu kombinieren
- Sowie der Benutzerin alle gescheiterten Operationen aufzulisten
- Diese Methode darf nicht von der Reihenfolge der Operationen abhängig sein

Apps _können_ zwar ohne diese Fähigkeiten offline-fähig gebaut werden. Benutzer können dann aber nie ganz sicher sein, ob sie einmal erfasste Daten nicht wieder undokumentiert verlieren. Ausserdem kann die Reihenfolge der Operationen durcheinander geraten. Was zu unberechenbaren Ergebnissen führen kann.<br/><br/>

Ähnliche Probleme stellen sich (weniger offensichtlich), wenn eine App von ihrem Server laufend alle Updates erhalten soll. Man also "live" sehen können soll, wie sich die Daten verändern. Und gleichzeitig selber Daten ändert.<br/><br/>

Meine erste anspruchsvolle App baute (vor mehr als 10 Jahren) auf der eher unbekannten Datenbank CouchDB auf. arteigenschaften.ch lief bis vor zwei Jahren auf CouchDB. CouchDB ist heute immer noch die einzige Datenbank, die genau um diese Anforderung herum aufgebaut wurde. Daher weiss ich recht gut, wie Synchronisation und Konflikt-Management funktionieren. Und wie anspruchsvoll sie sind.<br/><br/>

CouchDB und darum herum entstandene Werkzeuge erleben gerade ein revival. "offline" und "live updates" sind neuerdings gefragt.<br/><br/>

CouchDB selbst ist für apflora.ch und vermehrung.ch nicht geeignet. Ihre Methodik, Konflikte zu managen, kann allerdings auf andere Datenbanken und Apps übertragen werden. Die von uns verwendete Datenbank PostgreSQL ist dafür sehr gut geeignet.<br/><br/>

Vereinfacht gesagt funktioniert das so:
- Datensätze werden in der Datenbank nie geändert. Jede Änderung wird in einer neuen Version gespeichert
- Datensätze speichern eine Liste ihrer "Vorfahren" (= vorgängigen Versionen)
- Wird derselbe Datensatz parallel von zwei (offline) Apps verändert, entsteht eine "Ast-Gabel" im "Ahnen-Baum". Der Stamm ist der Ur-Ahne dieses Datensatzes. So entsteht mit der Zeit ein mehr oder weniger stark verästelter Ahnen-Baum für diesen Datensatz

Nun gibt es schlaue Abfragen, welche:
- Konflikte finden (Ast-Gabeln)
- Automatisch einen "Sieger" wählen
- Eine Liste aller "Sieger" bauen

Meine Idee ist nun, dass:
- Die Datenbank jede Tabelle doppelt führt:
  - Eine Tabelle mit den Siegern
  - Eine Tabelle mit allen Versionen
- Die App muss sich somit im Normalfall nicht selber um Versionen kümmern. Sie liest "Sieger" und schreibt "Versionen"
- Immer, wenn eine Version geschrieben wird, berechnet die Datenbank den neuen Sieger. Und bereinigt die Tabelle der Sieger
- Die App fragt entweder nach jeder erfolgreichen Operation nach dem neuen Sieger. Oder lässt sich gleich generell über alle Änderungen laufend informieren ("live")
- Sind Konflikte entstanden, merkt das die App (via die schlaue Abfrage) und zeigt sie der Benutzerin

### 2. Warteschlange für Operationen

Die App muss alle Operationen so durchführen, dass sie - wenn offline - erhalten bzw. zwischen-gespeichert bleiben. Auch wenn die Benutzerin das App schliesst. Und durchgeführt werden, sobald die App offen und online ist.<br/><br/>

Dazu muss eine andere Architektur gewählt werden, als bisher für die lokale Datenhaltung verwendet. Mit anderen Worten: App-seitig ändert sich sehr viel. Im Prinzip wird sie neu aufgebaut - wobei recht viel wiederverwendet werden kann.<br/><br/>

### 3. Daten gezielt voraus laden

Bevor die App offline ist, muss sie die gewünschten Daten geladen haben:
- Grundsätzlich sind alle Daten verfügbar, welche die Benutzerin kürzlich geladen hat
- Art-Verantwortliche sollten wohl explizit alle Daten für ihre Arten laden können
- Gärtner sollten expliziet alle Daten für ihren Garten laden können
- Die Benutzerin würde mit Vorteil diese Daten vor einer geplanten Offline-Benutzung nochmals aktualisieren. <br/>
  Oder die App aktualisiert laufend alle geladenen Daten ("live")

### 4. Authentifikation

Offline ist Authentifikation nicht möglich. Die App muss mit den vorhandenen Daten auch funktionieren, wenn die Authentifikation während der Offline-Zeit ablaufen sollte. Sobald sie offline ist, muss die Authentifikation erneuert werden.

### 5. Suche

Suche ist offline nicht möglich. Sie muss im offline Modus ausgeblendet werden.

### 6. Dateien

Dateien können offline nicht gemanagt werden. Sie müssen daher im offline Modus ausgeblendet werden.

### 7. Schrittweise Umsetzung

Es gibt viel Arbeit. Sehr viel. Beispielsweise:
- Wird die Anzahl Tabellen in der Datenbank verdoppelt (!)
- Die Datenbank muss lernen, mit Konflikten umzugehen
- Die lokale Datenhaltung der App muss neu aufgebaut werden
- Das Management der Operationen (App) und Konflikte (Datenbank) werden künftig mehr Ressourcen (Leistung) beanspruchen
- Während die neue App aufgebaut wird, muss die bisherige weiter betrieben werden

Das lässt sich nicht einfach nebenbei umsetzen.<br/><br/>

Weil apflora.ch viel komplexer ist, werde ich das zuerst in vermehrung.ch schrittweise einführen. Je nach vorhandenen Kapazitäten kann es eine Weile dauern, bis das in vermehrung.ch sichtbar wird.<br/><br/>

Wenn:
- es sich in vermehrung.ch bewährt,
- für apflora.ch gewünscht wird 
- und der Aufwand gerechtfertigt werden kann,

...können wir beginnen, es für apflora.ch umsetzen.
