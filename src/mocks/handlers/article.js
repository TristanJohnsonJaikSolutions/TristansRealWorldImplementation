import { rest } from "msw";
import { factory, nullable, primaryKey } from "@mswjs/data";
import { extractToken } from "../helpers/extractToken";

// Use @mswjs/data to mock a data store. This lets us easily do real mutations on the data through routes.
const db = factory({
    article: {
        id: primaryKey(Number),
        author: String,
        createdAt: String,
        title: String,
        description: String,
        body: String,
        tagList: Array,
        favoritesCount: Number,
        slug: String,
    },
});

// Insert mock data
db.article.create({
    id: 1,
    author: "user1@example.com",
    createdAt: "01/01/1999",
    title: "A Test Title For a Test Article",
    description: "A test description for a test article",
    body: "Some test content",
    tagList: ["testTag1", "testTag2", "testTag3"],
    favoritesCount: 5,
    slug: "a-test-slug",
});

db.article.create({
    id: 2,
    author: "user2@example.com",
    createdAt: "01/01/1999",
    title: "A Test Title For a Test Article",
    description: "A test description for a test article",
    body: "Some test content",
    tagList: ["testTag1", "testTag2", "testTag3"],
    favoritesCount: 3,
    slug: "a-test-slug-2",
});

/**
 * Place mock HTTP call handlers here. These handlers respond to calls to their route while MSW is active.
 *
 * NOTE: Don't bother with error checking or making the logic bulletproof unless you need that for testing.
 *       These are meant only to serve the tests, so database structure doesn't need to make actual sense
 *       and logic doesn't need to be production quality as long as it returns what you need it to.
 */
export default [


    rest.get("/api/articles/:slug", (req, res, ctx) => {
        const article = db.article.findFirst({
            where: {
                slug: { equals: req.params.slug },
            },
        });

        if (!article) {
            return res(ctx.status(404), ctx.json({ message: "article not found" }));
        }

        delete article.id; // Just remove the ID to match the API schema.

        return res(ctx.status(200), ctx.json({ article }));
    }),

];
