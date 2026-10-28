import { setShortTermOnline } from '../store/index.ts'

export const checkForOnlineError = ({ error }: { error: unknown }) => {
  if ((error as Error)?.message?.includes?.('Failed to fetch')) {
    console.log('checkForOnlineError, network is failing')
    setShortTermOnline(false)
    return
  }
}
