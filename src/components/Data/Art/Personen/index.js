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

import { StoreContext } from '../../../../models/reactUtils'
import Person from './Person'
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

const ArtPersonen = ({ artId }) => {
  const store = useContext(StoreContext)
  const { upsertAvModel, deleteAvModel, avsSorted, personsSorted } = store
  const [open, setOpen] = useState(false)

  const [errors, setErrors] = useState({})
  useEffect(() => setErrors({}), [artId])

  const onClickToggle = useCallback(
    (e) => {
      e.stopPropagation()
      setOpen(!open)
    },
    [open],
  )

  const avs = avsSorted.filter((a) => a.art_id === artId)
  const avPersonIds = avs.map((v) => v.person_id)

  const personWerte = useMemo(
    () =>
      personsSorted
        .filter((a) => !avPersonIds.includes(a.id))
        .map((el) => ({
          value: el.id,
          label: el?.name ?? '(kein Name)',
        })),
    [personsSorted, avPersonIds],
  )

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      const value = ifIsNumericAsNumber(event.target.value)
      const newObject = { id: uuidv1(), person_id: value, art_id: artId }
      upsertAvModel(newObject)
      try {
        await store.mutateInsert_av_one({
          object: newObject,
          on_conflict: {
            constraint: 'av_pkey',
            update_columns: ['id'],
          },
        })
      } catch (error) {
        console.log({ error })
        deleteAvModel(newObject)
        return setErrors({ [field]: error.message })
      }
      setErrors({})
    },
    [artId, deleteAvModel, store, upsertAvModel],
  )

  return (
    <ErrorBoundary>
      <TitleRow
        onClick={onClickToggle}
        title={open ? 'schliessen' : 'öffnen'}
        data-open={open}
      >
        <Title>{`Mitarbeitende Personen (${avs.length})`}</Title>
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
          <Aven>
            {avs.map((av) => (
              <Person key={`${av.art_id}/${av.person_id}`} av={av} />
            ))}
          </Aven>
          {!!personWerte.length && (
            <Select
              name="person_id"
              value={''}
              field="person_id"
              label="Person hinzufügen"
              options={personWerte}
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

export default observer(ArtPersonen)
