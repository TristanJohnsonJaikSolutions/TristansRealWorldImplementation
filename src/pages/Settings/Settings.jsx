import { Link, useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import useProfile from "hooks/useProfile";
import { useState } from "react";
import useUser from "hooks/useUser";

export function Settings() {
  const { signOut, userData } = useAuth();

  const profileHook = useProfile(userData?.username);
  const userHook = useUser();
  const navigate = useNavigate();

  const [imageInput, setImageInput] = useState(null);
  const [usernameInput, setUsernameInput] = useState(null);
  const [bioInput, setBioInput] = useState(null);
  const [emailInput, setEmailInput] = useState(null);
  const [passwordInput, setPasswordInput] = useState("");

  if (profileHook.profileQuery.isLoading || userHook.userQuery.isLoading) {
    return "Loading...";
  }

  // initializing the values of the inputs to the current values as they are in the db
  if (imageInput == null && profileHook.profileQuery.data.image != "") {
    setImageInput(profileHook.profileQuery.data.image);
  }
  if (usernameInput == null && profileHook.profileQuery.data.username != "") {
    setUsernameInput(profileHook.profileQuery.data.username);
  }
  if (bioInput == null && profileHook.profileQuery.data.bio != "") {
    setBioInput(profileHook.profileQuery.data.bio);
  }
  if (emailInput == null && profileHook.profileQuery.data.email != "") {
    setEmailInput(userData?.email);
  }

  function handleChangeImage(event) {
    setImageInput(event.target.value);
  }
  function handleChangeUsername(event) {
    setUsernameInput(event.target.value);
  }
  function handleChangeBio(event) {
    setBioInput(event.target.value);
  }
  function handleChangeEmail(event) {
    setEmailInput(event.target.value);
  }
  function handleChangePassword(event) {
    setPasswordInput(event.target.value);
  }

  function updateSettings() {
    userHook.updateUserMutation.mutate({
      image: imageInput,
      username: usernameInput,
      bio: bioInput,
      email: emailInput,
      password: passwordInput,
    });

    navigate("/profile/" + profileHook.profileQuery.data.username);
  }

  return (
    <>
      <div className="container medTopPadding">
        <h1 className="center">Your Settings</h1>
          <div className="">
            <input
              type="text"
              className="form-control"
              id="picURL"
              placeholder="URL of profile picture"
              value={imageInput}
              onChange={handleChangeImage}
            />
          </div>
          <div className="smallTopPadding">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
              value={usernameInput}
              onChange={handleChangeUsername}
            />
          </div>
          <div className="smallTopPadding">
            <textarea
              className="fullWidth"
              rows="8"
              type="text"
              name="input"
              placeholder="Short bio about you"
              value={bioInput}
              onChange={handleChangeBio}
            ></textarea>
          </div>
          <div className="smallTopPadding">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={emailInput}
              onChange={handleChangeEmail}
            />
          </div>
          <div className="smallTopPadding">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="New Password"
              value={passwordInput}
              onChange={handleChangePassword}
            />
          </div>

          <button
            className="btn btn-primary floatRight smallTopMargin"
            onClick={() => updateSettings()}
          >
            Update Settings
          </button>


        <hr className="medTopMargin" />

        <Link to="/">
          <button
            type="submit"
            className="btn btn-outline-danger "
            onClick={signOut}
          >
            Or click here to logout
          </button>
        </Link>
      </div>
    </>
  );
}
