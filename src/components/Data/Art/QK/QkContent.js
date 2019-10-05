import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { useQuery } from '@apollo/react-hooks'
import format from 'date-fns/format'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

import query from './query'
import buildQk from './buildQk'
import getAppBaseUrl from '../../../../utils/appBaseUrl'

const appBaseUrl = getAppBaseUrl()

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
const StyledButton = styled(Button)`
  margin-bottom: 15px !important;
  margin-top: -5px !important;
  color: ${props =>
    props.loading === 'true'
      ? '#D84315 !important'
      : 'rgb(46, 125, 50) !important'};
  > span {
    text-transform: none;
  }
`

const ApQkQk = ({ art }) => {
  const year = +format(new Date(), 'yyyy')
  const startYear = `${year}.01.01`
  const startNextYear = `${year + 1}.01.01`
  const { data, error, loading, refetch } = useQuery(query, {
    variables: { artId: art.id, startYear, startNextYear },
  })
  const messageGroups = data
    ? buildQk({ data, artId: art.id }).filter(q => q.messages.length)
    : []

  if (error) return `Fehler: ${error.message}`
  return (
    <>
      <Badge
        badgeContent={loading ? '...' : messageGroups.length}
        color="primary"
      >
        <StyledButton
          onClick={() => refetch()}
          variant="outlined"
          loading={loading.toString()}
        >
          {loading ? 'Die Daten werden analysiert...' : 'neu analysieren'}
        </StyledButton>
      </Badge>
      {messageGroups.map(messageGroup => (
        <StyledPaper key={messageGroup.title} elevation={2}>
          <Title>{messageGroup.title}</Title>
          {messageGroup.messages.map((m, i) => (
            <Row key={`${m.text}Index${i}`}>
              <StyledA
                onClick={() =>
                  typeof window !== 'undefined' &&
                  window.open(`${appBaseUrl}Vermehrung/${m.url.join('/')}`)
                }
                title="in neuem Fenster öffnen"
              >
                {m.text}
              </StyledA>
            </Row>
          ))}
        </StyledPaper>
      ))}
      {!loading && messageGroups.length === 0 && (
        <div>Juhui. Offenbar gibt es nichts zu meckern!</div>
      )}
    </>
  )
}

export default observer(ApQkQk)
