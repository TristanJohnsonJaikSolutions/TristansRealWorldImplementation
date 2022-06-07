import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import ProfileImageNameLinkAndDateOfArticle from "components/ProfileImageNameLinkAndDateOfArticle";
import useArticle from "hooks/useArticle";
import useAuth from "hooks/useAuth";

export function Article({
  slug,
  title,
  description,
  tagList,
  author,
  createdAt,
}) {
  const { isLoggedIn } = useAuth();
  var articleHook = useArticle(slug);
  let navigate = useNavigate();

  if (articleHook.articleQuery.isLoading) {
    return "Loading...";
  }

  function favorite() {
    if (isLoggedIn) {
      articleHook.favoriteArticleMutation.mutate();
    } else {
      navigate("/login"); // when not signed in, navigate us to the sign in page instead of favoriting
    }
  }

  function unfavorite() {
    if (isLoggedIn) {
      articleHook.unfavoriteArticleMutation.mutate();
    } else {
      navigate("/login");
    }
  }

  return (
    <>
      {articleHook.articleQuery.data.favorited ? (
        <button
          className="floatRight btn btn-primary"
          onClick={() => unfavorite()}
        >
          Unfavorite ({articleHook.articleQuery.data.favoritesCount})
        </button>
      ) : (
        <button
          className="floatRight btn btn-outline-primary"
          onClick={() => favorite()}
        >
          Favorite ({articleHook.articleQuery.data.favoritesCount})
        </button>
      )}

      <ProfileImageNameLinkAndDateOfArticle
        username={author.username}
        image={author.image}
        createdAt={createdAt}
      />

      <h3 className="smallTopPadding bold">{title}</h3>
      <p className="descriptionText">{description}</p>

      {tagList.map((tag) => (
        <Link to={"/viewArticle/" + slug} key={tag}>
          <button className="floatRight xsmallLeftMargin tagButton2">
            {tag}
          </button>
        </Link>
      ))}

      <Link to={"/viewArticle/" + slug + "/" + author.username}>
        <div className="readMoreText">Read more ...</div>
      </Link>

      <hr />
    </>
  );
}

Article.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  createdAt: PropTypes.string,
  tags: PropTypes.array,
  author: PropTypes.object,
};
