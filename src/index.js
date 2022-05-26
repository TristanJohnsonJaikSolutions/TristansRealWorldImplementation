import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import config from "./domainConfig";

import { App } from "./App";
import { AuthProvider } from "hooks/useAuth";

// Use API base from domainConfig for all Axios calls.
axios.defaults.baseURL = config.apiBaseURL;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // keep data cached for 10 minutes unless invalidated earlier
    },
  },
});

async function prepare() {
  if (process.env.NODE_ENV === "development" && config.useMSW) {
    const { worker } = require("./mocks/browser");

    return worker.start();
  } else {
    return Promise.resolve();
  }
}

prepare().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
