import { useArticle } from "./useArticle";
import { QueryClient, QueryClientProvider } from "react-query";
import { renderHook } from "@testing-library/react-hooks";

import { AuthContext } from "hooks/useAuth";
import { act } from "react-test-renderer";

function makeWrapper() {
  const queryClient = new QueryClient();

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ authToken: "asdf", isLoggedIn: true }}>
        {children}
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

describe("articleQuery", () => {

  test("requests an article by slug", async () => {
    const { result, waitFor } = renderHook(() => useArticle("a-test-slug"), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => result.current.articleQuery.isSuccess);

    //console.log(result.current.articleQuery.data);

    // Confirm that we're getting the data from the mock handler
    expect(result.current.articleQuery.data).toEqual(
      {
        author: "user1@example.com",
        createdAt: "01/01/1999",
        title: "A Test Title For a Test Article",
        description: "A test description for a test article",
        body: "Some test content",
        tagList: ["testTag1", "testTag2", "testTag3"],
        favoritesCount: 5,
        slug: "a-test-slug",
      }
    );
  });

  test("returns null if slug is null", async () => {
    const { result, waitFor } = renderHook(() => useArticle(), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => result.current.articleQuery.isSuccess);

    //console.log(result.current.articleQuery.data);

    // Confirm that we're getting the data from the mock handler
    expect(result.current.articleQuery.data).toEqual(null);
  });


});
