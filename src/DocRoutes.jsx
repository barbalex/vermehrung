import { Route } from 'react-router-dom'

import Ziele from './components/Documentation/docs/Ziele'

const DocRoutes = () => (
  <>
    <Route path="ziele" element={<Ziele />} />
  </>
)

export default DocRoutes
