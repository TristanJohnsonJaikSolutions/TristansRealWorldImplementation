import { AuthContext } from "hooks/useAuth";
import { MemoryRouter } from "react-router-dom";
import { Article } from "./Article";

export default {
  UnfavoritedArticleWithOneTag: () => {
    const contextValue = {
      isLoggedIn: false,
    };

    const author = {
      username: "author name",
      image: "image url",
    };
    return (
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Article
            title="title"
            favorited={false}
            favoritesCount={168}
            tagList={["oneTag"]}
            author={author}
            description="description"
            createdAt="date of creation"
            slug="a-test-slug"
          />
        </AuthContext.Provider>
      </MemoryRouter>
    );
  },

  UnfavoritedArticleWithThreeTags: () => {
    const contextValue = {
      isLoggedIn: false,
    };
    const author = {
      username: "author name",
      image: "image url",
    };
    return (
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Article
            title="title"
            favorited={false}
            favoritesCount={168}
            tagList={["tag1", "tag2", "tag3"]}
            author={author}
            description="description"
            createdAt="date of creation"
            slug="a-test-slug"
          />
        </AuthContext.Provider>
      </MemoryRouter>
    );
  },


  FavoritedArticleWithOneTag: () => {
    const contextValue = {
      isLoggedIn: true,
    };
    const author = {
      username: "author name",
      image: "image url",
    };
    return (
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Article
            title="title"
            favorited={true}
            favoritesCount={168}
            tagList={["oneTag"]}
            author={author}
            description="description"
            createdAt="date of creation"
            slug="a-test-slug"
          />
        </AuthContext.Provider>
      </MemoryRouter>
    );
  },
};
