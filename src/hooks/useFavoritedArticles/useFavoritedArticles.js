import axios from "axios";
import { useQuery } from "react-query";
import useAuth from "hooks/useAuth";


export function useFavoritedArticles(username) {
  const { authToken, isLoggedIn } = useAuth();

  const header = isLoggedIn ?
  { authorization: `Token ${authToken}`, } // so we only pass the authorization header when we are logged in
  :
  {};

  /**
 * Retrieves favorited articles.
 */
  const favoritedArticlesQuery = useQuery(["favoritedArticles", username], async () => {
    if (username == null) {
      return null;
    }

    return axios(`/api/articles/?favorited=${username}`, {
      method: "get",
      headers: header,
    }).then((res) => {
      return res.data.articles;
    });
  });

  return {
    favoritedArticlesQuery,
  };
}


