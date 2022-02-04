import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Hello } from '../components/atoms/Hello';

/**
 * The home page.
 *
 * @returns The home page.
 */
const Page: NextPage = () => (
  <>{useRouter().isFallback ? 'Loading' : <Hello />}</>
);
Page.displayName = 'Index';

export default Page;
