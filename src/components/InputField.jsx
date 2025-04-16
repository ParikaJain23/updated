const InputField = ({ label, placeholder, value, onChange , required }) => (
    <div className="my-4">
      <label className="block font-medium mb-1">{label}</label>
      <input
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required = {required}
      />
    </div>
  );
  
  export default InputField;
  