import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
            <Button
              variant="outline"
              size="lg"
              disabled={prevDisabled}
              onClick={() => onPageChange(currentPage - 1)}
              aria-label="Go to previous page"
              className="gap-1"
            >
              <ChevronLeftIcon /> Previous
            </Button>
          </PaginationItem>
          {pageItems.map((item, idx) => (
            <PaginationItem key={`${item}-${idx}`}>
              {item === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <Button
                  variant={item === currentPage ? "default" : "outline"}
                  size="icon"
                  aria-current={item === currentPage ? "page" : undefined}
                  onClick={() =>
                    item !== currentPage && onPageChange(item as number)
                  }
                  className={cn(
                    item === currentPage ? "" : "bg-background",
                    "h-10 w-9"
                  )}
                >
                  {item}
                </Button>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <Button
              variant="outline"
              size="lg"
              disabled={nextDisabled}
              onClick={() => onPageChange(currentPage + 1)}
              aria-label="Go to next page"
              className="gap-1"
            >
              Next <ChevronRightIcon />
            </Button>
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
