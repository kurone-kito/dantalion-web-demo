import type { VFC } from 'react';
import 'twin.macro';

/**
 * Hello, world!
 *
 * @returns The hello, world! component.
 */
export const Hello: VFC = () => <p tw="text-red-300">Hello, world!</p>;
Hello.displayName = 'Hello';
