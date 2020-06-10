import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FormGroup from '@material-ui/core/FormGroup'
import { v1 as uuidv1 } from 'uuid'
import gql from 'graphql-tag'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Label from '../../shared/Label'
import Select from '../../shared/Select'
import {
  av as avArtFragment,
  person as personFragment,
} from '../../../utils/fragments'

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  border-bottom: thin solid #0000001c;
  width: 100%;
`
const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const DelIcon = styled(IconButton)`
  height: 40px;
  align-self: flex-end;
  svg {
    font-size: 1rem;
  }
`
const MenuTitle = styled.h3`
  padding-top: 8px;
  padding-left: 15px;
  padding-right: 16px;
  padding-bottom: 0;
  margin-bottom: 3px;
  &:focus {
    outline: none;
  }
`

const allDataQuery = gql`
  query AllDataQueryForArt($artId: uuid!) {
    av(where: { art_id: { _eq: $artId } }) {
      ...AvFields
      person {
        ...PersonFields
      }
    }
    person {
      ...PersonFields
    }
  }
  ${avArtFragment}
  ${personFragment}
`

const ArtAv = ({ refetch, artId }) => {
  const store = useContext(StoreContext)
  const {
    addNotification,
    personsSorted,
    upsertAvArtModel,
    deleteAvArtModel,
    avArtsSorted,
  } = store

  const { data, error, loading, query } = useQuery(allDataQuery, {
    variables: {
      artId,
    },
  })

  const av = avArtsSorted.find((a) => a.art_id === artId)

  const [delMenuAnchorEl, setDelMenuAnchorEl] = React.useState(null)
  const delMenuOpen = Boolean(delMenuAnchorEl)

  const onClickDelete = useCallback(async () => {
    store.deleteAvArtModel(av)
    try {
      store.mutateDelete_av_art({
        where: { id: { _eq: av.id } },
      })
    } catch (error) {
      store.insertAvArtModel(av)
      addNotification({
        message: error.message,
      })
    }
  }, [addNotification, av, store])

  const person = av?.person?.name
  const persons = personsSorted
    .filter((p) => p.user_role === 'artverantwortlich')
    .map((el) => ({
      value: el.id,
      label: el?.name ?? '(kein Name)',
    }))

  console.log('AV', { person, av })

  const saveToDb = useCallback(
    async (event) => {
      const newObject = {
        id: uuidv1(),
        art_id: artId,
        person_id: event.target.value,
      }
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

        addNotification({
          message: error.message,
        })
      }
      refetch()
    },
    [
      addNotification,
      artId,
      deleteAvArtModel,
      refetch,
      store,
      upsertAvArtModel,
    ],
  )

  if (av.person_id) {
    return (
      <ErrorBoundary>
        <Container>
          <FormGroup>
            <Label label="verantwortlich" />
            <Text>
              <div>{person}</div>
            </Text>
          </FormGroup>
          <DelIcon
            title="löschen"
            aria-label="löschen"
            aria-owns={delMenuOpen ? 'delMenu' : undefined}
            aria-haspopup="true"
            onClick={(event) => setDelMenuAnchorEl(event.currentTarget)}
          >
            <FaTimes />
          </DelIcon>
          <Menu
            id="delMenu"
            anchorEl={delMenuAnchorEl}
            open={delMenuOpen}
            onClose={() => setDelMenuAnchorEl(null)}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: 120,
              },
            }}
          >
            <MenuTitle>löschen?</MenuTitle>
            <MenuItem onClick={onClickDelete}>ja</MenuItem>
            <MenuItem onClick={() => setDelMenuAnchorEl(null)}>nein</MenuItem>
          </Menu>
        </Container>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <Select
        name="person_id"
        value={''}
        field="person_id"
        label="verantwortliche Person wählen"
        options={persons}
        loading={false}
        saveToDb={saveToDb}
        isClearable={false}
      />
    </ErrorBoundary>
  )
}

export default observer(ArtAv)
