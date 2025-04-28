export interface Employee {
  firstName: string;
  lastName: string;
  startDate: string;
  department: string;
  dateOfBirth: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

const STORAGE_KEY = "employees";

export const employeeService = {
  // Récupérer tous les employés
  getAllEmployees: (): Employee[] => {
    const employees = localStorage.getItem(STORAGE_KEY);
    return employees ? JSON.parse(employees) : [];
  },

  // Ajouter un nouvel employé
  addEmployee: (employee: Employee): void => {
    const employees = employeeService.getAllEmployees();
    employees.push(employee);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  },

  // Supprimer un employé
  deleteEmployee: (index: number): void => {
    const employees = employeeService.getAllEmployees();
    employees.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  },

  // Mettre à jour un employé
  updateEmployee: (index: number, employee: Employee): void => {
    const employees = employeeService.getAllEmployees();
    employees[index] = employee;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  },

  // Rechercher des employés
  searchEmployees: (searchTerm: string): Employee[] => {
    const employees = employeeService.getAllEmployees();
    if (!searchTerm.trim()) return employees;

    // Gestion de la recherche par champs spécifiques
    const fieldSearchRegex = /(\w+):([^:]+)/g;
    const fieldSearches = Array.from(searchTerm.matchAll(fieldSearchRegex));

    // Extraire les termes de recherche globaux (ceux qui ne sont pas dans un champ spécifique)
    const globalSearchTerms = searchTerm
      .replace(fieldSearchRegex, "") // Enlever les recherches par champs
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter((term) => term.length > 0);

    return employees.filter((employee) => {
      // Vérifier les recherches par champs spécifiques
      const fieldSearchMatch = fieldSearches.every(([, field, value]) => {
        const searchValue = value.toLowerCase().trim();
        const fieldName = field.toLowerCase();

        switch (fieldName) {
          case "firstname":
            return employee.firstName.toLowerCase().includes(searchValue);
          case "lastname":
            return employee.lastName.toLowerCase().includes(searchValue);
          case "department":
            return employee.department.toLowerCase().includes(searchValue);
          case "city":
            return employee.city.toLowerCase().includes(searchValue);
          case "state":
            return employee.state.toLowerCase().includes(searchValue);
          case "zipcode":
            return employee.zipCode.toLowerCase().includes(searchValue);
          case "street":
            return employee.street.toLowerCase().includes(searchValue);
          case "startdate":
            return employee.startDate.toLowerCase().includes(searchValue);
          case "dateofbirth":
            return employee.dateOfBirth.toLowerCase().includes(searchValue);
          default:
            return false;
        }
      });

      // Vérifier les termes de recherche globaux
      const globalSearchMatch = globalSearchTerms.every((term) => {
        return (
          employee.firstName.toLowerCase().includes(term) ||
          employee.lastName.toLowerCase().includes(term) ||
          employee.department.toLowerCase().includes(term) ||
          employee.city.toLowerCase().includes(term) ||
          employee.state.toLowerCase().includes(term) ||
          employee.zipCode.toLowerCase().includes(term) ||
          employee.street.toLowerCase().includes(term) ||
          employee.startDate.toLowerCase().includes(term) ||
          employee.dateOfBirth.toLowerCase().includes(term)
        );
      });

      // L'employé doit correspondre à la fois aux recherches par champs ET aux recherches globales
      return (
        fieldSearchMatch &&
        (globalSearchTerms.length === 0 || globalSearchMatch)
      );
    });
  },
};
