import React, { useContext, useCallback, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { FaCog } from 'react-icons/fa'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import styled from '@emotion/styled'
import { of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { MobxStoreContext } from '../../mobxStoreContext.js'
import { constants } from '../../utils/constants.js'
import { ErrorBoundary } from '../shared/ErrorBoundary.jsx'

const Container = styled.div`
  position: absolute;
  top: 2px;
  right: 12px;
  z-index: 1;
`
const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
  user-select: none;
`
const Title = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 700;
  user-select: none;
`
const Info = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.4);
  user-select: none;
`

export const TreeSettings = observer(() => {
  const store = useContext(MobxStoreContext)
  const { user, db } = store

  const [dataState, setDataState] = useState({
    userPersonOption: undefined,
  })
  useEffect(() => {
    const userPersonOptionsObservable =
      user.uid ?
        db
          ?.get('person_option')
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns([
            'tree_kultur',
            'tree_teilkultur',
            'tree_zaehlung',
            'tree_lieferung',
            'tree_event',
          ])
      : $of({})
    const subscription = userPersonOptionsObservable.subscribe(
      async (userPersonOptions) =>
        setDataState({
          userPersonOption: userPersonOptions?.[0],
        }),
    )

    return () => subscription?.unsubscribe?.()
  }, [db, user.uid])
  const { userPersonOption } = dataState
  const {
    tree_kultur,
    tree_teilkultur,
    tree_zaehlung,
    tree_lieferung,
    tree_event,
  } = userPersonOption ?? {}

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      const value = event.target.value === 'false'
      userPersonOption.edit({ field, value, store })
    },
    [store, userPersonOption],
  )
  const openSettingsDocs = useCallback(() => {
    setAnchorEl(null)
    const url = `${constants?.getAppUri()}/Dokumentation/ordner-blenden`
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return window.open(url, '_blank', 'toolbar=no')
    }
    window.open(url)
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
          size="large"
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
                size="large"
              >
                <IoMdInformationCircleOutline />
              </IconButton>
            </div>
          </TitleRow>
          <MenuItem>
            <FormControlLabel
              value={tree_kultur === true ? 'true' : 'false'}
              control={
                <Checkbox
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
                <Checkbox
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
                <Checkbox
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
                <Checkbox
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
                <Checkbox
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
})
