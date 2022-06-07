import { useProfile } from "./useProfile";
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

describe("profileQuery", () => {
  test("resolves to null when no username is passed", async () => {
    const { result, waitFor } = renderHook(() => useProfile(), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => result.current.profileQuery.isSuccess);

    expect(result.current.profileQuery.data).toEqual(null);
  });

  test("requests a profile by username", async () => {
    const { result, waitFor } = renderHook(() => useProfile("followed-user"), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => result.current.profileQuery.isSuccess);

    // Confirm that we're getting the data from the mock handler
    expect(result.current.profileQuery.data).toEqual({
      email: "user1@example.com",
      username: "followed-user",
      bio: "I am a test user seeded for unit testing.",
      image: null,
      following: true,
    });
  });
});

describe("followProfileMutation", () => {
  test("sets profile to followed", async () => {
    const { result, waitFor } = renderHook(
      () => useProfile("unfollowed-user"),
      {
        wrapper: makeWrapper(),
      }
    );

    await waitFor(() => result.current.profileQuery.isSuccess);

    // Confirm that we're getting the data from the mock handler
    expect(result.current.profileQuery.data).toEqual({
      email: "user2@example.com",
      username: "unfollowed-user",
      bio: "I am a test user seeded for unit testing.",
      image: null,
      following: false,
    });

    // Trigger mutation.
    await act(() => {
      return result.current.followProfileMutation.mutateAsync();
    });

    // See that 'following' is true.
    expect(result.current.profileQuery.data.following).toEqual(true);
  });
});

describe("unfollowProfileMutation", () => {
  test("sets profile to unfollowed", async () => {
    const { result, waitFor } = renderHook(() => useProfile("followed-user"), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => result.current.profileQuery.isSuccess);

    // Confirm that we're getting the data from the mock handler
    expect(result.current.profileQuery.data).toEqual({
      email: "user1@example.com",
      username: "followed-user",
      bio: "I am a test user seeded for unit testing.",
      image: null,
      following: true,
    });

    // Trigger mutation.
    await act(() => {
      return result.current.unfollowProfileMutation.mutateAsync();
    });

    // See that 'following' is false.
    expect(result.current.profileQuery.data.following).toEqual(false);
  });
});
