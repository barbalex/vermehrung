import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { Q } from '@nozbe/watermelondb'
import { first as first$ } from 'rxjs/operators'
import { combineLatest } from 'rxjs'

import StoreContext from '../../../../../storeContext'
import Select from '../../../../shared/Select'
import TextField from '../../../../shared/TextField'
import getConstants from '../../../../../utils/constants'
import artsSortedFromArts from '../../../../../utils/artsSortedFromArts'

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

const LieferungWas = ({ showFilter, row, saveToDb, ifNeeded }) => {
  const store = useContext(StoreContext)

  const { db, errors, filter } = store

  const [artWerte, setArtWerte] = useState([])
  useEffect(() => {
    const artsObservable = db
      .get('art')
      .query(
        Q.where(
          '_deleted',
          Q.oneOf(
            filter.art._deleted === false
              ? [false]
              : filter.art._deleted === true
              ? [true]
              : [true, false, null],
          ),
        ),
      )
      .observe()
    const combinedObservables = combineLatest([artsObservable])
    const subscription = combinedObservables.subscribe(async ([arts]) => {
      const artsSorted = await artsSortedFromArts(arts)
      const artWerte = await Promise.all(
        artsSorted.map(async (el) => {
          let label
          try {
            label = await el.label.pipe(first$()).toPromise()
          } catch {}

          return {
            value: el.id,
            label,
          }
        }),
      )

      setArtWerte(artWerte)
    })

    return () => subscription.unsubscribe()
  }, [db, filter.art._deleted])

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
