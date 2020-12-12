import React, { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import Slider from 'react-slick'
import SimpleBar from 'simplebar-react'

import { useQuery } from '../../../../models/reactUtils'
import checkForOnlineError from '../../../../utils/checkForOnlineError'
import Spinner from '../../../shared/Spinner'
import Row from './Row'

const Container = styled.div`
  padding: 0 25px;
  height: 100%;
  .slick-prev:before,
  .slick-next:before,
  .slick-dots li button:before {
    color: #4a148c;
  }
  .slick-prev {
    left: -20px;
  }
  .slick-next {
    right: -20px;
  }
  .slick-dots {
    bottom: -10px;
  }
`
const ErrorContainer = styled.div`
  padding: 25px;
`

const sliderSettings = {
  dots: false,
  infinite: false,
}

const HerkunftHistory = ({ row, rawRow, historyTakeoverCallback }) => {
  const priorRevisions = row._revisions.slice(1)
  const { error, data, loading } = useQuery((store) =>
    store.queryHerkunft_rev({
      where: { _rev: { _in: priorRevisions } },
    }),
  )
  error && checkForOnlineError(error)

  const revRowsUnsorted = useMemo(() => data?.herkunft_rev ?? [], [
    data?.herkunft_rev,
  ])
  const revRows = revRowsUnsorted.sort((a, b) => b._depth - a._depth)

  if (loading) {
    return <Spinner message="lade Versionen" />
  }

  if (error) {
    return <ErrorContainer>{error.message}</ErrorContainer>
  }

  return (
    <SimpleBar style={{ maxHeight: '100%', height: '100%' }}>
      <Container>
        <Slider {...sliderSettings}>
          {revRows.map((r) => (
            <Row
              key={row._rev}
              revRow={r}
              row={row}
              rawRow={rawRow}
              historyTakeoverCallback={historyTakeoverCallback}
            />
          ))}
        </Slider>
      </Container>
    </SimpleBar>
  )
}

export default observer(HerkunftHistory)
