import { Route } from 'react-router-dom'

import Ziele from './components/Documentation/docs/Ziele'
import ZieleHerkuenfte from './components/Documentation/docs/ZieleHerkuenfte'
import Herkuenfte from './components/Documentation/docs/Herkuenfte'
import TechnischeVoraussetzungen from './components/Documentation/docs/TechnischeVoraussetzungen'
import ZeitachseFuerArten from './components/Documentation/docs/ZeitachseFuerArten'
import ZeitachseFuerKulturen from './components/Documentation/docs/ZeitachseFuerKulturen'
import Sammlungen from './components/Documentation/docs/Sammlungen'
import Kulturen from './components/Documentation/docs/Kulturen'
import Zaehlungen from './components/Documentation/docs/Zaehlungen'
import Teilkulturen from './components/Documentation/docs/Teilkulturen'
import Lieferungen from './components/Documentation/docs/Lieferungen'
import SammelLieferungen from './components/Documentation/docs/SammelLieferungen'
import Events from './components/Documentation/docs/Events'
import FelderBlenden from './components/Documentation/docs/FelderBlenden'
import OrdnerBlenden from './components/Documentation/docs/OrdnerBlenden'
import Planen from './components/Documentation/docs/Planen'
import GenetischeVielfalt from './components/Documentation/docs/GenetischeVielfalt'

const DocRoutes = () => (
  <>
    <Route path="ziele" element={<Ziele />} />
    <Route path="ziele/herkuenfte" element={<ZieleHerkuenfte />} />
    <Route
      path="technische-voraussetzungen"
      element={<TechnischeVoraussetzungen />}
    />
    <Route path="zeitachse-art" element={<ZeitachseFuerArten />} />
    <Route path="zeitachse-kultur" element={<ZeitachseFuerKulturen />} />
    <Route path="herkuenfte" element={<Herkuenfte />} />
    <Route path="sammlungen" element={<Sammlungen />} />
    <Route path="kulturen" element={<Kulturen />} />
    <Route path="zaehlungen" element={<Zaehlungen />} />
    <Route path="teilkulturen" element={<Teilkulturen />} />
    <Route path="lieferungen" element={<Lieferungen />} />
    <Route path="sammel-lieferungen" element={<SammelLieferungen />} />
    <Route path="events" element={<Events />} />
    <Route path="felder-blenden" element={<FelderBlenden />} />
    <Route path="ordner-blenden" element={<OrdnerBlenden />} />
    <Route path="planen" element={<Planen />} />
    <Route path="genetische-vielfalt" element={<GenetischeVielfalt />} />
  </>
)

export default DocRoutes