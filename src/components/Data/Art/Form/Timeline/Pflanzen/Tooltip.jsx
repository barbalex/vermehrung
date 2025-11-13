import { DateTime } from 'luxon'

import { container, pRow, pTitle, ereignis } from './Tooltip.module.css'

export const CustomTooltip = ({ payload, label, active }) => {
  if (active) {
    return (
      <div className={container}>
        <div className={pTitle}>
          <div>{DateTime.fromSQL(label).toFormat('yyyy.LL.dd')}</div>
          <div className={ereignis}>{payload?.[0]?.payload?.title ?? ''}</div>
        </div>
        {payload
          // Zählung and Bedarf are only used for the optics,
          // do not want them in the tooltip
          ?.filter((p) => !['Zählung', 'Bedarf'].includes(p.dataKey))
          ?.map((o, i) => {
            const label = o.dataKey
            const value =
              label === 'Auspflanzung' && Math.abs(o.value) ?
                Math.abs(o.value)
              : o.value

            return (
              <div
                className={pRow}
                key={`${label}${value}${i}`}
              >{`${label}: ${value}`}</div>
            )
          })}
      </div>
    )
  }

  return null
}
