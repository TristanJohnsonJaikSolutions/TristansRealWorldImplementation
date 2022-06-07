import { MemoryRouter } from "react-router-dom";
import { Comment } from "./Comment";

export default {

  Comment: () => {

    return (
      <MemoryRouter>
        <Comment />
      </MemoryRouter>
    );
  },

};
