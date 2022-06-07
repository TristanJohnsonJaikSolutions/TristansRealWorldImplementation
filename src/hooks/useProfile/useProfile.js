import axios from "axios";
import useAuth from "hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "react-query";

/**
 * Retrieves the profile for 'username' and lets you follow or unfollow that profile.
 */
export function useProfile(username) {
  const { authToken, isLoggedIn } = useAuth();
  const queryClient = useQueryClient();

  const header = isLoggedIn ?
    { authorization: `Token ${authToken}`, } // so we only pass the authorization header when we are logged in
    :
    {};

  /**
   * Fetches the user's profile data.
   */
  const profileQuery = useQuery(["profile", username], async () => {
    if (username == null) {
      return null; // Don't fetch if user isn't passed.
    }

    return axios(`/api/profiles/${username}`, {
      method: "get",
      headers: header,
    }).then((res) => {
      return res.data.profile;
    });
  });

  /**
   * Follows the user.
   */
  const followProfileMutation = useMutation(
    async () => {
      return axios(`/api/profiles/${username}/follow`, {
        method: "post",
        headers: {
          authorization: `Token ${authToken}`,
        },
      }).then((res) => {
        return res.data.profile;
      });
    },
    {
      onSuccess: (data) => {
        // Replace the profile data with the updated response after mutating.
        queryClient.setQueryData(["profile", username], data);
      },
    }
  );

  /**
   * Unfollows the user.
   */
  const unfollowProfileMutation = useMutation(
    async () => {
      return axios(`/api/profiles/${username}/follow`, {
        method: "delete",
        headers: {
          authorization: `Token ${authToken}`,
        },
      }).then((res) => {
        return res.data.profile;
      });
    },
    {
      onSuccess: (data) => {
        // Replace the profile data with the updated response after mutating.
        queryClient.setQueryData(["profile", username], data);
      },
    }
  );

  return {
    profileQuery,
    followProfileMutation,
    unfollowProfileMutation,
  };
}
