import { memo, useEffect, useState } from 'react'

import { TextFieldNonUpdatable } from '../../../shared/TextFieldNonUpdatable.jsx'

export const Av = memo(({ row }) => {
  const [av, setAv] = useState(null)
  useEffect(() => {
    if (!row) return
    if (av) return
    row.av.then((avArray) => setAv(avArray?.[0]))
  }, [row])

  if (!av) return null

  return (
    <TextFieldNonUpdatable
      key={`${row.id}av`}
      label="Artverantwortlich in AP Flora"
      schrinkLabel={true}
      value={av.av}
      message="Dieser Wert ist nicht veränderbar. Er stammt aus AP Flora. Falls veraltet, müssen die Daten aus von Alexander Gabriel neu importiert werden"
    />
  )
})
