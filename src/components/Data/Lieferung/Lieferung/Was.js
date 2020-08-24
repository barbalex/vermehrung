import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'

import { StoreContext } from '../../../../models/reactUtils'
import Select from '../../../shared/Select'
import TextField from '../../../shared/TextField'
import exists from '../../../../utils/exists'
import getConstants from '../../../../utils/constants'

const constants = getConstants()

const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const TitleRow = styled.div`
  background-color: ${(props) =>
    props['data-filter'] ? '#ffe0b2' : 'rgba(248, 243, 254, 1)'};
  flex-shrink: 0;
  display: flex;
  height: 40px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
  padding: 0 10px;
  position: sticky;
  ${(props) =>
    props['data-sticky'] && 'border-top: 1px solid rgba(0, 0, 0, 0.3);'}
  user-select: none;
  top: -10px;
  z-index: 1;
  &:first-of-type {
    margin-top: -10px;
  }
`
const FieldRow = styled.div`
  display: flex;
  justify-content: space-between;
  > div:not(:last-of-type) {
    padding-right: 8px;
  }
  > div > button {
    margin-top: 8px;
  }
`
const Herkunft = styled.div`
  height: 54px;
  user-select: none;
`
const HerkunftLabel = styled.div`
  color: rgb(0, 0, 0, 0.54);
  font-size: 12px;
  padding-bottom: 2px;
`

const LieferungWas = ({ showFilter, row, saveToDb, ifNeeded }) => {
  const store = useContext(StoreContext)

  const { artsSorted, errors, herkunftsSorted } = store
  const { activeNodeArray } = store.tree
  // BEWARE: need to include inactive kulturs, persons

  const urlLastName = activeNodeArray[activeNodeArray.length - 2]
  const isAnlieferung = urlLastName === 'An-Lieferungen'

  const herkunftByKultur = isAnlieferung
    ? row?.kulturByNachKulturId?.herkunft
    : row?.kulturByVonKulturId?.herkunft
  const vonSammlung = row?.sammlung //sammlungsSorted.find((s) => s.id === row.von_sammlung_id)
  const herkunftBySammlung = vonSammlung
    ? herkunftsSorted.find((s) => s.id === vonSammlung.herkunft_id)
    : null
  const herkunft = herkunftByKultur || herkunftBySammlung
  const herkunftQuelle = herkunftByKultur ? 'Kultur' : 'Sammlung'
  const herkunftValue = herkunft
    ? `${herkunft.nr || '(keine Nr)'}: ${
        herkunft?.gemeinde || '(keine Gemeinde)'
      }, ${herkunft.lokalname || '(kein Lokalname)'}`
    : ''

  const artWerte = useMemo(
    () =>
      artsSorted.map((el) => ({
        value: el.id,
        label: el?.art_ae_art?.name ?? '(kein Artname)',
      })),
    [artsSorted],
  )

  const openGenVielfaldDocs = useCallback(() => {
    const url = `${constants?.appUri}/Dokumentation/Genetische-Vielfalt`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  const titleRowRef = useRef(null)
  const [isSticky, setIsSticky] = useState(false)
  const scrollHandler = useCallback(() => {
    const { top } = titleRowRef?.current?.getBoundingClientRect()
    if (top < 112 && !isSticky) return setIsSticky(true)
    if (top > 112 && isSticky) setIsSticky(false)
  }, [isSticky])
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, true)
    return () => {
      window.removeEventListener('scroll', scrollHandler, true)
    }
  }, [scrollHandler])

  return (
    <>
      <TitleRow
        data-filter={showFilter}
        ref={titleRowRef}
        data-sticky={isSticky}
      >
        <Title>was</Title>
      </TitleRow>
      {ifNeeded('art_id') && (
        <Select
          key={`${row.id}art_id`}
          name="art_id"
          value={row.art_id}
          field="art_id"
          label="Art"
          options={artWerte}
          saveToDb={saveToDb}
          error={errors?.lieferung?.art_id}
        />
      )}
      {herkunftValue && (
        <Herkunft>
          <HerkunftLabel>{`Herkunft (aus ${herkunftQuelle})`}</HerkunftLabel>
          {herkunftValue}
        </Herkunft>
      )}
      <FieldRow>
        {ifNeeded('anzahl_pflanzen') && (
          <TextField
            key={`${row.id}anzahl_pflanzen`}
            name="anzahl_pflanzen"
            label="Anzahl Pflanzen"
            value={row.anzahl_pflanzen}
            saveToDb={saveToDb}
            error={errors?.lieferung?.anzahl_pflanzen}
            type="number"
          />
        )}
        {ifNeeded('anzahl_auspflanzbereit') && (
          <TextField
            key={`${row.id}anzahl_auspflanzbereit`}
            name="anzahl_auspflanzbereit"
            label="Anzahl auspflanzbereit"
            value={row.anzahl_auspflanzbereit}
            saveToDb={saveToDb}
            error={errors?.lieferung?.anzahl_auspflanzbereit}
            type="number"
          />
        )}
      </FieldRow>
      <FieldRow>
        {ifNeeded('gramm_samen') && (
          <TextField
            key={`${row.id}gramm_samen`}
            name="gramm_samen"
            label="Gramm Samen"
            value={row.gramm_samen}
            saveToDb={saveToDb}
            error={errors?.lieferung?.gramm_samen}
            type="number"
          />
        )}
        {ifNeeded('andere_menge') && (
          <TextField
            key={`${row.id}andere_menge`}
            name="andere_menge"
            label={`Andere Menge (z.B. "3 Zwiebeln")`}
            value={row.andere_menge}
            saveToDb={saveToDb}
            error={errors?.lieferung?.andere_menge}
            type="text"
          />
        )}
      </FieldRow>
      {ifNeeded('von_anzahl_individuen') && (
        <FieldRow>
          <TextField
            key={`${row.id}von_anzahl_individuen`}
            name="von_anzahl_individuen"
            label="von Anzahl Individuen"
            value={row.von_anzahl_individuen}
            saveToDb={saveToDb}
            error={errors?.lieferung?.von_anzahl_individuen}
            type="number"
          />
          <div>
            <IconButton
              aria-label="Anleitung öffnen"
              title="Anleitung öffnen"
              onClick={openGenVielfaldDocs}
            >
              <IoMdInformationCircleOutline />
            </IconButton>
          </div>
        </FieldRow>
      )}
    </>
  )
}

export default observer(LieferungWas)
