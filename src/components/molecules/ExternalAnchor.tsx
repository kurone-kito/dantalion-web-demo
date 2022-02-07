import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import type { ReactNode, VFC } from 'react';
import { IconAnchor } from './IconAnchor';

/** Type definition of the required attributes. */
export interface ExternalAnchorProps {
  /** The children items. */
  readonly children?: ReactNode;
  /** The URL. */
  readonly href: string;
  /** Whether the component specifies a “nofflow” flag. */
  readonly nofollow?: boolean;
  /** The tooltip on hover. */
  readonly tooltip?: string;
}

/**
 * The external anchor component
 *
 * @param props required attributes.
 * @param props.children The children items.
 * @param props.href The URL.
 * @param props.nofollow Whether the component specifies a “nofflow” flag.
 * @param props.tooltip The tooltip on hover.
 * @returns the component.
 */
export const ExternalAnchor: VFC<ExternalAnchorProps> = ({
  children,
  href,
  nofollow,
  tooltip,
}) => (
  <span tw="[span]:(mr-1) [sup]:(opacity-60 text-xs)">
    <IconAnchor
      href={href}
      icon={faExternalLinkAlt}
      nofollow={nofollow}
      sup
      tooltip={tooltip}
    >
      <span>{children}</span>
    </IconAnchor>
  </span>
);
ExternalAnchor.displayName = 'ExternalAnchor';
