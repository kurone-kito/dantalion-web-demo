import type { ReactNode, VFC } from 'react';
import { ResultFrame } from '../atoms/ResultFrame';
import { TupleList } from '../molecules/TupleList';

/** Type definition of the required attributes. */
export interface MotivationProps {
  readonly body?: ReactNode;
  readonly title?: ReactNode;
}

/**
 * The motivation detail component.
 *
 * @param props required attributes.
 * @param props.body
 * @param props.title
 * @returns the component.
 */
export const Motivation: VFC<MotivationProps> = ({ body, title }) => (
  <ResultFrame>
    <div tw="[& > ol, & > ul]:(list-disc pl-8)">
      <TupleList>{[[title, body]]}</TupleList>
    </div>
  </ResultFrame>
);
Motivation.displayName = 'Motivation';
