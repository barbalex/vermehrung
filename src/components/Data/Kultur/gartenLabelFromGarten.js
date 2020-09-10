export default (g) => g?.name ?? g?.person?.fullname ?? '(kein Name)'
