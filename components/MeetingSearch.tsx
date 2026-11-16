
interface MeetingSearchProps {
  query: string;
}

export default function MeetingSearch({ query }: MeetingSearchProps) {
  return (
    <form
      action="/meetings"
      method="GET"
      className="flex w-full max-w-md gap-2"
    >
      <input
        type="search"
        name="query"
        defaultValue={query}
        placeholder="Search meetings..."
        className="min-w-0 flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
      />

      <button
        type="submit"
        className="rounded-lg bg-blue-950 px-5 py-2 font-medium text-white hover:bg-blue-900"
      >
        Search
      </button>
    </form>
  );
}
