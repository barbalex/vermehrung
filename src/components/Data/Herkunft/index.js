import React from 'react'

import Herkunft from './Herkunft'
import DataProvider from './DataProvider'

const HerkunftIndex = ({
  id = '99999999-9999-9999-9999-999999999999',
  filter,
}) => {
  if (filter) {
    return <Herkunft id={id} filter={filter} />
  }

  return <DataProvider id={id} filter={filter} />
}

export default HerkunftIndex
