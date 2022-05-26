import { AuthContext } from "hooks/useAuth";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";

export default {
  LoggedOut: () => {
    const contextValue = {
      isLoggedIn: false,
    };

    // Wrap with the required providers, passing in the mock context data to force the state we want to see.
    return (
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Header />
        </AuthContext.Provider>
      </MemoryRouter>
    );
  },

  LoggedIn: () => {
    const contextValue = {
      isLoggedIn: true,
      userData: {
        username: "followed-user",
      },
    };

    return (
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Header />
        </AuthContext.Provider>
      </MemoryRouter>
    );
  },
};
