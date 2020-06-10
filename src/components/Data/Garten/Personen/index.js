import React, {
  useCallback,
  useState,
  useMemo,
  useEffect,
  useContext,
} from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import { v1 as uuidv1 } from 'uuid'

import { StoreContext, useQuery } from '../../../../models/reactUtils'
import Person from './Person'
import query from './query'
import Select from '../../../shared/Select'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const TitleRow = styled.div`
  background-color: rgba(237, 230, 244, 1);
  flex-shrink: 0;
  display: flex;
  height: 48px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  padding: 0 10px;
  cursor: pointer;
  user-select: none;
  ${(props) => props['data-open'] && 'position: sticky;'}
  top: -10px;
  z-index: 1;
  ${(props) => !props['data-open'] && 'margin-bottom: 10px;'}
  &:first-of-type {
    margin-top: -10px;
  }
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const Content = styled.div`
  padding-bottom: 10px;
`
const Aven = styled.div`
  padding-bottom: 8px;
`

const GartenPersonen = ({ gartenId }) => {
  const store = useContext(StoreContext)
  const { upsertGvModel, deleteGvModel, gvsSorted, personsSorted } = store
  const [open, setOpen] = useState(false)

  const [errors, setErrors] = useState({})
  useEffect(() => setErrors({}), [gartenId])

  const onClickToggle = useCallback(
    (e) => {
      e.stopPropagation()
      setOpen(!open)
    },
    [open],
  )

  const { error, loading, query: gvQuery } = useQuery(query, {
    variables: { gartenId },
  })
  const gvs = gvsSorted.filter((a) => a.garten_id === gartenId)
  const gvPersonIds = gvs.map((v) => v.person_id)

  const personWerte = useMemo(
    () =>
      personsSorted
        .filter((a) => !gvPersonIds.includes(a.id))
        .map((el) => ({
          value: el.id,
          label: el?.name || '(kein Name)',
        })),
    [personsSorted, gvPersonIds],
  )

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      const value = ifIsNumericAsNumber(event.target.value)
      const newObject = { id: uuidv1(), person_id: value, garten_id: gartenId }
      upsertGvModel(newObject)
      try {
        await store.mutateInsert_gv_one({
          object: newObject,
          on_conflict: {
            constraint: 'gv_pkey',
            update_columns: ['id'],
          },
        })
      } catch (error) {
        console.log({ error })
        deleteGvModel(newObject)
        return setErrors({ [field]: error.message })
      }
      gvQuery.refetch()
      setErrors({})
    },
    [gartenId, gvQuery, deleteGvModel, store, upsertGvModel],
  )

  return (
    <ErrorBoundary>
      <TitleRow
        onClick={onClickToggle}
        title={open ? 'schliessen' : 'öffnen'}
        data-open={open}
      >
        <Title>{`Mitarbeitende Personen (${
          loading ? '...' : gvs.length
        })`}</Title>
        <div>
          <IconButton
            aria-label={open ? 'schliessen' : 'öffnen'}
            title={open ? 'schliessen' : 'öffnen'}
            onClick={onClickToggle}
          >
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </IconButton>
        </div>
      </TitleRow>
      {open && (
        <Content>
          {loading && !gvs.length ? (
            <Aven>Lade Daten...</Aven>
          ) : error ? (
            <Aven>{`Fehler: ${error.message}`}</Aven>
          ) : (
            <Aven>
              {gvs.map((gv) => (
                <Person key={`${gv.garten_id}/${gv.person_id}`} gv={gv} />
              ))}
            </Aven>
          )}
          {!!personWerte.length && (
            <Select
              name="person_id"
              value={''}
              field="person_id"
              label="Person hinzufügen"
              options={personWerte}
              loading={loading}
              saveToDb={saveToDb}
              isClearable={false}
              error={errors.person_id}
            />
          )}
        </Content>
      )}
    </ErrorBoundary>
  )
}

export default observer(GartenPersonen)
