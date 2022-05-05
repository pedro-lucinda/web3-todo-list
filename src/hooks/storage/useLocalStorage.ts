import { IS_CLIENT_SIDE, STORAGE_PREFIX } from '@/config'

export interface IUseLocalStorage {
  getToken: (key: string, isInternalKey?: boolean) => string | undefined
  setToken: (key: string, token: string) => void
  removeToken: (key: string, isInternalKey?: boolean) => void
}

const returnClientSide = <T>(value: T) => {
  return IS_CLIENT_SIDE ? value : null
}

export function getLSToken(
  key: string,
  isInternalKey = false,
): string | undefined {
  const name = isInternalKey ? `${STORAGE_PREFIX}_${key}` : key
  const token = JSON.parse(localStorage.getItem(name) as string)

  return returnClientSide(token)
}

export function setLSToken(key: string, token: string): void {
  returnClientSide(
    localStorage.setItem(`${STORAGE_PREFIX}_${key}`, JSON.stringify(token)),
  )
}

export function removeLSToken(key: string, isInternalKey = false) {
  const name = isInternalKey ? `${STORAGE_PREFIX}_${key}` : key

  return returnClientSide(localStorage.removeItem(name))
}
