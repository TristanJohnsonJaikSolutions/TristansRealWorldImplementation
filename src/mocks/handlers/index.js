import profiles from "./profiles";
import tags from "./tags";
import users from "./users";

/**
 * Export handlers here so the full list can be imported into both mocks/browser.js and mocks/server.js in one go.
 */
export default [...profiles, ...tags, ...users];
