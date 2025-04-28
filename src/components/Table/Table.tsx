import React from "react";
import "./Table.scss";

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
  isEmpty?: boolean;
  emptyMessage?: string;
}

interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

interface TableHeadProps extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  sortable?: boolean;
  sorted?: boolean;
  sortDirection?: "asc" | "desc";
  onSort?: () => void;
  column?: string;
}

interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  content?: string;
}

interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {
  children: React.ReactNode;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, children, ...props }, ref) => {
    const isEmpty = React.Children.toArray(children).some((child) => {
      if (!React.isValidElement(child)) return false;
      if (child.type !== TableBody) return false;
      const bodyProps = child.props as TableBodyProps;
      return bodyProps.isEmpty === true;
    });

    return (
      <div className="table-container">
        <table
          ref={ref}
          className={`table ${isEmpty ? "empty" : ""} ${className || ""}`}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  }
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={`table-header ${className || ""}`} {...props} />
  )
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, isEmpty, emptyMessage = "No data found", ...props }, ref) => {
    if (isEmpty) {
      let columnCount = 1;
      if (typeof document !== "undefined") {
        const headerRow = document.querySelector(".table-header tr");
        columnCount = headerRow ? headerRow.children.length : 1;
      }

      return (
        <tbody ref={ref} className={`table-body ${className || ""}`}>
          <tr className="empty-row">
            <td colSpan={columnCount} className="table-empty">
              {emptyMessage}
            </td>
          </tr>
        </tbody>
      );
    }
    return (
      <tbody ref={ref} className={`table-body ${className || ""}`} {...props} />
    );
  }
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={`table-footer ${className || ""}`} {...props} />
  )
);
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={`table-row ${className || ""}`} {...props} />
  )
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    { className, sortable, sorted, sortDirection, onSort, column, ...props },
    ref
  ) => (
    <th
      ref={ref}
      className={`table-head ${sortable ? "sortable" : ""} ${
        sorted ? "sorted" : ""
      } ${className || ""}`}
      onClick={sortable ? onSort : undefined}
      data-column={column}
      {...props}
    >
      <div className="table-head-content">
        <span className="column-title">{props.children}</span>
        {sortable && (
          <span className={`sort-indicator ${sorted ? "visible" : ""}`}>
            {sorted ? (sortDirection === "asc" ? "▲" : "▼") : "▼"}
          </span>
        )}
      </div>
    </th>
  )
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <td ref={ref} className={`table-cell ${className || ""}`} {...props}>
        {children}
      </td>
    );
  }
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={`table-caption ${className || ""}`}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
