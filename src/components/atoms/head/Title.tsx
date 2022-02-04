import Head from 'next/head';
import type { VFC } from 'react';
import type { Options } from '../../../utils/createTitle';
import { createTitle } from '../../../utils/createTitle';

/** Type definition of the required attributes. */
export type TitleProps = Options;

/**
 * The page title component.
 *
 * @param props required attributes.
 * @returns the component.
 */
export const Title: VFC<TitleProps> = (props) => (
  <Head>
    <title>{createTitle(props)}</title>
  </Head>
);
Title.displayName = 'Title';
