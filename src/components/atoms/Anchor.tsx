import classNames from 'classnames';
import type { ReactNode, VFC } from 'react';

/** Type definition of the required attributes. */
export interface AnchorProps {
  /** The children items. */
  readonly children: ReactNode;
  /** The URL. */
  readonly href: string;
  /** Whether the component remove a target attribute. */
  readonly noblank?: boolean;
  /** Whether the component specifies a “nofflow” flag. */
  readonly nofollow?: boolean;
  /** The tooltip on hover. */
  readonly tooltip?: string;
}

/**
 * The anchor component
 *
 * @param props required attributes.
 * @param props.children the children items.
 * @param props.href the URL.
 * @param props.noblank whether the component remove a target attribute.
 * @param props.nofollow whether the component specifies a “nofflow” flag.
 * @param props.tooltip the tooltip on hover.
 * @returns the component.
 */
export const Anchor: VFC<AnchorProps> = ({
  children,
  href,
  noblank,
  nofollow,
  tooltip,
}) => (
  // eslint-disable-next-line react/jsx-no-target-blank
  <a
    href={href}
    rel={classNames('noopener noreferrer', { nofollow })}
    tabIndex={0}
    title={tooltip}
    tw="text-blue-800 dark:text-blue-300 dark:hover:text-blue-100 hover:text-blue-500"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...(noblank ? {} : { target: '_blank' })}
  >
    {children}
  </a>
);
Anchor.displayName = 'Anchor';
