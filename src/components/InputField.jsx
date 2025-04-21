import { useState, useEffect } from 'react';

const InputField = ({ label, placeholder, value, onChange, required }) => {
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    // Reset error when value changes
    if (value) setTouched(false);
  }, [value]);

  return (
    <div className="my-4">
      <label className="block font-medium mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        className={`w-full border rounded px-3 py-2 ${
          required && touched && !value ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={() => setTouched(true)}
        required={required}
      />
      {required && touched && !value && (
        <p className="text-red-600 text-sm mt-1">This field is required.</p>
      )}
    </div>
  );
};

export default InputField;