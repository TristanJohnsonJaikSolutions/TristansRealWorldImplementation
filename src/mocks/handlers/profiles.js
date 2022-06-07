import { rest } from "msw";
import { factory, nullable, primaryKey } from "@mswjs/data";
import { extractToken } from "../helpers/extractToken";

// Use @mswjs/data to mock a data store. This lets us easily do real mutations on the data through routes.
const db = factory({
  profile: {
    id: primaryKey(Number),
    email: String,
    username: String,
    bio: nullable(String),
    image: nullable(String),
    following: Boolean,
  },
});

// Insert mock data
db.profile.create({
  id: 1,
  email: "user1@example.com",
  username: "followed-user",
  bio: "I am a test user seeded for unit testing.",
  image: null,
  following: true,
});

db.profile.create({
  id: 2,
  email: "user2@example.com",
  username: "unfollowed-user",
  bio: "I am a test user seeded for unit testing.",
  image: null,
  following: false,
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
   * Get a profile by username.
   */
  rest.get("/api/profiles/:username", (req, res, ctx) => {
    const profile = db.profile.findFirst({
      where: {
        username: { equals: req.params.username },
      },
    });

    if (!profile) {
      return res(ctx.status(404), ctx.json({ message: "profile not found" }));
    }

    delete profile.id; // Just remove the ID to match the API schema.

    return res(ctx.status(200), ctx.json({ profile }));
  }),

  /**
   * Follow a profile.
   */
  rest.post("/api/profiles/:username/follow", (req, res, ctx) => {
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

    const updatedProfile = db.profile.update({
      where: {
        username: { equals: req.params.username },
      },
      data: {
        following: true,
      },
    });

    delete updatedProfile.id;

    return res(ctx.status(200), ctx.json({ profile: updatedProfile }));
  }),

  /**
   * Unfollow a profile.
   */
  rest.delete("/api/profiles/:username/follow", (req, res, ctx) => {
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

    const updatedProfile = db.profile.update({
      where: {
        username: { equals: req.params.username },
      },
      data: {
        following: false,
      },
    });

    delete updatedProfile.id;

    return res(ctx.status(200), ctx.json({ profile: updatedProfile }));
  }),
];
