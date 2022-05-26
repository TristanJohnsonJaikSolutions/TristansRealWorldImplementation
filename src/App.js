import { Routes, Route } from "react-router-dom";

import AuthGuard from "components/AuthGuard";
import Header from "components/Header";

import Auth from "pages/Auth";

/**
 * Structure component. The main app layout. Displays the current route with a header on top and a footer below.
 */
export function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="login" element={<Auth mode="login" />} />
        <Route path="register" element={<Auth mode="register" />} />

        <Route element={<AuthGuard />}>
          {/* Add authorized-only routes here */}
        </Route>
      </Routes>
    </main>
  );
}
