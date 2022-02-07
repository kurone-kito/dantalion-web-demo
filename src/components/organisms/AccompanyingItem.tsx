import type { ReactNode, VFC } from 'react';
import { InlineMarkdown } from '../atoms/InlineMarkdown';
import { ResultDetail as MoleculesResultDetail } from '../molecules/ResultDetail';

/** Type definition of the required attributes. */
export interface AccompanyingItemProps {
  readonly detail?: string;
  readonly heading?: string;
  readonly moreDetails?: readonly string[];
  readonly probed?: string;
  readonly title?: ReactNode;
}

export const AccompanyingItem: VFC<AccompanyingItemProps> = ({
  detail = '',
  heading,
  moreDetails,
  probed = '',
  title,
}) => (
  <MoleculesResultDetail
    hookAdditional={<InlineMarkdown>{detail}</InlineMarkdown>}
    heading={title}
    headingDetail={heading}
    hook={<InlineMarkdown>{probed}</InlineMarkdown>}
    moreDetail={moreDetails}
  />
);
