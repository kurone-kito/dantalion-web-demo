export type IconProps = { class?: string };

export function OuterIcon(props: IconProps) {
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
      <path d="M12 3l3 4h4l-2.5 4 2 5-6.5-2.5L5.5 16l2-5L5 7h4z" />
    </svg>
  );
}
