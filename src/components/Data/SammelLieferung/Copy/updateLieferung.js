import gql from 'graphql-tag'

import { lieferung as lieferungFragment } from '../../../../utils/fragments'
import fieldsFromFragment from '../../../../utils/fieldsFromFragment'
import isString from '../../../../utils/isString'
import exists from '../../../../utils/exists'

const lieferungFields = fieldsFromFragment(lieferungFragment)

export default async ({
  lieferungId,
  sammelLieferung,
  field,
  client,
  store,
}) => {
  // pass field to mark which field should be updated
  // even if it has value null
  const lieferung = {
    ...sammelLieferung,
    id: lieferungId,
    sammel_lieferung_id: sammelLieferung.id,
  }
  const objectString = Object.entries(lieferung)
    .filter(
      // only accept lieferung's fields
      // eslint-disable-next-line no-unused-vars
      ([key, value]) => lieferungFields.includes(key),
    )
    // only update with existing values
    // eslint-disable-next-line no-unused-vars
    .filter(([key, val]) => exists(val) || key === field)
    .map(([key, value]) => {
      if (isString(value)) {
        return `${key}: "${value}"`
      }
      return `${key}: ${value}`
    })
    .join(', ')
  try {
    await client.mutate({
      mutation: gql`
    mutation update_lieferung(
      $id: bigint!
    ) {
      update_lieferung(
        where: { id: { _eq: $id } }
        _set: {
          ${objectString}
        }
      ) {
        affected_rows
        returning {
          ...LieferungFields
        }
      }
    }
    ${lieferungFragment}
    `,
      variables: {
        id: lieferungId,
      },
    })
  } catch (error) {
    return store.enqueNotification({
      message: error.message,
      options: {
        variant: 'error',
      },
    })
  }
}
