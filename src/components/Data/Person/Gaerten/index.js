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
import Garten from './Garten'
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
const Gvs = styled.div`
  padding-bottom: 8px;
`

const PersonArten = ({ personId }) => {
  const store = useContext(StoreContext)
  const { upsertAvModel, deleteAvModel, gvsSorted, gartensSorted } = store
  const [open, setOpen] = useState(false)

  const [errors, setErrors] = useState({})
  useEffect(() => setErrors({}), [personId])

  const onClickToggle = useCallback(
    (e) => {
      e.stopPropagation()
      setOpen(!open)
    },
    [open],
  )

  const { error, loading, query: gvQuery } = useQuery(query, {
    variables: { personId },
  })
  const gvs = gvsSorted.filter((a) => a.person_id === personId)
  const gvArtIds = gvs.map((v) => v.garten_id)

  const gartenWerte = useMemo(
    () =>
      gartensSorted
        .filter((a) => !gvArtIds.includes(a.id))
        .map((el) => ({
          value: el.id,
          label: el?.name ?? `(${el?.person?.name})`,
        })),
    [gartensSorted, gvArtIds],
  )

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      const value = ifIsNumericAsNumber(event.target.value)
      const newObject = { id: uuidv1(), garten_id: value, person_id: personId }
      upsertAvModel(newObject)
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
        deleteAvModel(newObject)
        return setErrors({ [field]: error.message })
      }
      gvQuery.refetch()
      setErrors({})
    },
    [gvQuery, deleteAvModel, personId, store, upsertAvModel],
  )

  return (
    <ErrorBoundary>
      <TitleRow
        onClick={onClickToggle}
        title={open ? 'schliessen' : 'öffnen'}
        data-open={open}
      >
        <Title>{`Mitarbeitend bei ${
          loading ? '...' : gvs.length
        } Gärten`}</Title>
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
            <Gvs>Lade Daten...</Gvs>
          ) : error ? (
            <Gvs>{`Fehler: ${error.message}`}</Gvs>
          ) : (
            <Gvs>
              {gvs.map((gv) => (
                <Garten key={`${gv.person_id}/${gv.garten_id}`} gv={gv} />
              ))}
            </Gvs>
          )}
          {!!gartenWerte.length && (
            <Select
              name="garten_id"
              value={''}
              field="garten_id"
              label="Garten hinzufügen"
              options={gartenWerte}
              loading={loading}
              saveToDb={saveToDb}
              isClearable={false}
              error={errors.garten_id}
            />
          )}
        </Content>
      )}
    </ErrorBoundary>
  )
}

export default observer(PersonArten)
