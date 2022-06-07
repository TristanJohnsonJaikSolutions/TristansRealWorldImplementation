import { Routes, Route } from "react-router-dom";

import AuthGuard from "components/AuthGuard";
import Header from "components/Header";

import Auth from "pages/Auth";
import Home from "./pages/Home";
import NewArticle from "./pages/NewArticle";
import Settings from "pages/Settings";
import Profile from "pages/Profile";
import ViewArticle from "pages/ViewArticle";

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

          {/*TODO: figure out how this works */}

        </Route>

        <Route exact path="/" element={<Home />} />
        <Route path="/newArticle" element={<NewArticle />} />
        <Route path="/newArticle/:editing/:slug" element={<NewArticle />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile/:username" element={<Profile />} />        
        <Route path="/viewArticle/:slug/:authorUsername" element={<ViewArticle />} />

      </Routes>
    </main>
  );
}
