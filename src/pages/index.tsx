import type { NextPage } from 'next';
import { useRouter } from 'next/router';

/**
 * The home page.
 *
 * @returns The home page.
 */
const Page: NextPage = () => (
  <>{useRouter().isFallback ? 'Loading' : 'Hello, world!'}</>
);
Page.displayName = 'Index';

export default Page;
