// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server';
import { resolveAssetPath } from './lib/meta';
import { themeBootstrapScript } from './lib/theme';

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en" data-theme="light">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            href={resolveAssetPath('/favicons/favicon.svg')}
            rel="icon"
            type="image/svg+xml"
          />
          <link
            href={resolveAssetPath('/favicons/favicon-32x32.png')}
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href={resolveAssetPath('/favicons/favicon-192x192.png')}
            rel="icon"
            sizes="192x192"
            type="image/png"
          />
          <link
            href={resolveAssetPath('/favicons/favicon-512x512.png')}
            rel="icon"
            sizes="512x512"
            type="image/png"
          />
          <script innerHTML={themeBootstrapScript} />
          {assets}
        </head>
        <body class="bg-base-200 text-base-content">
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
