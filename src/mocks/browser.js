import { setupWorker } from "msw";
import handlers from "./handlers";

/**
 * Creates MSW worker to run in the browser (Cosmos and in app)
 */
export const worker = setupWorker(...handlers);
