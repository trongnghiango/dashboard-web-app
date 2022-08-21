import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import LiteLayout from '../layouts/lite.layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LiteLayout>

      <Component {...pageProps} />
    </LiteLayout>
  )
}

export default MyApp
