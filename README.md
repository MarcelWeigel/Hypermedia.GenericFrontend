# Rosswag IFR Reinigung

Eine Softwarelösung zur Unterstützung der Dokumentation und Protokollierung der IFR Reinigung. Die Anwendung besteht aus einer Anzeige und Protokollierung der Prozessschritte sowie die Generierung entsprechender Zeugnisse.  

## Glossar

|Fachlicher Begriff|Technischer Begriff|Beschreibung|
|---|---|---|
|IFR||   **I**nter**f**ace-**R**ing Grundkörper - Das ist ein fertig bearbeitetes final gereinigtes Bauteil, das in einen Wafer-Lithograf eingebaut wird.|
|Prüfprotokoll||Ein Dokument, welches eine Prüfung spezifischer Eigenschaften des Bauteils für den Endkunden zertifiziert. Es wird als Anhang zum Zeugnis hinzugefügt.|
|Zeugnis||Ein Dokument, welches die Eigenschaften von Bauteilen/Werkstücken z.B. gemäß geforderten Industrienormen für den Endkunden zertifiziert.|
|*Ablaufprotokoll*|Ablaufprotokoll|Die Aufzeichnung der einzelnen Prozessschritte inklusive Werte, Benutzerkommentare, Benutzerbilder eines Reinigungs- und Endkontrolllaufs|
|Bauteil|   |Der Gegenstand, welcher gerade gereinigt und endkontrolliert wird. Es wird auch den Brgriff *Werkstück* synonym genutzt|
|Werkstück|   |siehe *Bauteil*|
|Arbeitskarte| |Auf der Arbeitskarte findet man alle Produktionsschritte für die Herstellung eines Bauteils. Hier findet man auch die *Auftragsnummer* (incl. Positionsnummer) als Zahl und Barcode|
|Auftrag|Auftrag|Im Auftrag steht der Kunde, für den das *Bauteil* gebaut wird und die genaue Spezifikation des *Bauteils*. Ein Auftrag kann mehrere Positionen behinhalten. Eine Position bezeichnet dann das *Bauteil* mit Spezifikation und Stückzahl|
|Auftragsnummer| |Die Auftagsnummer bezeichnet eindeutig den *Auftrag* und ggf. die Position. Die Auftragsnummer ist so aufgebaut: YYNUMMER-POS. z.B. 210346-01 bedeute Position 2 im Auftrag 210346 und man weiß, er ist aus dem Jahr 21|
|Reinigungslauf| |Prozessdurchlauf zur Reinigung des Bauteils |
|Inspektionslauf||Prozessdurchlauf zur Kontrolle der erfolgreichen Reinigung|
|Prozessbereich|Protokollebene 1|oberste Gliederungsebene einer Prozessdokumentation (Manuelle Reinigung, Automatische Reinigung, Trockung, Endkontrolle, Verpackung)|
|Abschnitt|Protokollebene 2|nächste Gliederungsebene einer Prozessdokumentation. Hier wird das Bauteil in räumliche Abschnitte unterteilt|
|Merkmal||Unterste Protokollebene mit den konkreten geometrischen/physischen Merkmalen des Bauteils, die nach Prozessvorgabe bearbeitet werden (Flächen, Bohrungen)|
|Abweichung||Vom Benutzer in Form von Text und/oder Bild zu dokumentierende Hinweise, Abweichungen zum Merkmal|
|Endabnahmeprotokoll IFR| |Protokoll (.pdf) welches durch diese Softwarelösung erstellt wird. Anhang zum Zeugnis.|
|AuftragsdatenService|Service|Stellt Auftragsdaten zur Verfügung.|
|EndabnahmeprotokollService|Service|Service der das Endabnahmeprotokoll (.pdf) erstellt.|
|EndkontrolleService|Service|Service der die Endkontrolle-Prozessdokumentation zur Verfügung stellt.|
|IFR Endkontrolle Dokumentation|App|Die App zur Unterstützung der Dokumentation.|
|Prüfer| |Mitarbeiter die die Endkontrolle durchführen|


## Guidelines

Bitte immer die Development Guidlines https://github.com/bluehands/development-guidelines bei der Entwicklung beachten.

## Download der letzten Version

<table>
<tr><th colspan="2">Pipeline Link</th></tr>
<tr><td><b>[Deliverables]</b> Executables Bundle</td><td><a target=_blank href="...">Pipeline runs</a></td></tr>
</table>

## Projektstruktur

Ein Projekt besteht aus mehr als nur die Quellen. Alle verschiedene Artefakte sollen ihren Platz finden.

* 01 Ideas & Concepts
* 02 Design
  * Code & Architecture
  * UI
* 03 Code
  * Prototypes (Kleine Projekte, um etwas auszuprobieren)
  * Source 
  * Tools (Projekte, um die Quellen zu bauen)
* 04 Review
  * Code
  * Design
* 05 Test
  * Integration Testing
  * Unit Testing
* 06 Documentation
  * Legal & Licences (U.a. alles was mit den Lizenzen der verwendeten Bibliotheken zu tun hat)
  * Technical Documentation
  * User Documentation 
* 07 Sample Data
* 10 Project Management
  * Meetings

## Pipelines

Latest Pipeline builds

|Pipeline|Status|
|---|---|
|Rosswag IFR AuftragsdatenService|<img src="https://bluehands.visualstudio.com/Rosswag%20IFR%20Reinigung/_apis/build/status/Rosswag%20IFR%20AuftragsdatenService" />|
