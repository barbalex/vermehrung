import React, { useContext, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import Slider from 'react-slick'
import SimpleBar from 'simplebar-react'

import { useQuery, StoreContext } from '../../../../models/reactUtils'
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
  dots: true,
  infinite: false,
}

const HerkunftHistory = ({ row, historyTakeoverCallback }) => {
  const store = useContext(StoreContext)

  const { error, loading } = useQuery((store) =>
    store.queryHerkunft_rev({
      where: { _rev: { _in: row._revisions } },
    }),
  )
  error && checkForOnlineError(error)

  // need to grab store object to ensure this remains up to date
  const revRows = useMemo(
    () =>
      [...store.herkunft_revs.values()]
        .filter((v) => row?._revisions?.includes(v._rev) ?? true)
        .filter((r) => r._rev !== row._rev)
        .sort((a, b) => b._depth - a._depth) || {},
    [row._rev, row._revisions, store.herkunft_revs],
  )

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
              historyTakeoverCallback={historyTakeoverCallback}
            />
          ))}
        </Slider>
      </Container>
    </SimpleBar>
  )
}

export default observer(HerkunftHistory)
