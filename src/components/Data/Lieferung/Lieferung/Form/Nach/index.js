import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import StoreContext from '../../../../../../storeContext'
import Select from '../../../../../shared/Select'
import Checkbox2States from '../../../../../shared/Checkbox2States'
import JesNo from '../../../../../shared/JesNo'
import exists from '../../../../../../utils/exists'
import useData from './useData'

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

const LieferungNach = ({ showFilter, row, saveToDb, ifNeeded, herkunft }) => {
  const store = useContext(StoreContext)
  const { errors, db, filter } = store

  const { nachKulturWerte } = useData({ showFilter, row, herkunft, db, filter })

  const titleRowRef = useRef(null)
  const [isSticky, setIsSticky] = useState(false)
  const scrollHandler = useCallback(() => {
    const top = titleRowRef?.current?.getBoundingClientRect()?.top
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
        <Title>nach</Title>
      </TitleRow>
      {ifNeeded('nach_kultur_id') && (
        <Select
          key={`${row.id}${row.nach_kultur_id}nach_kultur_id`}
          name="nach_kultur_id"
          value={row.nach_kultur_id}
          field="nach_kultur_id"
          label={`Kultur${
            exists(row.art_id)
              ? ` (Kulturen derselben Art und Herkunft${
                  row.von_kultur_id ? ', ohne die von-Kultur' : ''
                })`
              : ''
          }`}
          options={nachKulturWerte}
          saveToDb={saveToDb}
          error={errors?.lieferung?.nach_kultur_id}
        />
      )}
      {ifNeeded('nach_ausgepflanzt') && (
        <>
          {showFilter ? (
            <JesNo
              key={`${row.id}nach_ausgepflanzt`}
              label="ausgepflanzt"
              name="nach_ausgepflanzt"
              value={row.nach_ausgepflanzt}
              saveToDb={saveToDb}
              error={errors?.lieferung?.nach_ausgepflanzt}
            />
          ) : (
            <Checkbox2States
              key={`${row.id}nach_ausgepflanzt`}
              label="ausgepflanzt"
              name="nach_ausgepflanzt"
              value={row.nach_ausgepflanzt}
              saveToDb={saveToDb}
              error={errors?.lieferung?.nach_ausgepflanzt}
            />
          )}
        </>
      )}
    </>
  )
}

export default observer(LieferungNach)
