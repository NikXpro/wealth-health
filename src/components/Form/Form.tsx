import React from "react";
import "./Form.scss";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  label?: string;
}

interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ children, ...props }, ref) => (
    <form ref={ref} className="form" {...props}>
      {children}
    </form>
  )
);
Form.displayName = "Form";

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ children, label, ...props }, ref) => (
    <div ref={ref} className="form-field" {...props}>
      {label && <label className="form-field__label">{label}</label>}
      <div className="form-field__input">{children}</div>
    </div>
  )
);
FormField.displayName = "FormField";

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ children, title, ...props }, ref) => (
    <div ref={ref} className="form-section" {...props}>
      {title && <h2 className="form-section__title">{title}</h2>}
      <div className="form-section__content">{children}</div>
    </div>
  )
);
FormSection.displayName = "FormSection";

export { Form, FormField, FormSection };
