import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { userAtom, dbAtom } from '../../../../../store/index.ts'
import { constants } from '../../../../../utils/constants.ts'

import styles from './Menu.module.css'

export const KulturSettingsMenu = ({
  anchorEl,
  setAnchorEl,
  kulturId,
}: {
  anchorEl: HTMLElement | null | undefined
  setAnchorEl: (el: HTMLElement | null) => void
  kulturId?: string
}) => {
  const user = useAtomValue(userAtom)
  const db = useAtomValue(dbAtom)

  const [dataState, setDataState] = useState<{
    kulturOption: import('../../../../../dbModel.ts').KulturOption | undefined
    userPersonOption: import('../../../../../dbModel.ts').PersonOption | undefined
  }>({
    kulturOption: undefined,
    userPersonOption: undefined,
  })
  useEffect(() => {
    const userPersonOptionsObservable = user.uid
      ? db
          ?.get<import('../../../../../dbModel.ts').PersonOption>(
            'person_option',
          )
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns(['ku_zwischenlager', 'ku_erhaltungskultur'])
      : $of({})
    const kulturOptionObservable = kulturId
      ? db?.get('kultur_option').findAndObserve(kulturId ?? '')
      : $of({})
    const combinedObservables = combineLatest([
      userPersonOptionsObservable,
      kulturOptionObservable,
    ])
    const subscription = (
      combinedObservables as unknown as import('rxjs').Observable<
        [
          import('../../../../../dbModel.ts').PersonOption[] | undefined,
          import('../../../../../dbModel.ts').KulturOption | undefined,
        ]
      >
    ).subscribe(([userPersonOptions, kulturOption]) => {
        setDataState({
          userPersonOption: userPersonOptions?.[0],
          kulturOption,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [db, kulturId, user])
  const { kulturOption, userPersonOption } = dataState

  const { ku_zwischenlager, ku_erhaltungskultur } =
      (userPersonOption ?? {}) as unknown as Record<string, unknown>
  const { tk } = (kulturOption ?? {}) as unknown as Record<string, unknown>

  const saveToDbKulturOption = async (event: {
    target: { name?: string; value: unknown }
    currentTarget?: HTMLElement
    preventDefault?: () => void
    stopPropagation?: () => void
    key?: string
  }) => {
    const field = event.target.name
    const value = event.target.value === 'false'
    kulturOption?.edit({ field, value })
  }

  const saveToDbPersonOption = async (event: {
    target: { name?: string; value: unknown }
    currentTarget?: HTMLElement
    preventDefault?: () => void
    stopPropagation?: () => void
    key?: string
  }) => {
    const field = event.target.name
    const value = event.target.value === 'false'
    const option = userPersonOption as unknown as {
      edit?: (args: { field?: string; value?: unknown }) => void
    }
    option?.edit?.({ field, value })
  }

  const onClose = () => setAnchorEl(null)

  const openOptionDocs = () => {
    setAnchorEl(null)
    const url = `${constants?.getAppUri()}/Dokumentation/teilkulturen`
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return window.open(url, '_blank', 'toolbar=no')
    }
    window.open(url)
  }

  return (
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <div className={styles.title}>Optionen für diese Kultur:</div>
      <MenuItem>
        <FormControlLabel
          value={tk === true ? 'true' : 'false'}
          control={
            <Checkbox
              color="primary"
              checked={!!tk}
              onClick={saveToDbKulturOption as unknown as import('react').MouseEventHandler<HTMLButtonElement>}
              name="tk"
            />
          }
          label="Mit Teil-Kulturen arbeiten"
          labelPlacement="end"
        />
        <div>
          <IconButton
            aria-label="Anleitung öffnen"
            title="Anleitung öffnen"
            onClick={openOptionDocs}
            size="large"
          >
            <IoMdInformationCircleOutline />
          </IconButton>
        </div>
      </MenuItem>
      <div className={styles.title}>
        Optionale Felder wählen (für alle Kulturen):
      </div>
      <MenuItem>
        <FormControlLabel
          value={ku_zwischenlager === true ? 'true' : 'false'}
          control={
            <Checkbox
              color="primary"
              checked={!!ku_zwischenlager}
              onClick={saveToDbPersonOption as unknown as import('react').MouseEventHandler<HTMLButtonElement>}
              name="ku_zwischenlager"
            />
          }
          label="Zwischenlager"
          labelPlacement="end"
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          value={ku_erhaltungskultur === true ? 'true' : 'false'}
          control={
            <Checkbox
              color="primary"
              checked={!!ku_erhaltungskultur}
              onClick={saveToDbPersonOption as unknown as import('react').MouseEventHandler<HTMLButtonElement>}
              name="ku_erhaltungskultur"
            />
          }
          label="Erhaltungskultur"
          labelPlacement="end"
        />
      </MenuItem>
    </Menu>
  )
}
