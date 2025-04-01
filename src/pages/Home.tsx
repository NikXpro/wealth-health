import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import { states } from "../data/states";
import "./Home.scss";

export function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [startDate, setStartDate] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  return (
    <>
      <div className="add-employee">
        <form>
          <div className="form-row">
            <Input
              placeholder="First Name"
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              placeholder="Last Name"
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-row">
            <Input
              type="date"
              placeholder="Date of Birth"
              label="Date of Birth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            <Input
              type="date"
              placeholder="Start Date"
              label="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="address form-p">
            <span className="address-title">Address</span>
            <div className="address-content">
              <div className="form-row">
                <Input
                  type="text"
                  placeholder="Street"
                  label="Street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="City"
                  label="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
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
                  onChange={(e) => setState(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Zip Code"
                  label="Zip Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
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
            ]}
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          />
          <Button type="submit">Save</Button>
        </form>
      </div>
    </>
  );
}
