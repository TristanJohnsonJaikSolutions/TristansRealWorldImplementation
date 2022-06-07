import axios from "axios";
import { useQuery } from "react-query";
import useAuth from "hooks/useAuth";


export function useArticlesFeed(isLoggedIn) {

  const { authToken } = useAuth();


  /**
 * Retrieves feed articles
 */
  const articlesFeedQuery = useQuery(["articlesFeed", isLoggedIn], async () => {

    if (!isLoggedIn){
      return null;
    }

    return axios("/api/articles/feed", {
      method: "get",
      headers: {
        authorization: `Token ${authToken}`,
      },
    }).then((res) => {
      return res.data.articles;
    });

  });

  
  return {
    articlesFeedQuery,
  };
}


