---
path: "/Dokumentation/offline"
date: "2020-06-17"
title: "Offline arbeiten"
sort1: 23
---

### Wieso

Nicht jeder Garten verfügt über WLAN. Nicht jedes Eingabegerät verfügt über mobiles Internet. Ausserdem gibt es räumliche und zeitliche Lücken in der Verfügbarkeit von mobilem Internet.<br/><br/>

Zumindest ist dies das Ziel. Aktuell sind die meisten dafür nötigen Anpassungen erfolgt. Ausgiebig getestet ist das noch nicht. Mit Fehlern und Nachbesserungen ist daher zu rechnen.<br/><br/>

### Verbindungs-Status

vermehrung zeigt die Verfügbarkeit des Internets an:<br/>
![online](001.png)<br/>

Und auch dessen Fehlen:<br/>
![offline](002.png)<br/>

### Eine Schlange für Operationen

Arbeitet man offline, packt vermehrung jede Daten-Änderung in "Päckchen" (genannt: Operationen). Diese Päckchen warten geduldig. Das Offline-Symbol zeigt dann die Länge der Warteschlange an:<br/>
![3 wartende Operationen](003.png)<br/>

Sobald vermehrung wieder online ist, werden die Päckchen dem Server geschickt:<br/>
![wieder online](004.gif)<br/>

und dort verarbeitet.<br/><br/>

### Konflikte

Was macht der Server? Er sucht **Konflikte** und wählt **Sieger**.<br/><br/>

#### Konflikte finden

Gibt es widersprüchliche Versionen des gleichen Datensatzes, nennen wir dies einen Konflikt.<br/>
Konflikte entstehen, wenn mehrere Personen gleichzeitig denselben Datensatz ändern. Oder: während jemand offline war.<br/>
Konflikte können auch entstehen, wenn dieselbe Person vermehrung.ch auf mehreren Geräten (teilweise offline) benutzt.<br/><br/>

#### Sieger wählen

Der Server von vermehrung.ch wählt automatisch Sieger. Leider ist er nicht allwissend. Darum notiert er beim Sieger auch, welche widersprüchlichen Versionen es gibt. Das wird im Formular angezeigt:
![Konflikt gefunden](005.png)<br/>

<br/><br/>
Wollen Sie genauer wissen, [wie vermehrung.ch offline fähig wird](../offline-wie)?