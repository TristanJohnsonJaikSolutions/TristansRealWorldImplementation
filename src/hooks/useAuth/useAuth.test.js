import { AuthContext, AuthProvider, useAuth } from "./useAuth";
import { QueryClient, QueryClientProvider } from "react-query";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-test-renderer";

function makeWrapper() {
  const queryClient = new QueryClient();

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}

describe("signIn", () => {
  test("signs in with credentials", async () => {
    const { result, waitFor } = renderHook(() => useAuth(), {
      wrapper: makeWrapper(),
    });

    await act(async () => {
      await result.current.signIn("user@example.com", "hunter2");
    });

    await waitFor(() => result.current.userData != null);

    expect(result.current.userData).toEqual(
      expect.objectContaining({
        email: "user@example.com",
        username: "Test User",
      })
    );
  });
});

describe("signOut", () => {
  test("signs the current user out", async () => {
    const { result, waitFor } = renderHook(() => useAuth(), {
      wrapper: makeWrapper(),
    });

    await act(async () => {
      await result.current.signIn("user@example.com", "hunter2");
    });

    await waitFor(() => result.current.userData != null);

    expect(result.current.userData).toEqual(
      expect.objectContaining({
        email: "user@example.com",
        username: "Test User",
      })
    );

    // At this point the user is signed in.

    await act(async () => {
      await result.current.signOut();
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.userData).toBeNull();
    expect(result.current.authToken).toBeUndefined();
  });
});

describe("register", () => {
  test("registers a new user", async () => {
    const { result, waitFor } = renderHook(() => useAuth(), {
      wrapper: makeWrapper(),
    });

    let registered;
    let signedIn;

    await act(async () => {
      // Register the user
      registered = await result.current.register(
        "justcreated",
        "justcreated@example.com",
        "secur3passw0rd"
      );

      // Try to log in as the new user
      signedIn = await result.current.signIn(
        "justcreated@example.com",
        "secur3passw0rd"
      );
    });

    expect(registered.success).toBe(true);
    expect(signedIn.success).toBe(true);
  });
});
