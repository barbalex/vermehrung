declare module 'file-saver' {
  export function saveAs(data: Blob | string, filename?: string): void
  const fileSaver: { saveAs: typeof saveAs }
  export default fileSaver
}
