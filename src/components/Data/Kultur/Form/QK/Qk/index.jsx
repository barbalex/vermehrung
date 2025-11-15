import { useState, useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Paper from '@mui/material/Paper'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

import { createKulturMessageFunctions } from './createMessageFunctions.js'
import { constants } from '../../../../../../utils/constants.js'
import { MobxStoreContext } from '../../../../../../mobxStoreContext.js'

import {
  container,
  paper,
  title,
  a,
  row,
  resultTitleClass,
  formControl,
} from './index.module.css'

export const KulturQk = observer(({ kultur, qkChoosens }) => {
  const store = useContext(MobxStoreContext)
  const { db } = store

  const [filter, setFilter] = useState('')
  const onChangeFilter = (event) => setFilter(event.target.value)

  const [messageGroups, setMessageGroups] = useState(null)
  useEffect(() => {
    let isActive = true
    createKulturMessageFunctions({
      kulturId: kultur.id,
      db,
      store,
    }).then(async (messageFunctions) => {
      const msgGroups = await Promise.all(
        qkChoosens
          .filter((qk) => !!messageFunctions[qk.name])
          .map(async (qk) => ({
            title: qk?.titel,
            messages:
              messageFunctions ? await messageFunctions[qk?.name]() : [],
          })),
      )
      if (!isActive) return

      setMessageGroups(msgGroups.filter((qk) => qk.messages.length))
    })

    return () => {
      isActive = false
    }
  }, [kultur.id, qkChoosens, db, store])

  const messageGroupsFiltered =
    messageGroups ?
      messageGroups.filter((messageGroup) => {
        if (!!filter && messageGroup.title && messageGroup.title.toLowerCase) {
          return messageGroup.title.toLowerCase().includes(filter.toLowerCase())
        }
        return true
      })
    : []
  const resultTitle =
    messageGroups ?
      `${messageGroupsFiltered.length} ${
        messageGroupsFiltered.length === 1 ? 'Kontrolle' : 'Kontrollen'
      }:`
    : 'rechne...'

  return (
    <div className={container}>
      <FormControl
        fullWidth
        variant="standard"
        className={formControl}
      >
        <InputLabel
          htmlFor="filter"
          shrink
        >
          nach Abschnitts-Titel filtern
        </InputLabel>
        <Input
          id="filter"
          value={filter}
          onChange={onChangeFilter}
          spellCheck={false}
        />
      </FormControl>
      <div className={resultTitleClass}>{resultTitle}</div>
      {messageGroupsFiltered.map((messageGroup) => (
        <Paper
          key={messageGroup.title}
          elevation={2}
          className={paper}
        >
          <div
            className={title}
          >{`${messageGroup.title} (${messageGroup.messages.length})`}</div>
          {messageGroup.messages.map((m, i) => (
            <div
              className={row}
              key={`${m.text}Index${i}`}
            >
              <p
                onClick={() =>
                  window.open(
                    `${constants?.getAppUri()}/Vermehrung/${m.url.join('/')}`,
                  )
                }
                title="in neuem Fenster öffnen"
                className={a}
              >
                {m.text}
              </p>
            </div>
          ))}
        </Paper>
      ))}
      {messageGroups?.length === 0 && (
        <div>Juhui. Offenbar gibt es nichts zu meckern!</div>
      )}
    </div>
  )
})
