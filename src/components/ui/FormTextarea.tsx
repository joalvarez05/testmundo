import React from "react";

interface FormTextareaProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  rows?: number;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  rows = 4,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 transition-all duration-200 ease-in-out resize-none ${
          error
            ? "border-red-500 focus:ring-red-200 focus:border-red-500"
            : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormTextarea;
