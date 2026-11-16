
import Link from "next/link";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  query: string;
}

export default function Pagination({
  totalPages,
  currentPage,
  query,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();

    if (query) {
      params.set("query", query);
    }

    params.set("page", String(page));

    return `/meetings?${params.toString()}`;
  };

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-4"
    >
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-lg border border-gray-200 px-4 py-2 text-gray-400">
          Previous
        </span>
      )}

      <span className="text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-lg border border-gray-200 px-4 py-2 text-gray-400">
          Next
        </span>
      )}
    </nav>
  );
}
