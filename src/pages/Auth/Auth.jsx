import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";

/**
 * Structure component. Allows the user to sign in to an existing account or register a new one.
 */
export function Auth({ mode }) {
  const navigate = useNavigate();
  const { register, signIn } = useAuth();

  const [errors, setErrors] = useState([]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault(); // Prevent form submission since we're handling it in JS.

      const username = e.target.username?.value;
      const email = e.target.email.value;
      const password = e.target.password.value;

      console.log({ username, email, password });

      if (mode === "register") {
        register(username, email, password).then((res) => {
          if (res.success) {
            setErrors([]);
            navigate("/");
          } else {
            setErrors(res.errors);
          }
        });
      } else {
        signIn(email, password).then((res) => {
          if (res.success) {
            setErrors([]);
            navigate("/");
          } else {
            setErrors(res.errors);
          }
        });
      }
    },
    [mode]
  );

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            {mode === "register" ? (
              <>
                <h1 className="text-xs-center">Sign up</h1>
                <p className="text-xs-center">
                  <Link to="/login">Have an account?</Link>
                </p>
              </>
            ) : (
              <>
                <h1 className="text-xs-center">Sign in</h1>
                <p className="text-xs-center">
                  <Link to="/register">Need an account?</Link>
                </p>
              </>
            )}

            <ul className="error-messages">
              {errors.map((message, i) => (
                <li key={i}>{message}</li>
              ))}
            </ul>

            <form onSubmit={onSubmit}>
              {mode === "register" && (
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    name="username"
                    required
                  />
                </fieldset>
              )}
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                {mode === "register" ? "Sign up" : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Auth.propTypes = {
  /**
   * Determines which elements to display and which logic to run.
   */
  mode: PropTypes.oneOf(["login", "register"]).isRequired,
};
