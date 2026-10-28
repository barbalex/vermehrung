import { lazy } from 'react'
import { useAtomValue } from 'jotai'
import { isId } from '../../utils/isId.ts'

const Art = lazy(async () => ({
  default: (await import('./Art/index.tsx')).Art,
}))
const Arten = lazy(async () => ({
  default: (await import('./Arten/index.tsx')).Arten,
}))
const Bedarf = lazy(async () => ({
  default: (await import('./Bedarf/index.tsx')).Bedarf,
}))
const Bedarfe = lazy(async () => ({
  default: (await import('./Bedarfe/index.tsx')).Bedarfe,
}))
const Event = lazy(async () => ({
  default: (await import('./Event/index.tsx')).Event,
}))
const Events = lazy(async () => ({
  default: (await import('./Events/index.tsx')).Events,
}))
const Herkunft = lazy(async () => ({
  default: (await import('./Herkunft/index.tsx')).Herkunft,
}))
const Herkuenfte = lazy(async () => ({
  default: (await import('./Herkuenfte/index.tsx')).Herkuenfte,
}))
const Sammlung = lazy(async () => ({
  default: (await import('./Sammlung/index.tsx')).Sammlung,
}))
const Sammlungen = lazy(async () => ({
  default: (await import('./Sammlungen/index.tsx')).Sammlungen,
}))
const Garten = lazy(async () => ({
  default: (await import('./Garten/index.tsx')).Garten,
}))
const Gaerten = lazy(async () => ({
  default: (await import('./Gaerten/index.tsx')).Gaerten,
}))
const Kultur = lazy(async () => ({
  default: (await import('./Kultur/index.tsx')).Kultur,
}))
const Kulturen = lazy(async () => ({
  default: (await import('./Kulturen/index.tsx')).Kulturen,
}))
const Lieferung = lazy(async () => ({
  default: (await import('./Lieferung/index.tsx')).LieferungContainer,
}))
const Lieferungen = lazy(async () => ({
  default: (await import('./Lieferungen/index.tsx')).Lieferungen,
}))
const SammelLieferung = lazy(async () => ({
  default: (await import('./SammelLieferung/index.tsx')).SammelLieferung,
}))
const SammelLieferungen = lazy(async () => ({
  default: (await import('./SammelLieferungen/index.tsx')).SammelLieferungen,
}))
const Person = lazy(async () => ({
  default: (await import('./Person/index.tsx')).Person,
}))
const Personen = lazy(async () => ({
  default: (await import('./Personen/index.tsx')).Personen,
}))
const Zaehlung = lazy(async () => ({
  default: (await import('./Zaehlung/index.tsx')).Zaehlung,
}))
const Zaehlungen = lazy(async () => ({
  default: (await import('./Zaehlungen/index.tsx')).Zaehlungen,
}))
const Teilkultur = lazy(async () => ({
  default: (await import('./Teilkultur/index.tsx')).Teilkultur,
}))
const Teilkulturen = lazy(async () => ({
  default: (await import('./Teilkulturen/index.tsx')).Teilkulturen,
}))
const Root = lazy(async () => ({
  default: (await import('./Root/index.tsx')).Root,
}))
const FourOhFour = lazy(async () => ({
  default: (await import('../../routes/404.tsx')).FourOhFour,
}))
import { activeFormAtom, activeNodeArrayAtom } from '../../store/index.ts'

export const Data = () => {
  const activeForm = useAtomValue(activeFormAtom)
  const activeNodeArray = useAtomValue(activeNodeArrayAtom)

  const id = activeNodeArray.filter((e) => isId(e)).at(-1)

  switch (activeForm) {
    case 'root':
      return <Root />
    case 'art':
      return <Art id={id} />
    case 'arten':
      return <Arten />
    case 'bedarf':
      return <Bedarf id={id} />
    case 'bedarfe':
      return <Bedarfe />
    case 'event':
      return <Event id={id} />
    case 'events':
      return <Events />
    case 'garten':
      return <Garten id={id} />
    case 'gaerten':
      return <Gaerten />
    case 'herkunft':
      return <Herkunft id={id} />
    case 'herkuenfte':
      return <Herkuenfte />
    case 'kultur':
      return <Kultur id={id} />
    case 'kulturen':
      return <Kulturen />
    case 'sammel_lieferung':
      return <SammelLieferung id={id} />
    case 'sammelLieferungen':
      return <SammelLieferungen />
    case 'lieferung':
      return <Lieferung id={id} />
    case 'lieferungen':
      return <Lieferungen />
    case 'person':
      return <Person id={id} />
    case 'personen':
      return <Personen />
    case 'sammlung':
      return <Sammlung id={id} />
    case 'sammlungen':
      return <Sammlungen />
    case 'teilkultur':
      return <Teilkultur id={id} />
    case 'teilkulturen':
      return <Teilkulturen />
    case 'zaehlung':
      return <Zaehlung id={id} />
    case 'zaehlungen':
      return <Zaehlungen />
    default:
      return <FourOhFour />
  }
}
