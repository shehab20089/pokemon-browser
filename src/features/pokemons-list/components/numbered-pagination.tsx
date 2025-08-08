import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  totalCount: number;
  isFetching?: boolean;
};

function getPageItems(
  current: number,
  total: number,
  windowSize = 5
): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = [];
  if (total <= windowSize + 2) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }

  let start = Math.max(1, current - Math.floor(windowSize / 2));
  let end = start + windowSize - 1;
  if (end > total) {
    end = total;
    start = Math.max(1, end - windowSize + 1);
  }

  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push("ellipsis");
  }

  for (let i = start; i <= end; i++) pages.push(i);

  if (end < total) {
    if (end < total - 1) pages.push("ellipsis");
    pages.push(total);
  }
  return pages;
}

export default function NumberedPagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  totalCount,
  isFetching,
}: Props) {
  const pageItems = getPageItems(currentPage, totalPages);
  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;
  const shownCount = Math.min(
    pageSize,
    Math.max(0, totalCount - (currentPage - 1) * pageSize)
  );

  return (
    <div className="space-y-2 text-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (!prevDisabled) onPageChange(currentPage - 1);
              }}
              className={prevDisabled ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {pageItems.map((item, idx) => (
            <PaginationItem key={`${item}-${idx}`}>
              {item === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  isActive={item === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item !== currentPage) onPageChange(item as number);
                  }}
                >
                  {item}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (!nextDisabled) onPageChange(currentPage + 1);
              }}
              className={nextDisabled ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="text-xs text-muted-foreground">
        Page {currentPage} of {isFetching ? "…" : totalPages} ({shownCount}{" "}
        Pokémon shown)
      </div>
    </div>
  );
}
