import { A } from '@solidjs/router';
import { type Component, For, type JSX, type ParentProps } from 'solid-js';
import { HamburgerButton } from '../atoms/HamburgerButton.js';
import { Logo } from '../atoms/Logo.jsx';

/** Type definition that represents the menu item. */
export type MenuContent = readonly [
  to: string,
  title: NonNullable<JSX.Element>,
];

/** Type definition for the properties. */
export interface NavbarProps extends Readonly<ParentProps> {
  /** whether the navbar is expanded or collapsed */
  readonly expanded?: boolean | undefined;

  /** The menu items */
  readonly menuContents?: readonly MenuContent[] | undefined;

  /** The callback to expand or collapse */
  readonly onExpandOrCollapse?:
    | JSX.EventHandler<HTMLInputElement, MouseEvent>
    | undefined;
}

/**
 * The navigation bar.
 * @returns The component.
 */
export const Navbar: Component<NavbarProps> = (props) => (
  <header class="navbar bg-base-200 px-safe pt-safe flex-col items-stretch drop-shadow-xl lg:flex-row">
    <nav class="flex justify-between">
      <Logo />
      <HamburgerButton class="lg:hidden" onClick={props.onExpandOrCollapse} />
    </nav>
    <nav
      class="flex grow-0 flex-col items-stretch lg:flex lg:grow lg:flex-row lg:justify-between"
      classList={{ hidden: !props.expanded }}
    >
      <ul class="menu lg:menu-horizontal items-stretch pb-1 pt-4">
        <For each={props.menuContents}>
          {([to, title]) => (
            <li>
              <A href={to}>{title}</A>
            </li>
          )}
        </For>
      </ul>
      <ul class="menu menu-horizontal justify-end self-end">
        {props.children}
      </ul>
    </nav>
  </header>
);
