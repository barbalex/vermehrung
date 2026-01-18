import styles from './Conflict.module.css'

export const Conflict = ({ conflict, activeConflict, setActiveConflict }) => {
  const onClick = () =>
    setActiveConflict(
      !activeConflict ? conflict
      : activeConflict !== conflict ? conflict
      : null,
    )

  const title =
    activeConflict ?
      'Klicken um den Konflikt zu schliessen'
    : 'Klicken um den Konflikt zu lösen'
  const isActive = activeConflict === conflict
  const style = { fontWeight: isActive ? 500 : 400 }

  return (
    <div
      className={styles.conflictClass}
      key={conflict}
      onClick={onClick}
      title={title}
      style={style}
    >{`Konflikt mit Version ${conflict}`}</div>
  )
}
