import { Link, useParams, useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import useProfile from "hooks/useProfile";
import useUser from "hooks/useUser";
import useArticle from "hooks/useArticle";
import { useState } from "react";

export function NewArticle() {
  const { editing, slug } = useParams();
  const articleHook = useArticle(slug);
  const navigate = useNavigate();

  const [titleInput, setTitleInput] = useState(null);
  const [descriptionInput, setDescriptionInput] = useState(null);
  const [bodyInput, setBodyInput] = useState(null);
  const [tagsInput, setTagsInput] = useState(null);

  if (articleHook.articleQuery.isLoading) {
    return "Loading...";
  }

  if (editing != null) { // setting the values of the inputs to the given article if we are editing it
    if (titleInput == null) {
      setTitleInput(articleHook.articleQuery.data.title);
    }
    if (descriptionInput == null) {
      setDescriptionInput(articleHook.articleQuery.data.description);
    }
    if (bodyInput == null) {
      setBodyInput(articleHook.articleQuery.data.body);
    }
    if (tagsInput == null) {
      var tagsString = "";
      articleHook.articleQuery.data.tagList.forEach(tag => {
        tagsString += tag + ", "; // turing the tags array into a single string of comma and space separated values
      });
      setTagsInput(tagsString);
    }
  }

  function handleChangeTitle(event) {
    setTitleInput(event.target.value);
  }
  function handleChangeDescription(event) {
    setDescriptionInput(event.target.value);
  }
  function handleChangeBody(event) {
    setBodyInput(event.target.value);
  }
  function handleChangeTags(event) {
    setTagsInput(event.target.value);
  }

  function postArticle() {
    articleHook.createArticleMutation.mutate({
      title: titleInput,
      description: descriptionInput,
      body: bodyInput,
      tagList: tagsInput.split(", "),
    });
    navigate("/");
  }

  function editArticle() {
    articleHook.editArticleMutation.mutate({
      title: titleInput,
      description: descriptionInput,
      body: bodyInput,
      //tagList: tagsInput, // can't update tags apparently
    });
    navigate("/");
  }

  return (
    <>
      <div className="container medTopPadding">
        <div className="">
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Article Title"
            value={titleInput}
            onChange={handleChangeTitle}
          />
        </div>
        <div className="smallTopPadding">
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="What's this article about?"
            value={descriptionInput}
            onChange={handleChangeDescription}
          />
        </div>
        <div className="smallTopPadding">
          <textarea
            className="fullWidth"
            rows="8"
            type="text"
            id="body"
            placeholder="Write your article"
            value={bodyInput}
            onChange={handleChangeBody}
          ></textarea>
        </div>
        <div className="smallTopPadding">
          <input
            type="text"
            className="form-control"
            id="tags"
            placeholder="Enter tags"
            value={tagsInput}
            onChange={handleChangeTags}
          />
        </div>

        {editing != null ? (
          <>
            <button
              className="btn btn-primary floatRight smallTopMargin"
              onClick={() => editArticle()}
            >
              Apply Edit
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-primary floatRight smallTopMargin"
              onClick={() => postArticle()}
            >
              Publish Article
            </button>
          </>
        )}
      </div>
    </>
  );
}
