import { rest } from "msw";
import { v4 } from "uuid";
import { factory, nullable, primaryKey } from "@mswjs/data";
import { extractToken } from "../helpers/extractToken";

let nextId = 1;

// Use @mswjs/data to mock a data store. This lets us easily do real mutations on the data through routes.
const db = factory({
  user: {
    id: primaryKey(Number),
    email: String,
    token: String,
    username: String,
    bio: nullable(String),
    image: nullable(String),
    password: String,
  },
});

// Insert mock data
db.user.create({
  id: nextId++,
  email: "user@example.com",
  token: "asdf",
  username: "Test User",
  bio: "I am a test user seeded for unit testing.",
  image: null,
  password: "hunter2", // NOTE: We do not ever store passwords in plaintext. This is only okay because this is a mock data structure for testing only.
});

/**
 * Place mock HTTP call handlers here. These handlers respond to calls to their route while MSW is active.
 *
 * NOTE: Don't bother with error checking or making the logic bulletproof unless you need that for testing.
 *       These are meant only to serve the tests, so database structure doesn't need to make actual sense
 *       and logic doesn't need to be production quality as long as it returns what you need it to.
 */
export default [
  /**
   * Register a new user.
   */
  rest.post("/api/users", (req, res, ctx) => {
    const user = db.user.create({
      id: nextId++,
      email: req.body.user.email,
      username: req.body.user.username,
      password: req.body.user.password,
      token: v4(),
    });

    return res(
      ctx.status(200),
      ctx.json({
        user: {
          email: user.email,
          token: user.token,
          username: user.username,
          bio: user.bio,
          image: user.image,
        },
      })
    );
  }),

  /**
   * Sign in as an existing user.
   */
  rest.post("/api/users/login", (req, res, ctx) => {
    try {
      const user = db.user.findFirst({
        where: {
          email: { equals: req.body.user.email },
          password: { equals: req.body.user.password },
        },
      });

      if (!user) {
        return res(
          ctx.status(403),
          ctx.json({
            status: "error",
            message: "invalid authorization credentials",
          })
        );
      }

      return res(
        ctx.status(200),
        ctx.json({
          user: {
            email: user.email,
            token: user.token,
            username: user.username,
            bio: user.bio,
            image: user.image,
          },
        })
      );
    } catch (err) {
      console.error(err);
    }
  }),

  /**
   * Get current user.
   */
  rest.get("/api/user", (req, res, ctx) => {
    const token = extractToken(req);

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({
          status: "error",
          message: "missing authorization credentials",
        })
      );
    }

    const user = db.user.findFirst({
      where: {
        token: token,
      },
    });

    if (!user) {
      return res(
        ctx.status(403),
        ctx.json({
          status: "error",
          message: "invalid authorization credentials",
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        user: {
          email: user.email,
          token: user.token,
          username: user.username,
          bio: user.bio,
          image: user.image,
        },
      })
    );
  }),
];
