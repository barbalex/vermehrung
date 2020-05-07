import React, { useContext, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import { FaCog } from 'react-icons/fa'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import get from 'lodash/get'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/react-hooks'

import storeContext from '../../../storeContext'
import { personOption as personOptionFragment } from '../../../utils/fragments'
import appBaseUrl from '../../../utils/appBaseUrl'
import ErrorBoundary from '../../shared/ErrorBoundary'

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`
const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
`
const Title = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 800;
  user-select: none;
`
const Info = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.4);
  user-select: none;
`

const SettingsTree = ({ data, personId }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { enqueNotification } = store

  const personOption = get(data, 'person_option[0]') || {}
  const {
    tree_kultur,
    tree_teilkultur,
    tree_zaehlung,
    tree_lieferung,
    tree_event,
  } = personOption

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      const value = event.target.value === 'true'
      try {
        await client.mutate({
          mutation: gql`
              mutation update_person_option(
                $personId: uuid!
              ) {
                update_person_option(
                  where: { person_id: { _eq: $personId } }
                  _set: {
                    ${field}: ${!value}
                  }
                ) {
                  affected_rows
                  returning {
                    ...PersonOptionFields
                  }
                }
              }
              ${personOptionFragment}
            `,
          variables: {
            personId,
          },
          refetchQueries: ['TreeQueryForTreeContainer'],
          awaitRefetchQueries: true,
          optimisticResponse: {
            __typename: 'Mutation',
            updatePersonOption: {
              person_id: personOption.person_id,
              __typename: 'PersonOption',
              content: { ...personOption, [field]: !value },
            },
          },
        })
      } catch (error) {
        return enqueNotification({
          message: error.message,
          options: {
            variant: 'error',
          },
        })
      }
      console.log('hi')
    },
    [client, personId, personOption, enqueNotification],
  )
  const openSettingsDocs = useCallback(() => {
    setAnchorEl(null)
    const url = `${appBaseUrl()}Dokumentation/Ordner-blenden`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  const [anchorEl, setAnchorEl] = useState(null)
  const onClose = useCallback(() => setAnchorEl(null), [])
  const onClickConfig = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [],
  )

  return (
    <ErrorBoundary>
      <Container>
        <IconButton
          aria-label="Ordner wählen"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
          title="Ordner wählen"
          onClick={onClickConfig}
        >
          <FaCog />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={onClose}
        >
          <TitleRow>
            <Title>Fakultative Ordner wählen:</Title>
            <div>
              <IconButton
                aria-label="Anleitung öffnen"
                title="Anleitung öffnen"
                onClick={openSettingsDocs}
              >
                <IoMdInformationCircleOutline />
              </IconButton>
            </div>
          </TitleRow>
          <MenuItem>
            <FormControlLabel
              value={tree_kultur === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={tree_kultur}
                  onClick={saveToDb}
                  name="tree_kultur"
                />
              }
              label="Kulturen"
              labelPlacement="end"
            />
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              value={tree_teilkultur === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={tree_teilkultur}
                  onClick={saveToDb}
                  name="tree_teilkultur"
                />
              }
              label="Teilkulturen"
              labelPlacement="end"
            />
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              value={tree_zaehlung === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={tree_zaehlung}
                  onClick={saveToDb}
                  name="tree_zaehlung"
                />
              }
              label="Zählungen"
              labelPlacement="end"
            />
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              value={tree_lieferung === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={tree_lieferung}
                  onClick={saveToDb}
                  name="tree_lieferung"
                />
              }
              label="Lieferungen"
              labelPlacement="end"
            />
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              value={tree_event === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={tree_event}
                  onClick={saveToDb}
                  name="tree_event"
                />
              }
              label="Events"
              labelPlacement="end"
            />
          </MenuItem>
          <Info>
            Für die Navigation zwingende Ordner sind nicht aufgelistet.
          </Info>
        </Menu>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(SettingsTree)
