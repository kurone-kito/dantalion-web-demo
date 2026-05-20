import { Link, Meta, Title } from '@solidjs/meta';
import { createMemo, For } from 'solid-js';
import { type BuildMetaInput, buildMeta } from '../lib/meta';

export function RouteMeta(props: BuildMetaInput) {
  const meta = createMemo(() => buildMeta(props));

  return (
    <>
      <Title>{meta().title}</Title>
      <For each={meta().metaTags}>{(entry) => <Meta {...entry} />}</For>
      <For each={meta().links}>{(entry) => <Link {...entry} />}</For>
    </>
  );
}
