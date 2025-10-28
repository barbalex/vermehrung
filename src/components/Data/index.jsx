import { useContext, lazy } from 'react'
import { observer } from 'mobx-react-lite'
import isUuid from 'is-uuid'

const Art = lazy(async () => ({
  default: (await import('./Art/index.jsx')).Art,
}))
const Arten = lazy(async () => ({
  default: (await import('./Arten/index.jsx')).Arten,
}))
const Event = lazy(async () => ({
  default: (await import('./Event/index.jsx')).Event,
}))
const Events = lazy(async () => ({
  default: (await import('./Events/index.jsx')).Events,
}))
const Herkunft = lazy(async () => ({
  default: (await import('./Herkunft/index.jsx')).Herkunft,
}))
const Herkuenfte = lazy(async () => ({
  default: (await import('./Herkuenfte/index.jsx')).Herkuenfte,
}))
const Sammlung = lazy(async () => ({
  default: (await import('./Sammlung/index.jsx')).Sammlung,
}))
const Sammlungen = lazy(async () => ({
  default: (await import('./Sammlungen/index.jsx')).Sammlungen,
}))
const Garten = lazy(async () => ({
  default: (await import('./Garten/index.jsx')).Garten,
}))
const Gaerten = lazy(async () => ({
  default: (await import('./Gaerten/index.jsx')).Gaerten,
}))
const Kultur = lazy(async () => ({
  default: (await import('./Kultur/index.jsx')).Kultur,
}))
const Kulturen = lazy(async () => ({
  default: (await import('./Kulturen/index.jsx')).Kulturen,
}))
const Lieferung = lazy(async () => ({
  default: (await import('./Lieferung/index.jsx')).LieferungContainer,
}))
const Lieferungen = lazy(async () => ({
  default: (await import('./Lieferungen/index.jsx')).Lieferungen,
}))
const SammelLieferung = lazy(async () => ({
  default: (await import('./SammelLieferung/index.jsx')).SammelLieferung,
}))
const SammelLieferungen = lazy(async () => ({
  default: (await import('./SammelLieferungen/index.jsx')).SammelLieferungen,
}))
const Person = lazy(async () => ({
  default: (await import('./Person/index.jsx')).Person,
}))
const Personen = lazy(async () => ({
  default: (await import('./Personen/index.jsx')).Personen,
}))
const Zaehlung = lazy(async () => ({
  default: (await import('./Zaehlung/index.jsx')).Zaehlung,
}))
const Zaehlungen = lazy(async () => ({
  default: (await import('./Zaehlungen/index.jsx')).Zaehlungen,
}))
const Teilkultur = lazy(async () => ({
  default: (await import('./Teilkultur/index.jsx')).Teilkultur,
}))
const Teilkulturen = lazy(async () => ({
  default: (await import('./Teilkulturen/index.jsx')).Teilkulturen,
}))
const Root = lazy(async () => ({
  default: (await import('./Root/index.jsx')).Root,
}))
import { MobxStoreContext } from '../../mobxStoreContext.js'

export const Data = observer(() => {
  const store = useContext(MobxStoreContext)
  const { activeForm } = store
  const { activeNodeArray } = store.tree

  const id = activeNodeArray.filter((e) => isUuid.v1(e)).at(-1)

  switch (activeForm) {
    case 'root':
      return <Root />
    case 'art':
      return <Art id={id} />
    case 'arten':
      return <Arten />
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
      return null
  }
})
