import { useState } from "react";
import useAuth from "hooks/useAuth";
import useTags from "hooks/useTags";
import Article from "components/Article";
import useArticles from "hooks/useArticles";
import useArticlesFeed from "hooks/useArticlesFeed";

// the main page, global feed and your feed

export function Home() {
  const [tagFilter, setFilter] = useState("");
  const tagsHook = useTags();

  const { isLoggedIn } = useAuth();
  const yourFeedArticlesTabName = "Your Feed";
  const [tab, setTab] = useState(
    isLoggedIn ? yourFeedArticlesTabName : "Global Feed"
  );

  const allArticles = useArticles(); // TODO: paginate articlesQuery results
  const feedArticlesHook = useArticlesFeed(isLoggedIn);

  if (
    allArticles.articlesQuery.isLoading ||
    feedArticlesHook.articlesFeedQuery.isLoading ||
    tagsHook.tagsQuery.isLoading
  ) {
    return "Loading...";
  }


  // adding the text "active" to the tab's className that is active
  var myFeedTabActiveString;
  var globalFeedTabActiveString;
  if (tab != yourFeedArticlesTabName) {
    myFeedTabActiveString = "";
    globalFeedTabActiveString = "active";
  } else {
    myFeedTabActiveString = "active";
    globalFeedTabActiveString = "";
  }

  if (tagFilter != "") {
    // setting both tabs to inactive when we have a tag filter
    myFeedTabActiveString = "";
    globalFeedTabActiveString = "";
  }

  var articles =
    tab == yourFeedArticlesTabName && isLoggedIn
      ? feedArticlesHook.articlesFeedQuery.data
      : allArticles.articlesQuery.data;

  var filteredArticles = [];
  for (var i = 0; i < articles.length; i++) {
    // TODO: replace with an articles tag filter param GET hook
    if (articles[i].tagList.includes(tagFilter) || tagFilter == "") {
      filteredArticles.push(articles[i]);
    }
  }

  function setTabAndClearTagFilter(tab) {
    setTab(tab);
    setFilter("");
  }

  return (
    <>
      <div className="container grid-container smallTopPadding">
        <div>



            <ul className="nav nav-tabs medBottomMargin">
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <button
                      className={"nav-link " + myFeedTabActiveString}
                      onClick={() =>
                        setTabAndClearTagFilter(yourFeedArticlesTabName)
                      }
                    >
                      Your Feed
                    </button>
                  </li>
                </>
              ) : (
                <></>
              )}

              <li className="nav-item">
                <button
                  className={"nav-link " + globalFeedTabActiveString}
                  onClick={() => setTabAndClearTagFilter("Global Feed")}
                >
                  Global Feed
                </button>
              </li>

              {tagFilter != "" ? (
                <li className="nav-item">
                  <button className="nav-link active">#{tagFilter}</button>
                </li>
              ) : (
                <></>
              )}
            </ul>

            {filteredArticles.length < 1 ? (
              <>No articles are here... yet.</>
            ) : (
              filteredArticles.map((article) => (
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

        <div className="medLeftPadding tagContainer">
          <div className="bgGray smallPadding">
            <h5 className=" tagListTitle">Popular Tags</h5>
            <div className="grid-container2 ">
              {tagsHook.tagsQuery.data.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="xsmallBottomMargin xsmallRightMargin tagButton"
                  onClick={() => setFilter(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
