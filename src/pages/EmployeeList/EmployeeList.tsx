import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "nikx-ui";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TablePagination } from "../../components/TablePagination/TablePagination";
import { Employee, employeeService } from "../../services/employeeService";
import "./EmployeeList.scss";

const EmployeeList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof Employee | undefined>();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const allEmployees = employeeService.getAllEmployees();
    setEmployees(allEmployees);
  }, []);

  const columns: {
    header: string;
    accessor: keyof Employee;
    sortable?: boolean;
  }[] = [
    { header: "First Name", accessor: "firstName", sortable: true },
    { header: "Last Name", accessor: "lastName", sortable: true },
    { header: "Start Date", accessor: "startDate", sortable: true },
    { header: "Department", accessor: "department", sortable: true },
    { header: "Date of Birth", accessor: "dateOfBirth", sortable: true },
    { header: "Street", accessor: "street", sortable: true },
    { header: "City", accessor: "city", sortable: true },
    { header: "State", accessor: "state", sortable: true },
    { header: "Zip Code", accessor: "zipCode", sortable: true },
  ];

  const handleSort = (column: keyof Employee) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredData = employeeService.searchEmployees(searchTerm);

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn].toString().toLowerCase();
    const bValue = b[sortColumn].toString().toLowerCase();

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = sortedData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedData.length / pageSize);

  // Reset to first page when search term changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, pageSize]);
  /*
  const handleGenerateTestData = () => {
    const testEmployees = generateTestEmployees(120);
    testEmployees.forEach((employee) => {
      employeeService.addEmployee(employee);
    });
    setEmployees(employeeService.getAllEmployees());
  };*/

  return (
    <div className="employee-list-container">
      <div className="employee-list">
        <div className="employee-list__header">
          <h1>Current Employees</h1>
          <div className="employee-list__header-buttons">
            {/*<Button onClick={handleGenerateTestData}>Generate Test Data</Button>*/}
            <Link to="/create-employee">
              <Button>Add New Employee</Button>
            </Link>
          </div>
        </div>

        <div className="employee-list__controls">
          <div className="employee-list__show-entries">
            <label htmlFor="page-size-select">Show</label>
            <select
              id="page-size-select"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              aria-label="Nombre d'entrées à afficher par page"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>entries</span>
          </div>
          <div className="employee-list__search">
            <label htmlFor="search-input">Search:</label>
            <input
              id="search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search employees... (e.g. firstname:John lastname:Hilario)"
            />
          </div>
          <small className="search-help">
            You can search by specific fields using: firstname:, lastname:,
            department:, city:, state:, zipcode:, street:, startdate:,
            dateofbirth:
          </small>
        </div>

        <Table className="employee-list__table">
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.accessor}
                  sortable={column.sortable}
                  sorted={sortColumn === column.accessor}
                  sortDirection={sortDirection}
                  onSort={() => column.sortable && handleSort(column.accessor)}
                  column={column.accessor}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody isEmpty={currentData.length === 0}>
            {currentData.map((employee, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell
                    key={column.accessor}
                    content={employee[column.accessor]}
                  >
                    {employee[column.accessor]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredData.length > 0 && (
          <div className="employee-list__footer">
            <p className="employee-list__showing-entries">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredData.length)} of {filteredData.length}{" "}
              entries
              {searchTerm &&
                ` (filtered from ${employees.length} total entries)`}
            </p>
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
