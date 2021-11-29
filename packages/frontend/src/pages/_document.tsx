import { NextPage } from 'next'
import { RenderPageResult } from 'next/dist/shared/lib/utils'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import config from '../lib/config'

const MyDocument: NextPage = () => {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@900&family=Nunito+Sans&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href={config.SITE_URL} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

// More referrence on the SSR of styled components:
// https://styled-components.com/docs/advanced#server-side-rendering
// https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js

MyDocument.getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {
  const sheet = new ServerStyleSheet()
  const originalRenderPage = ctx.renderPage

  try {
    ctx.renderPage = (): RenderPageResult | Promise<RenderPageResult> =>
      originalRenderPage({
        enhanceApp:
          (App) =>
          (props): React.ReactElement<{ sheet: ServerStyleSheet }> =>
            // eslint-disable-next-line react/jsx-props-no-spreading
            sheet.collectStyles(<App {...props} />),
      })
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    }
  } finally {
    sheet.seal()
  }
}

export default MyDocument
