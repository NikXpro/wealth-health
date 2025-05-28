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

// Fonction utilitaire pour gérer les wildcards
const matchesWithWildcard = (text: string, pattern: string): boolean => {
  // Si pas de wildcard, utiliser la recherche normale (includes)
  if (!pattern.includes("*")) {
    return text.toLowerCase().includes(pattern.toLowerCase());
  }

  // Convertir le pattern avec wildcards en regex
  // caracteres speciaux
  const escapedPattern = pattern
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\*/g, ".*"); // Remplacer * par .*

  const regex = new RegExp(escapedPattern, "i"); // i pour case insensitive, sans ^ et $ pour permettre la correspondance partielle
  return regex.test(text);
};

// Fonction utilitaire pour gérer les valeurs multiples (séparées par des virgules)
const matchesMultipleValues = (text: string, values: string): boolean => {
  // Séparer les valeurs par des virgules et nettoyer les espaces
  const valueList = values
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v.length > 0);

  // Si une seule valeur, utiliser la fonction normale
  if (valueList.length === 1) {
    return matchesWithWildcard(text, valueList[0]);
  }

  // Si plusieurs valeurs, vérifier si au moins une correspond (logique OU)
  return valueList.some((value) => matchesWithWildcard(text, value));
};

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

    // Regex améliorée pour capturer les tags avec des valeurs contenant des espaces
    // Supporte: field:value, field:"value with spaces", field:'value with spaces'
    const fieldSearchRegex = /(\w+):((?:"[^"]*")|(?:'[^']*')|(?:[^\s]+))/g;
    const fieldSearches = Array.from(searchTerm.matchAll(fieldSearchRegex));

    // Extraire les termes de recherche globaux (ceux qui ne sont pas dans un champ spécifique)
    let globalSearchText = searchTerm;

    // Supprimer tous les tags de la chaîne de recherche pour obtenir les termes globaux
    fieldSearches.forEach(([fullMatch]) => {
      globalSearchText = globalSearchText.replace(fullMatch, "");
    });

    const globalSearchTerms = globalSearchText
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter((term) => term.length > 0);

    return employees.filter((employee) => {
      // Vérifier les recherches par champs spécifiques (tags)
      const fieldSearchMatch = fieldSearches.every(([, field, value]) => {
        // Nettoyer la valeur en supprimant les guillemets si présents
        let searchValue = value.toLowerCase().trim();
        if (
          (searchValue.startsWith('"') && searchValue.endsWith('"')) ||
          (searchValue.startsWith("'") && searchValue.endsWith("'"))
        ) {
          searchValue = searchValue.slice(1, -1);
        }

        const fieldName = field.toLowerCase();

        switch (fieldName) {
          case "firstname":
            return matchesMultipleValues(
              employee.firstName.toLowerCase(),
              searchValue
            );
          case "lastname":
            return matchesMultipleValues(
              employee.lastName.toLowerCase(),
              searchValue
            );
          case "department":
            return matchesMultipleValues(
              employee.department.toLowerCase(),
              searchValue
            );
          case "city":
            return matchesMultipleValues(
              employee.city.toLowerCase(),
              searchValue
            );
          case "state":
            return matchesMultipleValues(
              employee.state.toLowerCase(),
              searchValue
            );
          case "zipcode":
            return matchesMultipleValues(
              employee.zipCode.toLowerCase(),
              searchValue
            );
          case "street":
            return matchesMultipleValues(
              employee.street.toLowerCase(),
              searchValue
            );
          case "startdate":
            return matchesMultipleValues(
              employee.startDate.toLowerCase(),
              searchValue
            );
          case "dateofbirth":
            return matchesMultipleValues(
              employee.dateOfBirth.toLowerCase(),
              searchValue
            );
          default:
            return false;
        }
      });

      // Vérifier les termes de recherche globaux
      const globalSearchMatch =
        globalSearchTerms.length === 0 ||
        globalSearchTerms.every((term) => {
          return (
            matchesMultipleValues(employee.firstName.toLowerCase(), term) ||
            matchesMultipleValues(employee.lastName.toLowerCase(), term) ||
            matchesMultipleValues(employee.department.toLowerCase(), term) ||
            matchesMultipleValues(employee.city.toLowerCase(), term) ||
            matchesMultipleValues(employee.state.toLowerCase(), term) ||
            matchesMultipleValues(employee.zipCode.toLowerCase(), term) ||
            matchesMultipleValues(employee.street.toLowerCase(), term) ||
            matchesMultipleValues(employee.startDate.toLowerCase(), term) ||
            matchesMultipleValues(employee.dateOfBirth.toLowerCase(), term)
          );
        });

      // L'employé doit correspondre à la fois aux recherches par champs ET aux recherches globales
      return fieldSearchMatch && globalSearchMatch;
    });
  },
};
