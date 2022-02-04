import type { AppProps } from 'next/app';
import type { VFC } from 'react';
import { GlobalStyles } from 'twin.macro';

/**
 * The app root component
 *
 * @param props The properties of the component.
 * @param props.Component The component to render.
 * @param props.pageProps The properties of the page.
 * @returns The app root component.
 */
const App: VFC<AppProps> = ({ Component, pageProps }) => (
  <>
    <GlobalStyles />
    <Component {...pageProps} />
  </>
);
App.displayName = 'App';

export default App;
