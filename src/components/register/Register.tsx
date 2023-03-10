import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { addToast } from "../slices/toasts.slice";
import Button from "../Button/Button";
import { register } from "../slices/users.slice";

interface Option {
	label: string;
	value: string;
}
const Register: React.FC<any> = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [flagURL, setFlagURL] = useState<string>('');

  const fetchOptions = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const countries = await response.json();

      const newOptions = countries.map((country: any) => {
        return {
          label: country.name.common,
          value: country.cca2,
        };
      });

      setOptions(newOptions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = options.find(option => option.value === selectedValue);

    if (selectedOption) {
      const flagURL = `https://countryflagsapi.com/png/${selectedOption.value}`;
      setFlagURL(flagURL);
      setSelectedOption(selectedOption);
    }
  };
	const getMissingFields = () => {
  const result: any = [];

  if (!firstName) {
    result.push("First Name");
  }
  if (!lastName) {
    result.push("Last Name");
  }
  if (!email) {
    result.push("Email");
  }
  if (!password) {
    result.push("Password");
  }

  return result;
};

const handleLogin = async (e: any) => {
  e.preventDefault();

  // form validation
  const missingFields = getMissingFields();
  if (missingFields.length > 0) {
    dispatch(
      addToast({
        status: "warning",
        message: `Please enter values for ${missingFields}.`,
      })
    );
  } else {
    if (selectedOption) {
      const flagURL = `https://countryflagsapi.com/png/${selectedOption.value}`;
      setFlagURL(flagURL);
    }

    const payload = { email, password, firstName, lastName, flagURL };

    // TODO: implement register logic
    dispatch(register(payload));

    dispatch(
      addToast({
        status: "success",
        message: `Account successfully created.`,
      })
    );

    // reset field
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    // redirect to the login page
    navigate("/login");
  }
};

	return (
		<div className="register">
			<div className="container flex-column">
				<h1>Welcome to Revature Books</h1>

				<form className="flex-column" autoComplete="off">
					<div className="flex-row">
						<label htmlFor="firstName">First Name:</label>
						<input
							type="text"
							id="firstName"
							value={firstName}
							onChange={(e: any) => setFirstName(e.target.value)}
						/>
					</div>
					<div className="flex-row">
						<label htmlFor="lastName">Last Name:</label>
						<input
							type="text"
							id="lastName"
							value={lastName}
							onChange={(e: any) => setLastName(e.target.value)}
						/>
					</div>
					<div className="flex-row">
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e: any) => setEmail(e.target.value)}
						/>
					</div>
					<div className="flex-row">
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e: any) => setPassword(e.target.value)}
						/>
					</div>
					<div className="flex-row">
						<label htmlFor="confirmPassword">Confirm Password:</label>
						<input
							type="password"
							id="confirmPassword"
							value={confirmPassword}
							onChange={(e: any) => setConfirmPassword(e.target.value)}
						/>
					</div>
					
					<div style={{ marginBottom: '20px' }}>
					<select name="country" onChange={handleOptionChange} value={selectedOption?.value}>
						<option value="">Select a country</option>
						{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
						))}
					</select>
					{flagURL && <img src={flagURL} alt="flag" />}
					</div>
					<Button onClick={handleLogin} maxWidth>
						Create Account
					</Button>
				</form>
			</div>
			<div className="register-footer">
				<footer> Get Busy Bidding and Reading Today! </footer>
			</div>
		</div>
	);
};

export default Register;
