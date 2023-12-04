import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import FormInput from "../Components/FormInput";
import { GeneralContext } from "../contexts/generalContext";

const defaultFormFields = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, password, confirmPassword } = formFields;
  const { setIsSigned, setLoadUser } = useContext(GeneralContext);
  const loadedUser = (data) =>
    setLoadUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: 0,
      joined: data.joined,
    });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const onRegisterSubmit = async (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      const data = await fetch("http://localhost:3000/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formFields.email,
          password: formFields.password,
          name: formFields.name,
        }),
      });
      const response = await data.json();
      const user = await loadedUser(response);
      setIsSigned(true);
      navigate("/");
      return user;
    } else {
      alert("Password do not match");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 shadow-2xl max-w-md m-auto">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register a new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onRegisterSubmit}>
          <FormInput
            label="Username"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Email adress"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
          />

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-purple-700 hover:bg-purple-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-300 ease-in-out"
            >
              Rigster
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-lg text-white">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-semibold leading-6 text-zinc-100 hover:text-gray-300"
          >
            Sign In!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
