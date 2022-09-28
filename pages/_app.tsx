import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material'
import Layout from '@components/layout/layout'
import "@fontsource/kanit/300.css"
import "@fontsource/kanit/400.css"
import "@fontsource/kanit/500.css"
import "@fontsource/kanit/700.css"

const lightTheme = createTheme({
  typography: {
    fontFamily: 'kanit, Arial',
  },
  palette: {
    mode: 'light',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>แผนงบประมาณ</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
