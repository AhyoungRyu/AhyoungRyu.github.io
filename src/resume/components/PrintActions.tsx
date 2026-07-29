"use client";

type PrintActionsProps = {
  pdfHref: string;
  pdfLabel: string;
  printLabel: string;
};

export function PrintActions({
  pdfHref,
  pdfLabel,
  printLabel,
}: PrintActionsProps) {
  return (
    <div className="print-actions">
      <a className="text-link" href={pdfHref} download>
        {pdfLabel}
      </a>
      <button
        className="text-button"
        onClick={() => window.print()}
        type="button"
      >
        {printLabel}
      </button>
    </div>
  );
}
