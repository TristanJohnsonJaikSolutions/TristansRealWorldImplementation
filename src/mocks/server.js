import { setupServer } from "msw/node";
import handlers from "./handlers";

/**
 * Creates MSW worker to run in Jest.
 */
export const server = setupServer(...handlers);
