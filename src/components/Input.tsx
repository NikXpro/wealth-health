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
}

const Input: React.FC<InputProps> = ({
  prefix,
  suffix,
  type = "text",
  placeholder,
  value,
  onChange,
  label,
}) => {
  const inputType = type === "date" ? "date" : type;

  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <div className="input-group">
        {prefix && <span className="input-group__prefix">{prefix}</span>}
        <input
          className={`input-group__field ${
            type === "date" ? "input-group__field--date" : ""
          }`}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {suffix && <span className="input-group__suffix">{suffix}</span>}
      </div>
    </div>
  );
};

export default Input;
