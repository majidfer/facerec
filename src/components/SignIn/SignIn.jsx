import { React, useState, useRef } from "react";

const SignIn = ({ loadUser, onRouteChange }) => {
  const [signInEmail, setsignInEmail] = useState("");
  const [signInPassword, setsignInPassword] = useState("");
  const [isError, setError] = useState(false);
  const ref = useRef(null);

  const onEmailChange = (event) => {
    setsignInEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setsignInPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!signInEmail || !signInPassword) {
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: signInEmail, password: signInPassword }),
    };

    fetch("https://victorious-raincoat-worm.cyclic.app/signin", requestOptions)
      .then((res) => res.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onRouteChange("home");
        } else {
          ref.current.focus();
          setError(true);
        }
      });

    setsignInPassword("");
    setsignInEmail("");
  };

  return (
    <>
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center">
        <main className="pa3 black-80">
          <form className="measure" onSubmit={handleSubmit}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
              {isError === true && (
                <legend className="mt3 dark-red fw6">
                  Your email and password doesn't match
                </legend>
              )}
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  value={signInEmail}
                  onChange={onEmailChange}
                  autoFocus
                  ref={ref}
                  required
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
                  value={signInPassword}
                  onChange={onPasswordChange}
                  required
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                className="f4 link dim black db pointer"
                onClick={() => onRouteChange("register")}
              >
                Register
              </p>
            </div>
          </form>
        </main>
      </article>
    </>
  );
};

export default SignIn;
