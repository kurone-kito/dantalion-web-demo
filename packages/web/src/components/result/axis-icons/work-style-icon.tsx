export type IconProps = { class?: string };

export function WorkStyleIcon(props: IconProps) {
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
      <rect height="4" rx="1" width="14" x="5" y="8" />
      <path d="M9 8V5h6v3M5 12h14M12 12v9" />
    </svg>
  );
}
