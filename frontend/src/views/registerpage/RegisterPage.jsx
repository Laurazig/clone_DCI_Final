import React, { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./registerPage.scss";

const Register = () => {
  const { setUser } = useContext(MyContext);
  let navigate = useNavigate();

  const [userData, setUserdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    street: "",
    houseNo: "",
    zipCode: "",
    city: "",
  });

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    street,
    houseNo,
    zipCode,
    city,
  } = userData;

  const updateData = (event) => {
    setUserdata({ ...userData, [event.target.name]: event.target.value });
  };

  const registerUser = async (event) => {
    event.preventDefault();

    const settings = {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(process.env.REACT_APP_SERVER_URL);
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "/register",
      settings
    );
    const parsedRes = await response.json();
    try {
      if (response.ok) {
        setUser(parsedRes);
        navigate("/login");
      } else {
        throw new Error(parsedRes.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className="registerPage">
      <div className="formContainer">
        <h1>New users get 50% off!</h1>
        <h2>Sign-up for a free account</h2>
        <form onSubmit={registerUser} className={"registerForm"}>
          <div className="inputLeft">
            <label>Contact information:</label>
            <input
              name="firstName"
              onChange={updateData}
              value={firstName}
              placeholder={"First Name"}
            />
            <input
              name="lastName"
              onChange={updateData}
              value={lastName}
              placeholder={"Last Name"}
            />
            <input
              name="email"
              onChange={updateData}
              value={email}
              placeholder={"Email address"}
            />
            <input
              name="password"
              onChange={updateData}
              value={password}
              placeholder={"Create Password"}
              type={password}
            />
            <input
              name="confirmPassword"
              onChange={updateData}
              value={confirmPassword}
              placeholder={"Confirm Password"}
              type={password}
            />
          </div>

          <div className="inputRight">
            <label>Address:</label>
            <input
              name="street"
              onChange={updateData}
              value={street}
              placeholder={"Street"}
            />
            <input
              name="houseNo"
              onChange={updateData}
              value={houseNo}
              placeholder={"House No."}
            />
            <input
              name="zipCode"
              onChange={updateData}
              value={zipCode}
              placeholder={"Zip Code"}
            />
            <input
              name="city"
              onChange={updateData}
              value={city}
              placeholder={"City"}
            />
            <button className="Register feButton">Register</button>
          </div>
        </form>
        {/* <button onClick={ updateShowLogin }>Already registered? Log in to your account!</button> */}
      </div>
    </div>
  );
};

export default Register;
