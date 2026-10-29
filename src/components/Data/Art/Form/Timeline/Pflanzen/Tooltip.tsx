import { DateTime } from 'luxon'

import styles from './Tooltip.module.css'

export const CustomTooltip = ({
  payload,
  label,
  active,
}: {
  payload?:
    | { payload: Record<string, unknown>; dataKey?: string; value?: number }[]
  label?: string
  active?: boolean
}) => {
  if (active) {
    return (
      <div className={styles.container}>
        <div className={styles.pTitle}>
          <div>{DateTime.fromSQL(label ?? '').toFormat('yyyy.LL.dd')}</div>
          <div className={styles.ereignis}>
            {(payload?.[0]?.payload?.title ?? '') as string}
          </div>
        </div>
        {payload
          // Zählung and Bedarf are only used for the optics,
          // do not want them in the tooltip
          ?.filter(
            (p: { dataKey?: string }) =>
              !['Zählung', 'Bedarf'].includes(p.dataKey ?? ''),
          )
          ?.map((o: { dataKey?: string; value?: number }, i: number) => {
            const label = o.dataKey ?? ''
            const value =
              label === 'Auspflanzung' && Math.abs(o.value ?? 0)
                ? Math.abs(o.value ?? 0)
                : o.value

            return (
              <div
                className={styles.pRow}
                key={`${label}${value}${i}`}
              >{`${label}: ${value}`}</div>
            )
          })}
      </div>
    )
  }

  return null
}
