import { lazy, type ReactNode } from 'react'
import { useAtomValue } from 'jotai'
import { isId } from '../../utils/isId.ts'
import { ObjectList } from './ObjectList.tsx'
import { breadcrumbsEnabled } from '../../utils/breadcrumbsEnabled.ts'
import { activeFormAtom, activeNodeArrayAtom, activeObjectNameAtom } from '../../store/index.ts'

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

// with breadcrumbs enabled, an object url first renders the object's list
// (the object itself + its child tables, replacing the removed form header
// down-navigation). the object's form renders when its name is in the url
// (.../{id}/{Name}). objects without child tables render their form directly
const WithObjectList = ({
  table,
  id,
  children,
}: {
  table: string
  id?: string
  children: ReactNode
}) => {
  const objectName = useAtomValue(activeObjectNameAtom)
  if (breadcrumbsEnabled && !objectName) {
    return <ObjectList table={table} id={id} />
  }
  return children
}

export const Data = () => {
  const activeForm = useAtomValue(activeFormAtom)
  const activeNodeArray = useAtomValue(activeNodeArrayAtom)

  const id = activeNodeArray.filter((e) => isId(e)).at(-1)

  switch (activeForm as string | null) {
    case 'root':
      return <Root />
    case 'art':
      return (
        <WithObjectList table="art" id={id}>
          <Art id={id} />
        </WithObjectList>
      )
    case 'arten':
      return <Arten />
    case 'bedarf':
      return <Bedarf id={id} />
    case 'bedarfe':
      return <Bedarfe />
    case 'garten':
      return (
        <WithObjectList table="garten" id={id}>
          <Garten id={id} />
        </WithObjectList>
      )
    case 'gaerten':
      return <Gaerten />
    case 'herkunft':
      return (
        <WithObjectList table="herkunft" id={id}>
          <Herkunft id={id} />
        </WithObjectList>
      )
    case 'herkuenfte':
      return <Herkuenfte />
    case 'kultur':
      return (
        <WithObjectList table="kultur" id={id}>
          <Kultur id={id} />
        </WithObjectList>
      )
    case 'kulturen':
      return <Kulturen />
    case 'sammel_lieferung':
      return (
        <WithObjectList table="sammel_lieferung" id={id}>
          <SammelLieferung id={id} />
        </WithObjectList>
      )
    case 'sammelLieferungen':
      return <SammelLieferungen />
    case 'lieferung':
      return <Lieferung id={id} />
    case 'lieferungen':
      return <Lieferungen />
    case 'person':
      return (
        <WithObjectList table="person" id={id}>
          <Person id={id} />
        </WithObjectList>
      )
    case 'personen':
      return <Personen />
    case 'sammlung':
      return (
        <WithObjectList table="sammlung" id={id}>
          <Sammlung id={id} />
        </WithObjectList>
      )
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
