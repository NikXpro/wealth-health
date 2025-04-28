import React from "react";
import "./Input.scss";

interface InputProps {
  prefix?: string;
  suffix?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  prefix,
  suffix,
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  error,
}) => {
  const inputType = type === "date" ? "date" : type;

  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <div className={`input-group ${error ? "input-group--error" : ""}`}>
        {prefix && <span className="input-group__prefix">{prefix}</span>}
        <input
          className={`input-group__field ${
            type === "date" ? "input-group__field--date" : ""
          }`}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${label}-error` : undefined}
        />
        {suffix && <span className="input-group__suffix">{suffix}</span>}
        {error && (
          <span
            className={`input-group__error-icon ${
              type === "date" ? "input-group__error-icon--date" : ""
            }`}
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </span>
        )}
      </div>
      {error && (
        <span id={`${label}-error`} className="input-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
