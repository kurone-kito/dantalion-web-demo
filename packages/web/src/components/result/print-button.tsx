import { useWebCopy } from '../../i18n/web-copy';

export function PrintButton() {
  const copy = useWebCopy();
  const handlePrint = () => {
    if (typeof window === 'undefined') {
      return;
    }
    window.print();
  };
  return (
    <button
      class="btn btn-outline btn-sm"
      data-print-hidden="true"
      onClick={handlePrint}
      type="button"
    >
      {copy().result.printLabel}
    </button>
  );
}
