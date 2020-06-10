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
import Art from './Art'
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
const AvArten = styled.div`
  padding-bottom: 8px;
`

const PersonArten = ({ personId }) => {
  const store = useContext(StoreContext)
  const { upsertAvArtModel, deleteAvArtModel, avArtsSorted, artsSorted } = store
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

  const { error, loading, query: avArtQuery } = useQuery(query, {
    variables: { personId },
  })
  const avArten = avArtsSorted.filter((a) => a.person_id === personId)

  const artWerte = useMemo(
    () =>
      artsSorted
        .filter((a) => !a?.av_arts?.id)
        .map((el) => ({
          value: el.id,
          label: el?.art_ae_art?.name ?? '(kein Artname)',
        })),
    [artsSorted],
  )

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      const value = ifIsNumericAsNumber(event.target.value)
      const newObject = { id: uuidv1(), art_id: value, person_id: personId }
      upsertAvArtModel(newObject)
      try {
        await store.mutateInsert_av_art_one({
          object: newObject,
          on_conflict: {
            constraint: 'av_art_pkey',
            update_columns: ['id'],
          },
        })
      } catch (error) {
        console.log({ error })
        deleteAvArtModel(newObject)
        return setErrors({ [field]: error.message })
      }
      avArtQuery.refetch()
      setErrors({})
    },
    [avArtQuery, deleteAvArtModel, personId, store, upsertAvArtModel],
  )

  return (
    <ErrorBoundary>
      <TitleRow
        onClick={onClickToggle}
        title={open ? 'schliessen' : 'öffnen'}
        data-open={open}
      >
        <Title>{`Arten (${loading ? '...' : avArten.length})`}</Title>
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
          {loading && !avArten.length ? (
            <AvArten>Lade Daten...</AvArten>
          ) : error ? (
            <AvArten>{`Fehler: ${error.message}`}</AvArten>
          ) : (
            <AvArten>
              {avArten.map((av) => (
                <Art key={`${av.person_id}/${av.art_id}`} av={av} />
              ))}
            </AvArten>
          )}
          {!!artWerte.length && (
            <Select
              name="art_id"
              value={''}
              field="art_id"
              label="Art hinzufügen"
              options={artWerte}
              loading={loading}
              saveToDb={saveToDb}
              isClearable={false}
              error={errors.art_id}
            />
          )}
        </Content>
      )}
    </ErrorBoundary>
  )
}

export default observer(PersonArten)
