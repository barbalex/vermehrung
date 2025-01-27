import { memo, useEffect, useState } from 'react'

import { TextFieldNonUpdatable } from '../../../shared/TextFieldNonUpdatable.jsx'
import { Checkbox2StatesNonUpdatable } from '../../../shared/Checkbox2StatesNonUpdatable.jsx'

export const Av = memo(({ row }) => {
  const [apfloraAv, setApfloraAv] = useState(null)
  useEffect(() => {
    if (!row) return
    if (apfloraAv) return
    row.av.then((avArray) => setApfloraAv(avArray?.[0]))
  }, [row])

  console.log('Ap', { row, apfloraAv })

  if (!apfloraAv) return null

  return (
    <Checkbox2StatesNonUpdatable
      key={`${row.id}ap`}
      label="Artverantwortlich in AP Flora"
      value={apfloraAv.ap}
      message="Dieser Wert ist nicht veränderbar. Er stammt aus AP Flora. Falls veraltet, müssen die Daten aus von Alexander Gabriel neu importiert werden"
    />
  )
})
