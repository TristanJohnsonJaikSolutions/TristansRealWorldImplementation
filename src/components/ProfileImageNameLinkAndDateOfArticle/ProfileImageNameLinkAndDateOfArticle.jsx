import { Link } from "react-router-dom";
import "../../App.css";
/**
 * Displays username, image, a date, and provides a link to view this users profile.
 *
 */
export function ProfileImageNameLinkAndDateOfArticle(props) {

  let date = new Date(props.createdAt).toString();
  date = date.substring(0, 15); // not using the hours, minutes, or seconds

  return (
    <>
      <div className="row">
        <div className="col">
          <a href="#">
            <img
              src={props.image}
              className="profileImage"
              alt="..."
            />
          </a>
        </div>
        <div className="col">
          <div className="row">
            <div className="col">
              <Link
                  to={"/profile/" + props.username}
                >
                  {props.username}
                </Link>
            </div>
          </div>
          <div className="row">
            <div className="col smallDateText">{date}</div>
          </div>
        </div>
      </div>
    </>
  );
}
