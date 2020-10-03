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

import { StoreContext } from '../../../../../models/reactUtils'
import Select from '../../../../shared/Select'
import exists from '../../../../../utils/exists'
import kulturSort from '../../../../../utils/kulturSort'
import sammlungLabelFromSammlung from '../sammlungLabelFromSammlung'
import kulturLabelFromKultur from '../../../../../utils/kulturLabelFromKultur'

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

const LieferungVon = ({ showFilter, row, saveToDb, ifNeeded }) => {
  const store = useContext(StoreContext)

  const { errors, herkunftsSorted, sammlungsSorted } = store
  const { activeNodeArray } = store.tree
  // BEWARE: need to include inactive kulturs, persons
  const kultursSorted = [...store.kulturs.values()].sort((a, b) =>
    kulturSort({ a, b, store }),
  )

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

  const vonKulturWerteData = kultursSorted
    // show only kulturen of art_id
    .filter((k) => {
      if (row?.art_id) return k.art_id === row.art_id
      return true
    })
    // show only kulturen with same herkunft
    .filter((k) => {
      if (herkunft?.id) return k?.herkunft_id === herkunft.id
      return true
    })
    // shall not be delivered to same kultur it came from
    .filter((k) => {
      if (row?.nach_kultur_id && row?.von_kultur_id !== row?.nach_kultur_id) {
        return k.id !== row.nach_kultur_id
      }
      return true
    })
  const vonKulturWerte = useMemo(
    () =>
      vonKulturWerteData.map((el) => ({
        value: el.id,
        label: kulturLabelFromKultur({ kultur: el, store }),
      })),
    [store, vonKulturWerteData],
  )

  const sammlungWerte = useMemo(
    () =>
      sammlungsSorted
        .filter((s) => {
          if (row.art_id) return s.art_id === row.art_id
          return true
        })
        .map((el) => ({
          value: el.id,
          label: sammlungLabelFromSammlung({ sammlung: el, store }),
        })),
    [row.art_id, sammlungsSorted, store],
  )

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
        <Title>von</Title>
      </TitleRow>
      {ifNeeded('von_sammlung_id') && (
        <Select
          key={`${row.id}${row.von_sammlung_id}von_sammlung_id`}
          name="von_sammlung_id"
          value={row.von_sammlung_id}
          field="von_sammlung_id"
          label={`Sammlung${
            exists(row.art_id) ? ' (nur solche derselben Art)' : ''
          }`}
          options={sammlungWerte}
          saveToDb={saveToDb}
          error={errors?.lieferung?.von_sammlung_id}
        />
      )}
      {ifNeeded('von_kultur_id') && (
        <Select
          key={`${row.id}${row.von_kultur_id}von_kultur_id`}
          name="von_kultur_id"
          value={row.von_kultur_id}
          field="von_kultur_id"
          label={`Kultur${
            exists(row.art_id) ? ' (nur solche derselben Art)' : ''
          }`}
          options={vonKulturWerte}
          saveToDb={saveToDb}
          error={errors?.lieferung?.von_kultur_id}
        />
      )}
    </>
  )
}

export default observer(LieferungVon)
