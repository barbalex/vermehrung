import { Suspense } from 'react'

import { DokuDate } from '../index.jsx'

export const ZieleHerkuenfte = () => (
  <Suspense fallback={null}>
    <h1>Ziel 1: Herkünfte</h1>
    <DokuDate>04.10.2019</DokuDate>
    <p>
      Ziel 1 lautet: &quot;Herkünfte sind bekannt und werden innerhalb von
      Kulturen nicht vermischt.&quot;
      <br />
      <br />
    </p>
    <p>
      TODO: Wie wird das unterstützt?
      <br />
      <br />
    </p>
    <p>&nbsp;</p>
  </Suspense>
)
