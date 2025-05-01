

import React from "react";
import { validationRules } from "../../utils/validationRules";
import { toast } from "react-toastify";

const Form = ({ config, handleSubmit, handleChange, intialValues }) => {
  const validateFields = () => {
    for (let field of config) {
      const value = intialValues[field.name];
      const rule = field.validations?.rule;
      if (!value || value.trim() === "") {
        toast.error(`${field.label} is required`, { autoClose: 1000 });
        return false;
      }
      if (rule && validationRules[rule]) {
        const error = validationRules[rule](value);
        if (error) {
          toast.error(error, { autoClose: 1000 });
          return false;
        }
      }
    }
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {config.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            value={intialValues[field.name]}
            onChange={(e) => handleChange(e, intialValues)}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
      >
        LOGIN
      </button>
    </form>
  );
};

export default Form;
