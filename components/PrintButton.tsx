
"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-lg bg-blue-950 px-5 py-2 text-sm font-medium text-white hover:bg-blue-800 print:hidden"
    >
      Print Meeting Programme
    </button>
  );
}
