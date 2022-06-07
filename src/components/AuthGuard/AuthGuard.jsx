import { Navigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import PropTypes from "prop-types";

/**
 * Displays children if user is logged in, otherwise redirects to '/'.
 * This is a necessary function but doesn't fit into one of the three component types.
 */
export function AuthGuard({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
}

AuthGuard.propTypes = {
  /**
   * Any React-renderable content to display when the user is logged in.
   */
  children: PropTypes.node,
};
