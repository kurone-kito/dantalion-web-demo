import {
  faGithub,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import type { ReactNode, VFC } from 'react';
import * as React from 'react';
import tw from 'twin.macro';
import { List } from '../atoms/List';
import { IconAnchor } from './IconAnchor';

/** Type definition of the required attributes. */
export interface FooterNavigationProps {
  /** Specifies the author-name */
  readonly author?: ReactNode;
}

/** The styles for the component. */
const styles = tw`
  [& > ol, & > ul]:(
    divide-x-2
    divide-gray-500
    divide-opacity-50
    flex
    flex-row
    justify-center
    p-4
    [& > li]:(place-self-center px-3)
  )
`;

/**
 * The footer component
 *
 * @param props required attributes.
 * @param props.author Specifies the author-name
 * @returns the component.
 */
export const FooterNavigation: VFC<FooterNavigationProps> = ({ author }) => (
  <div css={styles}>
    <List>
      <>&copy; {author}</>
      <IconAnchor
        href="https://twitter.com/kurone_kito"
        icon={faTwitter}
        tooltip="Twitter"
      />
      <IconAnchor
        href="https://github.com/kurone-kito"
        icon={faGithub}
        tooltip="GitHub"
      />
      <IconAnchor
        href="https://youtube.com/c/kuronekito"
        icon={faYoutube}
        tooltip="YouTube"
      />
      <IconAnchor href="https://kit.black/" icon={faHome} tooltip="Homepage" />
    </List>
  </div>
);
FooterNavigation.displayName = 'FooterNavigation';
