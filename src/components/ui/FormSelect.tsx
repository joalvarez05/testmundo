import React from "react";

interface Option {
  value: string;
  label: string;
  subtitle?: string;
}

interface FormSelectProps {
  id: string;
  label: string;
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  error,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 transition-all duration-200 ease-in-out appearance-none bg-white ${
          error
            ? "border-red-500 focus:ring-red-200 focus:border-red-500"
            : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
        }`}
        value={value}
        onChange={onChange}
      >
        <option disabled>
          Selecciona una opción
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormSelect;
