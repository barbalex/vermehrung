---
path: '/Dokumentation/iOS'
date: '2020-10-22'
title: 'iPhone/iPad bzw. iOS'
sort1: 23
---

vermehrung.ch funktioniert nicht auf iOS, d.h. auf iPhones und iPads.<br/><br/>

Um zu verstehen wieso, muss man etwas Hintergrund kennen:

- Apple verdient **jährlich 10 bis 15 Milliarden** mit dem App Store, indem sie 30% jeder Überweisung absahnen ([Quelle](https://www.statista.com/chart/9671/developer-earnings-apple-app-store)). Dies geht auf Kosten der Benutzer (welche sich wohl nicht bewusst waren, dass der Geräte-Preis erst der Anfang war) und der Innovation bei der Entwicklung von Apps, die dadurch stark gebremst wird
- Apple will offensichtlich die Milchkuh App Store erhalten, koste es was es wolle. Es gibt mittlerweile eine Reihe von Firmen, welche sich dagegen wehren, auch gerichtlich. In den USA und der EU wird der Sachverhalt momentan von den Wettbewerbsbehörden untersucht ([Quelle](https://www.bbc.com/news/technology-54280982))
- Web-App's umgehen den App Store. Man kann sie direkt installieren. Das passt Apple nicht
- Web-App's funktionieren aber nur (gut), wenn der Browser die dafür nötigen Fähigkeiten anbietet
- Apple verbietet auf Mobilgeräten (iOS-Betriebssystem) die Installation anderer Browser und setzt dies im App Store durch
- Chrome und Firefox (zum Beispiel) haben trotzdem entsprechend genannte Browser im App Store. Damit Benutzer z.B. ihre Einstellungen synchronisieren können
- Aber: Weil Apple die Installation anderer Browser verbietet, basieren alle anderen Browser auf iOS auf Safari
- Weil auf Apple-Mobilgeräten nur Safari zur Verfügung steht, hat Apple es in der Hand, zu verhindern, dass die für (gut) funktionierende Web-Apps nötigen Fähigkeiten zur Verfügung stehen. Apple stellt daher einige grundlegende Fähigkeiten bereit, damit nicht zu viele Web-Apps gar nicht funktionieren. Aber sie schränken diese Fähigkeiten ganz bewusst ein, damit Web-Apps gegenüber Apps aus dem App Store nicht konkurrenzfähig sein können
- Eine zentrale Funktion guter Apps ist Offline-Fähigkeit. Nur damit sind Web-Apps echt konkurrenzfähig gegenüber Apps aus dem App Store
- Offline-Fähigkeit bedingt, dass die benötigten Daten lokal gespeichert werden. Damit Web-App's nicht konkurrenzfähig sind, schränkt Apple unter anderem die lokal speicherbare Menge Daten sehr stark ein
- Diese Einschränkungen werden ungenügend bis gar nicht dokumentiert. Apple hat kein Interesse, Web-App-Entwicklern das Leben einfach zu machen
- Wie es scheint, ermöglicht Apple es Web-Apps nur, 5 Megabytes zu speichern. Apple gibt Entwicklern keine Möglichkeit, diese Grenze im App-Code zu erkennen oder zu erhöhen. Benutzer können offenbar im Einstellungs-App die Grenze auf 50MB erhöhen ([Quelle](https://stackoverflow.com/a/8991626/712005))
- Im Gegensatz zu Safari stellen Chrome, Edge und Firefox Benutzern so viel Speicherplatz zur Verfügung, wie die Festplatte hergibt. Also nicht 5 Megabytes sondern potentiell mehrere Gigabytes! Android ermöglicht die Installation von Apps am App Store vorbei. In Android kann man sogar eigene App-Stores anbieten und damit direkt den Google App Store konkurrenzieren!
- Gemäss den Messungen benötigt vermehrung.ch 90 bis 120 MB lokalen Speicher. **Damit kann vermehrung.ch nicht auf iOS-Geräten funktionieren**. Vermutlich gibt es noch weitere Gründe, wieso vermehrung.ch auf iOS-Geräten nicht funktioniert. Wie erwähnt hat Safari viele der wichtigen Funktionalitäten nicht (vollständig) implementiert und schlecht dokumentiert
- Damit vermehrung.ch auf iOS funktionieren könnte, müsste extrem viel Aufwand getrieben werden. Und die Offline-Fähigkeit müsste entfernt werden. Was aber gerade für die Benutzung auf Mobil-Geräten wichtig ist
- Damit vermehrung.ch auf iOS funktionieren könnte, müsste es also nochmals von Grund auf beruhend auf der Apple-Programmiersprache Swift neu entwickelt werden. Und über den App Store verteilt werden
- Genau das ist der Grund, wieso Web-Apps so wichtig sind und momentan einen enormen Aufschwung erleben: Entwickler können mit minimalem Mehraufwand (Web-)Apps entwickeln, die auf allen Betriebssystemen funktionieren, auf denen ein moderner Browser ausgeführt werden kann. Zum Beispiel: Windows, Android, macOS (noch?), ChromeOS, Linux, [HarmonyOS](https://consumer.huawei.com/en/press/media-coverage/2019/huawei-new-operating-system-harmonyos), [Tizen](https://www.tizen.org/about), alle künftig neu entstehenden. Müsste vermehrung.ch mit den bisher üblichen Mitteln neben dem Browser für die drei wichtigsten Betriebssysteme programmiert werden, wäre der Aufwand ungefähr 4 mal so hoch als mit einer Web-App alleine

vermehrung.ch ist Opfer des Kollateralschadens, der daher rührt, dass Apple an allen Überweisungen 30% verdienen will.<br/><br/>

Sorry Apple-Mobilgeräte-BenutzerInnen. Ihr habt für viel Geld ein Gerät gekauft, dass euch von den modernsten Apps ausschliesst.
