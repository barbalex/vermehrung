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
  </>
)

export default DocRoutes
