import axios from "axios";
import { useQuery } from "react-query";

/**
 * Retrieves article tags.
 */
export function useTags() {
  const tagsQuery = useQuery(["tags"], () => {
    return axios("/api/tags", { method: "get" }).then((res) => {
      return res.data.tags;
    });
  });

  return {
    tagsQuery,
  };
}
