export type IconProps = { class?: string };

export function InnerIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      class={props.class ?? 'size-5'}
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.75"
      viewBox="0 0 24 24"
    >
      <path d="M12 21s-7-4.55-9-9.2C1.4 8 3.5 4 7.5 4c2.05 0 3.7 1.05 4.5 2.5C12.8 5.05 14.45 4 16.5 4c4 0 6.1 4 4.5 7.8C19 16.45 12 21 12 21z" />
    </svg>
  );
}
