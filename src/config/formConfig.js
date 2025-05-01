

const loginFormConfig = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      validations: {
        rule: "email"
      }
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      validations: {
        rule: "password-strength"
      }
    },
  ];
  
  export default loginFormConfig;
  