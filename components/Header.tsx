
import { connection } from "next/server";

export default async function Header() {
  await connection();

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="bg-blue-950 px-6 py-5 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <div>
          <h1 className="text-2xl font-bold">
            Sacrament Meeting Planner
          </h1>

          <p className="text-sm text-blue-200">
            Ward Meeting Programs
          </p>
        </div>

        <p className="text-sm text-blue-100">
          {formattedDate}
        </p>
      </div>
    </header>
  );
}
