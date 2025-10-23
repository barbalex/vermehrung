import { useState, useCallback, useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import Paper from '@mui/material/Paper'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

import { MobxStoreContext } from '../../../../../../mobxStoreContext.js'
import { createMessageFunctions } from './createMessageFunctions.js'
import { constants } from '../../../../../../utils/constants.js'

const Container = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
`
const StyledPaper = styled(Paper)`
  padding: 10px;
  margin-bottom: 12px !important;
  background-color: transparent !important;
`
const Title = styled.div`
  font-weight: bold;
`
const StyledA = styled.p`
  color: inherit;
  font-weight: normal;
  font-size: 12px;
  text-decoration-line: underline;
  cursor: pointer;
  margin-bottom: 0;
  padding: 2px 0;
`
const Row = styled.div`
  display: flex;
`
const ResultTitle = styled.div`
  padding-left: 10px;
  margin-bottom: 7px;
`
const StyledFormControl = styled(FormControl)`
  padding-bottom: 10px !important;
  > div:before {
    border-bottom-color: rgba(0, 0, 0, 0.1) !important;
  }
`

export const Qk = observer(({ artId, qkChoosens }) => {
  const store = useContext(MobxStoreContext)
  const { db } = store

  const [filter, setFilter] = useState('')
  const onChangeFilter = useCallback(
    (event) => setFilter(event.target.value),
    [],
  )

  const [messageGroups, setMessageGroups] = useState(null)
  useEffect(() => {
    let isActive = true
    createMessageFunctions({
      artId,
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
  }, [artId, db, qkChoosens, store])

  const messageGroupsFiltered =
    messageGroups ?
      messageGroups.filter((messageGroup) => {
        if (!!filter && messageGroup?.title?.toLowerCase) {
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
    <Container>
      <StyledFormControl
        fullWidth
        variant="standard"
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
      </StyledFormControl>
      <ResultTitle>{resultTitle}</ResultTitle>
      {messageGroupsFiltered.map((messageGroup) => (
        <StyledPaper
          key={messageGroup.title}
          elevation={2}
        >
          <Title>{`${messageGroup.title} (${messageGroup.messages.length})`}</Title>
          {messageGroup.messages.map((m, i) => (
            <Row key={`${m.text}Index${i}`}>
              <StyledA
                onClick={() =>
                  window.open(
                    `${constants?.getAppUri()}/Vermehrung/${m.url.join('/')}`,
                  )
                }
                title="in neuem Fenster öffnen"
              >
                {m.text}
              </StyledA>
            </Row>
          ))}
        </StyledPaper>
      ))}
      {!messageGroups?.length && (
        <div>Juhui. Offenbar gibt es nichts zu meckern!</div>
      )}
    </Container>
  )
})
