import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis'
import { AppLayout } from '../components/layouts/app-layout'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MoralisProvider
        appId={process.env.NEXT_PUBLIC_APP_ID as string}
        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL as string}
      >
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </MoralisProvider>
    </>
  )
}

export default MyApp
