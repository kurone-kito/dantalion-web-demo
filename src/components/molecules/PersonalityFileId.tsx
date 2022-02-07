import type { ReactNode, VFC } from 'react';
import { InlineMarkdown } from '../atoms/InlineMarkdown';
import { ResultFrame } from '../atoms/ResultFrame';

/** Type definition of the required attributes. */
export interface PersonalityFileIdProps {
  /** Specifies the heading. */
  readonly caption?: ReactNode;
  /** The children items. */
  readonly children?: string;
}

/**
 * The personality file component
 *
 * @param props required attributes.
 * @param props.caption Specifies the heading.
 * @param props.children Specifies the heading.
 * @returns the component.
 */
export const PersonalityFileId: VFC<PersonalityFileIdProps> = ({
  caption,
  children,
}) => (
  <ResultFrame>
    {caption}:&nbsp;<InlineMarkdown>{`\`${children}\``}</InlineMarkdown>
  </ResultFrame>
);
PersonalityFileId.displayName = 'PersonalityFileId';
