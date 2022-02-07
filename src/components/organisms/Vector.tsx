import type { ReactNode, VFC } from 'react';
import { ResultDetailWithDetails } from '../molecules/ResultDetailWithDetails';

/** Type definition of the required attributes. */
export interface VectorProps {
  readonly details?: readonly string[];
  readonly heading?: string;
  readonly probed?: ReactNode;
  readonly strategyBody?: readonly string[];
  readonly strategyCaption?: ReactNode;
  readonly strategyTooltip?: string;
  readonly title?: ReactNode;
}

/**
 * The vector detail component.
 *
 * @param props required attributes.
 * @param props.details
 * @param props.heading
 * @param props.probed
 * @param props.strategyBody
 * @param props.strategyCaption
 * @param props.strategyTooltip
 * @param props.title
 * @returns the component.
 */
export const Vector: VFC<VectorProps> = ({
  details,
  heading,
  probed,
  strategyBody,
  strategyCaption,
  strategyTooltip,
  title,
}) => (
  <ResultDetailWithDetails
    heading={title}
    headingDetail={heading}
    hook={probed}
    moreDetail={details}
    details={[
      {
        caption: strategyCaption,
        children: strategyBody,
        tooltip: strategyTooltip,
      },
    ]}
  />
);
Vector.displayName = 'Vector';
