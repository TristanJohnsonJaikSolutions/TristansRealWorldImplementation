import { useTags } from "./useTags";
import { QueryClient, QueryClientProvider } from "react-query";
import { renderHook } from "@testing-library/react-hooks";

describe("tagsQuery", () => {
  test("resolves to array of tags", async () => {
    const queryClient = new QueryClient();

    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result, waitFor } = renderHook(() => useTags(), { wrapper });

    await waitFor(() => result.current.tagsQuery.isSuccess);

    // Confirm that we're getting the data from the mock handler
    expect(result.current.tagsQuery.data).toEqual([
      "welcome",
      "implementations",
      "introduction",
      "codebaseShow",
    ]);
  });
});
