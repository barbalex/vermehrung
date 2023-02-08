import { Route } from 'react-router-dom'

import Ziele from './components/Documentation/docs/Ziele'
import ZieleHerkuenfte from './components/Documentation/docs/ZieleHerkuenfte'
import Herkuenfte from './components/Documentation/docs/Herkuenfte'
import TechnischeVoraussetzungen from './components/Documentation/docs/TechnischeVoraussetzungen'
import ZeitachseFuerArten from './components/Documentation/docs/ZeitachseFuerArten'

const DocRoutes = () => (
  <>
    <Route path="ziele" element={<Ziele />} />
    <Route path="ziele/herkuenfte" element={<ZieleHerkuenfte />} />
    <Route
      path="technische-voraussetzungen"
      element={<TechnischeVoraussetzungen />}
    />
    <Route path="zeitachse-art" element={<ZeitachseFuerArten />} />
    <Route path="herkuenfte" element={<Herkuenfte />} />
  </>
)

export default DocRoutes
