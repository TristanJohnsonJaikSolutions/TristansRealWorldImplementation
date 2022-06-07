import useAuth from "hooks/useAuth";
import { Link } from "react-router-dom";

/**
 * Interactive component. Provides navigation at the top of the page.
 * Content changes depending on the user's logged in status.
 */
export function Header() {
  const { isLoggedIn, userData } = useAuth();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item navText">
            {/* TODO: Add "active" class to nav item when you're on that page */}

            <Link className="nav-link active" to="/">
              Home
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li className="nav-item navText">
                <Link className="nav-link" to="/newArticle">
                  <i className="ion-compose"></i>&nbsp;New Article
                </Link>
              </li>
              <li className="nav-item navText">
                <Link className="nav-link" to="/settings">
                  <i className="ion-gear-a"></i>&nbsp;Settings
                </Link>
              </li>
              <li className="nav-item navText">
                <Link
                  className="nav-link"
                  to={"/profile/" + userData?.username}
                >
                  {userData?.username}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item navText">
                <Link className="nav-link" to="/login">
                  Sign in
                </Link>
              </li>
              <li className="nav-item navText">
                <Link className="nav-link" to="/register">
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
