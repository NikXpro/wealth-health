import { Button } from "nikx-ui";
import React from "react";

interface TablePaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const TablePagination = React.forwardRef<HTMLDivElement, TablePaginationProps>(
  ({ currentPage, totalPages, onPageChange, className, ...props }, ref) => {
    return (
      <div ref={ref} className={`pagination ${className}`} {...props}>
        <Button
          variant="primary"
          size="medium"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="primary"
          size="medium"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    );
  }
);

TablePagination.displayName = "TablePagination";

export { TablePagination };
