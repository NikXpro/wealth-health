import { faker } from "@faker-js/faker";
import { Employee } from "../services/employeeService";

const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "Human Resources",
  "Finance",
  "IT",
  "Operations",
  "Customer Service",
  "Research & Development",
  "Legal",
];

export const generateTestEmployees = (count: number): Employee[] => {
  const employees: Employee[] = [];

  for (let i = 0; i < count; i++) {
    const startDate = faker.date.past({ years: 5 }).toISOString().split("T")[0];
    const dateOfBirth = faker.date
      .birthdate({ min: 18, max: 65, mode: "age" })
      .toISOString()
      .split("T")[0];

    const employee: Employee = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      startDate,
      department: faker.helpers.arrayElement(departments),
      dateOfBirth,
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
    };

    employees.push(employee);
  }

  return employees;
};
