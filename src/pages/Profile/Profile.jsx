import useAuth from "hooks/useAuth";
import { Link } from "react-router-dom";
import useProfile from "hooks/useProfile";
import { useParams, useNavigate } from "react-router-dom";
import Article from "components/Article";
import { useState } from "react";
import useFavoritedArticles from "hooks/useFavoritedArticles";
import useArticlesByAuthor from "hooks/useArticlesByAuthor";

export function Profile() {
  const { userData, isLoggedIn } = useAuth();

  let { username } = useParams();
  const profileHook = useProfile(username);
  let navigate = useNavigate();
  const favoritedArticlesHook = useFavoritedArticles(username);
  const articlesHook = useArticlesByAuthor(username);
  const myArticlesTab = "My Articles";
  const [tab, setTab] = useState(myArticlesTab);

  if (
    profileHook.profileQuery.isLoading ||
    favoritedArticlesHook.favoritedArticlesQuery.isLoading ||
    articlesHook.articlesFilteredByAuthorQuery.isLoading
  ) {
    return "Loading...";
  }

  // adding the text "active" to the tab's className that is active
  var myArticlesTabActiveString = "active";
  var favoritedArticlesTabActiveString = "";
  if (tab != myArticlesTab) {
    myArticlesTabActiveString = "";
    favoritedArticlesTabActiveString = "active";
  }

  function follow() {
    if (isLoggedIn) {
      profileHook.followProfileMutation.mutate();
    } else {
      navigate("/login");
    }
  }
  function unfollow() {
    if (isLoggedIn) {
      profileHook.unfollowProfileMutation.mutate();
    } else {
      navigate("/login");
    }
  }

  return (
    <>
      <div className="bgGray">
        <div className="container medTopPadding smallBottomPadding">
          <img
            src={profileHook.profileQuery.data.image}
            className="profileImageLarge"
            alt="..."
          />
          <h1 className="center">{profileHook.profileQuery.data.username}</h1>

          <p className="gray skinny center">
            {profileHook.profileQuery.data.bio}
          </p>

          {profileHook.profileQuery.data.username == userData?.username ? (
            <>
              <Link to="/settings">
                <button type="button" className="btn btn-outline-primary ">
                  Edit profile settings
                </button>
              </Link>
            </>
          ) : (
            <>
              {profileHook.profileQuery.data.following ? (
                <>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => unfollow()}
                  >
                    Unfollow {profileHook.profileQuery.data.username}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => follow()}
                  >
                    Follow {profileHook.profileQuery.data.username}
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      <div className="container smallTopPadding">
        <ul className="nav nav-tabs medBottomMargin">
          <li className="nav-item">
            <button
              className={"tabButton nav-link " + myArticlesTabActiveString}
              onClick={() => setTab(myArticlesTab)}
            >
              My Articles
            </button>
          </li>
          <li className="nav-item">
            <button
              className={
                "tabButton nav-link " + favoritedArticlesTabActiveString
              }
              onClick={() => setTab("Favorited Articles")}
            >
              Favorited Articles
            </button>
          </li>
        </ul>

        {tab != myArticlesTab ? (
          favoritedArticlesHook.favoritedArticlesQuery.data.length < 1 ? (
            <>No articles are here... yet.</>
          ) : (
            favoritedArticlesHook.favoritedArticlesQuery.data.map((article) => (
              <div key={article.title}>
                <Article
                  title={article.title}
                  favorited={article.favorited}
                  favoritesCount={article.favoritesCount}
                  tags={article.tagList}
                  author={article.author}
                  description={article.description}
                  createdAt={article.createdAt}
                  slug={article.slug}
                />
              </div>
            ))
          )
        ) : articlesHook.articlesFilteredByAuthorQuery.data.length < 1 ? (
          <>No articles are here... yet.</>
        ) : (
          articlesHook.articlesFilteredByAuthorQuery.data.map((article) => (
            <div key={article.title}>
              <Article
                title={article.title}
                favorited={article.favorited}
                favoritesCount={article.favoritesCount}
                tags={article.tagList}
                author={article.author}
                description={article.description}
                createdAt={article.createdAt}
                slug={article.slug}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
}
