import type { VFC } from 'react';
import * as React from 'react';
import type { Options } from 'react-markdown';
import ReactMarkdown from 'react-markdown';

/**
 * The inline markdown component
 *
 * @param props required attributes.
 * @param props.children the children items.
 * @param props.components the components.
 * @returns the component.
 */
export const InlineMarkdown: VFC<Options> = ({
  children,
  components,
  ...props
}) => (
  <ReactMarkdown
    className="markdown"
    components={{ p: ({ children: c }) => <>{c}</>, ...components }}
    tw="text-gray-700 dark:text-gray-200"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    {children}
  </ReactMarkdown>
);
InlineMarkdown.displayName = 'InlineMarkdown';
