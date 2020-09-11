import React, {
  useCallback,
  useState,
  useMemo,
  useEffect,
  useContext,
  useRef,
} from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'

import { StoreContext } from '../../../../../models/reactUtils'
import Person from './Person'
import Select from '../../../../shared/Select'
import ErrorBoundary from '../../../../shared/ErrorBoundary'

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
  ${(props) =>
    props['data-sticky'] &&
    'border-top: 1px solid rgba(0, 0, 0, 0.3);'}
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
  const { avsSorted, personsSorted, insertAvRev, errors, unsetError } = store
  const [open, setOpen] = useState(false)

  useEffect(() => unsetError('av'), [artId, unsetError])

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
          label: el?.fullname ?? '(kein Name)',
        })),
    [personsSorted, avPersonIds],
  )

  const saveToDb = useCallback(
    async (event) => {
      insertAvRev({ values: { art_id: artId, person_id: event.target.value } })
    },
    [artId, insertAvRev],
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
    <ErrorBoundary>
      <TitleRow
        onClick={onClickToggle}
        title={open ? 'schliessen' : 'öffnen'}
        data-open={open}
        ref={titleRowRef}
        data-sticky={isSticky}
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
              error={errors?.av?.person_id}
            />
          )}
        </Content>
      )}
    </ErrorBoundary>
  )
}

export default observer(ArtPersonen)
