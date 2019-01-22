import React from 'react'
import { Router } from '@reach/router'

const ArtList = ({ arten }) => {
  console.log('ArtList', { arten, art0: arten[0] })
  return (
    <div>
      {arten.map(art => (
        <div key={art.id} path="art">
          {art.name}
        </div>
      ))}
    </div>
  )
}

export default ArtList
