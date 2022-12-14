import React, { useState, useRef } from "react";

const Register = ({ loadUser, onRouteChange }) => {
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [isError, setError] = useState(false);
  const emailRef = useRef(null);

  const onRegNameChange = (event) => {
    setRegName(event.target.value);
  };

  const onRegNEmailChange = (event) => {
    setRegEmail(event.target.value);
  };

  const onRegPassChange = (event) => {
    setRegPass(event.target.value);
  };

  const handleRegSubmit = (event) => {
    event.preventDefault();
    if (!regEmail || !regName || !regPass) {
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: regName,
        email: regEmail,
        password: regPass,
      }),
    };

    fetch(
      "https://victorious-raincoat-worm.cyclic.app/register",
      requestOptions
    )
      .then((res) => res.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onRouteChange("home");
        } else {
          setError(true);
          setRegEmail("");
          setRegPass("");
          emailRef.current.focus();
        }
      });
  };

  return (
    <>
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
        <main className="pa3 black-80">
          <form className="measure" onSubmit={handleRegSubmit}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 center">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={onRegNameChange}
                  required
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                {isError === true && (
                  <legend className="mt3 dark-red fw6">
                    Please use another email or try again later
                  </legend>
                )}
                <input
                  className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={onRegNEmailChange}
                  value={regEmail}
                  required
                  ref={emailRef}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={onRegPassChange}
                  required
                  value={regPass}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </form>
        </main>
      </article>
    </>
  );
};

export default Register;
