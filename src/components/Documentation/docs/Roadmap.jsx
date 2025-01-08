import { Suspense } from 'react'

import { DokuDate } from '../index.jsx'

export const Roadmap = () => (
  <Suspense fallback={null}>
    <h1>Roadmap</h1>
    <DokuDate>04.07.2020</DokuDate>
    <p>
      vermehrung.ch ist (noch) in Entwicklung. Ziel ist, dass ab Juli 2020 damit
      gearbeitet wird.
      <br />
    </p>
    <p>Symbole:</p>
    <ul>
      <li>✅: erledigt</li>
      <li>☑️: teilweise erledigt</li>
      <li>◻️: todo</li>
    </ul>
    <p>Die wichtigsten Schritte sind:</p>
    <ul>
      <li>✅ Projekt mit Topos vorbesprochen</li>
      <li>✅ Datenstruktur entworfen</li>
      <li>✅ Datenbank gebaut</li>
      <li>✅ GraphQL-Server gebaut</li>
      <li>✅ Datenbank und GraphQL-Server in Betrieb</li>
      <li>✅ App inklusive Entwicklungs-Umgebung initiiert</li>
      <li>✅ Navigation entworfen</li>
      <li>✅ Navigations-Baum gebaut</li>
      <li>✅ Daten-Laden optimiert</li>
      <li>✅ Formulare gebaut</li>
      <li>✅ Filter gebaut</li>
      <li>✅ Volltext-Suche gebaut</li>
      <li>✅ Authentifikation und Authorisierung gebaut</li>
      <li>✅ Rollen werden durchgesetzt</li>
      <li>✅ Navigations-Baum ist interaktiv (Kontext-Menüs)</li>
      <li>✅ Benutzer können verwaltet werden</li>
      <li>✅ Grundlegende Funktionalitäten mit Topos bereinigt</li>
      <li>✅ Auftrag liegt vor</li>
      <li>✅ Funktionalitäten gemäss erster Bereinigung angepasst</li>
      <li>✅ Bilder und Dateien können erfasst werden</li>
      <li>✅ Teil-Kulturen können benutzt werden</li>
      <li>✅ Teil-Kulturen sind opt-in</li>
      <li>
        ✅ Nicht obligatorische Felder können ein- und ausgeblendet werden
      </li>
      <li>
        ✅ Nicht aktive Personen, Gärten und Kulturen können ein-/ausgeblendet
        werden
      </li>
      <li>✅ PostGIS wird für Koordinaten benutzt</li>
      <li>
        ✅ Zeit-Achsen visualisieren die wichtigsten Vorgänge und Kennzahlen
      </li>
      <li>✅ Lieferungen können als Sammel-Lieferungen erfasst werden</li>
      <li>✅ Es können Lieferscheine erfasst werden</li>
      <li>✅ Lieferscheine können gedruckt werden</li>
      <li>✅ Qualitätskontrollen sind gebaut</li>
      <li>✅ Vermehrung ist für BenutzerInnen dokumentiert</li>
      <li>✅ Daten können exportiert werden</li>
      <li>
        ✅ Gärtner, Artverantwortliche und Manager haben passende Rechte und
        Funktionalitäten
      </li>
      <li>✅ Funktionalitäten mit Topos für v1 bereinigt</li>
      <li>✅ Es kann ohne Netzwerk-Verbindung gearbeitet werden</li>
      <li>
        ✅ Die Benutzeroberfläche ist für Handys, Tabletts und PC&#39;s geeignet
      </li>
      <li>
        ✅ Vorhandene Daten sind importiert:
        <figure>
          <table>
            <thead>
              <tr>
                <th>Daten</th>
                <th>Anzahl</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>person</td>
                <td>148</td>
              </tr>
              <tr>
                <td>garten</td>
                <td>114</td>
              </tr>
              <tr>
                <td>art</td>
                <td>126</td>
              </tr>
              <tr>
                <td>sammlung</td>
                <td>474</td>
              </tr>
              <tr>
                <td>herkunft</td>
                <td>285</td>
              </tr>
              <tr>
                <td>kultur</td>
                <td>691</td>
              </tr>
              <tr>
                <td>teilkultur</td>
                <td>148</td>
              </tr>
              <tr>
                <td>lieferung</td>
                <td>1&#39;820</td>
              </tr>
              <tr>
                <td>zaehlung</td>
                <td>2&#39;324</td>
              </tr>
              <tr>
                <td>teilzaehlung</td>
                <td>2&#39;324</td>
              </tr>
              <tr>
                <td>event</td>
                <td>889</td>
              </tr>
              <tr>
                <td>total</td>
                <td>9&#39;343</td>
              </tr>
            </tbody>
          </table>
        </figure>
      </li>
      <li>✅ Produktive Version 1 ist live (geplant: Juli 2020)</li>
      <li>
        ✅ Änderungen an Datensätzen können angezeigt und rückgängig gemacht
        werden. Beliebig weit zurück
      </li>
    </ul>
  </Suspense>
)
