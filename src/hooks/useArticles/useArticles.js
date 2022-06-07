import axios from "axios";
import { useQuery } from "react-query";
import useAuth from "hooks/useAuth";


export function useArticles() {

  const { authToken, isLoggedIn } = useAuth();

  const header = isLoggedIn ?
    { authorization: `Token ${authToken}`, } // so we only pass the authorization header when we are logged in
    :
    {};

/**
 * Retrieves all articles.
 */
  const articlesQuery = useQuery(["articles"], () => {
    return axios("/api/articles", {
      method: "get",
      headers: header,
    }).then((res) => {
      return res.data.articles;
    });
  });


  return {
    articlesQuery,

  };
}


