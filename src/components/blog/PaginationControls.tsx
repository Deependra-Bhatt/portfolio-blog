// src/components/blog/PaginationControls.tsx
import Link from "next/link";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  basePath,
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  // Shared tailwind utility classes for layout uniformity
  const activeBtnStyles =
    "border-2 border-black p-2 font-black transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-0 active:translate-y-0 text-black";
  const disabledBtnStyles =
    "opacity-40 p-2 border-2 border-dashed border-zinc-400 dark:border-zinc-600 cursor-not-allowed select-none text-zinc-400";

  return (
    <section className="mt-16 w-full md:w-auto md:min-w-[450px] mx-auto flex justify-between items-center border-4 border-black dark:border-white bg-white dark:bg-zinc-900 p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
      {/* LEFT NAVIGATION GROUPS */}
      <div className="flex items-center gap-2">
        {/* Jump to First Page [<<] */}
        {currentPage > 1 ? (
          <Link
            href={`${basePath}?page=1`}
            className={`${activeBtnStyles} bg-zinc-200 dark:bg-zinc-100`}
            title="First Page"
          >
            <IconChevronsLeft stroke={3} size={16} />
          </Link>
        ) : (
          <span className={disabledBtnStyles}>
            <IconChevronsLeft stroke={2} size={16} />
          </span>
        )}

        {/* Previous Page [<] */}
        {currentPage > 1 ? (
          <Link
            href={`${basePath}?page=${currentPage - 1}`}
            className={`${activeBtnStyles} bg-pink-500 text-white dark:text-white`}
            title="Previous Page"
          >
            <IconChevronLeft stroke={3} size={16} />
          </Link>
        ) : (
          <span className={disabledBtnStyles}>
            <IconChevronLeft stroke={2} size={16} />
          </span>
        )}
      </div>

      {/* CENTER STATUS METRIC MODULE */}
      <div className="font-black uppercase text-sm tracking-tighter mx-4 select-none">
        <span className="text-indigo-600 dark:text-indigo-400">
          {currentPage}
        </span>{" "}
        / {totalPages}
      </div>

      {/* RIGHT NAVIGATION GROUPS */}
      <div className="flex items-center gap-2">
        {/* Next Page [>] */}
        {currentPage < totalPages ? (
          <Link
            href={`${basePath}?page=${currentPage + 1}`}
            className={`${activeBtnStyles} bg-orange-500`}
            title="Next Page"
          >
            <IconChevronRight stroke={3} size={16} />
          </Link>
        ) : (
          <span className={disabledBtnStyles}>
            <IconChevronRight stroke={2} size={16} />
          </span>
        )}

        {/* Jump to Last Page [>>] */}
        {currentPage < totalPages ? (
          <Link
            href={`${basePath}?page=${totalPages}`}
            className={`${activeBtnStyles} bg-zinc-200 dark:bg-zinc-100`}
            title="Terminal Page"
          >
            <IconChevronsRight stroke={3} size={16} />
          </Link>
        ) : (
          <span className={disabledBtnStyles}>
            <IconChevronsRight stroke={2} size={16} />
          </span>
        )}
      </div>
    </section>
  );
}
