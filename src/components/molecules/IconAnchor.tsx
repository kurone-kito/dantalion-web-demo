import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ReactNode, VFC } from 'react';
import { Anchor } from '../atoms/Anchor';

/** Type definition of the required attributes. */
export interface IconAnchorProps {
  /** The children items. */
  readonly children?: ReactNode;
  /** The URL. */
  readonly href: string;
  /** The icon. */
  readonly icon: IconProp;
  /** Whether the component specifies a “nofflow” flag. */
  readonly nofollow?: boolean;
  /** Whether the icon specifies as a superscript. */
  readonly sup?: boolean;
  /** The tooltip on hover. */
  readonly tooltip?: string;
}

/**
 * The footer component
 *
 * @param props required attributes.
 * @param props.children The children items.
 * @param props.href The URL.
 * @param props.icon The icon.
 * @param props.nofollow Whether the component specifies a “nofflow” flag.
 * @param props.sup Whether the icon specifies as a superscript.
 * @param props.tooltip The tooltip on hover.
 * @returns the component.
 */
export const IconAnchor: VFC<IconAnchorProps> = ({
  children,
  href,
  icon,
  nofollow,
  sup,
  tooltip,
}) => {
  const Sup = sup ? 'sup' : 'span';
  return (
    <Anchor href={href} nofollow={nofollow} tooltip={tooltip}>
      {children}
      <Sup>
        <FontAwesomeIcon icon={icon} />
      </Sup>
    </Anchor>
  );
};
IconAnchor.displayName = 'IconAnchor';
