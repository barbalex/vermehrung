---
slug: 'offline'
date: '2021-01-29'
title: 'Offline arbeiten'
sort1: 24
---

### Wieso?

Nicht jeder Garten verfügt über WLAN. Nicht jedes Eingabegerät verfügt über mobiles Internet. Zudem gibt es räumliche und manchmal zeitliche Lücken in der Verfügbarkeit von mobilem Internet.<br/><br/>

### Kann eine Web-App offline funktionieren?

Ja. Na ja - nicht auf iOS, [weil Apple Web-App's nicht genug Speicher geben will](../iOS).<br/><br/>

### Verbindungs-Status

vermehrung zeigt die Verfügbarkeit des Internets an:<br/>
![online](001.png)<br/>

Und auch dessen Fehlen:<br/>
![offline](002.png)<br/>

Weil vermehrung alle Daten, die Sie lesen dürfen, voraus lädt und auf Ihrem Gerät speichert, müssen Sie nicht erschrecken, wenn Sie plötzlich offline sein sollten. Sie können einfach weiter arbeiten. Alles, was Sie brauchen, ist da 😎.<br/><br/>

### Schlange für Operationen

Arbeiten Sie offline, packt vermehrung jede Daten-Änderung in "Päckchen" (genannt: Operation). Diese Päckchen warten geduldig. Das offline-Symbol zeigt die Länge der Warteschlange an:<br/>
![3 wartende Operationen](003.png)<br/>

Sobald vermehrung wieder online ist, werden die Päckchen dem Server geschickt...<br/>
![wieder online](004.gif)<br/>

...und dort verarbeitet. Sobald die Zahl verschwunden ist, ist ihr Gerät mit dem Server synchronisiert.<br/><br/>

Sie können sich durch Klick auf das Online-Symbol auch die Schlange auflisten lassen:
![Operationen-Liste](005.png)
...und wenn nötig Operationen widerrufen.<br/><br/>

### Konflikte

Was macht der Server mit Ihren Päckchen? Er speichert sie natürlich, wie jeder gute Server. Zusätzlich sucht er **Konflikte** und wählt **Sieger**.<br/><br/>

#### Konflikte finden

Gibt es widersprüchliche Versionen des gleichen Datensatzes, nennen wir dies einen Konflikt.<br/>
Konflikte entstehen, wenn mehrere Personen gleichzeitig denselben Datensatz ändern. Oder während jemand offline war.<br/>
Konflikte können auch entstehen, wenn dieselbe Person vermehrung.ch auf mehreren Geräten (teilweise offline) benutzt.<br/><br/>

#### Sieger wählen

Der Server von vermehrung.ch wählt automatisch Sieger. Leider ist er nicht allwissend. Darum notiert er beim Sieger auch, welche widersprüchlichen Versionen es gibt. Das wird im Formular angezeigt:<br/>
![Konflikt gefunden](006.png)<br/>

Klickt man auf den Konflikt, öffnet sich das Formular mit der widersprüchlichen Version:<br/>
![widersprüchliche Version](007.png)<br/>

Hier sehen Sie die Unterschiede. Sie haben drei Optionen:

1. widersprüchliche Version verwerfen
2. widersprüchliche Version übernehmen
3. aktuelle Version anpassen und danach die wiedersprüchliche verwerfen

Im Gegensatz zum Server sind sie hoffentlich allwissend genug, um den Konflikt abschliessend zu bereinigen 😁<br/><br/>

Es steckt mehr hinter der offline-Fähigkeit von vermehrung.ch. Neugierige [lesen hier weiter](../offline-wie).
