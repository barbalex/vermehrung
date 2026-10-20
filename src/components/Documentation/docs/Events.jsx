import { Link } from 'react-router'

import dokuStyles from '../index.module.css'

export const Events = () => (
  <>
    <h1>Events</h1>
    <p className={dokuStyles.dokuDate}>20.10.2026</p>
    <h3>Events wurden durch Bedarf ersetzt</h3>
    <p>
      Die Events wurden bis anhin ausschliesslich genutzt, um den Bedarf der
      Artverantwortlichen zu erfassen. Deshalb wurden sie durch{" "}
      <Link to="/Dokumentation/bedarf">Bedarf</Link>-Einträge ersetzt: Pro Jahr
      und Kultur wird der Bedarf in einfachen Textfeldern erfasst.
    </p>
    <p>Bestehende Events wurden in Bedarf-Einträge migriert.</p>
  </>
)
