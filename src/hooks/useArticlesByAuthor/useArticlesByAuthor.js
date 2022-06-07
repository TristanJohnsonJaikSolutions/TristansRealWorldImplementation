import axios from "axios";
import { useQuery } from "react-query";
import useAuth from "hooks/useAuth";

export function useArticlesByAuthor(author) {

  const { authToken, isLoggedIn } = useAuth();

  const header = isLoggedIn ?
  { authorization: `Token ${authToken}`, }
  :
  {};

  /**
 * Retrieves all articles made by the author.
 */
  const articlesFilteredByAuthorQuery = useQuery(["articlesByAuthor", author], async () => {

    if (author == null){
      return "author null";
    }
    return axios(`/api/articles/?author=${author}`, {
      method: "get",
      headers: header,
    }).then((res) => {
      return res.data.articles;
    });
  });
  

  return {
    articlesFilteredByAuthorQuery
  };
}


