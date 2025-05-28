import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button, Input, Select } from "nikx-ui";
import Modal from "../../components/Modal/Modal";
import { states } from "../../data/states";
import { Employee, employeeService } from "../../services/employeeService";
import "./CreateEmployee.scss";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  startDate?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  department?: string;
}

export function CreateEmployee() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [startDate, setStartDate] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const validateField = (
    field: keyof FormErrors,
    value: string
  ): string | undefined => {
    const birthDate = new Date(value);
    const today = new Date();
    const minAge = 16; // Âge minimum pour être employé
    const maxAge = 100; // Âge maximum raisonnable
    const age = today.getFullYear() - birthDate.getFullYear();
    const startDate = new Date(value);
    const maxFutureDate = new Date(
      today.getFullYear() + 1,
      today.getMonth(),
      today.getDate()
    );

    switch (field) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        if (value.length < 2) return "First name must be at least 2 characters";
        if (!/^[a-zA-Z\s-']+$/.test(value))
          return "First name can only contain letters, spaces, hyphens and apostrophes";
        return undefined;

      case "lastName":
        if (!value.trim()) return "Last name is required";
        if (value.length < 2) return "Last name must be at least 2 characters";
        if (!/^[a-zA-Z\s-']+$/.test(value))
          return "Last name can only contain letters, spaces, hyphens and apostrophes";
        return undefined;

      case "dateOfBirth":
        if (!value) return "Date of birth is required";
        if (birthDate >= today) return "Date of birth must be in the past";
        if (age < minAge)
          return `Employee must be at least ${minAge} years old`;
        if (age > maxAge) return `Age cannot exceed ${maxAge} years`;
        return undefined;

      case "startDate":
        if (!value) return "Start date is required";
        if (startDate > maxFutureDate) {
          return "Start date cannot be more than one year in the future";
        }
        return undefined;

      case "street":
        if (!value.trim()) return "Street is required";
        if (value.length < 5)
          return "Street address must be at least 5 characters";
        if (!/^[a-zA-Z0-9\s.,-]+$/.test(value))
          return "Street address contains invalid characters";
        return undefined;

      case "city":
        if (!value.trim()) return "City is required";
        if (value.length < 2) return "City name must be at least 2 characters";
        if (!/^[a-zA-Z\s-]+$/.test(value))
          return "City name can only contain letters, spaces and hyphens";
        return undefined;

      case "state":
        if (!value) return "State is required";
        return undefined;

      case "zipCode":
        if (!value.trim()) return "Zip code is required";
        if (!/^\d{5}(-\d{4})?$/.test(value))
          return "Zip code must be in format 12345 or 12345-6789";
        return undefined;

      case "department":
        if (!value) return "Department is required";
        return undefined;

      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    newErrors.firstName = validateField("firstName", firstName);
    newErrors.lastName = validateField("lastName", lastName);
    newErrors.dateOfBirth = validateField("dateOfBirth", dateOfBirth);
    newErrors.startDate = validateField("startDate", startDate);
    newErrors.street = validateField("street", street);
    newErrors.city = validateField("city", city);
    newErrors.state = validateField("state", state);
    newErrors.zipCode = validateField("zipCode", zipCode);
    newErrors.department = validateField("department", selectedDepartment);

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleFieldChange = (
    field: keyof FormErrors,
    value: string,
    setter: (value: string) => void
  ) => {
    setter(value);
    if (hasSubmitted) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (validateForm()) {
      const newEmployee: Employee = {
        firstName,
        lastName,
        dateOfBirth,
        startDate,
        department: selectedDepartment,
        street,
        city,
        state,
        zipCode,
      };

      employeeService.addEmployee(newEmployee);
      setShowConfirmationModal(true);
    }
  };

  const handleStayOnPage = () => {
    setShowConfirmationModal(false);
    // Réinitialiser le formulaire
    setFirstName("");
    setLastName("");
    setDateOfBirth("");
    setStartDate("");
    setStreet("");
    setCity("");
    setState("");
    setZipCode("");
    setSelectedDepartment("");
    setErrors({});
    setHasSubmitted(false);
  };

  const handleGoToList = () => {
    navigate("/");
  };

  return (
    <>
      <div className="add-employee">
        <div className="add-employee--header">
          <Link to="/">
            <Button type="button" variant="ghost-icon" className="back-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m10.8 12l3.9 3.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.212-.325T8.425 12t.063-.375t.212-.325l4.6-4.6q.275-.275.7-.275t.7.275t.275.7t-.275.7z"
                />
              </svg>
            </Button>
          </Link>
          <h1>Create Employee</h1>
          <div></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <Input
              placeholder="John"
              label="First Name"
              value={firstName}
              onChange={(e) =>
                handleFieldChange("firstName", e.target.value, setFirstName)
              }
              error={errors.firstName}
            />
            <Input
              placeholder="Doe"
              label="Last Name"
              value={lastName}
              onChange={(e) =>
                handleFieldChange("lastName", e.target.value, setLastName)
              }
              error={errors.lastName}
            />
          </div>
          <div className="form-row">
            <Input
              type="date"
              placeholder="01/01/1990"
              label="Date of Birth"
              value={dateOfBirth}
              onChange={(e) =>
                handleFieldChange("dateOfBirth", e.target.value, setDateOfBirth)
              }
              error={errors.dateOfBirth}
            />
            <Input
              type="date"
              placeholder="01/01/2023"
              label="Start Date"
              value={startDate}
              onChange={(e) =>
                handleFieldChange("startDate", e.target.value, setStartDate)
              }
              error={errors.startDate}
            />
          </div>
          <div className="address form-p">
            <span className="address-title">Address</span>
            <div className="address-content">
              <div className="form-row">
                <Input
                  type="text"
                  placeholder="123 Main St"
                  label="Street"
                  value={street}
                  onChange={(e) =>
                    handleFieldChange("street", e.target.value, setStreet)
                  }
                  error={errors.street}
                />
                <Input
                  type="text"
                  placeholder="New York"
                  label="City"
                  value={city}
                  onChange={(e) =>
                    handleFieldChange("city", e.target.value, setCity)
                  }
                  error={errors.city}
                />
              </div>
              <div className="form-row">
                <Select
                  label="State"
                  placeholder="Select a state"
                  options={states.map((state) => ({
                    value: state.abbreviation,
                    label: state.name,
                  }))}
                  value={state}
                  onChange={(e) =>
                    handleFieldChange("state", e.target.value, setState)
                  }
                  error={errors.state}
                />
                <Input
                  type="text"
                  placeholder="10001"
                  label="Zip Code"
                  value={zipCode}
                  onChange={(e) =>
                    handleFieldChange("zipCode", e.target.value, setZipCode)
                  }
                  error={errors.zipCode}
                />
              </div>
            </div>
          </div>
          <Select
            label="Department"
            placeholder="Select a department"
            options={[
              { value: "sales", label: "Sales" },
              { value: "marketing", label: "Marketing" },
              { value: "hr", label: "Human Resources" },
              { value: "legal", label: "Legal" },
            ]}
            value={selectedDepartment}
            onChange={(e) =>
              handleFieldChange(
                "department",
                e.target.value,
                setSelectedDepartment
              )
            }
            error={errors.department}
          />
          <div className="button-container">
            <Button type="submit" className="saveButton">
              Save
            </Button>
            <Link to="/" className="linkCancel">
              <Button type="button" variant="ghost" className="cancelButton">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>

      <Modal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        title="Employee Added Successfully"
        className="modal-confirmation"
      >
        <p>The employee has been successfully added to the system.</p>
        <div className="modal-actions">
          <Button
            type="button"
            variant="ghost"
            onClick={handleStayOnPage}
            className="modal-button"
          >
            Add Another Employee
          </Button>
          <Button
            type="button"
            onClick={handleGoToList}
            className="modal-button"
          >
            Go to Employee List
          </Button>
        </div>
      </Modal>
    </>
  );
}
