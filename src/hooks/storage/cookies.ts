import { destroyCookie, parseCookies, setCookie } from 'nookies'

//DOC https://github.com/maticzav/nookies

type ICookie = {
  key: string
  value: any
}

export function updateMultipleCookies(
  data: ICookie[],
  type: 'SET' | 'REMOVE',
  age: number = 60 * 60 * 24 * 30, // 30 days
  path: string = '/', // global
) {
  switch (type) {
    case 'SET':
      data.forEach((cookie: ICookie) => {
        // the first parameter, if its on client side, needs to be null
        setCookie(null, `@bg_${cookie.key}`, JSON.stringify(cookie.value), {
          maxAge: age,
          path: path,
        })
      })

      break
    case 'REMOVE':
      data.forEach((cookie: ICookie) => {
        destroyCookie(null, `@bg_${cookie.key}`)
      })
      break
  }
}
export function updateSingleCookie(
  cookie: ICookie,
  type: 'SET' | 'REMOVE',
  age: number = 60 * 60 * 24 * 30, // 30 days
  path: string = '/', // global
) {
  switch (type) {
    case 'SET':
      setCookie(null, `@bg_${cookie.key}`, JSON.stringify(cookie.value), {
        maxAge: age,
        path: path,
      })

      break
    case 'REMOVE':
      destroyCookie(null, `@bg_${cookie.key}`)
      break
  }
}
export function getAllCookies() {
  return parseCookies()
}
export function getSingleCookie(key: string) {
  const cookies = parseCookies()
  const cookie = cookies[`@bg_${key}`]
  return JSON.parse(cookie)
}
export function clearAllCookies() {
  const cookies = parseCookies()
  Object.keys(cookies).forEach((key: string) => {
    destroyCookie(null, key)
  })
}
