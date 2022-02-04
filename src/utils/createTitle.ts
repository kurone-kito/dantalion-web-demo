/** Type definition of the options for `createTitle` function. */
export interface Options {
  /** Specifies the web app name. */
  readonly appName?: string;
  /** Specifies the page name. */
  readonly pageName?: string;
}

/**
 * Create the title.
 *
 * @param options The options.
 * @param options.appName The web app name.
 * @param options.pageName The page name.
 * @returns The title.
 */
export const createTitle = ({ appName, pageName }: Options = {}): string =>
  appName && pageName ? `${pageName}::${appName}` : appName ?? pageName ?? '';
