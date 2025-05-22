import { MetaProvider } from '@solidjs/meta';
import type { RouteSectionProps } from '@solidjs/router';
import type { Component } from 'solid-js';
import { Suspense } from 'solid-js';
import { Navbar } from '../molecules/Navbar.js';
import { Head } from '../organisms/Head.js';

/**
 * The root template component.
 * @param props The properties.
 * @returns The component.
 */
export const RootTemplate: Component<RouteSectionProps> = (props) => (
  <MetaProvider>
    <Head />
    <Navbar />
    <Suspense>
      <main>{props.children}</main>
    </Suspense>
  </MetaProvider>
);
