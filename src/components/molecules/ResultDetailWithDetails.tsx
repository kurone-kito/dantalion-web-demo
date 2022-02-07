import type { ReactNode, VFC } from 'react';
import type { DetailsProps } from './Details';
import { Details } from './Details';
import { ResultDetail } from './ResultDetail';

/** Type definition of the required attributes. */
export interface ResultDetailWithDetailsProps {
  /** The children items */
  readonly children?: ReactNode;
  /** Specifies the details items */
  readonly details?: readonly Pick<
    DetailsProps,
    'caption' | 'children' | 'tooltip'
  >[];
  /** Specifies the heading */
  readonly heading?: ReactNode;
  /** Specifies the detail of heading */
  readonly headingDetail?: string;
  /** Specifies the hook text */
  readonly hook?: ReactNode;
  /** Specifies the more detail */
  readonly moreDetail?: readonly string[];
}

/**
 * The result component with details.
 *
 * @param props required attributes.
 * @param props.children children items.
 * @param props.heading heading.
 * @param props.headingDetail detail of heading.
 * @param props.hook hook text.
 * @param props.moreDetail more detail.
 * @param props.details details items.
 * @returns the component.
 */
export const ResultDetailWithDetails: VFC<ResultDetailWithDetailsProps> = ({
  children,
  heading,
  headingDetail,
  hook,
  moreDetail,
  details,
}) => {
  return (
    <ResultDetail
      heading={heading}
      headingDetail={headingDetail}
      hook={hook}
      moreDetail={moreDetail}
    >
      {details?.map(({ caption, children: c, tooltip }, index) => (
        <Details caption={caption} key={index} tooltip={tooltip}>
          {c}
        </Details>
      ))}
      {children}
    </ResultDetail>
  );
};
