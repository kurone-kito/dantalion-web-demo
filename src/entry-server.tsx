// @refresh reload
import { StartServer, createHandler } from '@solidjs/start/server';

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      // biome-ignore lint/a11y/useHtmlLang: <explanation>
      <html>
        <head>
          <meta charset="utf-8" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
