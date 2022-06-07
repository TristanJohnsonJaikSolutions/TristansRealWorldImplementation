import { useParams } from "react-router-dom";
import useArticle from "hooks/useArticle";
import useAuth from "hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import ProfileImageNameLinkAndDateOfArticle from "components/ProfileImageNameLinkAndDateOfArticle";
import Comment from "components/Comment";
import useProfile from "hooks/useProfile";
import { useState } from "react";

export function ViewArticle() {
  const { slug, authorUsername } = useParams();
  const { userData, isLoggedIn } = useAuth();
  const articleHook = useArticle(slug);
  const authorProfileHook = useProfile(authorUsername);
  const ourProfileHook = useProfile(userData?.username);
  const navigate = useNavigate();
  const [commentInput, setCommentInput] = useState("");

  if (
    articleHook.articleQuery.isLoading ||
    articleHook.commentsQuery.isLoading ||
    authorProfileHook.profileQuery.isLoading ||
    ourProfileHook.profileQuery.isLoading
  ) {
    return "Loading...";
  }
  let article = articleHook.articleQuery.data;
  let comments = articleHook.commentsQuery.data;

  const ourArticle =
    articleHook.articleQuery.data.author.username == userData?.username;

  function follow() {
    if (isLoggedIn) {
      authorProfileHook.followProfileMutation.mutate();
    } else {
      navigate("/login");
    }
  }
  function unfollow() {
    if (isLoggedIn) {
      authorProfileHook.unfollowProfileMutation.mutate();
    } else {
      navigate("/login");
    }
  }

  function favorite() {
    if (isLoggedIn) {
      articleHook.favoriteArticleMutation.mutate();
    } else {
      navigate("/login");
    }
  }

  function unfavorite() {
    if (isLoggedIn) {
      articleHook.unfavoriteArticleMutation.mutate();
    } else {
      navigate("/login");
    }
  }

  function postComment(comment) {
    if (isLoggedIn) {
      articleHook.commentArticleMutation.mutate(comment);
      setCommentInput("");
    } else {
      navigate("/login");
    }
  }

  function deleteArticle() {
    articleHook.deleteArticleMutation.mutate();
    navigate("/");
  }

  function goEditArticle() {
    navigate("/newArticle/true/" + articleHook.articleQuery.data.slug);
  }

  function handleChange(event) {
    setCommentInput(event.target.value);
  }

  return (
    <>
      <div className="bgDarkGray">
        <div className="container medTopPadding smallBottomPadding">
          <h1 className="smallBottomPadding whiteText">{article.title}</h1>

          {article.favorited ? (
            <button
              className="floatRight btn btn-primary smallLeftMargin"
              onClick={() => unfavorite()}
            >
              Unfavorite ({article.favoritesCount})
            </button>
          ) : (
            <button
              className="floatRight btn btn-outline-primary smallLeftMargin"
              onClick={() => favorite()}
            >
              Favorite ({article.favoritesCount})
            </button>
          )}

          {authorProfileHook.profileQuery.data.following ? (
            <>
              <button
                type="button"
                className="btn btn-primary floatRight smallLeftMargin"
                onClick={() => unfollow()}
              >
                Unfollow {authorProfileHook.profileQuery.data.username}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-outline-primary floatRight smallLeftMargin"
                onClick={() => follow()}
              >
                Follow {authorProfileHook.profileQuery.data.username}
              </button>
            </>
          )}

          {ourArticle ? (
            <>
              <button
                type="button"
                className="btn btn-danger floatRight smallLeftMargin"
                onClick={() => deleteArticle()}
              >
                Delete Article
              </button>

              <button
                type="button"
                className="btn btn-secondary floatRight smallLeftMargin"
                onClick={() => goEditArticle()}
              >
                Edit Article
              </button>
            </>
          ) : (
            <></>
          )}

          <ProfileImageNameLinkAndDateOfArticle
            username={article.author.username}
            image={article.author.image}
            createdAt={article.createdAt}
          />
        </div>
      </div>
      <div className="container smallTopPadding">
        <p className="smallTopPadding"> {article.body} </p>

        {article.tagList.map((tag) => (
          <div key={tag} className=" smallLeftPadding gray">
            {tag}
          </div>
        ))}

        <hr />

        <div className="container2 medTopPadding">
          <div className="card">
            <ul className="list-group list-group-flush smallPadding">
              <textarea
                className="commentTextBox"
                value={commentInput}
                onChange={handleChange}
                id="commentInput"
                name="commentInput"
                placeholder="Write a comment..."
              ></textarea>
            </ul>
            <div className="card-footer">
              <button
                className="btn btn-primary floatRight"
                onClick={() => postComment(commentInput)}
              >
                Post Comment
              </button>
            </div>
          </div>

          {comments.map((comment) => (
            <div key={comment.id}>
              <Comment
                body={comment.body}
                image={comment.author.image}
                username={comment.author.username}
                createdAt={comment.createdAt}
                slug={article.slug}
                id={comment.id}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
