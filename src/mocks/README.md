# Testing Mocks

Put any mock data or mock API logic here. These files are used for testing and while running Cosmos.

## Adding Handlers

Handlers are grouped by resource. For example, `/api/users/*` routes are defined in `./handlers/users.js`. Routes under `/api/articles/*` would be in `./handlers/articles.js` and so on.

All handlers should be imported into and added to the handlers array in `./handlers/index.js`. Both the `browser.js` and `server.js` scripts that create the MSW workers for different environments import their handlers from this one file.
