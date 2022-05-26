import { rest } from "msw";

export default [
  /**
   * Get a list of tags
   */
  rest.get("/api/tags", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        tags: ["welcome", "implementations", "introduction", "codebaseShow"],
      })
    );
  }),
];
