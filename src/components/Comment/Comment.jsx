import { Link } from "react-router-dom";
import ProfileImageNameLinkAndDateOfArticle from "components/ProfileImageNameLinkAndDateOfArticle";
import useAuth from "hooks/useAuth";
import useArticle from "hooks/useArticle";

export function Comment(props) {
  const { userData } = useAuth();
  const articleHook = useArticle(props.slug);

  return (
    <>
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{props.body}</li>
        </ul>
        <div className="card-footer">
          <ProfileImageNameLinkAndDateOfArticle
            image={props.image}
            username={props.username}
            createdAt={props.createdAt}
          />

          {userData?.username == props.username ? (
            <button className="btn btn-danger floatRight" onClick={() => articleHook.deleteCommentMutation.mutate(props.id)}>Delete</button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
