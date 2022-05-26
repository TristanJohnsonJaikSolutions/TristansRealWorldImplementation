import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

/**
 * Cosmos decorator to wrap components that use data hooks.
 *
 * This ensures we're using mock data in Cosmos and getting controlled results.
 */
export default ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
