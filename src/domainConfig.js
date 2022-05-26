/**
 * Builds a global config object based on the domain the app is currently served from.
 *
 * You can import these settings from anywhere in the app like so:
 *
 * import { apiBaseURL } from "domainConfig";
 */

const domain = window.location.hostname.toLowerCase().trim();

let config = {
  // Defaults go here. These will be set unless overridden by options from a specific domain.
  apiBaseURL: "https://api.realworld.io",
  useMSW: false,
};

// Local development
if (domain === "localhost") {
  config = {
    ...config,
    useMSW: false, // change to true to intercept API calls with MSW when running with 'npm start'

    // Add correct URL and uncomment to run the API locally for development.
    // apiBaseURL: "http://localhost:3000",
  };
}

export default Object.freeze(config);
