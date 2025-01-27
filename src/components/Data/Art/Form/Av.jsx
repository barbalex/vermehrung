import { memo, useEffect, useState } from 'react'

import { TextFieldNonUpdatable } from '../../../shared/TextFieldNonUpdatable.jsx'

export const Av = memo(({ row }) => {
  const [apfloraAv, setApfloraAv] = useState(null)
  useEffect(() => {
    if (!row) return
    if (apfloraAv) return
    row.av.then((avArray) => setApfloraAv(avArray?.[0]))
  }, [row])

  console.log('Av', { row, apfloraAv })

  if (!apfloraAv) return null

  return (
    <TextFieldNonUpdatable
      key={`${row.id}av`}
      label="Artverantwortlich in AP Flora"
      schrinkLabel={true}
      value={apfloraAv.av}
      message="Dieser Wert ist nicht veränderbar. Er stammt aus AP Flora. Falls veraltet, müssen die Daten aus von Alexander Gabriel neu importiert werden"
    />
  )
})
