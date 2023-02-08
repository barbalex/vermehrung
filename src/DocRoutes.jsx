import { Route } from 'react-router-dom'

import Ziele from './components/Documentation/docs/Ziele'
import Herkuenfte from './components/Documentation/docs/Herkuenfte'
import TechnischeVoraussetzungen from './components/Documentation/docs/TechnischeVoraussetzungen'

const DocRoutes = () => (
  <>
    <Route path="ziele" element={<Ziele />} />
    <Route path="ziele/herkuenfte" element={<Herkuenfte />} />
    <Route
      path="technische-voraussetzungen"
      element={<TechnischeVoraussetzungen />}
    />
  </>
)

export default DocRoutes
