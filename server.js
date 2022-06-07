const express = require("express");
const spaFallback = require("express-history-api-fallback");
const PORT = process.env.PORT || 3750;
const app = express();

// Host the build react app files from the build folder.
app.use(express.static("build"));

// Allow visits to /paths to return the same single-page app as the root.
app.use(spaFallback("index.html", { root: "build" }));

// Listen for requests.
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
